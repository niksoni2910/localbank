import { An as literal, Ft as _enum, Gn as optional, Ht as array, Kt as boolean, Qn as record, Rt as _null, Un as number, Vt as any, Wn as object, Yn as preprocess, _r as url, gr as unknown, hr as union, i as datetime, in as discriminatedUnion, jn as looseObject, kn as lazy, ll as NEVER, n as number$1, rr as string, s as ZodIssueCode, xn as intersection } from "./coerce--f5JWDqd.js";
//#region node_modules/@modelcontextprotocol/core/dist/auth-BNDyLTqp.mjs
var LATEST_PROTOCOL_VERSION = "2025-11-25";
var DEFAULT_NEGOTIATED_PROTOCOL_VERSION = "2025-03-26";
var SUPPORTED_PROTOCOL_VERSIONS = [
	LATEST_PROTOCOL_VERSION,
	"2025-06-18",
	"2025-03-26",
	"2024-11-05",
	"2024-10-07"
];
/**
* `_meta` key associating a message with a 2025-11-25 task.
*
* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
*/
var RELATED_TASK_META_KEY = "io.modelcontextprotocol/related-task";
/**
* `_meta` key carrying the MCP protocol version governing a request.
*
* For the HTTP transport, the value must match the `MCP-Protocol-Version` header.
*/
var PROTOCOL_VERSION_META_KEY = "io.modelcontextprotocol/protocolVersion";
/**
* `_meta` key identifying the client software making a request.
*
* Clients SHOULD include it on every request; the value is self-reported and
* intended for display, logging, and debugging — servers should not rely on
* it for behavior or security decisions.
*/
var CLIENT_INFO_META_KEY = "io.modelcontextprotocol/clientInfo";
/**
* `_meta` key identifying the server software producing a response.
*
* Servers SHOULD include it on every response; the value is self-reported and
* intended for display, logging, and debugging — clients should not rely on
* it for behavior or security decisions.
*/
var SERVER_INFO_META_KEY = "io.modelcontextprotocol/serverInfo";
/**
* `_meta` key carrying the client's capabilities for a request.
*
* Capabilities are declared per request rather than once at initialization;
* servers must not infer capabilities from prior requests.
*/
var CLIENT_CAPABILITIES_META_KEY = "io.modelcontextprotocol/clientCapabilities";
/**
* `_meta` key carrying the JSON-RPC ID of the `subscriptions/listen` request
* that opened the stream a notification was delivered on.
*
* Stamped by the server on every notification delivered via a
* `subscriptions/listen` stream (including the leading
* `notifications/subscriptions/acknowledged`); on stdio, where all messages
* share one channel, clients use it to correlate notifications with their
* originating subscription. The value is the listen request's JSON-RPC ID
* verbatim.
*/
var SUBSCRIPTION_ID_META_KEY = "io.modelcontextprotocol/subscriptionId";
/**
* `_meta` key carrying the desired log level for a request.
*
* When absent, the server must not send `notifications/message` notifications
* for the request.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months.
*/
var LOG_LEVEL_META_KEY = "io.modelcontextprotocol/logLevel";
/**
* `_meta` key carrying W3C Trace Context for distributed tracing (SEP-414).
*
* When present, the value MUST follow the W3C `traceparent` header format,
* e.g. `00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01`.
*
* @see https://www.w3.org/TR/trace-context/#traceparent-header
*/
var TRACEPARENT_META_KEY = "traceparent";
/**
* `_meta` key carrying vendor-specific trace state for distributed tracing (SEP-414).
*
* When present, the value MUST follow the W3C `tracestate` header format,
* e.g. `vendor1=value1,vendor2=value2`.
*
* @see https://www.w3.org/TR/trace-context/#tracestate-header
*/
var TRACESTATE_META_KEY = "tracestate";
/**
* `_meta` key carrying cross-cutting propagation values for distributed tracing (SEP-414).
*
* When present, the value MUST follow the W3C Baggage header format,
* e.g. `userId=alice,serverRegion=us-east-1`.
*
* @see https://www.w3.org/TR/baggage/
*/
var BAGGAGE_META_KEY = "baggage";
var JSONRPC_VERSION = "2.0";
var PARSE_ERROR = -32700;
var INVALID_REQUEST = -32600;
var METHOD_NOT_FOUND = -32601;
var INVALID_PARAMS = -32602;
var INTERNAL_ERROR = -32603;
var JSONValueSchema = lazy(() => union([
	string(),
	number(),
	boolean(),
	_null(),
	record(string(), JSONValueSchema),
	array(JSONValueSchema)
]));
var JSONObjectSchema = record(string(), JSONValueSchema);
var JSONArraySchema = array(JSONValueSchema);
/**
* A progress token, used to associate progress notifications with the original request.
*/
var ProgressTokenSchema = union([string(), number().int()]);
/**
* An opaque token used to represent a cursor for pagination.
*/
var CursorSchema = string();
/** @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only. */
var TaskMetadataSchema = object({ ttl: number().optional() });
/**
* Metadata for associating messages with a task.
* Include this in the `_meta` field under the key `io.modelcontextprotocol/related-task`.
*
* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
*/
var RelatedTaskMetadataSchema = object({ taskId: string() });
var RequestMetaSchema = looseObject({
	progressToken: ProgressTokenSchema.optional(),
	[RELATED_TASK_META_KEY]: RelatedTaskMetadataSchema.optional()
});
/**
* Common params for any request.
*/
var BaseRequestParamsSchema = object({ _meta: RequestMetaSchema.optional() });
/**
* Common params for any task-augmented request.
*
* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
*/
var TaskAugmentedRequestParamsSchema = BaseRequestParamsSchema.extend({ task: TaskMetadataSchema.optional() });
var RequestSchema = object({
	method: string(),
	params: BaseRequestParamsSchema.loose().optional()
});
var NotificationsParamsSchema = object({ _meta: RequestMetaSchema.optional() });
var NotificationSchema = object({
	method: string(),
	params: NotificationsParamsSchema.loose().optional()
});
/**
* The contents of a result's `_meta` field (the 2026-07-28 `ResultMetaObject`).
* Loose — implementation-specific keys pass through.
*
* The serverInfo key identifies the server software producing the response
* (servers SHOULD include it on every response; the value is self-reported
* and intended for display, logging, and debugging). The getter defers the
* `ImplementationSchema` reference, which is declared later in this file.
*/
var ResultMetaObjectSchema = looseObject({ get [SERVER_INFO_META_KEY]() {
	return ImplementationSchema.optional().catch(void 0);
} });
var ResultSchema = looseObject({ _meta: ResultMetaObjectSchema.optional() });
/**
* A uniquely identifying ID for a request in JSON-RPC.
*/
var RequestIdSchema = union([string(), number().int()]);
/**
* A request that expects a response.
*/
var JSONRPCRequestSchema = object({
	jsonrpc: literal("2.0"),
	id: RequestIdSchema,
	...RequestSchema.shape
}).strict();
/**
* A notification which does not expect a response.
*/
var JSONRPCNotificationSchema = object({
	jsonrpc: literal("2.0"),
	...NotificationSchema.shape
}).strict();
/**
* A successful (non-error) response to a request.
*/
var JSONRPCResultResponseSchema = object({
	jsonrpc: literal("2.0"),
	id: RequestIdSchema,
	result: ResultSchema
}).strict();
/**
* A response to a request that indicates an error occurred.
*/
var JSONRPCErrorResponseSchema = object({
	jsonrpc: literal("2.0"),
	id: RequestIdSchema.optional(),
	error: object({
		code: number().int(),
		message: string(),
		data: unknown().optional()
	})
}).strict();
var JSONRPCMessageSchema = union([
	JSONRPCRequestSchema,
	JSONRPCNotificationSchema,
	JSONRPCResultResponseSchema,
	JSONRPCErrorResponseSchema
]);
var JSONRPCResponseSchema = union([JSONRPCResultResponseSchema, JSONRPCErrorResponseSchema]);
/**
* A response that indicates success but carries no data.
*/
var EmptyResultSchema = ResultSchema.strict();
var CancelledNotificationParamsSchema = NotificationsParamsSchema.extend({
	requestId: RequestIdSchema.optional(),
	reason: string().optional()
});
/**
* This notification can be sent by either side to indicate that it is cancelling a previously-issued request.
*
* The request SHOULD still be in-flight, but due to communication latency, it is always possible that this notification MAY arrive after the request has already finished.
*
* This notification indicates that the result will be unused, so any associated processing SHOULD cease.
*
* A client MUST NOT attempt to cancel its {@linkcode InitializeRequest | initialize} request.
*/
var CancelledNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/cancelled"),
	params: CancelledNotificationParamsSchema
});
/**
* Icon schema for use in {@link Tool | tools}, {@link Prompt | prompts}, {@link Resource | resources}, and {@link Implementation | implementations}.
*/
var IconSchema = object({
	src: string(),
	mimeType: string().optional(),
	sizes: array(string()).optional(),
	theme: _enum(["light", "dark"]).optional()
});
/**
* Base schema to add `icons` property.
*
*/
var IconsSchema = object({ icons: array(IconSchema).optional() });
/**
* Base metadata interface for common properties across {@link Resource | resources}, {@link Tool | tools}, {@link Prompt | prompts}, and {@link Implementation | implementations}.
*/
var BaseMetadataSchema = object({
	name: string(),
	title: string().optional()
});
/**
* Describes the name and version of an MCP implementation.
*/
var ImplementationSchema = BaseMetadataSchema.extend({
	...BaseMetadataSchema.shape,
	...IconsSchema.shape,
	version: string(),
	websiteUrl: string().optional(),
	description: string().optional()
});
var ElicitationCapabilitySchema = preprocess((value) => {
	if (value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) return { form: {} };
	return value;
}, intersection(object({
	form: intersection(object({ applyDefaults: boolean().optional() }), JSONObjectSchema).optional(),
	url: JSONObjectSchema.optional()
}), JSONObjectSchema.optional()));
/**
* Task capabilities for clients, indicating which request types support task creation.
*
* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
*/
var ClientTasksCapabilitySchema = looseObject({
	list: JSONObjectSchema.optional(),
	cancel: JSONObjectSchema.optional(),
	requests: looseObject({
		sampling: looseObject({ createMessage: JSONObjectSchema.optional() }).optional(),
		elicitation: looseObject({ create: JSONObjectSchema.optional() }).optional()
	}).optional()
});
/**
* Task capabilities for servers, indicating which request types support task creation.
*
* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
*/
var ServerTasksCapabilitySchema = looseObject({
	list: JSONObjectSchema.optional(),
	cancel: JSONObjectSchema.optional(),
	requests: looseObject({ tools: looseObject({ call: JSONObjectSchema.optional() }).optional() }).optional()
});
/**
* Capabilities a client may support. Known capabilities are defined here, in this schema, but this is not a closed set: any client can define its own, additional capabilities.
*/
var ClientCapabilitiesSchema = object({
	experimental: record(string(), JSONObjectSchema).optional(),
	sampling: object({
		context: JSONObjectSchema.optional(),
		tools: JSONObjectSchema.optional()
	}).optional(),
	elicitation: ElicitationCapabilitySchema.optional(),
	roots: object({ listChanged: boolean().optional() }).optional(),
	tasks: ClientTasksCapabilitySchema.optional(),
	extensions: record(string(), JSONObjectSchema).optional()
});
var InitializeRequestParamsSchema = BaseRequestParamsSchema.extend({
	protocolVersion: string(),
	capabilities: ClientCapabilitiesSchema,
	clientInfo: ImplementationSchema
});
/**
* This request is sent from the client to the server when it first connects, asking it to begin initialization.
*/
var InitializeRequestSchema = RequestSchema.extend({
	method: literal("initialize"),
	params: InitializeRequestParamsSchema
});
/**
* Capabilities that a server may support. Known capabilities are defined here, in this schema, but this is not a closed set: any server can define its own, additional capabilities.
*/
var ServerCapabilitiesSchema = object({
	experimental: record(string(), JSONObjectSchema).optional(),
	logging: JSONObjectSchema.optional(),
	completions: JSONObjectSchema.optional(),
	prompts: object({ listChanged: boolean().optional() }).optional(),
	resources: object({
		subscribe: boolean().optional(),
		listChanged: boolean().optional()
	}).optional(),
	tools: object({ listChanged: boolean().optional() }).optional(),
	tasks: ServerTasksCapabilitySchema.optional(),
	extensions: record(string(), JSONObjectSchema).optional()
});
/**
* After receiving an initialize request from the client, the server sends this response.
*/
var InitializeResultSchema = ResultSchema.extend({
	protocolVersion: string(),
	capabilities: ServerCapabilitiesSchema,
	serverInfo: ImplementationSchema,
	instructions: string().optional()
});
/**
* This notification is sent from the client to the server after initialization has finished.
*/
var InitializedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/initialized"),
	params: NotificationsParamsSchema.optional()
});
/**
* A request from the client asking the server to advertise its supported protocol
* versions, capabilities, and other metadata (protocol revision 2026-07-28). Servers
* MUST implement `server/discover`. Clients MAY call it but are not required to —
* version negotiation can also happen inline via the per-request `_meta` envelope.
*/
var DiscoverRequestSchema = RequestSchema.extend({
	method: literal("server/discover"),
	params: BaseRequestParamsSchema.optional()
});
/**
* The result returned by the server for a `server/discover` request.
*/
var DiscoverResultSchema = ResultSchema.extend({
	supportedVersions: array(string()),
	capabilities: ServerCapabilitiesSchema,
	instructions: string().optional()
});
/**
* A ping, issued by either the server or the client, to check that the other party is still alive. The receiver must promptly respond, or else may be disconnected.
*/
var PingRequestSchema = RequestSchema.extend({
	method: literal("ping"),
	params: BaseRequestParamsSchema.optional()
});
var ProgressSchema = object({
	progress: number(),
	total: optional(number()),
	message: optional(string())
});
var ProgressNotificationParamsSchema = object({
	...NotificationsParamsSchema.shape,
	...ProgressSchema.shape,
	progressToken: ProgressTokenSchema
});
/**
* An out-of-band notification used to inform the receiver of a progress update for a long-running request.
*
* @category notifications/progress
*/
var ProgressNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/progress"),
	params: ProgressNotificationParamsSchema
});
var PaginatedRequestParamsSchema = BaseRequestParamsSchema.extend({ cursor: CursorSchema.optional() });
var PaginatedRequestSchema = RequestSchema.extend({ params: PaginatedRequestParamsSchema.optional() });
var PaginatedResultSchema = ResultSchema.extend({ nextCursor: CursorSchema.optional() });
/**
* The contents of a specific resource or sub-resource.
*/
var ResourceContentsSchema = object({
	uri: string(),
	mimeType: optional(string()),
	_meta: record(string(), unknown()).optional()
});
var TextResourceContentsSchema = ResourceContentsSchema.extend({ text: string() });
/**
* A Zod schema for validating Base64 strings that is more performant and
* robust for very large inputs than the default regex-based check. It avoids
* stack overflows by using the native `atob` function for validation.
*/
var Base64Schema = string().refine((val) => {
	try {
		atob(val);
		return true;
	} catch {
		return false;
	}
}, { message: "Invalid Base64 string" });
var BlobResourceContentsSchema = ResourceContentsSchema.extend({ blob: Base64Schema });
/**
* The sender or recipient of messages and data in a conversation.
*/
var RoleSchema = _enum(["user", "assistant"]);
/**
* Optional annotations providing clients additional context about a resource.
*/
var AnnotationsSchema = object({
	audience: array(RoleSchema).optional(),
	priority: number().min(0).max(1).optional(),
	lastModified: datetime({ offset: true }).optional()
});
/**
* A known resource that the server is capable of reading.
*/
var ResourceSchema = object({
	...BaseMetadataSchema.shape,
	...IconsSchema.shape,
	uri: string(),
	description: optional(string()),
	mimeType: optional(string()),
	size: optional(number()),
	annotations: AnnotationsSchema.optional(),
	_meta: optional(looseObject({}))
});
/**
* A template description for resources available on the server.
*/
var ResourceTemplateSchema = object({
	...BaseMetadataSchema.shape,
	...IconsSchema.shape,
	uriTemplate: string(),
	description: optional(string()),
	mimeType: optional(string()),
	annotations: AnnotationsSchema.optional(),
	_meta: optional(looseObject({}))
});
/**
* Sent from the client to request a list of resources the server has.
*/
var ListResourcesRequestSchema = PaginatedRequestSchema.extend({ method: literal("resources/list") });
/**
* The server's response to a {@linkcode ListResourcesRequest | resources/list} request from the client.
*/
var ListResourcesResultSchema = PaginatedResultSchema.extend({ resources: array(ResourceSchema) });
/**
* Sent from the client to request a list of resource templates the server has.
*/
var ListResourceTemplatesRequestSchema = PaginatedRequestSchema.extend({ method: literal("resources/templates/list") });
/**
* The server's response to a {@linkcode ListResourceTemplatesRequest | resources/templates/list} request from the client.
*/
var ListResourceTemplatesResultSchema = PaginatedResultSchema.extend({ resourceTemplates: array(ResourceTemplateSchema) });
var ResourceRequestParamsSchema = BaseRequestParamsSchema.extend({ uri: string() });
/**
* Parameters for a {@linkcode ReadResourceRequest | resources/read} request.
*/
var ReadResourceRequestParamsSchema = ResourceRequestParamsSchema;
/**
* Sent from the client to the server, to read a specific resource URI.
*/
var ReadResourceRequestSchema = RequestSchema.extend({
	method: literal("resources/read"),
	params: ReadResourceRequestParamsSchema
});
/**
* The server's response to a {@linkcode ReadResourceRequest | resources/read} request from the client.
*/
var ReadResourceResultSchema = ResultSchema.extend({ contents: array(union([TextResourceContentsSchema, BlobResourceContentsSchema])) });
/**
* An optional notification from the server to the client, informing it that the list of resources it can read from has changed. This may be issued by servers without any previous subscription from the client.
*/
var ResourceListChangedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/resources/list_changed"),
	params: NotificationsParamsSchema.optional()
});
var SubscribeRequestParamsSchema = ResourceRequestParamsSchema;
/**
* Sent from the client to request `resources/updated` notifications from the server whenever a particular resource changes.
*/
var SubscribeRequestSchema = RequestSchema.extend({
	method: literal("resources/subscribe"),
	params: SubscribeRequestParamsSchema
});
var UnsubscribeRequestParamsSchema = ResourceRequestParamsSchema;
/**
* Sent from the client to request cancellation of {@linkcode ResourceUpdatedNotification | resources/updated} notifications from the server. This should follow a previous {@linkcode SubscribeRequest | resources/subscribe} request.
*/
var UnsubscribeRequestSchema = RequestSchema.extend({
	method: literal("resources/unsubscribe"),
	params: UnsubscribeRequestParamsSchema
});
/**
* The set of notification types a client opts in to on a `subscriptions/listen`
* request. Each type is opt-in; the server MUST NOT send a notification type
* the client has not explicitly requested here.
*/
var SubscriptionFilterSchema = object({
	toolsListChanged: boolean().optional(),
	promptsListChanged: boolean().optional(),
	resourcesListChanged: boolean().optional(),
	resourceSubscriptions: array(string()).optional()
});
var SubscriptionsListenRequestParamsSchema = BaseRequestParamsSchema.extend({ notifications: SubscriptionFilterSchema });
/**
* Sent from the client to open a long-lived channel for receiving notifications
* outside the context of a specific request (protocol revision 2026-07-28).
* Replaces the previous HTTP GET endpoint and `resources/subscribe`.
*/
var SubscriptionsListenRequestSchema = RequestSchema.extend({
	method: literal("subscriptions/listen"),
	params: SubscriptionsListenRequestParamsSchema
});
var SubscriptionsAcknowledgedNotificationParamsSchema = NotificationsParamsSchema.extend({ notifications: SubscriptionFilterSchema });
/**
* Sent by the server as the first message on a `subscriptions/listen` stream
* to acknowledge that the subscription has been established and report which
* notification types it agreed to honor (protocol revision 2026-07-28).
*/
var SubscriptionsAcknowledgedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/subscriptions/acknowledged"),
	params: SubscriptionsAcknowledgedNotificationParamsSchema
});
/**
* `_meta` for a {@linkcode SubscriptionsListenResult}: the listen request's
* JSON-RPC ID under the canonical subscription-id key (mirroring the same key
* on every notification delivered on the stream). Extends
* {@linkcode ResultMetaObjectSchema}, so the optional serverInfo key is typed
* here too.
*/
var SubscriptionsListenResultMetaSchema = ResultMetaObjectSchema.extend({ [SUBSCRIPTION_ID_META_KEY]: RequestIdSchema });
/**
* The response to a `subscriptions/listen` request, signalling that the
* subscription has ended gracefully (for example, during server shutdown).
* Because the listen stream is long-lived, this result is sent only when the
* server tears the subscription down; an abrupt transport close carries no
* response. The result body is otherwise empty.
*/
var SubscriptionsListenResultSchema = ResultSchema.extend({ _meta: SubscriptionsListenResultMetaSchema });
/**
* Parameters for a {@linkcode ResourceUpdatedNotification | notifications/resources/updated} notification.
*/
var ResourceUpdatedNotificationParamsSchema = NotificationsParamsSchema.extend({ uri: string() });
/**
* A notification from the server to the client, informing it that a resource has changed and may need to be read again. This should only be sent if the client previously sent a {@linkcode SubscribeRequest | resources/subscribe} request.
*/
var ResourceUpdatedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/resources/updated"),
	params: ResourceUpdatedNotificationParamsSchema
});
/**
* Describes an argument that a prompt can accept.
*/
var PromptArgumentSchema = object({
	name: string(),
	description: optional(string()),
	required: optional(boolean())
});
/**
* A prompt or prompt template that the server offers.
*/
var PromptSchema = object({
	...BaseMetadataSchema.shape,
	...IconsSchema.shape,
	description: optional(string()),
	arguments: optional(array(PromptArgumentSchema)),
	_meta: optional(looseObject({}))
});
/**
* Sent from the client to request a list of prompts and prompt templates the server has.
*/
var ListPromptsRequestSchema = PaginatedRequestSchema.extend({ method: literal("prompts/list") });
/**
* The server's response to a {@linkcode ListPromptsRequest | prompts/list} request from the client.
*/
var ListPromptsResultSchema = PaginatedResultSchema.extend({ prompts: array(PromptSchema) });
/**
* Parameters for a {@linkcode GetPromptRequest | prompts/get} request.
*/
var GetPromptRequestParamsSchema = BaseRequestParamsSchema.extend({
	name: string(),
	arguments: record(string(), string()).optional()
});
/**
* Used by the client to get a prompt provided by the server.
*/
var GetPromptRequestSchema = RequestSchema.extend({
	method: literal("prompts/get"),
	params: GetPromptRequestParamsSchema
});
/**
* Text provided to or from an LLM.
*/
var TextContentSchema = object({
	type: literal("text"),
	text: string(),
	annotations: AnnotationsSchema.optional(),
	_meta: record(string(), unknown()).optional()
});
/**
* An image provided to or from an LLM.
*/
var ImageContentSchema = object({
	type: literal("image"),
	data: Base64Schema,
	mimeType: string(),
	annotations: AnnotationsSchema.optional(),
	_meta: record(string(), unknown()).optional()
});
/**
* Audio content provided to or from an LLM.
*/
var AudioContentSchema = object({
	type: literal("audio"),
	data: Base64Schema,
	mimeType: string(),
	annotations: AnnotationsSchema.optional(),
	_meta: record(string(), unknown()).optional()
});
/**
* A tool call request from an assistant (LLM).
* Represents the assistant's request to use a tool.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to calling LLM
* provider APIs directly.
*/
var ToolUseContentSchema = object({
	type: literal("tool_use"),
	name: string(),
	id: string(),
	input: record(string(), unknown()),
	_meta: record(string(), unknown()).optional()
});
/**
* The contents of a resource, embedded into a prompt or tool call result.
*/
var EmbeddedResourceSchema = object({
	type: literal("resource"),
	resource: union([TextResourceContentsSchema, BlobResourceContentsSchema]),
	annotations: AnnotationsSchema.optional(),
	_meta: record(string(), unknown()).optional()
});
/**
* A resource that the server is capable of reading, included in a prompt or tool call result.
*
* Note: resource links returned by tools are not guaranteed to appear in the results of {@linkcode ListResourcesRequest | resources/list} requests.
*/
var ResourceLinkSchema = ResourceSchema.extend({ type: literal("resource_link") });
/**
* A content block that can be used in prompts and tool results.
*/
var ContentBlockSchema = union([
	TextContentSchema,
	ImageContentSchema,
	AudioContentSchema,
	ResourceLinkSchema,
	EmbeddedResourceSchema
]);
/**
* Describes a message returned as part of a prompt.
*/
var PromptMessageSchema = object({
	role: RoleSchema,
	content: ContentBlockSchema
});
/**
* The server's response to a {@linkcode GetPromptRequest | prompts/get} request from the client.
*/
var GetPromptResultSchema = ResultSchema.extend({
	description: string().optional(),
	messages: array(PromptMessageSchema)
});
/**
* An optional notification from the server to the client, informing it that the list of prompts it offers has changed. This may be issued by servers without any previous subscription from the client.
*/
var PromptListChangedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/prompts/list_changed"),
	params: NotificationsParamsSchema.optional()
});
/**
* Additional properties describing a `Tool` to clients.
*
* NOTE: all properties in {@linkcode ToolAnnotations} are **hints**.
* They are not guaranteed to provide a faithful description of
* tool behavior (including descriptive properties like `title`).
*
* Clients should never make tool use decisions based on `ToolAnnotations`
* received from untrusted servers.
*/
var ToolAnnotationsSchema = object({
	title: string().optional(),
	readOnlyHint: boolean().optional(),
	destructiveHint: boolean().optional(),
	idempotentHint: boolean().optional(),
	openWorldHint: boolean().optional()
});
/**
* Execution-related properties for a tool.
*/
var ToolExecutionSchema = object({ taskSupport: _enum([
	"required",
	"optional",
	"forbidden"
]).optional() });
/**
* Definition for a tool the client can call.
*/
var ToolSchema = object({
	...BaseMetadataSchema.shape,
	...IconsSchema.shape,
	description: string().optional(),
	inputSchema: object({
		type: literal("object"),
		properties: record(string(), JSONValueSchema).optional(),
		required: array(string()).optional()
	}).catchall(unknown()),
	outputSchema: looseObject({ $schema: string().optional() }).optional(),
	annotations: ToolAnnotationsSchema.optional(),
	execution: ToolExecutionSchema.optional(),
	_meta: record(string(), unknown()).optional()
});
/**
* Sent from the client to request a list of tools the server has.
*/
var ListToolsRequestSchema = PaginatedRequestSchema.extend({ method: literal("tools/list") });
/**
* The server's response to a {@linkcode ListToolsRequest | tools/list} request from the client.
*/
var ListToolsResultSchema = PaginatedResultSchema.extend({ tools: array(ToolSchema) });
/**
* The server's response to a tool call.
*/
var CallToolResultSchema = ResultSchema.extend({
	content: array(ContentBlockSchema).default([]),
	structuredContent: unknown().optional(),
	isError: boolean().optional()
});
/**
* {@linkcode CallToolResultSchema} extended with backwards compatibility to protocol version 2024-10-07.
*/
var CompatibilityCallToolResultSchema = CallToolResultSchema.or(ResultSchema.extend({ toolResult: unknown() }));
/**
* Parameters for a `tools/call` request.
*/
var CallToolRequestParamsSchema = TaskAugmentedRequestParamsSchema.extend({
	name: string(),
	arguments: record(string(), unknown()).optional()
});
/**
* Used by the client to invoke a tool provided by the server.
*/
var CallToolRequestSchema = RequestSchema.extend({
	method: literal("tools/call"),
	params: CallToolRequestParamsSchema
});
/**
* An optional notification from the server to the client, informing it that the list of tools it offers has changed. This may be issued by servers without any previous subscription from the client.
*/
var ToolListChangedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/tools/list_changed"),
	params: NotificationsParamsSchema.optional()
});
/**
* Base schema for list changed subscription options (without callback).
* Used internally for Zod validation of `autoRefresh` and `debounceMs`.
*/
var ListChangedOptionsBaseSchema = object({
	autoRefresh: boolean().default(true),
	debounceMs: number().int().nonnegative().default(300)
});
/**
* The severity of a log message.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to stderr logging
* (STDIO servers) or OpenTelemetry.
*/
var LoggingLevelSchema = _enum([
	"debug",
	"info",
	"notice",
	"warning",
	"error",
	"critical",
	"alert",
	"emergency"
]);
/**
* Parameters for a `logging/setLevel` request.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to stderr logging
* (STDIO servers) or OpenTelemetry.
*/
var SetLevelRequestParamsSchema = BaseRequestParamsSchema.extend({ level: LoggingLevelSchema });
/**
* A request from the client to the server, to enable or adjust logging.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to stderr logging
* (STDIO servers) or OpenTelemetry.
*/
var SetLevelRequestSchema = RequestSchema.extend({
	method: literal("logging/setLevel"),
	params: SetLevelRequestParamsSchema
});
/**
* Parameters for a `notifications/message` notification.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to stderr logging
* (STDIO servers) or OpenTelemetry.
*/
var LoggingMessageNotificationParamsSchema = NotificationsParamsSchema.extend({
	level: LoggingLevelSchema,
	logger: string().optional(),
	data: unknown()
});
/**
* Notification of a log message passed from server to client. If no `logging/setLevel` request has been sent from the client, the server MAY decide which messages to send automatically.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to stderr logging
* (STDIO servers) or OpenTelemetry.
*/
var LoggingMessageNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/message"),
	params: LoggingMessageNotificationParamsSchema
});
/**
* Hints to use for model selection.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to calling LLM
* provider APIs directly.
*/
var ModelHintSchema = object({ name: string().optional() });
/**
* The server's preferences for model selection, requested of the client during sampling.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to calling LLM
* provider APIs directly.
*/
var ModelPreferencesSchema = object({
	hints: array(ModelHintSchema).optional(),
	costPriority: number().min(0).max(1).optional(),
	speedPriority: number().min(0).max(1).optional(),
	intelligencePriority: number().min(0).max(1).optional()
});
/**
* Controls tool usage behavior in sampling requests.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to calling LLM
* provider APIs directly.
*/
var ToolChoiceSchema = object({ mode: _enum([
	"auto",
	"required",
	"none"
]).optional() });
/**
* The result of a tool execution, provided by the user (server).
* Represents the outcome of invoking a tool requested via `ToolUseContent`.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to calling LLM
* provider APIs directly.
*/
var ToolResultContentSchema = object({
	type: literal("tool_result"),
	toolUseId: string().describe("The unique identifier for the corresponding tool call."),
	content: array(ContentBlockSchema),
	structuredContent: unknown().optional(),
	isError: boolean().optional(),
	_meta: record(string(), unknown()).optional()
});
/**
* Basic content types for sampling responses (without tool use).
* Used for backwards-compatible {@linkcode CreateMessageResult} when tools are not used.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to calling LLM
* provider APIs directly.
*/
var SamplingContentSchema = discriminatedUnion("type", [
	TextContentSchema,
	ImageContentSchema,
	AudioContentSchema
]);
/**
* Content block types allowed in sampling messages.
* This includes text, image, audio, tool use requests, and tool results.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to calling LLM
* provider APIs directly.
*/
var SamplingMessageContentBlockSchema = discriminatedUnion("type", [
	TextContentSchema,
	ImageContentSchema,
	AudioContentSchema,
	ToolUseContentSchema,
	ToolResultContentSchema
]);
/**
* Describes a message issued to or received from an LLM API.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to calling LLM
* provider APIs directly.
*/
var SamplingMessageSchema = object({
	role: RoleSchema,
	content: union([SamplingMessageContentBlockSchema, array(SamplingMessageContentBlockSchema)]),
	_meta: record(string(), unknown()).optional()
});
/**
* Parameters for a `sampling/createMessage` request.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to calling LLM
* provider APIs directly.
*/
var CreateMessageRequestParamsSchema = TaskAugmentedRequestParamsSchema.extend({
	messages: array(SamplingMessageSchema),
	modelPreferences: ModelPreferencesSchema.optional(),
	systemPrompt: string().optional(),
	includeContext: _enum([
		"none",
		"thisServer",
		"allServers"
	]).optional(),
	temperature: number().optional(),
	maxTokens: number().int(),
	stopSequences: array(string()).optional(),
	metadata: JSONObjectSchema.optional(),
	tools: array(ToolSchema).optional(),
	toolChoice: ToolChoiceSchema.optional()
});
/**
* A request from the server to sample an LLM via the client. The client has full discretion over which model to select. The client should also inform the user before beginning sampling, to allow them to inspect the request (human in the loop) and decide whether to approve it.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to calling LLM
* provider APIs directly.
*/
var CreateMessageRequestSchema = RequestSchema.extend({
	method: literal("sampling/createMessage"),
	params: CreateMessageRequestParamsSchema
});
/**
* The client's response to a `sampling/create_message` request from the server.
* This is the backwards-compatible version that returns single content (no arrays).
* Used when the request does not include tools.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to calling LLM
* provider APIs directly.
*/
var CreateMessageResultSchema = ResultSchema.extend({
	model: string(),
	stopReason: optional(_enum([
		"endTurn",
		"stopSequence",
		"maxTokens"
	]).or(string())),
	role: RoleSchema,
	content: SamplingContentSchema
});
/**
* The client's response to a `sampling/create_message` request when tools were provided.
* This version supports array content for tool use flows.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to calling LLM
* provider APIs directly.
*/
var CreateMessageResultWithToolsSchema = ResultSchema.extend({
	model: string(),
	stopReason: optional(_enum([
		"endTurn",
		"stopSequence",
		"maxTokens",
		"toolUse"
	]).or(string())),
	role: RoleSchema,
	content: union([SamplingMessageContentBlockSchema, array(SamplingMessageContentBlockSchema)])
});
/**
* Primitive schema definition for boolean fields.
*/
var BooleanSchemaSchema = object({
	type: literal("boolean"),
	title: string().optional(),
	description: string().optional(),
	default: boolean().optional()
});
/**
* Primitive schema definition for string fields.
*/
var StringSchemaSchema = object({
	type: literal("string"),
	title: string().optional(),
	description: string().optional(),
	minLength: number().optional(),
	maxLength: number().optional(),
	format: _enum([
		"email",
		"uri",
		"date",
		"date-time"
	]).optional(),
	default: string().optional()
});
/**
* Primitive schema definition for number fields.
*/
var NumberSchemaSchema = object({
	type: _enum(["number", "integer"]),
	title: string().optional(),
	description: string().optional(),
	minimum: number().optional(),
	maximum: number().optional(),
	default: number().optional()
});
/**
* Schema for single-selection enumeration without display titles for options.
*/
var UntitledSingleSelectEnumSchemaSchema = object({
	type: literal("string"),
	title: string().optional(),
	description: string().optional(),
	enum: array(string()),
	default: string().optional()
});
/**
* Schema for single-selection enumeration with display titles for each option.
*/
var TitledSingleSelectEnumSchemaSchema = object({
	type: literal("string"),
	title: string().optional(),
	description: string().optional(),
	oneOf: array(object({
		const: string(),
		title: string()
	})),
	default: string().optional()
});
/**
* Use {@linkcode TitledSingleSelectEnumSchema} instead.
* This interface will be removed in a future version.
*/
var LegacyTitledEnumSchemaSchema = object({
	type: literal("string"),
	title: string().optional(),
	description: string().optional(),
	enum: array(string()),
	enumNames: array(string()).optional(),
	default: string().optional()
});
var SingleSelectEnumSchemaSchema = union([UntitledSingleSelectEnumSchemaSchema, TitledSingleSelectEnumSchemaSchema]);
/**
* Schema for multiple-selection enumeration without display titles for options.
*/
var UntitledMultiSelectEnumSchemaSchema = object({
	type: literal("array"),
	title: string().optional(),
	description: string().optional(),
	minItems: number().optional(),
	maxItems: number().optional(),
	items: object({
		type: literal("string"),
		enum: array(string())
	}),
	default: array(string()).optional()
});
/**
* Schema for multiple-selection enumeration with display titles for each option.
*/
var TitledMultiSelectEnumSchemaSchema = object({
	type: literal("array"),
	title: string().optional(),
	description: string().optional(),
	minItems: number().optional(),
	maxItems: number().optional(),
	items: object({ anyOf: array(object({
		const: string(),
		title: string()
	})) }),
	default: array(string()).optional()
});
/**
* Combined schema for multiple-selection enumeration
*/
var MultiSelectEnumSchemaSchema = union([UntitledMultiSelectEnumSchemaSchema, TitledMultiSelectEnumSchemaSchema]);
/**
* Primitive schema definition for enum fields.
*/
var EnumSchemaSchema = union([
	LegacyTitledEnumSchemaSchema,
	SingleSelectEnumSchemaSchema,
	MultiSelectEnumSchemaSchema
]);
/**
* Union of all primitive schema definitions.
*/
var PrimitiveSchemaDefinitionSchema = union([
	EnumSchemaSchema,
	BooleanSchemaSchema,
	StringSchemaSchema,
	NumberSchemaSchema
]);
/**
* Parameters for an `elicitation/create` request for form-based elicitation.
*/
var ElicitRequestFormParamsSchema = TaskAugmentedRequestParamsSchema.extend({
	mode: literal("form").optional(),
	message: string(),
	requestedSchema: object({
		type: literal("object"),
		properties: record(string(), PrimitiveSchemaDefinitionSchema),
		required: array(string()).optional()
	}).catchall(unknown())
});
/**
* Parameters for an {@linkcode ElicitRequest | elicitation/create} request for URL-based elicitation.
*/
var ElicitRequestURLParamsSchema = TaskAugmentedRequestParamsSchema.extend({
	mode: literal("url"),
	message: string(),
	elicitationId: string(),
	url: string().url()
});
/**
* The parameters for a request to elicit additional information from the user via the client.
*/
var ElicitRequestParamsSchema = union([ElicitRequestFormParamsSchema, ElicitRequestURLParamsSchema]);
/**
* A request from the server to elicit user input via the client.
* The client should present the message and form fields to the user (form mode)
* or navigate to a URL (URL mode).
*/
var ElicitRequestSchema = RequestSchema.extend({
	method: literal("elicitation/create"),
	params: ElicitRequestParamsSchema
});
/**
* Parameters for a {@linkcode ElicitationCompleteNotification | notifications/elicitation/complete} notification.
*
* @deprecated Removed from the spec by #2891 (2026-07-28). The client learns the outcome
* of an out-of-band interaction by retrying the original request; no server-initiated
* completion signal exists in the 2026-07-28 revision. Kept here for the 2025-era flow
* only. The 2026-07-28 wire codec excludes this notification.
* @category notifications/elicitation/complete
*/
var ElicitationCompleteNotificationParamsSchema = NotificationsParamsSchema.extend({ elicitationId: string() });
/**
* A notification from the server to the client, informing it of a completion of an out-of-band elicitation request.
*
* @deprecated Removed from the spec by #2891 (2026-07-28). The client learns the outcome
* of an out-of-band interaction by retrying the original request; no server-initiated
* completion signal exists in the 2026-07-28 revision. Kept here for the 2025-era flow
* only. The 2026-07-28 wire codec excludes this notification.
* @category notifications/elicitation/complete
*/
var ElicitationCompleteNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/elicitation/complete"),
	params: ElicitationCompleteNotificationParamsSchema
});
/**
* The client's response to an {@linkcode ElicitRequest | elicitation/create} request from the server.
*/
var ElicitResultSchema = ResultSchema.extend({
	action: _enum([
		"accept",
		"decline",
		"cancel"
	]),
	content: preprocess((val) => val === null ? void 0 : val, record(string(), union([
		string(),
		number(),
		boolean(),
		array(string())
	])).optional())
});
/**
* A reference to a resource or resource template definition.
*/
var ResourceTemplateReferenceSchema = object({
	type: literal("ref/resource"),
	uri: string()
});
/**
* Identifies a prompt.
*/
var PromptReferenceSchema = object({
	type: literal("ref/prompt"),
	name: string()
});
/**
* Parameters for a {@linkcode CompleteRequest | completion/complete} request.
*/
var CompleteRequestParamsSchema = BaseRequestParamsSchema.extend({
	ref: union([PromptReferenceSchema, ResourceTemplateReferenceSchema]),
	argument: object({
		name: string(),
		value: string()
	}),
	context: object({ arguments: record(string(), string()).optional() }).optional()
});
/**
* A request from the client to the server, to ask for completion options.
*/
var CompleteRequestSchema = RequestSchema.extend({
	method: literal("completion/complete"),
	params: CompleteRequestParamsSchema
});
/**
* The server's response to a {@linkcode CompleteRequest | completion/complete} request
*/
var CompleteResultSchema = ResultSchema.extend({ completion: looseObject({
	values: array(string()).max(100),
	total: optional(number().int()),
	hasMore: optional(boolean())
}) });
/**
* Represents a root directory or file that the server can operate on.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to passing paths via
* tool parameters, resource URIs, or configuration.
*/
var RootSchema = object({
	uri: string().startsWith("file://"),
	name: string().optional(),
	_meta: record(string(), unknown()).optional()
});
/**
* Sent from the server to request a list of root URIs from the client.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to passing paths via
* tool parameters, resource URIs, or configuration.
*/
var ListRootsRequestSchema = RequestSchema.extend({
	method: literal("roots/list"),
	params: BaseRequestParamsSchema.optional()
});
/**
* The client's response to a `roots/list` request from the server.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to passing paths via
* tool parameters, resource URIs, or configuration.
*/
var ListRootsResultSchema = ResultSchema.extend({ roots: array(RootSchema) });
/**
* A notification from the client to the server, informing it that the list of roots has changed.
*
* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
* in the specification for at least twelve months. Migrate to passing paths via
* tool parameters, resource URIs, or configuration.
*/
var RootsListChangedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/roots/list_changed"),
	params: NotificationsParamsSchema.optional()
});
/**
* Task creation parameters, used to ask that the server create a task to represent a request.
*
* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
*/
var TaskCreationParamsSchema = looseObject({
	ttl: number().optional(),
	pollInterval: number().optional()
});
/**
* The status of a task.
*
* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
*/
var TaskStatusSchema = _enum([
	"working",
	"input_required",
	"completed",
	"failed",
	"cancelled"
]);
/**
* A pollable state object associated with a request.
*
* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
*/
var TaskSchema = object({
	taskId: string(),
	status: TaskStatusSchema,
	ttl: union([number(), _null()]),
	createdAt: string(),
	lastUpdatedAt: string(),
	pollInterval: optional(number()),
	statusMessage: optional(string())
});
/**
* Result returned when a task is created, containing the task data wrapped in a `task` field.
*
* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
*/
var CreateTaskResultSchema = ResultSchema.extend({ task: TaskSchema });
/**
* Parameters for task status notification.
*
* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
*/
var TaskStatusNotificationParamsSchema = NotificationsParamsSchema.merge(TaskSchema);
/**
* A notification sent when a task's status changes.
*
* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
*/
var TaskStatusNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/tasks/status"),
	params: TaskStatusNotificationParamsSchema
});
/**
* A request to get the state of a specific task.
*
* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
*/
var GetTaskRequestSchema = RequestSchema.extend({
	method: literal("tasks/get"),
	params: BaseRequestParamsSchema.extend({ taskId: string() })
});
/**
* The response to a {@linkcode GetTaskRequest | tasks/get} request.
*
* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
*/
var GetTaskResultSchema = ResultSchema.merge(TaskSchema);
/**
* A request to get the result of a specific task.
*
* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
*/
var GetTaskPayloadRequestSchema = RequestSchema.extend({
	method: literal("tasks/result"),
	params: BaseRequestParamsSchema.extend({ taskId: string() })
});
/**
* The response to a `tasks/result` request.
* The structure matches the result type of the original request.
* For example, a {@linkcode CallToolRequest | tools/call} task would return the `CallToolResult` structure.
*
*
* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
*/
var GetTaskPayloadResultSchema = ResultSchema.loose();
/**
* A request to list tasks.
*
* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
*/
var ListTasksRequestSchema = PaginatedRequestSchema.extend({ method: literal("tasks/list") });
/**
* The response to a {@linkcode ListTasksRequest | tasks/list} request.
*
* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
*/
var ListTasksResultSchema = PaginatedResultSchema.extend({ tasks: array(TaskSchema) });
/**
* A request to cancel a specific task.
*
* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
*/
var CancelTaskRequestSchema = RequestSchema.extend({
	method: literal("tasks/cancel"),
	params: BaseRequestParamsSchema.extend({ taskId: string() })
});
/**
* The response to a {@linkcode CancelTaskRequest | tasks/cancel} request.
*
* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
*/
var CancelTaskResultSchema = ResultSchema.merge(TaskSchema);
var ClientRequestSchema = union([
	PingRequestSchema,
	InitializeRequestSchema,
	DiscoverRequestSchema,
	CompleteRequestSchema,
	SetLevelRequestSchema,
	GetPromptRequestSchema,
	ListPromptsRequestSchema,
	ListResourcesRequestSchema,
	ListResourceTemplatesRequestSchema,
	ReadResourceRequestSchema,
	SubscribeRequestSchema,
	UnsubscribeRequestSchema,
	SubscriptionsListenRequestSchema,
	CallToolRequestSchema,
	ListToolsRequestSchema
]);
var ClientNotificationSchema = union([
	CancelledNotificationSchema,
	ProgressNotificationSchema,
	InitializedNotificationSchema,
	RootsListChangedNotificationSchema
]);
var ClientResultSchema = union([
	EmptyResultSchema,
	CreateMessageResultSchema,
	CreateMessageResultWithToolsSchema,
	ElicitResultSchema,
	ListRootsResultSchema
]);
var ServerRequestSchema = union([
	PingRequestSchema,
	CreateMessageRequestSchema,
	ElicitRequestSchema,
	ListRootsRequestSchema
]);
var ServerNotificationSchema = union([
	CancelledNotificationSchema,
	ProgressNotificationSchema,
	LoggingMessageNotificationSchema,
	ResourceUpdatedNotificationSchema,
	ResourceListChangedNotificationSchema,
	ToolListChangedNotificationSchema,
	PromptListChangedNotificationSchema,
	SubscriptionsAcknowledgedNotificationSchema,
	ElicitationCompleteNotificationSchema
]);
var ServerResultSchema = union([
	EmptyResultSchema,
	InitializeResultSchema,
	DiscoverResultSchema,
	CompleteResultSchema,
	GetPromptResultSchema,
	ListPromptsResultSchema,
	ListResourcesResultSchema,
	ListResourceTemplatesResultSchema,
	ReadResourceResultSchema,
	CallToolResultSchema,
	ListToolsResultSchema,
	SubscriptionsListenResultSchema
]);
/**
* Reusable URL validation that disallows `javascript:` scheme
*/
var SafeUrlSchema = url().superRefine((val, ctx) => {
	if (!URL.canParse(val)) {
		ctx.addIssue({
			code: ZodIssueCode.custom,
			message: "URL must be parseable",
			fatal: true
		});
		return NEVER;
	}
}).refine((url) => {
	const u = new URL(url);
	return u.protocol !== "javascript:" && u.protocol !== "data:" && u.protocol !== "vbscript:";
}, { message: "URL cannot use javascript:, data:, or vbscript: scheme" });
/**
* RFC 9728 OAuth Protected Resource Metadata
*/
var OAuthProtectedResourceMetadataSchema = looseObject({
	resource: string().url(),
	authorization_servers: array(SafeUrlSchema).optional(),
	jwks_uri: string().url().optional(),
	scopes_supported: array(string()).optional(),
	bearer_methods_supported: array(string()).optional(),
	resource_signing_alg_values_supported: array(string()).optional(),
	resource_name: string().optional(),
	resource_documentation: string().optional(),
	resource_policy_uri: string().url().optional(),
	resource_tos_uri: string().url().optional(),
	tls_client_certificate_bound_access_tokens: boolean().optional(),
	authorization_details_types_supported: array(string()).optional(),
	dpop_signing_alg_values_supported: array(string()).optional(),
	dpop_bound_access_tokens_required: boolean().optional()
});
/**
* RFC 8414 OAuth 2.0 Authorization Server Metadata
*/
var OAuthMetadataSchema = looseObject({
	issuer: string(),
	authorization_endpoint: SafeUrlSchema,
	token_endpoint: SafeUrlSchema,
	registration_endpoint: SafeUrlSchema.optional(),
	scopes_supported: array(string()).optional(),
	response_types_supported: array(string()),
	response_modes_supported: array(string()).optional(),
	grant_types_supported: array(string()).optional(),
	token_endpoint_auth_methods_supported: array(string()).optional(),
	token_endpoint_auth_signing_alg_values_supported: array(string()).optional(),
	service_documentation: SafeUrlSchema.optional(),
	revocation_endpoint: SafeUrlSchema.optional(),
	revocation_endpoint_auth_methods_supported: array(string()).optional(),
	revocation_endpoint_auth_signing_alg_values_supported: array(string()).optional(),
	introspection_endpoint: string().optional(),
	introspection_endpoint_auth_methods_supported: array(string()).optional(),
	introspection_endpoint_auth_signing_alg_values_supported: array(string()).optional(),
	code_challenge_methods_supported: array(string()).optional(),
	client_id_metadata_document_supported: boolean().optional(),
	authorization_response_iss_parameter_supported: boolean().optional().catch(void 0),
	dpop_signing_alg_values_supported: array(string()).optional()
});
/**
* OpenID Connect Discovery 1.0 Provider Metadata
*
* @see https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
*/
var OpenIdProviderMetadataSchema = looseObject({
	issuer: string(),
	authorization_endpoint: SafeUrlSchema,
	token_endpoint: SafeUrlSchema,
	userinfo_endpoint: SafeUrlSchema.optional(),
	jwks_uri: SafeUrlSchema,
	registration_endpoint: SafeUrlSchema.optional(),
	scopes_supported: array(string()).optional(),
	response_types_supported: array(string()),
	response_modes_supported: array(string()).optional(),
	grant_types_supported: array(string()).optional(),
	acr_values_supported: array(string()).optional(),
	subject_types_supported: array(string()),
	id_token_signing_alg_values_supported: array(string()),
	id_token_encryption_alg_values_supported: array(string()).optional(),
	id_token_encryption_enc_values_supported: array(string()).optional(),
	userinfo_signing_alg_values_supported: array(string()).optional(),
	userinfo_encryption_alg_values_supported: array(string()).optional(),
	userinfo_encryption_enc_values_supported: array(string()).optional(),
	request_object_signing_alg_values_supported: array(string()).optional(),
	request_object_encryption_alg_values_supported: array(string()).optional(),
	request_object_encryption_enc_values_supported: array(string()).optional(),
	token_endpoint_auth_methods_supported: array(string()).optional(),
	token_endpoint_auth_signing_alg_values_supported: array(string()).optional(),
	display_values_supported: array(string()).optional(),
	claim_types_supported: array(string()).optional(),
	claims_supported: array(string()).optional(),
	service_documentation: string().optional(),
	claims_locales_supported: array(string()).optional(),
	ui_locales_supported: array(string()).optional(),
	claims_parameter_supported: boolean().optional(),
	request_parameter_supported: boolean().optional(),
	request_uri_parameter_supported: boolean().optional(),
	require_request_uri_registration: boolean().optional(),
	op_policy_uri: SafeUrlSchema.optional(),
	op_tos_uri: SafeUrlSchema.optional(),
	client_id_metadata_document_supported: boolean().optional(),
	authorization_response_iss_parameter_supported: boolean().optional().catch(void 0)
});
/**
* OpenID Connect Discovery metadata that may include OAuth 2.0 fields
* This schema represents the real-world scenario where OIDC providers
* return a mix of OpenID Connect and OAuth 2.0 metadata fields
*/
var OpenIdProviderDiscoveryMetadataSchema = object({
	...OpenIdProviderMetadataSchema.shape,
	...OAuthMetadataSchema.pick({ code_challenge_methods_supported: true }).shape
});
/**
* OAuth 2.1 token response
*/
var OAuthTokensSchema = object({
	access_token: string(),
	id_token: string().optional(),
	token_type: string(),
	expires_in: number$1().optional(),
	scope: string().optional(),
	refresh_token: string().optional(),
	issuer: string().optional().catch(void 0)
}).strip();
/**
* RFC 8693 §2.2.1 Token Exchange response for ID-JAG tokens.
*
* `token_type` is intentionally optional: per RFC 8693 §2.2.1 it is informational when
* the issued token is not an access token, and per RFC 6749 §5.1 it is case-insensitive,
* so strict checking rejects conformant IdPs.
*/
var IdJagTokenExchangeResponseSchema = object({
	issued_token_type: literal("urn:ietf:params:oauth:token-type:id-jag"),
	access_token: string(),
	token_type: string().optional(),
	expires_in: number().optional(),
	scope: string().optional()
}).strip();
/**
* OAuth 2.1 error response
*/
var OAuthErrorResponseSchema = object({
	error: string(),
	error_description: string().optional(),
	error_uri: string().optional()
});
/**
* Optional version of {@linkcode SafeUrlSchema} that allows empty string for backward compatibility on `tos_uri` and `logo_uri`
*/
var OptionalSafeUrlSchema = SafeUrlSchema.optional().or(literal("").transform(() => void 0));
/**
* RFC 7591 OAuth 2.0 Dynamic Client Registration metadata
*/
var OAuthClientMetadataSchema = object({
	redirect_uris: array(SafeUrlSchema),
	token_endpoint_auth_method: string().optional(),
	grant_types: array(string()).optional(),
	response_types: array(string()).optional(),
	application_type: string().optional(),
	client_name: string().optional(),
	client_uri: SafeUrlSchema.optional(),
	logo_uri: OptionalSafeUrlSchema,
	scope: string().optional(),
	contacts: array(string()).optional(),
	tos_uri: OptionalSafeUrlSchema,
	policy_uri: string().optional(),
	jwks_uri: SafeUrlSchema.optional(),
	jwks: any().optional(),
	software_id: string().optional(),
	software_version: string().optional(),
	software_statement: string().optional()
}).strip();
/**
* RFC 7591 OAuth 2.0 Dynamic Client Registration client information
*/
var OAuthClientInformationSchema = object({
	client_id: string(),
	client_secret: string().optional(),
	client_id_issued_at: number().optional(),
	client_secret_expires_at: number().optional(),
	issuer: string().optional().catch(void 0)
}).strip();
/**
* RFC 7591 OAuth 2.0 Dynamic Client Registration full response (client information plus metadata)
*/
var OAuthClientInformationFullSchema = OAuthClientMetadataSchema.merge(OAuthClientInformationSchema);
/**
* RFC 7591 OAuth 2.0 Dynamic Client Registration error response
*/
var OAuthClientRegistrationErrorSchema = object({
	error: string(),
	error_description: string().optional()
}).strip();
/**
* RFC 7009 OAuth 2.0 Token Revocation request
*/
var OAuthTokenRevocationRequestSchema = object({
	token: string(),
	token_type_hint: string().optional()
}).strip();
//#endregion
export { INTERNAL_ERROR as $, SetLevelRequestParamsSchema as $n, OAuthProtectedResourceMetadataSchema as $t, CreateMessageResultWithToolsSchema as A, ResourceListChangedNotificationSchema as An, ToolSchema as Ar, ListResourcesResultSchema as At, ElicitResultSchema as B, RootSchema as Bn, METHOD_NOT_FOUND as Bt, CompleteRequestParamsSchema as C, ReadResourceResultSchema as Cn, TitledMultiSelectEnumSchemaSchema as Cr, LegacyTitledEnumSchemaSchema as Ct, CreateMessageRequestParamsSchema as D, RequestSchema as Dn, ToolExecutionSchema as Dr, ListResourceTemplatesRequestSchema as Dt, ContentBlockSchema as E, RequestMetaSchema as En, ToolChoiceSchema as Er, ListPromptsResultSchema as Et, DiscoverResultSchema as F, ResourceUpdatedNotificationParamsSchema as Fn, UntitledSingleSelectEnumSchemaSchema as Fr, ListToolsRequestSchema as Ft, EnumSchemaSchema as G, SamplingContentSchema as Gn, NotificationsParamsSchema as Gt, ElicitationCompleteNotificationSchema as H, SERVER_INFO_META_KEY as Hn, ModelPreferencesSchema as Ht, ElicitRequestFormParamsSchema as I, ResourceUpdatedNotificationSchema as In, ListToolsResultSchema as It, GetPromptResultSchema as J, ServerCapabilitiesSchema as Jn, OAuthClientInformationSchema as Jt, GetPromptRequestParamsSchema as K, SamplingMessageContentBlockSchema as Kn, NumberSchemaSchema as Kt, ElicitRequestParamsSchema as L, ResultMetaObjectSchema as Ln, LoggingLevelSchema as Lt, CursorSchema as M, ResourceSchema as Mn, UnsubscribeRequestParamsSchema as Mr, ListRootsResultSchema as Mt, DEFAULT_NEGOTIATED_PROTOCOL_VERSION as N, ResourceTemplateReferenceSchema as Nn, UnsubscribeRequestSchema as Nr, ListTasksRequestSchema as Nt, CreateMessageRequestSchema as O, ResourceContentsSchema as On, ToolListChangedNotificationSchema as Or, ListResourceTemplatesResultSchema as Ot, DiscoverRequestSchema as P, ResourceTemplateSchema as Pn, UntitledMultiSelectEnumSchemaSchema as Pr, ListTasksResultSchema as Pt, GetTaskResultSchema as Q, ServerTasksCapabilitySchema as Qn, OAuthMetadataSchema as Qt, ElicitRequestSchema as R, ResultSchema as Rn, LoggingMessageNotificationParamsSchema as Rt, CompatibilityCallToolResultSchema as S, ReadResourceRequestSchema as Sn, TextResourceContentsSchema as Sr, LOG_LEVEL_META_KEY as St, CompleteResultSchema as T, RequestIdSchema as Tn, ToolAnnotationsSchema as Tr, ListPromptsRequestSchema as Tt, EmbeddedResourceSchema as U, SUBSCRIPTION_ID_META_KEY as Un, MultiSelectEnumSchemaSchema as Ut, ElicitationCompleteNotificationParamsSchema as V, RootsListChangedNotificationSchema as Vn, ModelHintSchema as Vt, EmptyResultSchema as W, SUPPORTED_PROTOCOL_VERSIONS as Wn, NotificationSchema as Wt, GetTaskPayloadResultSchema as X, ServerRequestSchema as Xn, OAuthClientRegistrationErrorSchema as Xt, GetTaskPayloadRequestSchema as Y, ServerNotificationSchema as Yn, OAuthClientMetadataSchema as Yt, GetTaskRequestSchema as Z, ServerResultSchema as Zn, OAuthErrorResponseSchema as Zt, ClientCapabilitiesSchema as _, PromptMessageSchema as _n, TaskSchema as _r, JSONRPCResponseSchema as _t, BaseRequestParamsSchema as a, PROTOCOL_VERSION_META_KEY as an, SubscriptionFilterSchema as ar, ImageContentSchema as at, ClientResultSchema as b, RELATED_TASK_META_KEY as bn, TaskStatusSchema as br, JSONValueSchema as bt, CLIENT_CAPABILITIES_META_KEY as c, PaginatedResultSchema as cn, SubscriptionsListenRequestParamsSchema as cr, InitializeRequestSchema as ct, CallToolRequestSchema as d, ProgressNotificationParamsSchema as dn, SubscriptionsListenResultSchema as dr, JSONArraySchema as dt, OAuthTokenRevocationRequestSchema as en, SetLevelRequestSchema as er, INVALID_PARAMS as et, CallToolResultSchema as f, ProgressNotificationSchema as fn, TRACEPARENT_META_KEY as fr, JSONObjectSchema as ft, CancelledNotificationSchema as g, PromptListChangedNotificationSchema as gn, TaskMetadataSchema as gr, JSONRPCRequestSchema as gt, CancelledNotificationParamsSchema as h, PromptArgumentSchema as hn, TaskCreationParamsSchema as hr, JSONRPCNotificationSchema as ht, BaseMetadataSchema as i, PARSE_ERROR as in, SubscribeRequestSchema as ir, IdJagTokenExchangeResponseSchema as it, CreateTaskResultSchema as j, ResourceRequestParamsSchema as jn, ToolUseContentSchema as jr, ListRootsRequestSchema as jt, CreateMessageResultSchema as k, ResourceLinkSchema as kn, ToolResultContentSchema as kr, ListResourcesRequestSchema as kt, CLIENT_INFO_META_KEY as l, PingRequestSchema as ln, SubscriptionsListenRequestSchema as lr, InitializeResultSchema as lt, CancelTaskResultSchema as m, ProgressTokenSchema as mn, TaskAugmentedRequestParamsSchema as mr, JSONRPCMessageSchema as mt, AudioContentSchema as n, OpenIdProviderDiscoveryMetadataSchema as nn, StringSchemaSchema as nr, IconSchema as nt, BlobResourceContentsSchema as o, PaginatedRequestParamsSchema as on, SubscriptionsAcknowledgedNotificationParamsSchema as or, ImplementationSchema as ot, CancelTaskRequestSchema as p, ProgressSchema as pn, TRACESTATE_META_KEY as pr, JSONRPCErrorResponseSchema as pt, GetPromptRequestSchema as q, SamplingMessageSchema as qn, OAuthClientInformationFullSchema as qt, BAGGAGE_META_KEY as r, OpenIdProviderMetadataSchema as rn, SubscribeRequestParamsSchema as rr, IconsSchema as rt, BooleanSchemaSchema as s, PaginatedRequestSchema as sn, SubscriptionsAcknowledgedNotificationSchema as sr, InitializeRequestParamsSchema as st, AnnotationsSchema as t, OAuthTokensSchema as tn, SingleSelectEnumSchemaSchema as tr, INVALID_REQUEST as tt, CallToolRequestParamsSchema as u, PrimitiveSchemaDefinitionSchema as un, SubscriptionsListenResultMetaSchema as ur, InitializedNotificationSchema as ut, ClientNotificationSchema as v, PromptReferenceSchema as vn, TaskStatusNotificationParamsSchema as vr, JSONRPCResultResponseSchema as vt, CompleteRequestSchema as w, RelatedTaskMetadataSchema as wn, TitledSingleSelectEnumSchemaSchema as wr, ListChangedOptionsBaseSchema as wt, ClientTasksCapabilitySchema as x, ReadResourceRequestParamsSchema as xn, TextContentSchema as xr, LATEST_PROTOCOL_VERSION as xt, ClientRequestSchema as y, PromptSchema as yn, TaskStatusNotificationSchema as yr, JSONRPC_VERSION as yt, ElicitRequestURLParamsSchema as z, RoleSchema as zn, LoggingMessageNotificationSchema as zt };
