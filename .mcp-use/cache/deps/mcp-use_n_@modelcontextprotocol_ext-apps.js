import { An as literal, Ft as _enum, Gn as optional, Ht as array, Kt as boolean, Pr as safeParse, Qn as record, Rt as _null, Un as number, Vt as any, Wn as object, Yn as preprocess, _r as url, gr as unknown, hr as union, i as datetime, in as discriminatedUnion, jn as looseObject, kn as lazy, on as email, r as date$1, rr as string, ul as config, xn as intersection, zn as never, zr as toJSONSchema, zt as _undefined } from "./coerce--f5JWDqd.js";
import { $n as SetLevelRequestParamsSchema, $t as OAuthProtectedResourceMetadataSchema, A as CreateMessageResultWithToolsSchema, An as ResourceListChangedNotificationSchema, Ar as ToolSchema, At as ListResourcesResultSchema, B as ElicitResultSchema, Bn as RootSchema, C as CompleteRequestParamsSchema, Cn as ReadResourceResultSchema, Cr as TitledMultiSelectEnumSchemaSchema, Ct as LegacyTitledEnumSchemaSchema, D as CreateMessageRequestParamsSchema, Dn as RequestSchema, Dr as ToolExecutionSchema, Dt as ListResourceTemplatesRequestSchema, E as ContentBlockSchema, En as RequestMetaSchema, Er as ToolChoiceSchema, Et as ListPromptsResultSchema, F as DiscoverResultSchema, Fn as ResourceUpdatedNotificationParamsSchema, Fr as UntitledSingleSelectEnumSchemaSchema, Ft as ListToolsRequestSchema, G as EnumSchemaSchema, Gn as SamplingContentSchema, Gt as NotificationsParamsSchema, H as ElicitationCompleteNotificationSchema, Hn as SERVER_INFO_META_KEY, Ht as ModelPreferencesSchema, I as ElicitRequestFormParamsSchema, In as ResourceUpdatedNotificationSchema, It as ListToolsResultSchema, J as GetPromptResultSchema, Jn as ServerCapabilitiesSchema, Jt as OAuthClientInformationSchema, K as GetPromptRequestParamsSchema, Kn as SamplingMessageContentBlockSchema, Kt as NumberSchemaSchema, L as ElicitRequestParamsSchema, Ln as ResultMetaObjectSchema, Lt as LoggingLevelSchema, M as CursorSchema, Mn as ResourceSchema, Mr as UnsubscribeRequestParamsSchema, Mt as ListRootsResultSchema, Nn as ResourceTemplateReferenceSchema, Nr as UnsubscribeRequestSchema, Nt as ListTasksRequestSchema, O as CreateMessageRequestSchema, On as ResourceContentsSchema, Or as ToolListChangedNotificationSchema, Ot as ListResourceTemplatesResultSchema, P as DiscoverRequestSchema, Pn as ResourceTemplateSchema, Pr as UntitledMultiSelectEnumSchemaSchema, Pt as ListTasksResultSchema, Q as GetTaskResultSchema, Qn as ServerTasksCapabilitySchema, Qt as OAuthMetadataSchema, R as ElicitRequestSchema, Rn as ResultSchema, Rt as LoggingMessageNotificationParamsSchema, S as CompatibilityCallToolResultSchema, Sn as ReadResourceRequestSchema, Sr as TextResourceContentsSchema, St as LOG_LEVEL_META_KEY, T as CompleteResultSchema, Tn as RequestIdSchema, Tr as ToolAnnotationsSchema, Tt as ListPromptsRequestSchema, U as EmbeddedResourceSchema, Ut as MultiSelectEnumSchemaSchema, V as ElicitationCompleteNotificationParamsSchema, Vn as RootsListChangedNotificationSchema, Vt as ModelHintSchema, W as EmptyResultSchema, Wn as SUPPORTED_PROTOCOL_VERSIONS, Wt as NotificationSchema, X as GetTaskPayloadResultSchema, Xn as ServerRequestSchema, Xt as OAuthClientRegistrationErrorSchema, Y as GetTaskPayloadRequestSchema, Yn as ServerNotificationSchema, Yt as OAuthClientMetadataSchema, Z as GetTaskRequestSchema, Zn as ServerResultSchema, Zt as OAuthErrorResponseSchema, _ as ClientCapabilitiesSchema, _n as PromptMessageSchema, _r as TaskSchema, _t as JSONRPCResponseSchema, a as BaseRequestParamsSchema, an as PROTOCOL_VERSION_META_KEY, ar as SubscriptionFilterSchema, at as ImageContentSchema, b as ClientResultSchema, br as TaskStatusSchema, bt as JSONValueSchema, c as CLIENT_CAPABILITIES_META_KEY, cn as PaginatedResultSchema, cr as SubscriptionsListenRequestParamsSchema, ct as InitializeRequestSchema, d as CallToolRequestSchema, dn as ProgressNotificationParamsSchema, dr as SubscriptionsListenResultSchema, dt as JSONArraySchema, en as OAuthTokenRevocationRequestSchema, er as SetLevelRequestSchema, f as CallToolResultSchema, fn as ProgressNotificationSchema, ft as JSONObjectSchema, g as CancelledNotificationSchema, gn as PromptListChangedNotificationSchema, gr as TaskMetadataSchema, gt as JSONRPCRequestSchema, h as CancelledNotificationParamsSchema, hn as PromptArgumentSchema, hr as TaskCreationParamsSchema, ht as JSONRPCNotificationSchema, i as BaseMetadataSchema, ir as SubscribeRequestSchema, it as IdJagTokenExchangeResponseSchema, j as CreateTaskResultSchema, jn as ResourceRequestParamsSchema, jr as ToolUseContentSchema, jt as ListRootsRequestSchema, k as CreateMessageResultSchema, kn as ResourceLinkSchema, kr as ToolResultContentSchema, kt as ListResourcesRequestSchema, l as CLIENT_INFO_META_KEY, ln as PingRequestSchema, lr as SubscriptionsListenRequestSchema, lt as InitializeResultSchema, m as CancelTaskResultSchema, mn as ProgressTokenSchema, mr as TaskAugmentedRequestParamsSchema, mt as JSONRPCMessageSchema, n as AudioContentSchema, nn as OpenIdProviderDiscoveryMetadataSchema, nr as StringSchemaSchema, nt as IconSchema, o as BlobResourceContentsSchema, on as PaginatedRequestParamsSchema, or as SubscriptionsAcknowledgedNotificationParamsSchema, ot as ImplementationSchema, p as CancelTaskRequestSchema, pn as ProgressSchema, pt as JSONRPCErrorResponseSchema, q as GetPromptRequestSchema, qn as SamplingMessageSchema, qt as OAuthClientInformationFullSchema, rn as OpenIdProviderMetadataSchema, rr as SubscribeRequestParamsSchema, rt as IconsSchema, s as BooleanSchemaSchema, sn as PaginatedRequestSchema, sr as SubscriptionsAcknowledgedNotificationSchema, st as InitializeRequestParamsSchema, t as AnnotationsSchema, tn as OAuthTokensSchema, tr as SingleSelectEnumSchemaSchema, u as CallToolRequestParamsSchema, un as PrimitiveSchemaDefinitionSchema, ur as SubscriptionsListenResultMetaSchema, ut as InitializedNotificationSchema, v as ClientNotificationSchema, vn as PromptReferenceSchema, vr as TaskStatusNotificationParamsSchema, vt as JSONRPCResultResponseSchema, w as CompleteRequestSchema, wn as RelatedTaskMetadataSchema, wr as TitledSingleSelectEnumSchemaSchema, wt as ListChangedOptionsBaseSchema, x as ClientTasksCapabilitySchema, xn as ReadResourceRequestParamsSchema, xr as TextContentSchema, y as ClientRequestSchema, yn as PromptSchema, yr as TaskStatusNotificationSchema, z as ElicitRequestURLParamsSchema, zn as RoleSchema, zt as LoggingMessageNotificationSchema } from "./auth-BNDyLTqp-D1SpH-ea.js";
import "./internal-lOVYUagG.js";
import "./mcp-use_n_@modelcontextprotocol_core.js";
var __defProp = Object.defineProperty;
var __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __exportAll = (all, symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@modelcontextprotocol/client/dist/dialects-BOhdv1Fc.mjs
var DRAFT_2019_09_URIS = /* @__PURE__ */ new Set(["https://json-schema.org/draft/2019-09/schema", "http://json-schema.org/draft/2019-09/schema"]);
/**
* Whether a `$schema` value declares the 2019-09 dialect — the only supported dialect with
* `$recursiveRef`/`$recursiveAnchor`. Non-throwing (unlike {@linkcode declaredDialect}) so
* wire-layer callers can consult it for documents whose dialect may be unsupported.
*/
function declares2019Dialect($schema) {
	return typeof $schema === "string" && DRAFT_2019_09_URIS.has($schema.replace(/#$/, ""));
}
//#endregion
//#region node_modules/@modelcontextprotocol/client/dist/src-WCy6ifGf.mjs
/**
* Cross-bundle `instanceof` support for the SDK error classes.
*
* `@modelcontextprotocol/client` and `@modelcontextprotocol/server` each bundle their
* own copy of `core-internal`, so an error constructed by one package fails a
* prototype-identity `instanceof` against the same class re-exported by the other —
* exactly the check a dual-role process (gateway, host, in-process test) writes.
*
* Instead of prototype identity, branded classes stamp every instance with the brand
* strings of its class chain under a registry symbol (`Symbol.for`, shared across
* bundles and realms), and resolve `instanceof` via `Symbol.hasInstance` against the
* brand set. Ordinary prototype-based `instanceof` is kept as a fallback so behavior
* is unchanged for anything unbranded.
*
* A class participates by defining an **own** `mcpBrand` static (via a `static {}`
* block, so nothing reaches the declaration files — a declared `protected static`
* field would make the constructor types nominally incompatible across the bundled
* copies) and (for hierarchy roots) installing {@linkcode brandedHasInstance} as
* `Symbol.hasInstance`. User-defined subclasses that do not declare their own brand
* keep plain prototype semantics — a foreign base-class instance never satisfies
* `instanceof UserSubclass`.
*
* Prior art — the same stamp-and-hook shape ships at scale elsewhere: Node core
* (stream.Writable since 2017, Console via a marker symbol, diagnostics_channel),
* undici's whole error hierarchy (vendored into Node as fetch), googleapis/gaxios
* (GaxiosError, Symbol.for marker), AWS SDK v3's ServiceException (which pairs a
* Symbol.hasInstance override with a static isInstance guard, as we do), and zod v4
* (Symbol.hasInstance on every schema class for cross-version interop).
*
* Contract notes:
* - Participation criterion: **every error class exported from a public package that
*   callers are documented to `instanceof` must be branded.** The per-package
*   errorBrandConformance tests walk the export surfaces and fail naming any
*   exported Error subclass that has not opted in.
* - Brands assert **identity, not shape**: brand strings are version-less, so an
*   instance from one SDK version matches the class of another. Members added to a
*   branded class in a later version may be absent on a matched instance — read
*   fields defensively, and treat branded classes as additive-only. The escape
*   hatch when a release must break a branded class's read contract: change that
*   class's brand string in the same release, which cleanly severs cross-version
*   matching for that class. The per-package brand pins make the rename
*   deliberate: errorSurfacePins.test.ts owns the core-internal brands, and each
*   package's errorBrandConformance test pins its package-local ones.
* - Cross-bundle matching requires **both** copies to be at or after the release
*   that introduced branding; against an older copy, behavior degrades to plain
*   prototype `instanceof` in both directions.
* - A consumer re-bundling the SDK with property mangling (`mangle.props`) would
*   break the brand statics; default esbuild/webpack/terser settings do not.
*/
/** Registry symbol — identical across bundled copies and realms. */
var BRANDS = Symbol.for("mcp.sdk.errorBrands");
/**
* Stamp `instance` with the brand of every class in `ctor`'s chain that declares an
* own `mcpBrand`. Call once from the hierarchy root's constructor with `new.target` —
* subclasses inherit the stamping without touching their constructors.
*
* Constructor-time only: never stamp arbitrary objects. A stamped non-instance would
* satisfy `instanceof` while lacking the prototype members (getters like `.status`)
* that callers reach for after the check.
*/
function stampErrorBrands(instance, ctor) {
	const brands = /* @__PURE__ */ new Set();
	let current = ctor;
	while (typeof current === "function") {
		const brand = current.mcpBrand;
		if (Object.prototype.hasOwnProperty.call(current, "mcpBrand") && typeof brand === "string") brands.add(brand);
		current = Object.getPrototypeOf(current);
	}
	if (brands.size === 0) return;
	Object.defineProperty(instance, BRANDS, {
		value: brands,
		enumerable: false,
		configurable: true
	});
}
/**
* `Symbol.hasInstance` implementation for branded hierarchy roots. Matches when the
* value carries the **own** brand of the class being tested against (cross-bundle
* path), falling back to ordinary prototype-based `instanceof` otherwise.
*/
function brandedHasInstance(cls, value) {
	try {
		if (typeof value === "object" && value !== null && Object.prototype.hasOwnProperty.call(cls, "mcpBrand") && typeof cls.mcpBrand === "string" && Object.prototype.hasOwnProperty.call(value, BRANDS)) {
			const carried = value[BRANDS];
			if (carried && typeof carried.has === "function" && carried.has(cls.mcpBrand)) return true;
		}
	} catch {}
	return Function.prototype[Symbol.hasInstance].call(cls, value);
}
(class OAuthError extends Error {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.OAuthError" });
	}
	static [Symbol.hasInstance](value) {
		return brandedHasInstance(this, value);
	}
	/**
	* Brand-based type guard: equivalent to `value instanceof this`, as an
	* explicit static predicate (the axios/AWS-SDK `isInstance` style). Reads
	* the caller's own brand via `this`, so every branded subclass gets a
	* correctly-scoped guard by inheritance. Must be invoked on the class —
	* in callback position write `v => SdkError.isInstance(v)`, not
	* `.filter(SdkError.isInstance)` (detached calls throw rather than
	* silently matching nothing).
	*/
	static isInstance(value) {
		if (typeof this !== "function") throw new TypeError("isInstance must be called on the class (e.g. `SdkError.isInstance(value)`); for callbacks use `v => SdkError.isInstance(v)`");
		return brandedHasInstance(this, value);
	}
	constructor(code, message, errorUri) {
		super(message);
		this.code = code;
		this.errorUri = errorUri;
		this.name = "OAuthError";
		stampErrorBrands(this, new.target);
	}
	/**
	* Converts the error to a standard OAuth error response object.
	*/
	toResponseObject() {
		const response = {
			error: this.code,
			error_description: this.message
		};
		if (this.errorUri) response.error_uri = this.errorUri;
		return response;
	}
	/**
	* Creates an {@linkcode OAuthError} from an OAuth error response.
	*/
	static fromResponse(response) {
		return new OAuthError(response.error, response.error_description ?? response.error, response.error_uri);
	}
});
/**
* Error codes for SDK errors (local errors that never cross the wire).
* Unlike {@linkcode ProtocolErrorCode} which uses numeric JSON-RPC codes, `SdkErrorCode` uses
* descriptive string values for better developer experience.
*
* These errors are thrown locally by the SDK and are never serialized as
* JSON-RPC error responses.
*/
var SdkErrorCode = /* @__PURE__ */ function(SdkErrorCode$1) {
	/** Transport is not connected */
	SdkErrorCode$1["NotConnected"] = "NOT_CONNECTED";
	/** Transport is already connected */
	SdkErrorCode$1["AlreadyConnected"] = "ALREADY_CONNECTED";
	/** Protocol is not initialized */
	SdkErrorCode$1["NotInitialized"] = "NOT_INITIALIZED";
	/** Required capability is not supported by the remote side */
	SdkErrorCode$1["CapabilityNotSupported"] = "CAPABILITY_NOT_SUPPORTED";
	/** Request timed out waiting for response */
	SdkErrorCode$1["RequestTimeout"] = "REQUEST_TIMEOUT";
	/** Connection was closed */
	SdkErrorCode$1["ConnectionClosed"] = "CONNECTION_CLOSED";
	/** Failed to send message */
	SdkErrorCode$1["SendFailed"] = "SEND_FAILED";
	/** Response result failed local schema validation */
	SdkErrorCode$1["InvalidResult"] = "INVALID_RESULT";
	/**
	* The response carried a `resultType` discriminator (protocol revision
	* 2026-07-28) naming a result kind this client cannot consume yet, e.g.
	* `input_required`. The kind is carried in `data.resultType`.
	*/
	SdkErrorCode$1["UnsupportedResultType"] = "UNSUPPORTED_RESULT_TYPE";
	/**
	* The multi-round-trip auto-fulfilment driver exhausted its round cap
	* (`inputRequired.maxRounds`) without the server returning a complete
	* result. `data.rounds` carries the cap that was hit and
	* `data.lastResult` carries the last `input_required` payload received
	* (`{ inputRequests, requestState? }`), so callers can inspect or resume
	* the flow manually.
	*/
	SdkErrorCode$1["InputRequiredRoundsExceeded"] = "INPUT_REQUIRED_ROUNDS_EXCEEDED";
	/**
	* The auto-aggregating no-`cursor` `listTools()` / `listPrompts()` /
	* `listResources()` / `listResourceTemplates()` walk hit the
	* `ClientOptions.listMaxPages` cap without the server's pagination
	* converging. `data.method` carries the list verb and
	* `data.listMaxPages` the cap that was hit; raise the cap or fall back to
	* explicit per-page `{ cursor }` calls.
	*/
	SdkErrorCode$1["ListPaginationExceeded"] = "LIST_PAGINATION_EXCEEDED";
	/**
	* The spec method being sent does not exist on the negotiated protocol
	* version's wire era (e.g. `tasks/get` toward a 2026-07-28 peer, or
	* `server/discover` toward a 2025-era peer). Raised locally, before
	* anything reaches the transport. The method and era are carried in
	* `data.method` / `data.era`.
	*/
	SdkErrorCode$1["MethodNotSupportedByProtocolVersion"] = "METHOD_NOT_SUPPORTED_BY_PROTOCOL_VERSION";
	/**
	* Protocol-era negotiation at connect time failed without producing either a
	* usable modern (2026-07-28+) era or a definitive legacy fallback signal —
	* e.g. the negotiation mode forbids falling back (`pin`), the probe hit a
	* network failure, or the server answered the probe with a 5xx (a typed
	* connect error, never an era verdict).
	*
	* Negotiation-phase only: this code is never used once an era is
	* established. Auth walls never carry it: a 401/403 rejecting the probe
	* uses {@linkcode ClientHttpAuthentication} / {@linkcode ClientHttpForbidden}
	* instead, so era-recovery flows keyed on this code (e.g. cached-verdict
	* gateways) can never persist a verdict for an unauthorized exchange.
	*/
	SdkErrorCode$1["EraNegotiationFailed"] = "ERA_NEGOTIATION_FAILED";
	SdkErrorCode$1["ClientHttpNotImplemented"] = "CLIENT_HTTP_NOT_IMPLEMENTED";
	/**
	* HTTP 401 authentication failure: the transport's re-auth retry still got
	* 401 (`Server returned 401 after re-authentication`), or the version
	* negotiation probe was rejected 401 with no `authProvider` configured
	* (`Version negotiation failed: the server requires authorization (HTTP 401)`).
	* Carried on an {@linkcode SdkHttpError} with `status: 401`.
	*/
	SdkErrorCode$1["ClientHttpAuthentication"] = "CLIENT_HTTP_AUTHENTICATION";
	/**
	* HTTP 403 denial: the step-up re-authorization retry limit was reached,
	* or the version negotiation probe was rejected 403
	* (`Version negotiation failed: the server denied access (HTTP 403)`).
	* Carried on an {@linkcode SdkHttpError} with `status: 403`.
	*/
	SdkErrorCode$1["ClientHttpForbidden"] = "CLIENT_HTTP_FORBIDDEN";
	SdkErrorCode$1["ClientHttpUnexpectedContent"] = "CLIENT_HTTP_UNEXPECTED_CONTENT";
	SdkErrorCode$1["ClientHttpFailedToOpenStream"] = "CLIENT_HTTP_FAILED_TO_OPEN_STREAM";
	SdkErrorCode$1["ClientHttpFailedToTerminateSession"] = "CLIENT_HTTP_FAILED_TO_TERMINATE_SESSION";
	return SdkErrorCode$1;
}({});
/**
* SDK errors are local errors that never cross the wire.
* They are distinct from {@linkcode ProtocolError} which represents JSON-RPC protocol errors
* that are serialized and sent as error responses.
*
* @example
* ```ts source="./sdkErrors.examples.ts#SdkError_basicUsage"
* try {
*     // Throwing an SDK error
*     throw new SdkError(SdkErrorCode.NotConnected, 'Transport is not connected');
* } catch (error) {
*     // Checking error type by code
*     if (error instanceof SdkError && error.code === SdkErrorCode.RequestTimeout) {
*         // Handle timeout
*     }
* }
* ```
*/
var SdkError = class extends Error {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.SdkError" });
	}
	static [Symbol.hasInstance](value) {
		return brandedHasInstance(this, value);
	}
	/**
	* Brand-based type guard: equivalent to `value instanceof this`, as an
	* explicit static predicate (the axios/AWS-SDK `isInstance` style). Reads
	* the caller's own brand via `this`, so every branded subclass gets a
	* correctly-scoped guard by inheritance. Must be invoked on the class —
	* in callback position write `v => SdkError.isInstance(v)`, not
	* `.filter(SdkError.isInstance)` (detached calls throw rather than
	* silently matching nothing).
	*/
	static isInstance(value) {
		if (typeof this !== "function") throw new TypeError("isInstance must be called on the class (e.g. `SdkError.isInstance(value)`); for callbacks use `v => SdkError.isInstance(v)`");
		return brandedHasInstance(this, value);
	}
	/**
	* @param code - Stable string code identifying the failure ({@linkcode SdkErrorCode}).
	* @param message - Human-readable description.
	* @param data - Optional structured payload (for example the HTTP status carried by
	* {@linkcode SdkHttpError}). Opaque to the SDK: a `cause` key inside `data` is not
	* promoted to `Error.cause`.
	* @param options - Standard `ErrorOptions`, forwarded to `Error`. Pass the underlying
	* failure as `{ cause }` so it is reachable through the `Error.cause` chain that
	* loggers and error trackers walk.
	*/
	constructor(code, message, data, options) {
		super(message, options);
		this.code = code;
		this.data = data;
		this.name = "SdkError";
		stampErrorBrands(this, new.target);
	}
};
(class extends SdkError {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.SdkHttpError" });
	}
	/**
	* @param options - Standard `ErrorOptions`, forwarded to `Error` (see {@linkcode SdkError}).
	*/
	constructor(code, message, data, options) {
		super(code, message, data, options);
		this.name = "SdkHttpError";
	}
	get status() {
		return this.data.status;
	}
	get statusText() {
		return this.data.statusText;
	}
});
/**
* The first protocol revision of the modern (2026-07-28) era. Revision identifiers
* are ISO dates, so lexicographic comparison orders them chronologically.
*/
var FIRST_MODERN_PROTOCOL_VERSION = "2026-07-28";
/** Whether the given protocol revision belongs to the modern (2026-07-28+) era. */
function isModernProtocolVersion(version) {
	return version >= FIRST_MODERN_PROTOCOL_VERSION;
}
/**
* SEP-2106 §4.3 TextContent auto-append, era-agnostic, called from BOTH
* codecs' {@link WireCodec.projectCallToolResult}: when `structuredContent`
* is a non-object value (array/primitive/`null`) and the handler authored no
* `type:'text'` block, append `{type:'text', text: JSON.stringify(value)}`.
* Object-shaped (or absent) `structuredContent` returns the same reference.
*
* Leaf module: imported by both era codec modules, so it must NOT import from
* `./codec.js` (which value-imports the rev codecs at top level — that would
* make a runtime cycle and a TDZ hazard for entries that evaluate a rev codec
* module first).
*/
function appendTextFallbackForNonObject(result) {
	const sc = result.structuredContent;
	if (sc === void 0) return result;
	if (!(typeof sc !== "object" || sc === null || Array.isArray(sc))) return result;
	if (result.content?.some((c) => c.type === "text") ?? false) return result;
	return {
		...result,
		content: [...result.content ?? [], {
			type: "text",
			text: JSON.stringify(sc)
		}]
	};
}
/**
* Result-family keys that must never default into a `{content: []}` tools/call
* success. Shared by the 2025 wire-seam schema and server normalization.
* Leaf module (like `textFallback.ts`): imported by registry/server paths, so
* it must NOT import from `./codec.js` — that would close a runtime cycle.
*/
var TOOL_RESULT_FOREIGN_FAMILY_KEYS = [
	"task",
	"inputRequests",
	"requestState"
];
/**
* Single owner of the v1-parity ruling: a plain-object tool result without `content` (and
* without foreign-family keys) gains `content: []`. Shared by the 2025 wire seam and server-side handler normalization.
*/
function normalizeContentlessToolResult(value) {
	if (value === null || typeof value !== "object" || Array.isArray(value) || value.content !== void 0 || TOOL_RESULT_FOREIGN_FAMILY_KEYS.some((key) => key in value)) return value;
	return {
		...value,
		content: []
	};
}
/**
* Complete frozen 2025-11-25 wire schemas. Self-contained — no imports from
* the public/neutral types/schemas.ts. The neutral layer is the public-API
* superset and is free to evolve (e.g., SEP-2106 widening); this file is the
* 2025 wire-parse contract (Q10-L2 byte-identity) and is BEHAVIOR-FROZEN.
*
* This is the era's complete frozen wire-parse contract — both the 2025-only
* delta (the deprecated task family, the era role unions) AND frozen copies of
* every era-shared shape (Tool, CallToolResult, Initialize*, ContentBlock,
* prompts/resources/completion/elicitation, …). The 2026-era codec
* (`wire/rev2026-07-28/`) is symmetrically self-contained in the same way.
*
* The 2025-only delta (the task message surface, restored types-only by #2248
* for interop with task-capable 2025 peers) is parsed ONLY through this era's
* registry; the deprecated Task* schemas also live (marked `@deprecated`) in
* the neutral schema layer so the public types stay nameable without a
* cross-layer import — nameability is constant, runtime availability is
* version-keyed — but appear in no API signature. Q1 increment 2 — deletions
* are physical: the
* 2026-era REGISTRY has no Task* methods (its frozen building-block copies do
* carry the deprecated Task* sub-schemas by composition — soft contamination,
* tracked for anchor-exactness adjudication).
*
* The only cross-layer dependency is `import type { JSONObject, JSONValue }`
* from the neutral types barrel — pure structural type aliases with no parse
* behavior. No runtime schema is shared with the neutral layer.
*/
function build$1() {
	const JSONValueSchema$1 = lazy(() => union([
		string(),
		number(),
		boolean(),
		_null(),
		record(string(), JSONValueSchema$1),
		array(JSONValueSchema$1)
	]));
	const JSONObjectSchema$1 = record(string(), JSONValueSchema$1);
	/**
	* A progress token, used to associate progress notifications with the original request.
	*/
	const ProgressTokenSchema$1 = union([string(), number().int()]);
	/**
	* An opaque token used to represent a cursor for pagination.
	*/
	const CursorSchema$1 = string();
	/** @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only. */
	const TaskMetadataSchema$1 = object({ ttl: number().optional() });
	/**
	* Metadata for associating messages with a task.
	* Include this in the `_meta` field under the key `io.modelcontextprotocol/related-task`.
	*
	* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
	*/
	const RelatedTaskMetadataSchema$1 = object({ taskId: string() });
	const RequestMetaSchema$1 = looseObject({
		progressToken: ProgressTokenSchema$1.optional(),
		"io.modelcontextprotocol/related-task": RelatedTaskMetadataSchema$1.optional()
	});
	/**
	* Common params for any request.
	*/
	const BaseRequestParamsSchema$1 = object({ _meta: RequestMetaSchema$1.optional() });
	/**
	* Common params for any task-augmented request.
	*
	* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
	*/
	const TaskAugmentedRequestParamsSchema$1 = BaseRequestParamsSchema$1.extend({ task: TaskMetadataSchema$1.optional() });
	const RequestSchema$1 = object({
		method: string(),
		params: BaseRequestParamsSchema$1.loose().optional()
	});
	const NotificationsParamsSchema$1 = object({ _meta: RequestMetaSchema$1.optional() });
	const NotificationSchema$1 = object({
		method: string(),
		params: NotificationsParamsSchema$1.loose().optional()
	});
	const ResultSchema$1 = looseObject({ _meta: RequestMetaSchema$1.optional() });
	/**
	* A uniquely identifying ID for a request in JSON-RPC.
	*/
	const RequestIdSchema$1 = union([string(), number().int()]);
	/**
	* A response that indicates success but carries no data.
	*/
	const EmptyResultSchema$1 = ResultSchema$1.strict();
	const CancelledNotificationParamsSchema$1 = NotificationsParamsSchema$1.extend({
		requestId: RequestIdSchema$1.optional(),
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
	const CancelledNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/cancelled"),
		params: CancelledNotificationParamsSchema$1
	});
	/**
	* Icon schema for use in {@link Tool | tools}, {@link Prompt | prompts}, {@link Resource | resources}, and {@link Implementation | implementations}.
	*/
	const IconSchema$1 = object({
		src: string(),
		mimeType: string().optional(),
		sizes: array(string()).optional(),
		theme: _enum(["light", "dark"]).optional()
	});
	/**
	* Base schema to add `icons` property.
	*
	*/
	const IconsSchema$1 = object({ icons: array(IconSchema$1).optional() });
	/**
	* Base metadata interface for common properties across {@link Resource | resources}, {@link Tool | tools}, {@link Prompt | prompts}, and {@link Implementation | implementations}.
	*/
	const BaseMetadataSchema$1 = object({
		name: string(),
		title: string().optional()
	});
	/**
	* Describes the name and version of an MCP implementation.
	*/
	const ImplementationSchema$1 = BaseMetadataSchema$1.extend({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		version: string(),
		websiteUrl: string().optional(),
		description: string().optional()
	});
	const ElicitationCapabilitySchema = preprocess((value) => {
		if (value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) return { form: {} };
		return value;
	}, intersection(object({
		form: intersection(object({ applyDefaults: boolean().optional() }), JSONObjectSchema$1).optional(),
		url: JSONObjectSchema$1.optional()
	}), JSONObjectSchema$1.optional()));
	/**
	* Task capabilities for clients, indicating which request types support task creation.
	*
	* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
	*/
	const ClientTasksCapabilitySchema$1 = looseObject({
		list: JSONObjectSchema$1.optional(),
		cancel: JSONObjectSchema$1.optional(),
		requests: looseObject({
			sampling: looseObject({ createMessage: JSONObjectSchema$1.optional() }).optional(),
			elicitation: looseObject({ create: JSONObjectSchema$1.optional() }).optional()
		}).optional()
	});
	/**
	* Task capabilities for servers, indicating which request types support task creation.
	*
	* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
	*/
	const ServerTasksCapabilitySchema$1 = looseObject({
		list: JSONObjectSchema$1.optional(),
		cancel: JSONObjectSchema$1.optional(),
		requests: looseObject({ tools: looseObject({ call: JSONObjectSchema$1.optional() }).optional() }).optional()
	});
	/**
	* Capabilities a client may support. Known capabilities are defined here, in this schema, but this is not a closed set: any client can define its own, additional capabilities.
	*/
	const ClientCapabilitiesSchema$1 = object({
		experimental: record(string(), JSONObjectSchema$1).optional(),
		sampling: object({
			context: JSONObjectSchema$1.optional(),
			tools: JSONObjectSchema$1.optional()
		}).optional(),
		elicitation: ElicitationCapabilitySchema.optional(),
		roots: object({ listChanged: boolean().optional() }).optional(),
		tasks: ClientTasksCapabilitySchema$1.optional(),
		extensions: record(string(), JSONObjectSchema$1).optional()
	});
	const InitializeRequestParamsSchema$1 = BaseRequestParamsSchema$1.extend({
		protocolVersion: string(),
		capabilities: ClientCapabilitiesSchema$1,
		clientInfo: ImplementationSchema$1
	});
	/**
	* This request is sent from the client to the server when it first connects, asking it to begin initialization.
	*/
	const InitializeRequestSchema$1 = RequestSchema$1.extend({
		method: literal("initialize"),
		params: InitializeRequestParamsSchema$1
	});
	/**
	* Capabilities that a server may support. Known capabilities are defined here, in this schema, but this is not a closed set: any server can define its own, additional capabilities.
	*/
	const ServerCapabilitiesSchema$1 = object({
		experimental: record(string(), JSONObjectSchema$1).optional(),
		logging: JSONObjectSchema$1.optional(),
		completions: JSONObjectSchema$1.optional(),
		prompts: object({ listChanged: boolean().optional() }).optional(),
		resources: object({
			subscribe: boolean().optional(),
			listChanged: boolean().optional()
		}).optional(),
		tools: object({ listChanged: boolean().optional() }).optional(),
		tasks: ServerTasksCapabilitySchema$1.optional(),
		extensions: record(string(), JSONObjectSchema$1).optional()
	});
	/**
	* After receiving an initialize request from the client, the server sends this response.
	*/
	const InitializeResultSchema$1 = ResultSchema$1.extend({
		protocolVersion: string(),
		capabilities: ServerCapabilitiesSchema$1,
		serverInfo: ImplementationSchema$1,
		instructions: string().optional()
	});
	/**
	* This notification is sent from the client to the server after initialization has finished.
	*/
	const InitializedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/initialized"),
		params: NotificationsParamsSchema$1.optional()
	});
	/**
	* A ping, issued by either the server or the client, to check that the other party is still alive. The receiver must promptly respond, or else may be disconnected.
	*/
	const PingRequestSchema$1 = RequestSchema$1.extend({
		method: literal("ping"),
		params: BaseRequestParamsSchema$1.optional()
	});
	const ProgressSchema$1 = object({
		progress: number(),
		total: optional(number()),
		message: optional(string())
	});
	const ProgressNotificationParamsSchema$1 = object({
		...NotificationsParamsSchema$1.shape,
		...ProgressSchema$1.shape,
		progressToken: ProgressTokenSchema$1
	});
	/**
	* An out-of-band notification used to inform the receiver of a progress update for a long-running request.
	*
	* @category notifications/progress
	*/
	const ProgressNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/progress"),
		params: ProgressNotificationParamsSchema$1
	});
	const PaginatedRequestParamsSchema$1 = BaseRequestParamsSchema$1.extend({ cursor: CursorSchema$1.optional() });
	const PaginatedRequestSchema$1 = RequestSchema$1.extend({ params: PaginatedRequestParamsSchema$1.optional() });
	const PaginatedResultSchema$1 = ResultSchema$1.extend({ nextCursor: CursorSchema$1.optional() });
	/**
	* The contents of a specific resource or sub-resource.
	*/
	const ResourceContentsSchema$1 = object({
		uri: string(),
		mimeType: optional(string()),
		_meta: record(string(), unknown()).optional()
	});
	const TextResourceContentsSchema$1 = ResourceContentsSchema$1.extend({ text: string() });
	/**
	* A Zod schema for validating Base64 strings that is more performant and
	* robust for very large inputs than the default regex-based check. It avoids
	* stack overflows by using the native `atob` function for validation.
	*/
	const Base64Schema = string().refine((val) => {
		try {
			atob(val);
			return true;
		} catch {
			return false;
		}
	}, { message: "Invalid Base64 string" });
	const BlobResourceContentsSchema$1 = ResourceContentsSchema$1.extend({ blob: Base64Schema });
	/**
	* The sender or recipient of messages and data in a conversation.
	*/
	const RoleSchema$1 = _enum(["user", "assistant"]);
	/**
	* Optional annotations providing clients additional context about a resource.
	*/
	const AnnotationsSchema$1 = object({
		audience: array(RoleSchema$1).optional(),
		priority: number().min(0).max(1).optional(),
		lastModified: datetime({ offset: true }).optional()
	});
	/**
	* A known resource that the server is capable of reading.
	*/
	const ResourceSchema$1 = object({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		uri: string(),
		description: optional(string()),
		mimeType: optional(string()),
		size: optional(number()),
		annotations: AnnotationsSchema$1.optional(),
		_meta: optional(looseObject({}))
	});
	/**
	* A template description for resources available on the server.
	*/
	const ResourceTemplateSchema$1 = object({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		uriTemplate: string(),
		description: optional(string()),
		mimeType: optional(string()),
		annotations: AnnotationsSchema$1.optional(),
		_meta: optional(looseObject({}))
	});
	/**
	* Sent from the client to request a list of resources the server has.
	*/
	const ListResourcesRequestSchema$1 = PaginatedRequestSchema$1.extend({ method: literal("resources/list") });
	/**
	* The server's response to a {@linkcode ListResourcesRequest | resources/list} request from the client.
	*/
	const ListResourcesResultSchema$1 = PaginatedResultSchema$1.extend({ resources: array(ResourceSchema$1) });
	/**
	* Sent from the client to request a list of resource templates the server has.
	*/
	const ListResourceTemplatesRequestSchema$1 = PaginatedRequestSchema$1.extend({ method: literal("resources/templates/list") });
	/**
	* The server's response to a {@linkcode ListResourceTemplatesRequest | resources/templates/list} request from the client.
	*/
	const ListResourceTemplatesResultSchema$1 = PaginatedResultSchema$1.extend({ resourceTemplates: array(ResourceTemplateSchema$1) });
	const ResourceRequestParamsSchema$1 = BaseRequestParamsSchema$1.extend({ uri: string() });
	/**
	* Parameters for a {@linkcode ReadResourceRequest | resources/read} request.
	*/
	const ReadResourceRequestParamsSchema$1 = ResourceRequestParamsSchema$1;
	/**
	* Sent from the client to the server, to read a specific resource URI.
	*/
	const ReadResourceRequestSchema$1 = RequestSchema$1.extend({
		method: literal("resources/read"),
		params: ReadResourceRequestParamsSchema$1
	});
	/**
	* The server's response to a {@linkcode ReadResourceRequest | resources/read} request from the client.
	*/
	const ReadResourceResultSchema$1 = ResultSchema$1.extend({ contents: array(union([TextResourceContentsSchema$1, BlobResourceContentsSchema$1])) });
	/**
	* An optional notification from the server to the client, informing it that the list of resources it can read from has changed. This may be issued by servers without any previous subscription from the client.
	*/
	const ResourceListChangedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/resources/list_changed"),
		params: NotificationsParamsSchema$1.optional()
	});
	const SubscribeRequestParamsSchema$1 = ResourceRequestParamsSchema$1;
	/**
	* Sent from the client to request `resources/updated` notifications from the server whenever a particular resource changes.
	*/
	const SubscribeRequestSchema$1 = RequestSchema$1.extend({
		method: literal("resources/subscribe"),
		params: SubscribeRequestParamsSchema$1
	});
	const UnsubscribeRequestParamsSchema$1 = ResourceRequestParamsSchema$1;
	/**
	* Sent from the client to request cancellation of {@linkcode ResourceUpdatedNotification | resources/updated} notifications from the server. This should follow a previous {@linkcode SubscribeRequest | resources/subscribe} request.
	*/
	const UnsubscribeRequestSchema$1 = RequestSchema$1.extend({
		method: literal("resources/unsubscribe"),
		params: UnsubscribeRequestParamsSchema$1
	});
	/**
	* Parameters for a {@linkcode ResourceUpdatedNotification | notifications/resources/updated} notification.
	*/
	const ResourceUpdatedNotificationParamsSchema$1 = NotificationsParamsSchema$1.extend({ uri: string() });
	/**
	* A notification from the server to the client, informing it that a resource has changed and may need to be read again. This should only be sent if the client previously sent a {@linkcode SubscribeRequest | resources/subscribe} request.
	*/
	const ResourceUpdatedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/resources/updated"),
		params: ResourceUpdatedNotificationParamsSchema$1
	});
	/**
	* Describes an argument that a prompt can accept.
	*/
	const PromptArgumentSchema$1 = object({
		name: string(),
		description: optional(string()),
		required: optional(boolean())
	});
	/**
	* A prompt or prompt template that the server offers.
	*/
	const PromptSchema$1 = object({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		description: optional(string()),
		arguments: optional(array(PromptArgumentSchema$1)),
		_meta: optional(looseObject({}))
	});
	/**
	* Sent from the client to request a list of prompts and prompt templates the server has.
	*/
	const ListPromptsRequestSchema$1 = PaginatedRequestSchema$1.extend({ method: literal("prompts/list") });
	/**
	* The server's response to a {@linkcode ListPromptsRequest | prompts/list} request from the client.
	*/
	const ListPromptsResultSchema$1 = PaginatedResultSchema$1.extend({ prompts: array(PromptSchema$1) });
	/**
	* Parameters for a {@linkcode GetPromptRequest | prompts/get} request.
	*/
	const GetPromptRequestParamsSchema$1 = BaseRequestParamsSchema$1.extend({
		name: string(),
		arguments: record(string(), string()).optional()
	});
	/**
	* Used by the client to get a prompt provided by the server.
	*/
	const GetPromptRequestSchema$1 = RequestSchema$1.extend({
		method: literal("prompts/get"),
		params: GetPromptRequestParamsSchema$1
	});
	/**
	* Text provided to or from an LLM.
	*/
	const TextContentSchema$1 = object({
		type: literal("text"),
		text: string(),
		annotations: AnnotationsSchema$1.optional(),
		_meta: record(string(), unknown()).optional()
	});
	/**
	* An image provided to or from an LLM.
	*/
	const ImageContentSchema$1 = object({
		type: literal("image"),
		data: Base64Schema,
		mimeType: string(),
		annotations: AnnotationsSchema$1.optional(),
		_meta: record(string(), unknown()).optional()
	});
	/**
	* Audio content provided to or from an LLM.
	*/
	const AudioContentSchema$1 = object({
		type: literal("audio"),
		data: Base64Schema,
		mimeType: string(),
		annotations: AnnotationsSchema$1.optional(),
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
	const ToolUseContentSchema$1 = object({
		type: literal("tool_use"),
		name: string(),
		id: string(),
		input: record(string(), unknown()),
		_meta: record(string(), unknown()).optional()
	});
	/**
	* The contents of a resource, embedded into a prompt or tool call result.
	*/
	const EmbeddedResourceSchema$1 = object({
		type: literal("resource"),
		resource: union([TextResourceContentsSchema$1, BlobResourceContentsSchema$1]),
		annotations: AnnotationsSchema$1.optional(),
		_meta: record(string(), unknown()).optional()
	});
	/**
	* A resource that the server is capable of reading, included in a prompt or tool call result.
	*
	* Note: resource links returned by tools are not guaranteed to appear in the results of {@linkcode ListResourcesRequest | resources/list} requests.
	*/
	const ResourceLinkSchema$1 = ResourceSchema$1.extend({ type: literal("resource_link") });
	/**
	* A content block that can be used in prompts and tool results.
	*/
	const ContentBlockSchema$1 = union([
		TextContentSchema$1,
		ImageContentSchema$1,
		AudioContentSchema$1,
		ResourceLinkSchema$1,
		EmbeddedResourceSchema$1
	]);
	/**
	* Describes a message returned as part of a prompt.
	*/
	const PromptMessageSchema$1 = object({
		role: RoleSchema$1,
		content: ContentBlockSchema$1
	});
	/**
	* The server's response to a {@linkcode GetPromptRequest | prompts/get} request from the client.
	*/
	const GetPromptResultSchema$1 = ResultSchema$1.extend({
		description: string().optional(),
		messages: array(PromptMessageSchema$1)
	});
	/**
	* An optional notification from the server to the client, informing it that the list of prompts it offers has changed. This may be issued by servers without any previous subscription from the client.
	*/
	const PromptListChangedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/prompts/list_changed"),
		params: NotificationsParamsSchema$1.optional()
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
	const ToolAnnotationsSchema$1 = object({
		title: string().optional(),
		readOnlyHint: boolean().optional(),
		destructiveHint: boolean().optional(),
		idempotentHint: boolean().optional(),
		openWorldHint: boolean().optional()
	});
	/**
	* Execution-related properties for a tool.
	*/
	const ToolExecutionSchema$1 = object({ taskSupport: _enum([
		"required",
		"optional",
		"forbidden"
	]).optional() });
	/**
	* Definition for a tool the client can call.
	*/
	const ToolSchema$1 = object({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		description: string().optional(),
		inputSchema: object({
			type: literal("object"),
			properties: record(string(), JSONValueSchema$1).optional(),
			required: array(string()).optional()
		}).catchall(unknown()),
		outputSchema: object({
			type: literal("object"),
			properties: record(string(), JSONValueSchema$1).optional(),
			required: array(string()).optional()
		}).catchall(unknown()).optional(),
		annotations: ToolAnnotationsSchema$1.optional(),
		execution: ToolExecutionSchema$1.optional(),
		_meta: record(string(), unknown()).optional()
	});
	/**
	* Sent from the client to request a list of tools the server has.
	*/
	const ListToolsRequestSchema$1 = PaginatedRequestSchema$1.extend({ method: literal("tools/list") });
	/**
	* The server's response to a {@linkcode ListToolsRequest | tools/list} request from the client.
	*/
	const ListToolsResultSchema$1 = PaginatedResultSchema$1.extend({ tools: array(ToolSchema$1) });
	/**
	* The server's response to a tool call.
	*/
	const CallToolResultSchema$1 = ResultSchema$1.extend({
		content: array(ContentBlockSchema$1),
		structuredContent: record(string(), unknown()).optional(),
		isError: boolean().optional()
	});
	/**
	* Parameters for a `tools/call` request.
	*/
	const CallToolRequestParamsSchema$1 = TaskAugmentedRequestParamsSchema$1.extend({
		name: string(),
		arguments: record(string(), unknown()).optional()
	});
	/**
	* Used by the client to invoke a tool provided by the server.
	*/
	const CallToolRequestSchema$1 = RequestSchema$1.extend({
		method: literal("tools/call"),
		params: CallToolRequestParamsSchema$1
	});
	/**
	* An optional notification from the server to the client, informing it that the list of tools it offers has changed. This may be issued by servers without any previous subscription from the client.
	*/
	const ToolListChangedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/tools/list_changed"),
		params: NotificationsParamsSchema$1.optional()
	});
	/**
	* The severity of a log message.
	*
	* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
	* in the specification for at least twelve months. Migrate to stderr logging
	* (STDIO servers) or OpenTelemetry.
	*/
	const LoggingLevelSchema$1 = _enum([
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
	const SetLevelRequestParamsSchema$1 = BaseRequestParamsSchema$1.extend({ level: LoggingLevelSchema$1 });
	/**
	* A request from the client to the server, to enable or adjust logging.
	*
	* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
	* in the specification for at least twelve months. Migrate to stderr logging
	* (STDIO servers) or OpenTelemetry.
	*/
	const SetLevelRequestSchema$1 = RequestSchema$1.extend({
		method: literal("logging/setLevel"),
		params: SetLevelRequestParamsSchema$1
	});
	/**
	* Parameters for a `notifications/message` notification.
	*
	* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
	* in the specification for at least twelve months. Migrate to stderr logging
	* (STDIO servers) or OpenTelemetry.
	*/
	const LoggingMessageNotificationParamsSchema$1 = NotificationsParamsSchema$1.extend({
		level: LoggingLevelSchema$1,
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
	const LoggingMessageNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/message"),
		params: LoggingMessageNotificationParamsSchema$1
	});
	/**
	* Hints to use for model selection.
	*
	* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
	* in the specification for at least twelve months. Migrate to calling LLM
	* provider APIs directly.
	*/
	const ModelHintSchema$1 = object({ name: string().optional() });
	/**
	* The server's preferences for model selection, requested of the client during sampling.
	*
	* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
	* in the specification for at least twelve months. Migrate to calling LLM
	* provider APIs directly.
	*/
	const ModelPreferencesSchema$1 = object({
		hints: array(ModelHintSchema$1).optional(),
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
	const ToolChoiceSchema$1 = object({ mode: _enum([
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
	const ToolResultContentSchema$1 = object({
		type: literal("tool_result"),
		toolUseId: string().describe("The unique identifier for the corresponding tool call."),
		content: array(ContentBlockSchema$1),
		structuredContent: object({}).loose().optional(),
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
	const SamplingContentSchema$1 = discriminatedUnion("type", [
		TextContentSchema$1,
		ImageContentSchema$1,
		AudioContentSchema$1
	]);
	/**
	* Content block types allowed in sampling messages.
	* This includes text, image, audio, tool use requests, and tool results.
	*
	* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
	* in the specification for at least twelve months. Migrate to calling LLM
	* provider APIs directly.
	*/
	const SamplingMessageContentBlockSchema$1 = discriminatedUnion("type", [
		TextContentSchema$1,
		ImageContentSchema$1,
		AudioContentSchema$1,
		ToolUseContentSchema$1,
		ToolResultContentSchema$1
	]);
	/**
	* Describes a message issued to or received from an LLM API.
	*
	* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
	* in the specification for at least twelve months. Migrate to calling LLM
	* provider APIs directly.
	*/
	const SamplingMessageSchema$1 = object({
		role: RoleSchema$1,
		content: union([SamplingMessageContentBlockSchema$1, array(SamplingMessageContentBlockSchema$1)]),
		_meta: record(string(), unknown()).optional()
	});
	/**
	* Parameters for a `sampling/createMessage` request.
	*
	* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
	* in the specification for at least twelve months. Migrate to calling LLM
	* provider APIs directly.
	*/
	const CreateMessageRequestParamsSchema$1 = TaskAugmentedRequestParamsSchema$1.extend({
		messages: array(SamplingMessageSchema$1),
		modelPreferences: ModelPreferencesSchema$1.optional(),
		systemPrompt: string().optional(),
		includeContext: _enum([
			"none",
			"thisServer",
			"allServers"
		]).optional(),
		temperature: number().optional(),
		maxTokens: number().int(),
		stopSequences: array(string()).optional(),
		metadata: JSONObjectSchema$1.optional(),
		tools: array(ToolSchema$1).optional(),
		toolChoice: ToolChoiceSchema$1.optional()
	});
	/**
	* A request from the server to sample an LLM via the client. The client has full discretion over which model to select. The client should also inform the user before beginning sampling, to allow them to inspect the request (human in the loop) and decide whether to approve it.
	*
	* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
	* in the specification for at least twelve months. Migrate to calling LLM
	* provider APIs directly.
	*/
	const CreateMessageRequestSchema$1 = RequestSchema$1.extend({
		method: literal("sampling/createMessage"),
		params: CreateMessageRequestParamsSchema$1
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
	const CreateMessageResultSchema$1 = ResultSchema$1.extend({
		model: string(),
		stopReason: optional(_enum([
			"endTurn",
			"stopSequence",
			"maxTokens"
		]).or(string())),
		role: RoleSchema$1,
		content: SamplingContentSchema$1
	});
	/**
	* The client's response to a `sampling/create_message` request when tools were provided.
	* This version supports array content for tool use flows.
	*
	* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
	* in the specification for at least twelve months. Migrate to calling LLM
	* provider APIs directly.
	*/
	const CreateMessageResultWithToolsSchema$1 = ResultSchema$1.extend({
		model: string(),
		stopReason: optional(_enum([
			"endTurn",
			"stopSequence",
			"maxTokens",
			"toolUse"
		]).or(string())),
		role: RoleSchema$1,
		content: union([SamplingMessageContentBlockSchema$1, array(SamplingMessageContentBlockSchema$1)])
	});
	/**
	* Primitive schema definition for boolean fields.
	*/
	const BooleanSchemaSchema$1 = object({
		type: literal("boolean"),
		title: string().optional(),
		description: string().optional(),
		default: boolean().optional()
	});
	/**
	* Primitive schema definition for string fields.
	*/
	const StringSchemaSchema$1 = object({
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
	const NumberSchemaSchema$1 = object({
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
	const UntitledSingleSelectEnumSchemaSchema$1 = object({
		type: literal("string"),
		title: string().optional(),
		description: string().optional(),
		enum: array(string()),
		default: string().optional()
	});
	/**
	* Schema for single-selection enumeration with display titles for each option.
	*/
	const TitledSingleSelectEnumSchemaSchema$1 = object({
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
	const LegacyTitledEnumSchemaSchema$1 = object({
		type: literal("string"),
		title: string().optional(),
		description: string().optional(),
		enum: array(string()),
		enumNames: array(string()).optional(),
		default: string().optional()
	});
	const SingleSelectEnumSchemaSchema$1 = union([UntitledSingleSelectEnumSchemaSchema$1, TitledSingleSelectEnumSchemaSchema$1]);
	/**
	* Schema for multiple-selection enumeration without display titles for options.
	*/
	const UntitledMultiSelectEnumSchemaSchema$1 = object({
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
	const TitledMultiSelectEnumSchemaSchema$1 = object({
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
	const MultiSelectEnumSchemaSchema$1 = union([UntitledMultiSelectEnumSchemaSchema$1, TitledMultiSelectEnumSchemaSchema$1]);
	/**
	* Primitive schema definition for enum fields.
	*/
	const EnumSchemaSchema$1 = union([
		LegacyTitledEnumSchemaSchema$1,
		SingleSelectEnumSchemaSchema$1,
		MultiSelectEnumSchemaSchema$1
	]);
	/**
	* Union of all primitive schema definitions.
	*/
	const PrimitiveSchemaDefinitionSchema$1 = union([
		EnumSchemaSchema$1,
		BooleanSchemaSchema$1,
		StringSchemaSchema$1,
		NumberSchemaSchema$1
	]);
	/**
	* Parameters for an `elicitation/create` request for form-based elicitation.
	*/
	const ElicitRequestFormParamsSchema$1 = TaskAugmentedRequestParamsSchema$1.extend({
		mode: literal("form").optional(),
		message: string(),
		requestedSchema: object({
			type: literal("object"),
			properties: record(string(), PrimitiveSchemaDefinitionSchema$1),
			required: array(string()).optional()
		}).catchall(unknown())
	});
	/**
	* Parameters for an {@linkcode ElicitRequest | elicitation/create} request for URL-based elicitation.
	*/
	const ElicitRequestURLParamsSchema$1 = TaskAugmentedRequestParamsSchema$1.extend({
		mode: literal("url"),
		message: string(),
		elicitationId: string(),
		url: string().url()
	});
	/**
	* The parameters for a request to elicit additional information from the user via the client.
	*/
	const ElicitRequestParamsSchema$1 = union([ElicitRequestFormParamsSchema$1, ElicitRequestURLParamsSchema$1]);
	/**
	* A request from the server to elicit user input via the client.
	* The client should present the message and form fields to the user (form mode)
	* or navigate to a URL (URL mode).
	*/
	const ElicitRequestSchema$1 = RequestSchema$1.extend({
		method: literal("elicitation/create"),
		params: ElicitRequestParamsSchema$1
	});
	/**
	* Parameters for a {@linkcode ElicitationCompleteNotification | notifications/elicitation/complete} notification.
	*
	* @category notifications/elicitation/complete
	*/
	const ElicitationCompleteNotificationParamsSchema$1 = NotificationsParamsSchema$1.extend({ elicitationId: string() });
	/**
	* A notification from the server to the client, informing it of a completion of an out-of-band elicitation request.
	*
	* @category notifications/elicitation/complete
	*/
	const ElicitationCompleteNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/elicitation/complete"),
		params: ElicitationCompleteNotificationParamsSchema$1
	});
	/**
	* The client's response to an {@linkcode ElicitRequest | elicitation/create} request from the server.
	*/
	const ElicitResultSchema$1 = ResultSchema$1.extend({
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
	const ResourceTemplateReferenceSchema$1 = object({
		type: literal("ref/resource"),
		uri: string()
	});
	/**
	* Identifies a prompt.
	*/
	const PromptReferenceSchema$1 = object({
		type: literal("ref/prompt"),
		name: string()
	});
	/**
	* Parameters for a {@linkcode CompleteRequest | completion/complete} request.
	*/
	const CompleteRequestParamsSchema$1 = BaseRequestParamsSchema$1.extend({
		ref: union([PromptReferenceSchema$1, ResourceTemplateReferenceSchema$1]),
		argument: object({
			name: string(),
			value: string()
		}),
		context: object({ arguments: record(string(), string()).optional() }).optional()
	});
	/**
	* A request from the client to the server, to ask for completion options.
	*/
	const CompleteRequestSchema$1 = RequestSchema$1.extend({
		method: literal("completion/complete"),
		params: CompleteRequestParamsSchema$1
	});
	/**
	* The server's response to a {@linkcode CompleteRequest | completion/complete} request
	*/
	const CompleteResultSchema$1 = ResultSchema$1.extend({ completion: looseObject({
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
	const RootSchema$1 = object({
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
	const ListRootsRequestSchema$1 = RequestSchema$1.extend({
		method: literal("roots/list"),
		params: BaseRequestParamsSchema$1.optional()
	});
	/**
	* The client's response to a `roots/list` request from the server.
	*
	* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
	* in the specification for at least twelve months. Migrate to passing paths via
	* tool parameters, resource URIs, or configuration.
	*/
	const ListRootsResultSchema$1 = ResultSchema$1.extend({ roots: array(RootSchema$1) });
	/**
	* A notification from the client to the server, informing it that the list of roots has changed.
	*
	* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577); remains
	* in the specification for at least twelve months. Migrate to passing paths via
	* tool parameters, resource URIs, or configuration.
	*/
	const RootsListChangedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/roots/list_changed"),
		params: NotificationsParamsSchema$1.optional()
	});
	/**
	* Task creation parameters, used to ask that the server create a task to represent a request.
	*
	* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
	*/
	const TaskCreationParamsSchema$1 = looseObject({
		ttl: number().optional(),
		pollInterval: number().optional()
	});
	/**
	* The status of a task.
	*
	* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
	*/
	const TaskStatusSchema$1 = _enum([
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
	const TaskSchema$1 = object({
		taskId: string(),
		status: TaskStatusSchema$1,
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
	const CreateTaskResultSchema$1 = ResultSchema$1.extend({ task: TaskSchema$1 });
	/**
	* Parameters for task status notification.
	*
	* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
	*/
	const TaskStatusNotificationParamsSchema$1 = NotificationsParamsSchema$1.merge(TaskSchema$1);
	/**
	* A notification sent when a task's status changes.
	*
	* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
	*/
	const TaskStatusNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/tasks/status"),
		params: TaskStatusNotificationParamsSchema$1
	});
	/**
	* A request to get the state of a specific task.
	*
	* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
	*/
	const GetTaskRequestSchema$1 = RequestSchema$1.extend({
		method: literal("tasks/get"),
		params: BaseRequestParamsSchema$1.extend({ taskId: string() })
	});
	/**
	* The response to a {@linkcode GetTaskRequest | tasks/get} request.
	*
	* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
	*/
	const GetTaskResultSchema$1 = ResultSchema$1.merge(TaskSchema$1);
	/**
	* A request to get the result of a specific task.
	*
	* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
	*/
	const GetTaskPayloadRequestSchema$1 = RequestSchema$1.extend({
		method: literal("tasks/result"),
		params: BaseRequestParamsSchema$1.extend({ taskId: string() })
	});
	/**
	* The response to a `tasks/result` request.
	* The structure matches the result type of the original request.
	* For example, a {@linkcode CallToolRequest | tools/call} task would return the `CallToolResult` structure.
	*
	*
	* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
	*/
	const GetTaskPayloadResultSchema$1 = ResultSchema$1.loose();
	/**
	* A request to list tasks.
	*
	* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
	*/
	const ListTasksRequestSchema$1 = PaginatedRequestSchema$1.extend({ method: literal("tasks/list") });
	/**
	* The response to a {@linkcode ListTasksRequest | tasks/list} request.
	*
	* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
	*/
	const ListTasksResultSchema$1 = PaginatedResultSchema$1.extend({ tasks: array(TaskSchema$1) });
	/**
	* A request to cancel a specific task.
	*
	* @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only.
	*/
	const CancelTaskRequestSchema$1 = RequestSchema$1.extend({
		method: literal("tasks/cancel"),
		params: BaseRequestParamsSchema$1.extend({ taskId: string() })
	});
	return {
		JSONValueSchema: JSONValueSchema$1,
		JSONObjectSchema: JSONObjectSchema$1,
		ProgressTokenSchema: ProgressTokenSchema$1,
		CursorSchema: CursorSchema$1,
		TaskMetadataSchema: TaskMetadataSchema$1,
		RelatedTaskMetadataSchema: RelatedTaskMetadataSchema$1,
		RequestMetaSchema: RequestMetaSchema$1,
		BaseRequestParamsSchema: BaseRequestParamsSchema$1,
		TaskAugmentedRequestParamsSchema: TaskAugmentedRequestParamsSchema$1,
		RequestSchema: RequestSchema$1,
		NotificationsParamsSchema: NotificationsParamsSchema$1,
		NotificationSchema: NotificationSchema$1,
		ResultSchema: ResultSchema$1,
		RequestIdSchema: RequestIdSchema$1,
		EmptyResultSchema: EmptyResultSchema$1,
		CancelledNotificationParamsSchema: CancelledNotificationParamsSchema$1,
		CancelledNotificationSchema: CancelledNotificationSchema$1,
		IconSchema: IconSchema$1,
		IconsSchema: IconsSchema$1,
		BaseMetadataSchema: BaseMetadataSchema$1,
		ImplementationSchema: ImplementationSchema$1,
		ClientTasksCapabilitySchema: ClientTasksCapabilitySchema$1,
		ServerTasksCapabilitySchema: ServerTasksCapabilitySchema$1,
		ClientCapabilitiesSchema: ClientCapabilitiesSchema$1,
		InitializeRequestParamsSchema: InitializeRequestParamsSchema$1,
		InitializeRequestSchema: InitializeRequestSchema$1,
		ServerCapabilitiesSchema: ServerCapabilitiesSchema$1,
		InitializeResultSchema: InitializeResultSchema$1,
		InitializedNotificationSchema: InitializedNotificationSchema$1,
		PingRequestSchema: PingRequestSchema$1,
		ProgressSchema: ProgressSchema$1,
		ProgressNotificationParamsSchema: ProgressNotificationParamsSchema$1,
		ProgressNotificationSchema: ProgressNotificationSchema$1,
		PaginatedRequestParamsSchema: PaginatedRequestParamsSchema$1,
		PaginatedRequestSchema: PaginatedRequestSchema$1,
		PaginatedResultSchema: PaginatedResultSchema$1,
		ResourceContentsSchema: ResourceContentsSchema$1,
		TextResourceContentsSchema: TextResourceContentsSchema$1,
		BlobResourceContentsSchema: BlobResourceContentsSchema$1,
		RoleSchema: RoleSchema$1,
		AnnotationsSchema: AnnotationsSchema$1,
		ResourceSchema: ResourceSchema$1,
		ResourceTemplateSchema: ResourceTemplateSchema$1,
		ListResourcesRequestSchema: ListResourcesRequestSchema$1,
		ListResourcesResultSchema: ListResourcesResultSchema$1,
		ListResourceTemplatesRequestSchema: ListResourceTemplatesRequestSchema$1,
		ListResourceTemplatesResultSchema: ListResourceTemplatesResultSchema$1,
		ResourceRequestParamsSchema: ResourceRequestParamsSchema$1,
		ReadResourceRequestParamsSchema: ReadResourceRequestParamsSchema$1,
		ReadResourceRequestSchema: ReadResourceRequestSchema$1,
		ReadResourceResultSchema: ReadResourceResultSchema$1,
		ResourceListChangedNotificationSchema: ResourceListChangedNotificationSchema$1,
		SubscribeRequestParamsSchema: SubscribeRequestParamsSchema$1,
		SubscribeRequestSchema: SubscribeRequestSchema$1,
		UnsubscribeRequestParamsSchema: UnsubscribeRequestParamsSchema$1,
		UnsubscribeRequestSchema: UnsubscribeRequestSchema$1,
		ResourceUpdatedNotificationParamsSchema: ResourceUpdatedNotificationParamsSchema$1,
		ResourceUpdatedNotificationSchema: ResourceUpdatedNotificationSchema$1,
		PromptArgumentSchema: PromptArgumentSchema$1,
		PromptSchema: PromptSchema$1,
		ListPromptsRequestSchema: ListPromptsRequestSchema$1,
		ListPromptsResultSchema: ListPromptsResultSchema$1,
		GetPromptRequestParamsSchema: GetPromptRequestParamsSchema$1,
		GetPromptRequestSchema: GetPromptRequestSchema$1,
		TextContentSchema: TextContentSchema$1,
		ImageContentSchema: ImageContentSchema$1,
		AudioContentSchema: AudioContentSchema$1,
		ToolUseContentSchema: ToolUseContentSchema$1,
		EmbeddedResourceSchema: EmbeddedResourceSchema$1,
		ResourceLinkSchema: ResourceLinkSchema$1,
		ContentBlockSchema: ContentBlockSchema$1,
		PromptMessageSchema: PromptMessageSchema$1,
		GetPromptResultSchema: GetPromptResultSchema$1,
		PromptListChangedNotificationSchema: PromptListChangedNotificationSchema$1,
		ToolAnnotationsSchema: ToolAnnotationsSchema$1,
		ToolExecutionSchema: ToolExecutionSchema$1,
		ToolSchema: ToolSchema$1,
		ListToolsRequestSchema: ListToolsRequestSchema$1,
		ListToolsResultSchema: ListToolsResultSchema$1,
		CallToolResultSchema: CallToolResultSchema$1,
		CallToolRequestParamsSchema: CallToolRequestParamsSchema$1,
		CallToolRequestSchema: CallToolRequestSchema$1,
		ToolListChangedNotificationSchema: ToolListChangedNotificationSchema$1,
		LoggingLevelSchema: LoggingLevelSchema$1,
		SetLevelRequestParamsSchema: SetLevelRequestParamsSchema$1,
		SetLevelRequestSchema: SetLevelRequestSchema$1,
		LoggingMessageNotificationParamsSchema: LoggingMessageNotificationParamsSchema$1,
		LoggingMessageNotificationSchema: LoggingMessageNotificationSchema$1,
		ModelHintSchema: ModelHintSchema$1,
		ModelPreferencesSchema: ModelPreferencesSchema$1,
		ToolChoiceSchema: ToolChoiceSchema$1,
		ToolResultContentSchema: ToolResultContentSchema$1,
		SamplingContentSchema: SamplingContentSchema$1,
		SamplingMessageContentBlockSchema: SamplingMessageContentBlockSchema$1,
		SamplingMessageSchema: SamplingMessageSchema$1,
		CreateMessageRequestParamsSchema: CreateMessageRequestParamsSchema$1,
		CreateMessageRequestSchema: CreateMessageRequestSchema$1,
		CreateMessageResultSchema: CreateMessageResultSchema$1,
		CreateMessageResultWithToolsSchema: CreateMessageResultWithToolsSchema$1,
		BooleanSchemaSchema: BooleanSchemaSchema$1,
		StringSchemaSchema: StringSchemaSchema$1,
		NumberSchemaSchema: NumberSchemaSchema$1,
		UntitledSingleSelectEnumSchemaSchema: UntitledSingleSelectEnumSchemaSchema$1,
		TitledSingleSelectEnumSchemaSchema: TitledSingleSelectEnumSchemaSchema$1,
		LegacyTitledEnumSchemaSchema: LegacyTitledEnumSchemaSchema$1,
		SingleSelectEnumSchemaSchema: SingleSelectEnumSchemaSchema$1,
		UntitledMultiSelectEnumSchemaSchema: UntitledMultiSelectEnumSchemaSchema$1,
		TitledMultiSelectEnumSchemaSchema: TitledMultiSelectEnumSchemaSchema$1,
		MultiSelectEnumSchemaSchema: MultiSelectEnumSchemaSchema$1,
		EnumSchemaSchema: EnumSchemaSchema$1,
		PrimitiveSchemaDefinitionSchema: PrimitiveSchemaDefinitionSchema$1,
		ElicitRequestFormParamsSchema: ElicitRequestFormParamsSchema$1,
		ElicitRequestURLParamsSchema: ElicitRequestURLParamsSchema$1,
		ElicitRequestParamsSchema: ElicitRequestParamsSchema$1,
		ElicitRequestSchema: ElicitRequestSchema$1,
		ElicitationCompleteNotificationParamsSchema: ElicitationCompleteNotificationParamsSchema$1,
		ElicitationCompleteNotificationSchema: ElicitationCompleteNotificationSchema$1,
		ElicitResultSchema: ElicitResultSchema$1,
		ResourceTemplateReferenceSchema: ResourceTemplateReferenceSchema$1,
		PromptReferenceSchema: PromptReferenceSchema$1,
		CompleteRequestParamsSchema: CompleteRequestParamsSchema$1,
		CompleteRequestSchema: CompleteRequestSchema$1,
		CompleteResultSchema: CompleteResultSchema$1,
		RootSchema: RootSchema$1,
		ListRootsRequestSchema: ListRootsRequestSchema$1,
		ListRootsResultSchema: ListRootsResultSchema$1,
		RootsListChangedNotificationSchema: RootsListChangedNotificationSchema$1,
		TaskCreationParamsSchema: TaskCreationParamsSchema$1,
		TaskStatusSchema: TaskStatusSchema$1,
		TaskSchema: TaskSchema$1,
		CreateTaskResultSchema: CreateTaskResultSchema$1,
		TaskStatusNotificationParamsSchema: TaskStatusNotificationParamsSchema$1,
		TaskStatusNotificationSchema: TaskStatusNotificationSchema$1,
		GetTaskRequestSchema: GetTaskRequestSchema$1,
		GetTaskResultSchema: GetTaskResultSchema$1,
		GetTaskPayloadRequestSchema: GetTaskPayloadRequestSchema$1,
		GetTaskPayloadResultSchema: GetTaskPayloadResultSchema$1,
		ListTasksRequestSchema: ListTasksRequestSchema$1,
		ListTasksResultSchema: ListTasksResultSchema$1,
		CancelTaskRequestSchema: CancelTaskRequestSchema$1,
		CancelTaskResultSchema: ResultSchema$1.merge(TaskSchema$1),
		ClientRequestSchema: union([
			PingRequestSchema$1,
			InitializeRequestSchema$1,
			CompleteRequestSchema$1,
			SetLevelRequestSchema$1,
			GetPromptRequestSchema$1,
			ListPromptsRequestSchema$1,
			ListResourcesRequestSchema$1,
			ListResourceTemplatesRequestSchema$1,
			ReadResourceRequestSchema$1,
			SubscribeRequestSchema$1,
			UnsubscribeRequestSchema$1,
			CallToolRequestSchema$1,
			ListToolsRequestSchema$1,
			GetTaskRequestSchema$1,
			GetTaskPayloadRequestSchema$1,
			ListTasksRequestSchema$1,
			CancelTaskRequestSchema$1
		]),
		ClientNotificationSchema: union([
			CancelledNotificationSchema$1,
			ProgressNotificationSchema$1,
			InitializedNotificationSchema$1,
			RootsListChangedNotificationSchema$1,
			TaskStatusNotificationSchema$1
		]),
		ClientResultSchema: union([
			EmptyResultSchema$1,
			CreateMessageResultSchema$1,
			CreateMessageResultWithToolsSchema$1,
			ElicitResultSchema$1,
			ListRootsResultSchema$1,
			GetTaskResultSchema$1,
			ListTasksResultSchema$1,
			CreateTaskResultSchema$1
		]),
		ServerRequestSchema: union([
			PingRequestSchema$1,
			CreateMessageRequestSchema$1,
			ElicitRequestSchema$1,
			ListRootsRequestSchema$1,
			GetTaskRequestSchema$1,
			GetTaskPayloadRequestSchema$1,
			ListTasksRequestSchema$1,
			CancelTaskRequestSchema$1
		]),
		ServerNotificationSchema: union([
			CancelledNotificationSchema$1,
			ProgressNotificationSchema$1,
			LoggingMessageNotificationSchema$1,
			ResourceUpdatedNotificationSchema$1,
			ResourceListChangedNotificationSchema$1,
			ToolListChangedNotificationSchema$1,
			PromptListChangedNotificationSchema$1,
			TaskStatusNotificationSchema$1,
			ElicitationCompleteNotificationSchema$1
		]),
		ServerResultSchema: union([
			EmptyResultSchema$1,
			InitializeResultSchema$1,
			CompleteResultSchema$1,
			GetPromptResultSchema$1,
			ListPromptsResultSchema$1,
			ListResourcesResultSchema$1,
			ListResourceTemplatesResultSchema$1,
			ReadResourceResultSchema$1,
			CallToolResultSchema$1,
			ListToolsResultSchema$1,
			GetTaskResultSchema$1,
			ListTasksResultSchema$1,
			CreateTaskResultSchema$1
		]),
		CallToolResultWireSchema: unknown().superRefine((value, ctx) => {
			if (typeof value !== "object" || value === null || Array.isArray(value) || value.content !== void 0) return;
			for (const key of TOOL_RESULT_FOREIGN_FAMILY_KEYS) if (key in value) {
				ctx.addIssue({
					code: "custom",
					message: `content is required when the body carries '${key}' — another result family cannot default into an empty tools/call success`
				});
				return;
			}
		}).transform(normalizeContentlessToolResult).pipe(CallToolResultSchema$1)
	};
}
var memo$1;
/**
* Builds the era wire-schema set on first call and returns the same object
* thereafter. Module evaluation stays construction-free so importing the
* era codec/registry costs nothing until the first validation actually
* needs a schema; the registry, the codec, and the eager `schemas.ts`
* shim all pull through this memo, so reference identity holds across
* every consumer.
*/
function buildSchemas2025() {
	return memo$1 ??= build$1();
}
/**
* SEP-2106 legacy `outputSchema` wrap helpers (2025-era projection only).
*
* The neutral / 2026-07-28 model lets a tool's `outputSchema` carry any JSON
* Schema root. The 2025-11-25 wire shape requires `type:'object'` at the root,
* so when an era-blind handler advertises a non-object root, the 2025 codec's
* `encodeResult('tools/list', …)` projects it down to
* `{type:'object', properties:{result:<natural>}, required:['result']}`, and
* `projectCallToolResult` wraps the matching `structuredContent` as
* `{result:<value>}`. The 2026 codec's projections are the identity.
*
* These helpers are wire-layer property — they exist so the projection can
* live behind {@link WireCodec.encodeResult} / {@link WireCodec.projectCallToolResult}
* and never be re-derived in shared/ or server-side code.
*/
/**
* Whether a JSON Schema's root is non-object: either an explicit non-object
* `type`, or a typeless root such as `{anyOf:[…]}`. Object-shaped typeless
* roots that the schema-conversion layer can prove are objects are stamped
* `type:'object'` upstream, so they reach this predicate as object roots.
*/
function isNonObjectJsonSchemaRoot(json) {
	return json["type"] !== "object";
}
/**
* Keyword-position keys whose values are instance data (not subschemas). A
* `{$ref:…}` appearing inside one is a literal value, not a JSON Pointer to
* rewrite. Only consulted when the current object is in keyword position —
* a PROPERTY named `default`/`const` (under `properties`/`$defs`/…) is a name
* position whose value IS a subschema and is recursed into.
*/
var REF_REWRITE_DATA_POSITION_KEYS = /* @__PURE__ */ new Set([
	"const",
	"enum",
	"default",
	"examples"
]);
/**
* Keyword-position keys whose value is a name→subschema map. Entries inside
* such a map are in NAME position: their keys are author-chosen property
* names (which may collide with JSON Schema keywords), their values are
* subschemas to recurse into.
*/
var REF_REWRITE_NAME_MAP_KEYS = /* @__PURE__ */ new Set([
	"properties",
	"patternProperties",
	"$defs",
	"definitions",
	"dependentSchemas",
	"dependencies"
]);
/**
* Whether a subtree's `$id` establishes a new resolution base. A fragment-only
* `$id` (`"#item"`, the draft-07/06 spelling of 2020-12's `$anchor`) does not
* change the RFC 3986 base URI — same-document pointers inside still resolve
* against the document root and must be rewritten.
*/
function establishesNewBase(id) {
	return id !== void 0 && !(typeof id === "string" && id.startsWith("#"));
}
/**
* Wrap a non-object output schema in the 2025-era envelope:
* `{type:'object', properties:{result:<natural>}, required:['result']}`.
*
* Same-document `$ref` / `$dynamicRef` JSON Pointers inside the natural schema
* (e.g. `#/properties/foo` produced by zod for de-duplicated/recursive types)
* are rewritten to account for the new `#/properties/result` root: bare `#` →
* `#/properties/result`, `#/…` → `#/properties/result/…`. Cross-document refs
* (anything not starting with `#`) are left untouched.
*
* The rewrite is position-aware: data-valued keywords
* (`const`/`enum`/`default`/`examples`) in keyword position are NOT descended
* into; the same names appearing as property names under
* `properties`/`patternProperties`/`$defs`/`definitions`/`dependentSchemas`/
* `dependencies` ARE descended into (they're subschemas). The rewrite is also
* `$id`-scoped: if the natural root carries a base-establishing `$id` no
* pointer is rewritten (same-document refs inside resolve against the embedded
* `$id` base, not the wrapper root), and any subtree that establishes its own
* `$id` is left untouched for the same reason. Fragment-only `$id` (`"#item"`,
* draft-07's anchor spelling) does not establish a base and IS descended into.
*/
function wrapOutputSchemaForLegacy(natural) {
	const $schema = typeof natural["$schema"] === "string" ? natural["$schema"] : void 0;
	if (establishesNewBase(natural["$id"])) return {
		...$schema !== void 0 && { $schema },
		type: "object",
		properties: { result: natural },
		required: ["result"]
	};
	const convertRecursiveRefs = declares2019Dialect(natural["$schema"]) && natural["$recursiveAnchor"] !== true;
	const rewriteRefs = (node, parentIsNameMap) => {
		if (Array.isArray(node)) return node.map((item) => rewriteRefs(item, false));
		if (node === null || typeof node !== "object") return node;
		if (!parentIsNameMap && establishesNewBase(node["$id"])) return node;
		const out = {};
		let convertedRecursion = false;
		for (const [k, v] of Object.entries(node)) if (parentIsNameMap) out[k] = rewriteRefs(v, false);
		else if ((k === "$ref" || k === "$dynamicRef") && typeof v === "string") out[k] = v === "#" ? "#/properties/result" : v.startsWith("#/") ? `#/properties/result${v.slice(1)}` : v;
		else if (k === "$recursiveRef" && v === "#" && convertRecursiveRefs) convertedRecursion = true;
		else if (REF_REWRITE_DATA_POSITION_KEYS.has(k)) out[k] = v;
		else if (REF_REWRITE_NAME_MAP_KEYS.has(k)) out[k] = rewriteRefs(v, true);
		else out[k] = rewriteRefs(v, false);
		if (convertedRecursion) if ("$ref" in out) out["allOf"] = [...Array.isArray(out["allOf"]) ? out["allOf"] : [], { $ref: "#/properties/result" }];
		else out["$ref"] = "#/properties/result";
		return out;
	};
	return {
		...$schema !== void 0 && { $schema },
		type: "object",
		properties: { result: rewriteRefs(natural, false) },
		required: ["result"]
	};
}
var requestMethodKeys$1 = {
	ping: null,
	initialize: null,
	"completion/complete": null,
	"logging/setLevel": null,
	"prompts/get": null,
	"prompts/list": null,
	"resources/list": null,
	"resources/templates/list": null,
	"resources/read": null,
	"resources/subscribe": null,
	"resources/unsubscribe": null,
	"tools/call": null,
	"tools/list": null,
	"tasks/get": null,
	"tasks/result": null,
	"tasks/list": null,
	"tasks/cancel": null,
	"sampling/createMessage": null,
	"elicitation/create": null,
	"roots/list": null
};
var notificationMethodKeys$1 = {
	"notifications/cancelled": null,
	"notifications/progress": null,
	"notifications/initialized": null,
	"notifications/roots/list_changed": null,
	"notifications/tasks/status": null,
	"notifications/message": null,
	"notifications/resources/updated": null,
	"notifications/resources/list_changed": null,
	"notifications/tools/list_changed": null,
	"notifications/prompts/list_changed": null,
	"notifications/elicitation/complete": null
};
var resultMethodKeys = {
	ping: null,
	initialize: null,
	"completion/complete": null,
	"logging/setLevel": null,
	"prompts/get": null,
	"prompts/list": null,
	"resources/list": null,
	"resources/templates/list": null,
	"resources/read": null,
	"resources/subscribe": null,
	"resources/unsubscribe": null,
	"tools/call": null,
	"tools/list": null,
	"sampling/createMessage": null,
	"elicitation/create": null,
	"roots/list": null
};
var maps$1;
function registryMaps() {
	if (maps$1) return maps$1;
	const s = buildSchemas2025();
	maps$1 = {
		requestSchemas: {
			ping: s.PingRequestSchema,
			initialize: s.InitializeRequestSchema,
			"completion/complete": s.CompleteRequestSchema,
			"logging/setLevel": s.SetLevelRequestSchema,
			"prompts/get": s.GetPromptRequestSchema,
			"prompts/list": s.ListPromptsRequestSchema,
			"resources/list": s.ListResourcesRequestSchema,
			"resources/templates/list": s.ListResourceTemplatesRequestSchema,
			"resources/read": s.ReadResourceRequestSchema,
			"resources/subscribe": s.SubscribeRequestSchema,
			"resources/unsubscribe": s.UnsubscribeRequestSchema,
			"tools/call": s.CallToolRequestSchema,
			"tools/list": s.ListToolsRequestSchema,
			"tasks/get": s.GetTaskRequestSchema,
			"tasks/result": s.GetTaskPayloadRequestSchema,
			"tasks/list": s.ListTasksRequestSchema,
			"tasks/cancel": s.CancelTaskRequestSchema,
			"sampling/createMessage": s.CreateMessageRequestSchema,
			"elicitation/create": s.ElicitRequestSchema,
			"roots/list": s.ListRootsRequestSchema
		},
		notificationSchemas: {
			"notifications/cancelled": s.CancelledNotificationSchema,
			"notifications/progress": s.ProgressNotificationSchema,
			"notifications/initialized": s.InitializedNotificationSchema,
			"notifications/roots/list_changed": s.RootsListChangedNotificationSchema,
			"notifications/tasks/status": s.TaskStatusNotificationSchema,
			"notifications/message": s.LoggingMessageNotificationSchema,
			"notifications/resources/updated": s.ResourceUpdatedNotificationSchema,
			"notifications/resources/list_changed": s.ResourceListChangedNotificationSchema,
			"notifications/tools/list_changed": s.ToolListChangedNotificationSchema,
			"notifications/prompts/list_changed": s.PromptListChangedNotificationSchema,
			"notifications/elicitation/complete": s.ElicitationCompleteNotificationSchema
		},
		resultSchemas: {
			ping: s.EmptyResultSchema,
			initialize: s.InitializeResultSchema,
			"completion/complete": s.CompleteResultSchema,
			"logging/setLevel": s.EmptyResultSchema,
			"prompts/get": s.GetPromptResultSchema,
			"prompts/list": s.ListPromptsResultSchema,
			"resources/list": s.ListResourcesResultSchema,
			"resources/templates/list": s.ListResourceTemplatesResultSchema,
			"resources/read": s.ReadResourceResultSchema,
			"resources/subscribe": s.EmptyResultSchema,
			"resources/unsubscribe": s.EmptyResultSchema,
			"tools/call": s.CallToolResultWireSchema,
			"tools/list": s.ListToolsResultSchema,
			"sampling/createMessage": s.CreateMessageResultWithToolsSchema,
			"elicitation/create": s.ElicitResultSchema,
			"roots/list": s.ListRootsResultSchema
		}
	};
	return maps$1;
}
/** The 2025-era request-method set (registry membership = the deletion story). */
function hasRequestMethod2025(method) {
	return Object.prototype.hasOwnProperty.call(requestMethodKeys$1, method);
}
/** The 2025-era notification-method set. */
function hasNotificationMethod2025(method) {
	return Object.prototype.hasOwnProperty.call(notificationMethodKeys$1, method);
}
/** Result-map membership: exactly the era's typed-method subset (no task entries, no 2026-only methods). */
function hasResultMethod(method) {
	return Object.prototype.hasOwnProperty.call(resultMethodKeys, method);
}
function getResultSchema(method) {
	return hasResultMethod(method) ? registryMaps().resultSchemas[method] : void 0;
}
function getRequestSchema(method) {
	return hasRequestMethod2025(method) ? registryMaps().requestSchemas[method] : void 0;
}
function getNotificationSchema(method) {
	return hasNotificationMethod2025(method) ? registryMaps().notificationSchemas[method] : void 0;
}
Object.keys(requestMethodKeys$1);
Object.keys(notificationMethodKeys$1);
function isPlainObject$5(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
/** Tri-state wrap of an optional Zod schema lookup (the function-only contract). */
function triState$1(schema, raw) {
	if (schema === void 0) return {
		ok: false,
		reason: "not-in-era"
	};
	const parsed = schema.safeParse(raw);
	return parsed.success ? {
		ok: true,
		value: parsed.data
	} : {
		ok: false,
		reason: "invalid",
		message: String(parsed.error)
	};
}
var NOT_IN_ERA$1 = {
	ok: false,
	reason: "not-in-era"
};
/** Whether a `tools/list` entry advertises a non-object `outputSchema` root that needs the SEP-2106 legacy wrap. */
function toolNeedsLegacyWrap(t) {
	return isPlainObject$5(t) && isPlainObject$5(t["outputSchema"]) && isNonObjectJsonSchemaRoot(t["outputSchema"]);
}
/** The wire→neutral trust boundary: a decoded 2025-era wire result is adopted as the neutral `Result` here (the module's single deliberate assertion). */
function toNeutralResult(value) {
	return value;
}
var rev2025Codec = {
	era: "2025-11-25",
	hasRequestMethod: hasRequestMethod2025,
	hasNotificationMethod: hasNotificationMethod2025,
	validateRequest: (method, raw) => triState$1(getRequestSchema(method), raw),
	validateResult: (method, raw) => triState$1(getResultSchema(method), raw),
	validateNotification: (method, raw) => triState$1(getNotificationSchema(method), raw),
	hasInputRequestMethod: () => false,
	validateInputRequest: () => NOT_IN_ERA$1,
	validateInputResponse: () => NOT_IN_ERA$1,
	samplingResultVariant: ((hasTools, raw) => {
		const s = buildSchemas2025();
		return triState$1(hasTools ? s.CreateMessageResultWithToolsSchema : s.CreateMessageResultSchema, raw);
	}),
	outboundEnvelope: (_material) => void 0,
	validateEnvelopeMeta: (_meta) => [],
	projectCallToolResult(result, advertisedOutputSchema) {
		const withText = appendTextFallbackForNonObject(result);
		const sc = withText.structuredContent;
		if (sc === void 0) return withText;
		const valueIsNonObject = typeof sc !== "object" || sc === null || Array.isArray(sc);
		const schemaWrapped = advertisedOutputSchema !== void 0 && isNonObjectJsonSchemaRoot(advertisedOutputSchema);
		if (!valueIsNonObject && !schemaWrapped) return withText;
		return {
			...withText,
			structuredContent: { result: sc }
		};
	},
	decodeResult(_method, raw) {
		if (isPlainObject$5(raw) && "resultType" in raw) {
			const stripped = { ...raw };
			delete stripped["resultType"];
			return {
				kind: "complete",
				result: toNeutralResult(stripped)
			};
		}
		return {
			kind: "complete",
			result: toNeutralResult(raw)
		};
	},
	encodeResult(method, result) {
		if (method !== "tools/list") return result;
		const tools = result.tools;
		if (!Array.isArray(tools) || !tools.some((t) => toolNeedsLegacyWrap(t))) return result;
		return {
			...result,
			tools: tools.map((t) => toolNeedsLegacyWrap(t) ? {
				...t,
				outputSchema: wrapOutputSchemaForLegacy(t.outputSchema)
			} : t)
		};
	},
	encodeErrorCode: (code) => code === -32002 ? -32602 : code,
	checkInboundEnvelope: (_material) => void 0
};
/**
* 2026-era wire schemas (protocol revision 2026-07-28).
*
* Fully self-contained — no runtime imports from types/schemas.ts. The
* neutral types/schemas.ts layer is the public-API superset and is free to
* evolve; this file is the 2026 wire-parse contract and is BEHAVIOR-FROZEN
* against the 2026-07-28 anchor. Every era-shared building block (content
* blocks, resources, prompts, capabilities, notifications, …) that the wire
* shapes compose is a frozen LOCAL copy — verbatim from the neutral layer at
* the point this revision was sealed, dependencies first. The only cross-layer
* dependency is `import type { JSONObject, JSONValue }` from the neutral types
* barrel — pure structural type aliases with no parse behavior.
*
* This module is the only place the per-request `_meta` envelope is modeled.
* The envelope is wire-only vocabulary: the protocol layer lifts it off
* inbound requests before any handler runs and surfaces it at
* `ctx.mcpReq.envelope`; the 2026-era codec enforces its requiredness at
* dispatch time (`checkInboundEnvelope`) - the former neutral-schema JSDoc
* deferral ("enforced per request at dispatch time, not here") is now
* discharged by that codec step.
*
* No 2025-era traffic ever touches this module, so requiredness here is
* bare and spec-exact (the shared-schema `.catch` hazards do not apply).
*
* SPEC-CURRENCY RE-SEAL (2026-07-17): the 2026-07-28 revision was re-sealed
* upstream by spec PR #3002 (commit 71e30695, merged 2026-07-15 — after the
* previous anchor pin f68d864a): the envelope's `clientInfo` demoted from
* required to SHOULD, and `DiscoverResult.serverInfo` moved from the result
* body to the new `ResultMetaObject` key
* `_meta['io.modelcontextprotocol/serverInfo']` (optional on every result).
* The shapes below are the re-sealed anchor, exactly — no pre-#3002 shape is
* modeled anywhere (per ruling: the final revision is the only 2026-07-28).
*/
function build() {
	const JSONValueSchema$1 = lazy(() => union([
		string(),
		number(),
		boolean(),
		_null(),
		record(string(), JSONValueSchema$1),
		array(JSONValueSchema$1)
	]));
	const JSONObjectSchema$1 = record(string(), JSONValueSchema$1);
	/**
	* A progress token, used to associate progress notifications with the original request.
	*/
	const ProgressTokenSchema$1 = union([string(), number().int()]);
	/**
	* An opaque token used to represent a cursor for pagination.
	*/
	const CursorSchema$1 = string();
	/**
	* A uniquely identifying ID for a request in JSON-RPC.
	*/
	const RequestIdSchema$1 = union([string(), number().int()]);
	/**
	* The sender or recipient of messages and data in a conversation.
	*/
	const RoleSchema$1 = _enum(["user", "assistant"]);
	/**
	* The severity of a log message.
	*/
	const LoggingLevelSchema$1 = _enum([
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
	* A Zod schema for validating Base64 strings that is more performant and
	* robust for very large inputs than the default regex-based check. It avoids
	* stack overflows by using the native `atob` function for validation.
	*/
	const Base64Schema = string().refine((val) => {
		try {
			atob(val);
			return true;
		} catch {
			return false;
		}
	}, { message: "Invalid Base64 string" });
	/** @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only. */
	const TaskMetadataSchema$1 = object({ ttl: number().optional() });
	/** @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only. */
	const RelatedTaskMetadataSchema$1 = object({ taskId: string() });
	const RequestMetaSchema$1 = looseObject({
		progressToken: ProgressTokenSchema$1.optional(),
		"io.modelcontextprotocol/related-task": RelatedTaskMetadataSchema$1.optional()
	});
	const BaseRequestParamsSchema$1 = object({ _meta: RequestMetaSchema$1.optional() });
	/** @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only. */
	const TaskAugmentedRequestParamsSchema$1 = BaseRequestParamsSchema$1.extend({ task: TaskMetadataSchema$1.optional() });
	const NotificationsParamsSchema$1 = object({ _meta: RequestMetaSchema$1.optional() });
	const NotificationSchema$1 = object({
		method: string(),
		params: NotificationsParamsSchema$1.loose().optional()
	});
	const IconSchema$1 = object({
		src: string(),
		mimeType: string().optional(),
		sizes: array(string()).optional(),
		theme: _enum(["light", "dark"]).optional()
	});
	const IconsSchema$1 = object({ icons: array(IconSchema$1).optional() });
	const BaseMetadataSchema$1 = object({
		name: string(),
		title: string().optional()
	});
	const ImplementationSchema$1 = BaseMetadataSchema$1.extend({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		version: string(),
		websiteUrl: string().optional(),
		description: string().optional()
	});
	const ElicitationCapabilitySchema = preprocess((value) => {
		if (value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) return { form: {} };
		return value;
	}, intersection(object({
		form: intersection(object({ applyDefaults: boolean().optional() }), JSONObjectSchema$1).optional(),
		url: JSONObjectSchema$1.optional()
	}), JSONObjectSchema$1.optional()));
	/** @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only. */
	const ClientTasksCapabilitySchema$1 = looseObject({
		list: JSONObjectSchema$1.optional(),
		cancel: JSONObjectSchema$1.optional(),
		requests: looseObject({
			sampling: looseObject({ createMessage: JSONObjectSchema$1.optional() }).optional(),
			elicitation: looseObject({ create: JSONObjectSchema$1.optional() }).optional()
		}).optional()
	});
	/** @deprecated 2025-11-25 wire vocabulary with no SDK runtime; kept importable for interoperability only. */
	const ServerTasksCapabilitySchema$1 = looseObject({
		list: JSONObjectSchema$1.optional(),
		cancel: JSONObjectSchema$1.optional(),
		requests: looseObject({ tools: looseObject({ call: JSONObjectSchema$1.optional() }).optional() }).optional()
	});
	const ClientCapabilitiesSchema$1 = object({
		experimental: record(string(), JSONObjectSchema$1).optional(),
		sampling: object({
			context: JSONObjectSchema$1.optional(),
			tools: JSONObjectSchema$1.optional()
		}).optional(),
		elicitation: ElicitationCapabilitySchema.optional(),
		roots: object({ listChanged: boolean().optional() }).optional(),
		tasks: ClientTasksCapabilitySchema$1.optional(),
		extensions: record(string(), JSONObjectSchema$1).optional()
	});
	const ServerCapabilitiesSchema$1 = object({
		experimental: record(string(), JSONObjectSchema$1).optional(),
		logging: JSONObjectSchema$1.optional(),
		completions: JSONObjectSchema$1.optional(),
		prompts: object({ listChanged: boolean().optional() }).optional(),
		resources: object({
			subscribe: boolean().optional(),
			listChanged: boolean().optional()
		}).optional(),
		tools: object({ listChanged: boolean().optional() }).optional(),
		tasks: ServerTasksCapabilitySchema$1.optional(),
		extensions: record(string(), JSONObjectSchema$1).optional()
	});
	const ProgressSchema$1 = object({
		progress: number(),
		total: optional(number()),
		message: optional(string())
	});
	const ProgressNotificationParamsSchema$1 = object({
		...NotificationsParamsSchema$1.shape,
		...ProgressSchema$1.shape,
		progressToken: ProgressTokenSchema$1
	});
	const ProgressNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/progress"),
		params: ProgressNotificationParamsSchema$1
	});
	const LoggingMessageNotificationParamsSchema$1 = NotificationsParamsSchema$1.extend({
		level: LoggingLevelSchema$1,
		logger: string().optional(),
		data: unknown()
	});
	const LoggingMessageNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/message"),
		params: LoggingMessageNotificationParamsSchema$1
	});
	const ResourceContentsSchema$1 = object({
		uri: string(),
		mimeType: optional(string()),
		_meta: record(string(), unknown()).optional()
	});
	const TextResourceContentsSchema$1 = ResourceContentsSchema$1.extend({ text: string() });
	const BlobResourceContentsSchema$1 = ResourceContentsSchema$1.extend({ blob: Base64Schema });
	const AnnotationsSchema$1 = object({
		audience: array(RoleSchema$1).optional(),
		priority: number().min(0).max(1).optional(),
		lastModified: datetime({ offset: true }).optional()
	});
	const ResourceSchema$1 = object({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		uri: string(),
		description: optional(string()),
		mimeType: optional(string()),
		size: optional(number()),
		annotations: AnnotationsSchema$1.optional(),
		_meta: optional(looseObject({}))
	});
	const ResourceTemplateSchema$1 = object({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		uriTemplate: string(),
		description: optional(string()),
		mimeType: optional(string()),
		annotations: AnnotationsSchema$1.optional(),
		_meta: optional(looseObject({}))
	});
	const ResourceListChangedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/resources/list_changed"),
		params: NotificationsParamsSchema$1.optional()
	});
	const ResourceUpdatedNotificationParamsSchema$1 = NotificationsParamsSchema$1.extend({ uri: string() });
	const ResourceUpdatedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/resources/updated"),
		params: ResourceUpdatedNotificationParamsSchema$1
	});
	const PromptArgumentSchema$1 = object({
		name: string(),
		description: optional(string()),
		required: optional(boolean())
	});
	const PromptSchema$1 = object({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		description: optional(string()),
		arguments: optional(array(PromptArgumentSchema$1)),
		_meta: optional(looseObject({}))
	});
	const PromptListChangedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/prompts/list_changed"),
		params: NotificationsParamsSchema$1.optional()
	});
	const TextContentSchema$1 = object({
		type: literal("text"),
		text: string(),
		annotations: AnnotationsSchema$1.optional(),
		_meta: record(string(), unknown()).optional()
	});
	const ImageContentSchema$1 = object({
		type: literal("image"),
		data: Base64Schema,
		mimeType: string(),
		annotations: AnnotationsSchema$1.optional(),
		_meta: record(string(), unknown()).optional()
	});
	const AudioContentSchema$1 = object({
		type: literal("audio"),
		data: Base64Schema,
		mimeType: string(),
		annotations: AnnotationsSchema$1.optional(),
		_meta: record(string(), unknown()).optional()
	});
	const ToolUseContentSchema$1 = object({
		type: literal("tool_use"),
		name: string(),
		id: string(),
		input: record(string(), unknown()),
		_meta: record(string(), unknown()).optional()
	});
	const EmbeddedResourceSchema$1 = object({
		type: literal("resource"),
		resource: union([TextResourceContentsSchema$1, BlobResourceContentsSchema$1]),
		annotations: AnnotationsSchema$1.optional(),
		_meta: record(string(), unknown()).optional()
	});
	const ResourceLinkSchema$1 = ResourceSchema$1.extend({ type: literal("resource_link") });
	const ContentBlockSchema$1 = union([
		TextContentSchema$1,
		ImageContentSchema$1,
		AudioContentSchema$1,
		ResourceLinkSchema$1,
		EmbeddedResourceSchema$1
	]);
	const PromptMessageSchema$1 = object({
		role: RoleSchema$1,
		content: ContentBlockSchema$1
	});
	const ToolAnnotationsSchema$1 = object({
		title: string().optional(),
		readOnlyHint: boolean().optional(),
		destructiveHint: boolean().optional(),
		idempotentHint: boolean().optional(),
		openWorldHint: boolean().optional()
	});
	const ToolListChangedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/tools/list_changed"),
		params: NotificationsParamsSchema$1.optional()
	});
	const ModelHintSchema$1 = object({ name: string().optional() });
	const ModelPreferencesSchema$1 = object({
		hints: array(ModelHintSchema$1).optional(),
		costPriority: number().min(0).max(1).optional(),
		speedPriority: number().min(0).max(1).optional(),
		intelligencePriority: number().min(0).max(1).optional()
	});
	const ToolChoiceSchema$1 = object({ mode: _enum([
		"auto",
		"required",
		"none"
	]).optional() });
	const BooleanSchemaSchema$1 = object({
		type: literal("boolean"),
		title: string().optional(),
		description: string().optional(),
		default: boolean().optional()
	});
	const StringSchemaSchema$1 = object({
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
	const NumberSchemaSchema$1 = object({
		type: _enum(["number", "integer"]),
		title: string().optional(),
		description: string().optional(),
		minimum: number().optional(),
		maximum: number().optional(),
		default: number().optional()
	});
	const UntitledSingleSelectEnumSchemaSchema$1 = object({
		type: literal("string"),
		title: string().optional(),
		description: string().optional(),
		enum: array(string()),
		default: string().optional()
	});
	const TitledSingleSelectEnumSchemaSchema$1 = object({
		type: literal("string"),
		title: string().optional(),
		description: string().optional(),
		oneOf: array(object({
			const: string(),
			title: string()
		})),
		default: string().optional()
	});
	const LegacyTitledEnumSchemaSchema$1 = object({
		type: literal("string"),
		title: string().optional(),
		description: string().optional(),
		enum: array(string()),
		enumNames: array(string()).optional(),
		default: string().optional()
	});
	const SingleSelectEnumSchemaSchema$1 = union([UntitledSingleSelectEnumSchemaSchema$1, TitledSingleSelectEnumSchemaSchema$1]);
	const UntitledMultiSelectEnumSchemaSchema$1 = object({
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
	const TitledMultiSelectEnumSchemaSchema$1 = object({
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
	const MultiSelectEnumSchemaSchema$1 = union([UntitledMultiSelectEnumSchemaSchema$1, TitledMultiSelectEnumSchemaSchema$1]);
	const EnumSchemaSchema$1 = union([
		LegacyTitledEnumSchemaSchema$1,
		SingleSelectEnumSchemaSchema$1,
		MultiSelectEnumSchemaSchema$1
	]);
	const PrimitiveSchemaDefinitionSchema$1 = union([
		EnumSchemaSchema$1,
		BooleanSchemaSchema$1,
		StringSchemaSchema$1,
		NumberSchemaSchema$1
	]);
	const ElicitRequestFormParamsSchema$1 = TaskAugmentedRequestParamsSchema$1.extend({
		mode: literal("form").optional(),
		message: string(),
		requestedSchema: object({
			type: literal("object"),
			properties: record(string(), PrimitiveSchemaDefinitionSchema$1),
			required: array(string()).optional()
		}).catchall(unknown())
	});
	const ResourceTemplateReferenceSchema$1 = object({
		type: literal("ref/resource"),
		uri: string()
	});
	const PromptReferenceSchema$1 = object({
		type: literal("ref/prompt"),
		name: string()
	});
	const RootSchema$1 = object({
		uri: string().startsWith("file://"),
		name: string().optional(),
		_meta: record(string(), unknown()).optional()
	});
	const sharedClientCapabilityShape = ClientCapabilitiesSchema$1.shape;
	const ClientCapabilities2026Schema = object({
		experimental: sharedClientCapabilityShape.experimental,
		sampling: sharedClientCapabilityShape.sampling,
		elicitation: sharedClientCapabilityShape.elicitation,
		roots: sharedClientCapabilityShape.roots,
		extensions: sharedClientCapabilityShape.extensions
	});
	const sharedServerCapabilityShape = ServerCapabilitiesSchema$1.shape;
	const ServerCapabilities2026Schema = object({
		experimental: sharedServerCapabilityShape.experimental,
		logging: sharedServerCapabilityShape.logging,
		completions: sharedServerCapabilityShape.completions,
		prompts: sharedServerCapabilityShape.prompts,
		resources: sharedServerCapabilityShape.resources,
		tools: sharedServerCapabilityShape.tools,
		extensions: sharedServerCapabilityShape.extensions
	});
	/**
	* The per-request `_meta` envelope carried by every request under protocol revision
	* 2026-07-28: the protocol version governing the request, the client implementation
	* info, and the client's capabilities — declared per request rather than once at
	* initialization — plus the optional log-level opt-in.
	*
	* This schema models the complete envelope on its own (loose: foreign keys
	* pass through - the lift extracts exactly the reserved keys, so enforcement
	* never sees extension material). Requiredness is enforced per request at
	* dispatch time by the 2026-era codec's `checkInboundEnvelope` step.
	*/
	const RequestMetaEnvelopeSchema = looseObject({
		progressToken: ProgressTokenSchema$1.optional(),
		[PROTOCOL_VERSION_META_KEY]: string(),
		[CLIENT_INFO_META_KEY]: ImplementationSchema$1.optional(),
		[CLIENT_CAPABILITIES_META_KEY]: ClientCapabilities2026Schema,
		[LOG_LEVEL_META_KEY]: LoggingLevelSchema$1.optional()
	});
	/** 2026-era Tool: anchor-exact — no `execution` (deleted vocabulary). */
	const ToolSchema$1 = object({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		description: string().optional(),
		inputSchema: looseObject({
			$schema: string().optional(),
			type: literal("object")
		}),
		outputSchema: looseObject({ $schema: string().optional() }).optional(),
		annotations: ToolAnnotationsSchema$1.optional(),
		_meta: record(string(), unknown()).optional()
	});
	/** 2026-era ToolResultContent (anchor-exact: `structuredContent?: unknown`). */
	const ToolResultContentSchema$1 = object({
		type: literal("tool_result"),
		toolUseId: string(),
		content: array(ContentBlockSchema$1),
		structuredContent: unknown().optional(),
		isError: boolean().optional(),
		_meta: record(string(), unknown()).optional()
	});
	/** 2026-era sampling content union (composes the forked tool-result shape). */
	const SamplingMessageContentBlockSchema$1 = union([
		TextContentSchema$1,
		ImageContentSchema$1,
		AudioContentSchema$1,
		ToolUseContentSchema$1,
		ToolResultContentSchema$1
	]);
	/** 2026-era SamplingMessage (anchor-exact: single block or array). */
	const SamplingMessageSchema$1 = object({
		role: RoleSchema$1,
		content: union([SamplingMessageContentBlockSchema$1, array(SamplingMessageContentBlockSchema$1)]),
		_meta: record(string(), unknown()).optional()
	});
	/** Open union per the anchor: 'complete' | 'input_required' | string. */
	const ResultTypeSchema = string();
	/**
	* Result `_meta` (anchor `ResultMetaObject`, added by spec PR #3002):
	* loose, with the serverInfo key typed when present; the outbound stamp
	* is the encode contract's `stampServerInfoMeta` step.
	*/
	const ResultMetaSchema = looseObject({ [SERVER_INFO_META_KEY]: ImplementationSchema$1.optional().catch(void 0) });
	const wireMeta = ResultMetaSchema.optional();
	function wireResult(shape) {
		return looseObject({
			_meta: wireMeta,
			resultType: ResultTypeSchema.default("complete"),
			...shape
		});
	}
	const ResultSchema$1 = wireResult({});
	const PaginatedResultSchema$1 = wireResult({ nextCursor: CursorSchema$1.optional() });
	const CallToolResultSchema$1 = wireResult({
		content: array(ContentBlockSchema$1),
		structuredContent: unknown().optional(),
		isError: boolean().optional()
	});
	const ListToolsResultSchema$1 = wireResult({
		ttlMs: number().int().min(0),
		cacheScope: _enum(["public", "private"]),
		tools: array(ToolSchema$1),
		nextCursor: CursorSchema$1.optional()
	});
	const ListPromptsResultSchema$1 = wireResult({
		ttlMs: number().int().min(0),
		cacheScope: _enum(["public", "private"]),
		prompts: array(PromptSchema$1),
		nextCursor: CursorSchema$1.optional()
	});
	const GetPromptResultSchema$1 = wireResult({
		description: string().optional(),
		messages: array(PromptMessageSchema$1)
	});
	const ListResourcesResultSchema$1 = wireResult({
		ttlMs: number().int().min(0),
		cacheScope: _enum(["public", "private"]),
		resources: array(ResourceSchema$1),
		nextCursor: CursorSchema$1.optional()
	});
	const ListResourceTemplatesResultSchema$1 = wireResult({
		ttlMs: number().int().min(0),
		cacheScope: _enum(["public", "private"]),
		resourceTemplates: array(ResourceTemplateSchema$1),
		nextCursor: CursorSchema$1.optional()
	});
	const ReadResourceResultSchema$1 = wireResult({
		ttlMs: number().int().min(0),
		cacheScope: _enum(["public", "private"]),
		contents: array(union([TextResourceContentsSchema$1, BlobResourceContentsSchema$1]))
	});
	const CompleteResultSchema$1 = wireResult({ completion: object({
		values: array(string()).max(100),
		total: number().int().optional(),
		hasMore: boolean().optional()
	}).loose() });
	/** CacheableResult (SEP-2549): ttlMs and cacheScope REQUIRED per the anchor. */
	const CacheableResultSchema = wireResult({
		ttlMs: number().int().min(0),
		cacheScope: _enum(["public", "private"])
	});
	const DiscoverResultSchema$1 = wireResult({
		ttlMs: number().int().min(0).catch(0),
		cacheScope: _enum(["public", "private"]).catch("private"),
		supportedVersions: array(string()),
		capabilities: ServerCapabilities2026Schema,
		instructions: string().optional()
	});
	/** 2026-era CreateMessageRequestParams (anchor-exact: forked SamplingMessage/Tool, no task augmentation). */
	const CreateMessageRequestParamsSchema$1 = object({
		messages: array(SamplingMessageSchema$1),
		modelPreferences: ModelPreferencesSchema$1.optional(),
		systemPrompt: string().optional(),
		includeContext: _enum([
			"none",
			"thisServer",
			"allServers"
		]).optional(),
		temperature: number().optional(),
		maxTokens: number().int(),
		stopSequences: array(string()).optional(),
		metadata: JSONObjectSchema$1.optional(),
		tools: array(ToolSchema$1).optional(),
		toolChoice: ToolChoiceSchema$1.optional()
	});
	/** 2026-era embedded sampling request (de-JSON-RPC'd). */
	const CreateMessageRequestSchema$1 = object({
		method: literal("sampling/createMessage"),
		params: CreateMessageRequestParamsSchema$1
	});
	/**
	* 2026-era embedded roots listing request (de-JSON-RPC'd). Embedded input
	* requests do NOT carry the per-request `_meta` envelope on this revision —
	* the anchor declares a bare optional `_meta` on `params`.
	*/
	const ListRootsRequestSchema$1 = object({
		method: literal("roots/list"),
		params: object({ _meta: record(string(), unknown()).optional() }).optional()
	});
	/** 2026-era embedded sampling response (anchor-exact: extends the forked SamplingMessage). */
	const CreateMessageResultSchema$1 = object({
		...SamplingMessageSchema$1.shape,
		model: string(),
		stopReason: string().optional()
	});
	/** 2026-era embedded roots listing response (anchor-exact: bare `roots` array). */
	const ListRootsResultSchema$1 = object({ roots: array(RootSchema$1) });
	/** 2026-era embedded elicitation response (anchor-exact: bare result, restricted content value types). */
	const ElicitResultSchema$1 = object({
		action: _enum([
			"accept",
			"decline",
			"cancel"
		]),
		content: record(string(), union([
			string(),
			number(),
			boolean(),
			array(string())
		])).optional()
	});
	/**
	* 2026-era URL-mode elicitation params (anchor-exact fork): the draft removed
	* `elicitationId` (and the `notifications/elicitation/complete` channel it
	* keyed) — the shared schema keeps the field because it is required on the
	* frozen 2025-11-25 revision.
	*/
	const ElicitRequestURLParamsSchema$1 = object({
		mode: literal("url"),
		message: string(),
		url: string().url()
	});
	/** 2026-era elicitation params (form mode is revision-identical; URL mode is the fork above). */
	const ElicitRequestParamsSchema$1 = union([ElicitRequestFormParamsSchema$1, ElicitRequestURLParamsSchema$1]);
	/** 2026-era embedded elicitation request (de-JSON-RPC'd; see the URL-mode fork above). */
	const ElicitRequestSchema$1 = object({
		method: literal("elicitation/create"),
		params: ElicitRequestParamsSchema$1
	});
	/** A single embedded input request (one of the three demoted server→client requests). */
	const InputRequestSchema = union([
		CreateMessageRequestSchema$1,
		ListRootsRequestSchema$1,
		ElicitRequestSchema$1
	]);
	/** A single embedded input response — the BARE result union (never a `{method, result}` wrapper). */
	const InputResponseSchema = union([
		CreateMessageResultSchema$1,
		ListRootsResultSchema$1,
		ElicitResultSchema$1
	]);
	/** Map of embedded input requests, keyed by server-assigned identifiers. */
	const InputRequestsSchema = record(string(), InputRequestSchema);
	/** Map of embedded input responses, keyed by the corresponding request identifiers. */
	const InputResponsesSchema = record(string(), InputResponseSchema);
	/**
	* The wire InputRequiredResult: `resultType: 'input_required'` plus at least
	* one of `inputRequests` / `requestState` (the at-least-one rule is enforced
	* at the server seam, not by this parse shape).
	*/
	const InputRequiredResultSchema = wireResult({
		inputRequests: InputRequestsSchema.optional(),
		requestState: string().optional()
	});
	/** The retry-channel members carried by client-initiated requests on this revision. */
	const retryParamsShape = {
		inputResponses: InputResponsesSchema.optional(),
		requestState: string().optional()
	};
	/** Anchor InputResponseRequestParams: the retry channel on top of the required request `_meta` envelope. */
	const InputResponseRequestParamsSchema = object({
		_meta: RequestMetaEnvelopeSchema,
		...retryParamsShape
	});
	/** Post-lift request `_meta` (progressToken + extension keys; loose). */
	const DispatchRequestMetaSchema = looseObject({ progressToken: ProgressTokenSchema$1.optional() });
	function wireRequest(method, paramsShape) {
		return object({
			method: literal(method),
			params: object({
				_meta: RequestMetaEnvelopeSchema,
				...paramsShape
			})
		});
	}
	function dispatchRequest(method, paramsShape) {
		return object({
			method: literal(method),
			params: object({
				_meta: DispatchRequestMetaSchema.optional(),
				...paramsShape
			}).optional()
		});
	}
	const callToolParamsShape = {
		name: string(),
		arguments: record(string(), unknown()).optional(),
		...retryParamsShape
	};
	const paginatedParamsShape = { cursor: CursorSchema$1.optional() };
	const CallToolRequestSchema$1 = wireRequest("tools/call", callToolParamsShape);
	const ListToolsRequestSchema$1 = wireRequest("tools/list", paginatedParamsShape);
	const ListPromptsRequestSchema$1 = wireRequest("prompts/list", paginatedParamsShape);
	const GetPromptRequestSchema$1 = wireRequest("prompts/get", {
		name: string(),
		arguments: record(string(), string()).optional(),
		...retryParamsShape
	});
	const ListResourcesRequestSchema$1 = wireRequest("resources/list", paginatedParamsShape);
	const ListResourceTemplatesRequestSchema$1 = wireRequest("resources/templates/list", paginatedParamsShape);
	const ReadResourceRequestSchema$1 = wireRequest("resources/read", {
		uri: string(),
		...retryParamsShape
	});
	const completeParamsShape = {
		ref: union([PromptReferenceSchema$1, ResourceTemplateReferenceSchema$1]),
		argument: object({
			name: string(),
			value: string()
		}),
		context: object({ arguments: record(string(), string()).optional() }).optional()
	};
	const CompleteRequestSchema$1 = wireRequest("completion/complete", completeParamsShape);
	const DiscoverRequestSchema$1 = wireRequest("server/discover", {});
	/** Anchor SubscriptionFilter (2026-only). */
	const SubscriptionFilterSchema$1 = object({
		toolsListChanged: boolean().optional(),
		promptsListChanged: boolean().optional(),
		resourcesListChanged: boolean().optional(),
		resourceSubscriptions: array(string()).optional()
	});
	const subscriptionsListenParamsShape = { notifications: SubscriptionFilterSchema$1 };
	const SubscriptionsListenRequestSchema$1 = wireRequest("subscriptions/listen", subscriptionsListenParamsShape);
	/**
	* Anchor SubscriptionsListenResultMetaObject — required subscriptionId stamp on
	* the graceful-close result. Extends `ResultMetaObject` since spec PR
	* #3002 (composed, so the serverInfo key and its leniency stay single-sourced).
	*/
	const SubscriptionsListenResultMetaSchema$1 = ResultMetaSchema.extend({ "io.modelcontextprotocol/subscriptionId": RequestIdSchema$1 });
	/**
	* Anchor SubscriptionsListenResult (2026-only). The empty `subscriptions/listen`
	* response signalling that the subscription has ended gracefully (server
	* shutdown). An abrupt transport close carries no response — the client treats
	* stream-close-without-result as a disconnect.
	*/
	const SubscriptionsListenResultSchema$1 = looseObject({
		_meta: SubscriptionsListenResultMetaSchema$1,
		resultType: ResultTypeSchema.default("complete")
	});
	/** Dispatch (post-lift) request schemas, keyed by method — registry-internal. */
	const dispatchRequestSchemas = {
		"tools/call": dispatchRequest("tools/call", callToolParamsShape),
		"tools/list": dispatchRequest("tools/list", paginatedParamsShape),
		"prompts/get": dispatchRequest("prompts/get", {
			name: string(),
			arguments: record(string(), string()).optional()
		}),
		"prompts/list": dispatchRequest("prompts/list", paginatedParamsShape),
		"resources/list": dispatchRequest("resources/list", paginatedParamsShape),
		"resources/templates/list": dispatchRequest("resources/templates/list", paginatedParamsShape),
		"resources/read": dispatchRequest("resources/read", { uri: string() }),
		"completion/complete": dispatchRequest("completion/complete", completeParamsShape),
		"server/discover": dispatchRequest("server/discover", {}),
		"subscriptions/listen": dispatchRequest("subscriptions/listen", subscriptionsListenParamsShape)
	};
	/** Dispatch (post-lift) result schemas, keyed by method — what the funnel
	* validates AFTER `decodeResult` consumed `resultType`. */
	function liftedResult(shape) {
		return looseObject({
			_meta: wireMeta,
			...shape
		});
	}
	const dispatchResultSchemas = {
		"tools/call": liftedResult({
			content: array(ContentBlockSchema$1),
			structuredContent: unknown().optional(),
			isError: boolean().optional()
		}),
		"tools/list": liftedResult({
			ttlMs: number().int().min(0),
			cacheScope: _enum(["public", "private"]),
			tools: array(ToolSchema$1),
			nextCursor: CursorSchema$1.optional()
		}),
		"prompts/get": liftedResult({
			description: string().optional(),
			messages: array(PromptMessageSchema$1)
		}),
		"prompts/list": liftedResult({
			ttlMs: number().int().min(0),
			cacheScope: _enum(["public", "private"]),
			prompts: array(PromptSchema$1),
			nextCursor: CursorSchema$1.optional()
		}),
		"resources/list": liftedResult({
			ttlMs: number().int().min(0),
			cacheScope: _enum(["public", "private"]),
			resources: array(ResourceSchema$1),
			nextCursor: CursorSchema$1.optional()
		}),
		"resources/templates/list": liftedResult({
			ttlMs: number().int().min(0),
			cacheScope: _enum(["public", "private"]),
			resourceTemplates: array(ResourceTemplateSchema$1),
			nextCursor: CursorSchema$1.optional()
		}),
		"resources/read": liftedResult({
			ttlMs: number().int().min(0),
			cacheScope: _enum(["public", "private"]),
			contents: array(union([TextResourceContentsSchema$1, BlobResourceContentsSchema$1]))
		}),
		"completion/complete": liftedResult({ completion: object({
			values: array(string()).max(100),
			total: number().int().optional(),
			hasMore: boolean().optional()
		}).loose() }),
		"server/discover": liftedResult({
			ttlMs: number().int().min(0).catch(0),
			cacheScope: _enum(["public", "private"]).catch("private"),
			supportedVersions: array(string()),
			capabilities: ServerCapabilities2026Schema,
			instructions: string().optional()
		}),
		"subscriptions/listen": liftedResult({})
	};
	/**
	* Notification `_meta` (anchor `NotificationMetaObject`): loose, with the
	* subscriptions/listen demux key typed when present. Only the anchor-exact
	* SHAPE is modeled here — listen delivery itself (filter gating, demux,
	* teardown) is #14 scope and not implemented by this module.
	*/
	const NotificationMetaSchema = looseObject({ "io.modelcontextprotocol/subscriptionId": RequestIdSchema$1.optional() });
	/** Anchor SubscriptionsAcknowledgedNotification (2026-only). */
	const SubscriptionsAcknowledgedNotificationSchema$1 = object({
		method: literal("notifications/subscriptions/acknowledged"),
		params: object({
			_meta: NotificationMetaSchema.optional(),
			notifications: SubscriptionFilterSchema$1
		})
	});
	/**
	* 2026-era `notifications/cancelled` params (anchor-exact fork): `requestId`
	* is REQUIRED on this revision — the shared schema keeps it optional because
	* the frozen 2025-11-25 shape declares it optional (task cancellation goes
	* through `tasks/cancel` there). Requiredness is bare because no 2025-era
	* traffic touches this module.
	*/
	const CancelledNotificationParamsSchema$1 = object({
		_meta: NotificationMetaSchema.optional(),
		requestId: RequestIdSchema$1,
		reason: string().optional()
	});
	/** 2026-era `notifications/cancelled` (see the params fork above). */
	const CancelledNotificationSchema$1 = object({
		method: literal("notifications/cancelled"),
		params: CancelledNotificationParamsSchema$1
	});
	const notificationSchemas2026 = {
		"notifications/cancelled": CancelledNotificationSchema$1,
		"notifications/progress": ProgressNotificationSchema$1,
		"notifications/message": LoggingMessageNotificationSchema$1,
		"notifications/resources/updated": ResourceUpdatedNotificationSchema$1,
		"notifications/resources/list_changed": ResourceListChangedNotificationSchema$1,
		"notifications/tools/list_changed": ToolListChangedNotificationSchema$1,
		"notifications/prompts/list_changed": PromptListChangedNotificationSchema$1,
		"notifications/subscriptions/acknowledged": SubscriptionsAcknowledgedNotificationSchema$1
	};
	const wireResultResponse = (result) => object({
		jsonrpc: literal("2.0"),
		id: union([string(), number().int()]),
		result
	}).strict();
	return {
		JSONValueSchema: JSONValueSchema$1,
		JSONObjectSchema: JSONObjectSchema$1,
		ProgressTokenSchema: ProgressTokenSchema$1,
		CursorSchema: CursorSchema$1,
		RequestIdSchema: RequestIdSchema$1,
		RoleSchema: RoleSchema$1,
		LoggingLevelSchema: LoggingLevelSchema$1,
		TaskMetadataSchema: TaskMetadataSchema$1,
		RelatedTaskMetadataSchema: RelatedTaskMetadataSchema$1,
		RequestMetaSchema: RequestMetaSchema$1,
		BaseRequestParamsSchema: BaseRequestParamsSchema$1,
		TaskAugmentedRequestParamsSchema: TaskAugmentedRequestParamsSchema$1,
		NotificationsParamsSchema: NotificationsParamsSchema$1,
		NotificationSchema: NotificationSchema$1,
		IconSchema: IconSchema$1,
		IconsSchema: IconsSchema$1,
		BaseMetadataSchema: BaseMetadataSchema$1,
		ImplementationSchema: ImplementationSchema$1,
		ClientTasksCapabilitySchema: ClientTasksCapabilitySchema$1,
		ServerTasksCapabilitySchema: ServerTasksCapabilitySchema$1,
		ClientCapabilitiesSchema: ClientCapabilitiesSchema$1,
		ServerCapabilitiesSchema: ServerCapabilitiesSchema$1,
		ProgressSchema: ProgressSchema$1,
		ProgressNotificationParamsSchema: ProgressNotificationParamsSchema$1,
		ProgressNotificationSchema: ProgressNotificationSchema$1,
		LoggingMessageNotificationParamsSchema: LoggingMessageNotificationParamsSchema$1,
		LoggingMessageNotificationSchema: LoggingMessageNotificationSchema$1,
		ResourceContentsSchema: ResourceContentsSchema$1,
		TextResourceContentsSchema: TextResourceContentsSchema$1,
		BlobResourceContentsSchema: BlobResourceContentsSchema$1,
		AnnotationsSchema: AnnotationsSchema$1,
		ResourceSchema: ResourceSchema$1,
		ResourceTemplateSchema: ResourceTemplateSchema$1,
		ResourceListChangedNotificationSchema: ResourceListChangedNotificationSchema$1,
		ResourceUpdatedNotificationParamsSchema: ResourceUpdatedNotificationParamsSchema$1,
		ResourceUpdatedNotificationSchema: ResourceUpdatedNotificationSchema$1,
		PromptArgumentSchema: PromptArgumentSchema$1,
		PromptSchema: PromptSchema$1,
		PromptListChangedNotificationSchema: PromptListChangedNotificationSchema$1,
		TextContentSchema: TextContentSchema$1,
		ImageContentSchema: ImageContentSchema$1,
		AudioContentSchema: AudioContentSchema$1,
		ToolUseContentSchema: ToolUseContentSchema$1,
		EmbeddedResourceSchema: EmbeddedResourceSchema$1,
		ResourceLinkSchema: ResourceLinkSchema$1,
		ContentBlockSchema: ContentBlockSchema$1,
		PromptMessageSchema: PromptMessageSchema$1,
		ToolAnnotationsSchema: ToolAnnotationsSchema$1,
		ToolListChangedNotificationSchema: ToolListChangedNotificationSchema$1,
		ModelHintSchema: ModelHintSchema$1,
		ModelPreferencesSchema: ModelPreferencesSchema$1,
		ToolChoiceSchema: ToolChoiceSchema$1,
		BooleanSchemaSchema: BooleanSchemaSchema$1,
		StringSchemaSchema: StringSchemaSchema$1,
		NumberSchemaSchema: NumberSchemaSchema$1,
		UntitledSingleSelectEnumSchemaSchema: UntitledSingleSelectEnumSchemaSchema$1,
		TitledSingleSelectEnumSchemaSchema: TitledSingleSelectEnumSchemaSchema$1,
		LegacyTitledEnumSchemaSchema: LegacyTitledEnumSchemaSchema$1,
		SingleSelectEnumSchemaSchema: SingleSelectEnumSchemaSchema$1,
		UntitledMultiSelectEnumSchemaSchema: UntitledMultiSelectEnumSchemaSchema$1,
		TitledMultiSelectEnumSchemaSchema: TitledMultiSelectEnumSchemaSchema$1,
		MultiSelectEnumSchemaSchema: MultiSelectEnumSchemaSchema$1,
		EnumSchemaSchema: EnumSchemaSchema$1,
		PrimitiveSchemaDefinitionSchema: PrimitiveSchemaDefinitionSchema$1,
		ElicitRequestFormParamsSchema: ElicitRequestFormParamsSchema$1,
		ResourceTemplateReferenceSchema: ResourceTemplateReferenceSchema$1,
		PromptReferenceSchema: PromptReferenceSchema$1,
		RootSchema: RootSchema$1,
		ClientCapabilities2026Schema,
		ServerCapabilities2026Schema,
		RequestMetaEnvelopeSchema,
		ToolSchema: ToolSchema$1,
		ToolResultContentSchema: ToolResultContentSchema$1,
		SamplingMessageContentBlockSchema: SamplingMessageContentBlockSchema$1,
		SamplingMessageSchema: SamplingMessageSchema$1,
		ResultTypeSchema,
		ResultMetaSchema,
		ResultSchema: ResultSchema$1,
		PaginatedResultSchema: PaginatedResultSchema$1,
		CallToolResultSchema: CallToolResultSchema$1,
		ListToolsResultSchema: ListToolsResultSchema$1,
		ListPromptsResultSchema: ListPromptsResultSchema$1,
		GetPromptResultSchema: GetPromptResultSchema$1,
		ListResourcesResultSchema: ListResourcesResultSchema$1,
		ListResourceTemplatesResultSchema: ListResourceTemplatesResultSchema$1,
		ReadResourceResultSchema: ReadResourceResultSchema$1,
		CompleteResultSchema: CompleteResultSchema$1,
		CacheableResultSchema,
		DiscoverResultSchema: DiscoverResultSchema$1,
		CreateMessageRequestParamsSchema: CreateMessageRequestParamsSchema$1,
		CreateMessageRequestSchema: CreateMessageRequestSchema$1,
		ListRootsRequestSchema: ListRootsRequestSchema$1,
		CreateMessageResultSchema: CreateMessageResultSchema$1,
		ListRootsResultSchema: ListRootsResultSchema$1,
		ElicitResultSchema: ElicitResultSchema$1,
		ElicitRequestURLParamsSchema: ElicitRequestURLParamsSchema$1,
		ElicitRequestParamsSchema: ElicitRequestParamsSchema$1,
		ElicitRequestSchema: ElicitRequestSchema$1,
		InputRequestSchema,
		InputResponseSchema,
		InputRequestsSchema,
		InputResponsesSchema,
		InputRequiredResultSchema,
		InputResponseRequestParamsSchema,
		CallToolRequestSchema: CallToolRequestSchema$1,
		ListToolsRequestSchema: ListToolsRequestSchema$1,
		ListPromptsRequestSchema: ListPromptsRequestSchema$1,
		GetPromptRequestSchema: GetPromptRequestSchema$1,
		ListResourcesRequestSchema: ListResourcesRequestSchema$1,
		ListResourceTemplatesRequestSchema: ListResourceTemplatesRequestSchema$1,
		ReadResourceRequestSchema: ReadResourceRequestSchema$1,
		CompleteRequestSchema: CompleteRequestSchema$1,
		DiscoverRequestSchema: DiscoverRequestSchema$1,
		SubscriptionFilterSchema: SubscriptionFilterSchema$1,
		SubscriptionsListenRequestSchema: SubscriptionsListenRequestSchema$1,
		SubscriptionsListenResultMetaSchema: SubscriptionsListenResultMetaSchema$1,
		SubscriptionsListenResultSchema: SubscriptionsListenResultSchema$1,
		dispatchRequestSchemas,
		dispatchResultSchemas,
		NotificationMetaSchema,
		SubscriptionsAcknowledgedNotificationSchema: SubscriptionsAcknowledgedNotificationSchema$1,
		CancelledNotificationParamsSchema: CancelledNotificationParamsSchema$1,
		CancelledNotificationSchema: CancelledNotificationSchema$1,
		notificationSchemas2026,
		JSONRPCResultResponseSchema: wireResultResponse(ResultSchema$1),
		CallToolResultResponseSchema: wireResultResponse(union([CallToolResultSchema$1, InputRequiredResultSchema])),
		ListToolsResultResponseSchema: wireResultResponse(ListToolsResultSchema$1),
		ListPromptsResultResponseSchema: wireResultResponse(ListPromptsResultSchema$1),
		GetPromptResultResponseSchema: wireResultResponse(union([GetPromptResultSchema$1, InputRequiredResultSchema])),
		ListResourcesResultResponseSchema: wireResultResponse(ListResourcesResultSchema$1),
		ListResourceTemplatesResultResponseSchema: wireResultResponse(ListResourceTemplatesResultSchema$1),
		ReadResourceResultResponseSchema: wireResultResponse(union([ReadResourceResultSchema$1, InputRequiredResultSchema])),
		CompleteResultResponseSchema: wireResultResponse(CompleteResultSchema$1),
		DiscoverResultResponseSchema: wireResultResponse(DiscoverResultSchema$1),
		SubscriptionsListenResultResponseSchema: wireResultResponse(SubscriptionsListenResultSchema$1)
	};
}
var memo;
/**
* Builds the era wire-schema set on first call and returns the same object
* thereafter. Module evaluation stays construction-free so importing the
* era codec/registry costs nothing until the first validation actually
* needs a schema; the registry, the codec, and the eager `schemas.ts`
* shim all pull through this memo, so reference identity holds across
* every consumer.
*/
function buildSchemas2026() {
	return memo ??= build();
}
/**
* The operations whose results are cacheable on the 2026-07-28 revision (the
* `CacheableResult` extenders). This list is closed: no other operation's
* result ever receives cache fields from the SDK.
*/
var CACHEABLE_RESULT_METHODS = [
	"tools/list",
	"prompts/list",
	"resources/list",
	"resources/templates/list",
	"resources/read",
	"server/discover"
];
/** Whether the given method's result is cacheable on the 2026-07-28 revision. */
function isCacheableResultMethod(method) {
	return CACHEABLE_RESULT_METHODS.includes(method);
}
/**
* The symbol-keyed carrier for a configured cache hint on a result object.
* Symbol properties are invisible to JSON serialization, so the carrier can be
* attached era-blind: only the 2026-era encode seam consumes it.
*/
var RESULT_CACHE_HINT_FALLBACK = Symbol("modelcontextprotocol.resultCacheHintFallback");
/** Reads the configured cache-hint fallback attached to a result, if any. */
function cacheHintFallbackOf(result) {
	return result[RESULT_CACHE_HINT_FALLBACK];
}
/**
* Whether a value is a valid `ttlMs`: a non-negative safe integer. Safe
* integers are required because the wire schemas validate `ttlMs` as an
* integer within `Number.MIN_SAFE_INTEGER`/`Number.MAX_SAFE_INTEGER`; a value
* outside that range is treated as invalid here so it falls through to the
* next author instead of being emitted and rejected downstream.
*/
function isValidCacheTtlMs(value) {
	return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}
/** Whether a value is a valid `cacheScope`. */
function isValidCacheScope(value) {
	return value === "public" || value === "private";
}
/**
* Error codes for protocol errors that cross the wire as JSON-RPC error responses.
* These follow the JSON-RPC specification and MCP-specific extensions.
*/
var ProtocolErrorCode = /* @__PURE__ */ function(ProtocolErrorCode$1) {
	ProtocolErrorCode$1[ProtocolErrorCode$1["ParseError"] = -32700] = "ParseError";
	ProtocolErrorCode$1[ProtocolErrorCode$1["InvalidRequest"] = -32600] = "InvalidRequest";
	ProtocolErrorCode$1[ProtocolErrorCode$1["MethodNotFound"] = -32601] = "MethodNotFound";
	ProtocolErrorCode$1[ProtocolErrorCode$1["InvalidParams"] = -32602] = "InvalidParams";
	ProtocolErrorCode$1[ProtocolErrorCode$1["InternalError"] = -32603] = "InternalError";
	/**
	* Resource not found.
	*
	* Receive-tolerated only: the SDK never EMITS `-32002` — `resources/read`
	* misses answer `-32602` (Invalid Params) on every protocol revision per
	* the 2026-07-28 spec MUST, and a handler-thrown `-32002` is mapped to
	* `-32602` at the era encode seam. The member stays importable so clients
	* can recognise `-32002` from peers built on earlier SDK releases (the
	* spec's "clients SHOULD also accept `-32002`" backwards-compatibility
	* clause). Throw `ResourceNotFoundError` instead.
	*/
	ProtocolErrorCode$1[ProtocolErrorCode$1["ResourceNotFound"] = -32002] = "ResourceNotFound";
	/**
	* Processing the request requires a capability the client did not declare
	* in the request's `clientCapabilities` (protocol revision 2026-07-28).
	*/
	ProtocolErrorCode$1[ProtocolErrorCode$1["MissingRequiredClientCapability"] = -32021] = "MissingRequiredClientCapability";
	/**
	* The request's protocol version is unknown to the server or unsupported
	* by it (protocol revision 2026-07-28).
	*/
	ProtocolErrorCode$1[ProtocolErrorCode$1["UnsupportedProtocolVersion"] = -32022] = "UnsupportedProtocolVersion";
	ProtocolErrorCode$1[ProtocolErrorCode$1["UrlElicitationRequired"] = -32042] = "UrlElicitationRequired";
	return ProtocolErrorCode$1;
}({});
/**
* Protocol errors are JSON-RPC errors that cross the wire as error responses.
* They use numeric error codes from the {@linkcode ProtocolErrorCode} enum.
*
* `instanceof` on this class (and its subclasses) is brand-matched, so it works
* across separately bundled copies of the SDK — e.g. an error constructed by
* `@modelcontextprotocol/client` matches the class re-exported by
* `@modelcontextprotocol/server` in the same process.
*/
var ProtocolError = class ProtocolError extends Error {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.ProtocolError" });
	}
	static [Symbol.hasInstance](value) {
		return brandedHasInstance(this, value);
	}
	/**
	* Brand-based type guard: equivalent to `value instanceof this`, as an
	* explicit static predicate (the axios/AWS-SDK `isInstance` style). Reads
	* the caller's own brand via `this`, so every branded subclass gets a
	* correctly-scoped guard by inheritance. Must be invoked on the class —
	* in callback position write `v => SdkError.isInstance(v)`, not
	* `.filter(SdkError.isInstance)` (detached calls throw rather than
	* silently matching nothing).
	*/
	static isInstance(value) {
		if (typeof this !== "function") throw new TypeError("isInstance must be called on the class (e.g. `SdkError.isInstance(value)`); for callbacks use `v => SdkError.isInstance(v)`");
		return brandedHasInstance(this, value);
	}
	constructor(code, message, data) {
		super(message);
		this.code = code;
		this.data = data;
		this.name = "ProtocolError";
		stampErrorBrands(this, new.target);
	}
	/**
	* Factory method to create the appropriate error type based on the error code and data
	*/
	static fromError(code, message, data) {
		if (code === ProtocolErrorCode.UrlElicitationRequired && data) {
			const errorData = data;
			if (errorData.elicitations) return new UrlElicitationRequiredError(errorData.elicitations, message);
		}
		if (code === ProtocolErrorCode.UnsupportedProtocolVersion && data) {
			const errorData = data;
			if (Array.isArray(errorData.supported) && typeof errorData.requested === "string") return new UnsupportedProtocolVersionError({
				supported: errorData.supported,
				requested: errorData.requested
			}, message);
		}
		if (code === ProtocolErrorCode.InvalidParams || code === ProtocolErrorCode.ResourceNotFound) {
			const errorData = data;
			if (typeof errorData?.uri === "string" && (code === ProtocolErrorCode.ResourceNotFound || Object.keys(errorData).length === 1)) return new ResourceNotFoundError(errorData.uri, message);
		}
		if (code === ProtocolErrorCode.MissingRequiredClientCapability && data) {
			const errorData = data;
			if (errorData.requiredCapabilities !== null && typeof errorData.requiredCapabilities === "object" && !Array.isArray(errorData.requiredCapabilities)) return new MissingRequiredClientCapabilityError({ requiredCapabilities: errorData.requiredCapabilities }, message);
		}
		return new ProtocolError(code, message, data);
	}
};
/**
* Error type for a `resources/read` miss: the requested resource does not
* exist. The wire code is `-32602` (Invalid Params) on every protocol
* revision — the spec MUST for revision 2026-07-28, and the value the v1.x
* SDK has always emitted on earlier revisions. The error data echoes the
* requested URI.
*
* Recognise this error by checking `error.data` is exactly `{ uri: string }`
* (a `-32602` whose data carries `uri` and nothing else is resource-not-found;
* any other `-32602` is an ordinary Invalid Params). For backwards compatibility, clients should also
* accept `-32002` as resource not found — earlier SDK builds emitted that
* code, and {@linkcode ProtocolError.fromError} reconstructs this class for
* either code **when `error.data` carries `uri`** (a bare `-32002` without
* `data.uri` stays a generic {@linkcode ProtocolError}). `instanceof` checks
* are brand-matched and work across separately bundled copies of the SDK.
*/
var ResourceNotFoundError = class extends ProtocolError {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.ResourceNotFoundError" });
	}
	constructor(uri, message = `Resource not found: ${uri}`) {
		super(ProtocolErrorCode.InvalidParams, message, { uri });
	}
	/** The URI that was requested and not found. */
	get uri() {
		return this.data.uri;
	}
};
/**
* Specialized error type when a tool requires a URL mode elicitation.
* This makes it nicer for the client to handle since there is specific data to work with instead of just a code to check against.
*/
var UrlElicitationRequiredError = class extends ProtocolError {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.UrlElicitationRequiredError" });
	}
	constructor(elicitations, message = `URL elicitation${elicitations.length > 1 ? "s" : ""} required`) {
		super(ProtocolErrorCode.UrlElicitationRequired, message, { elicitations });
	}
	get elicitations() {
		return this.data?.elicitations ?? [];
	}
};
/**
* Error type for the `-32022` UnsupportedProtocolVersion protocol error (protocol
* revision 2026-07-28): the request's protocol version is unknown to the server or
* unsupported by it.
*
* The error data lists the protocol versions the receiver supports (`supported`),
* so the sender can choose a mutually supported version and retry, and echoes the
* version that was requested (`requested`).
*/
var UnsupportedProtocolVersionError = class extends ProtocolError {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.UnsupportedProtocolVersionError" });
	}
	constructor(data, message = `Unsupported protocol version: ${data.requested}`) {
		super(ProtocolErrorCode.UnsupportedProtocolVersion, message, data);
	}
	/**
	* Protocol versions the receiver supports.
	*/
	get supported() {
		return this.data.supported;
	}
	/**
	* The protocol version that was requested.
	*/
	get requested() {
		return this.data.requested;
	}
};
/**
* Error type for the `-32021` MissingRequiredClientCapability protocol error
* (protocol revision 2026-07-28): processing the request requires a capability
* the client did not declare in the request's `clientCapabilities`.
*
* The error data lists the missing capabilities (`requiredCapabilities`) in
* the `ClientCapabilities` shape, so the client can see exactly what it would
* have to declare for the request to be served. On HTTP, the response status
* is `400 Bad Request`.
*
* Recognize this error by its code and `data.requiredCapabilities`, or by
* `instanceof` — checks are brand-matched and work across separately bundled
* copies of the SDK.
*/
var MissingRequiredClientCapabilityError = class extends ProtocolError {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.MissingRequiredClientCapabilityError" });
	}
	constructor(data, message = `Missing required client capabilities: ${Object.keys(data.requiredCapabilities).join(", ")}`) {
		super(ProtocolErrorCode.MissingRequiredClientCapability, message, data);
	}
	/**
	* The capabilities the server requires from the client to process the
	* request (only the missing capabilities are listed).
	*/
	get requiredCapabilities() {
		return this.data.requiredCapabilities;
	}
};
/** The default cache policy when neither the handler nor configuration provides one. */
var DEFAULT_CACHE_TTL_MS = 0;
var DEFAULT_CACHE_SCOPE = "private";
/**
* Request methods whose spec result vocabulary goes beyond `'complete'` on the
* 2026-07-28 revision: their results may be `input_required` (multi
* round-trip requests), so a handler-provided `resultType` passes through the
* stamp untouched. `subscriptions/listen` is NOT in this set: it never emits
* a JSON-RPC result — termination is stream close (HTTP) or
* `notifications/cancelled` (stdio) per the spec.
*/
var EXTENDED_RESULT_TYPE_METHODS = [
	"tools/call",
	"prompts/get",
	"resources/read"
];
/**
* Step 1 of the encode contract: ensure the outbound result carries the
* required `resultType` discriminator.
*
* - No handler-provided value → stamp `'complete'`.
* - Handler-provided `'complete'` → kept as-is.
* - Handler-provided non-`'complete'` value on a method whose vocabulary
*   allows it ({@linkcode EXTENDED_RESULT_TYPE_METHODS}) → passes through.
*   The value is forwarded verbatim — the wire vocabulary is an open union and
*   the SDK does not validate the string, so emitting a `resultType` the
*   negotiated revision does not define is the handler author's
*   responsibility.
* - Handler-provided non-`'complete'` value on any other method → internal
*   error (loud): the value would be mis-typed on the wire, and silently
*   rewriting it would hide a server bug.
*/
function stampResultType(method, result) {
	const provided = result["resultType"];
	if (provided === void 0) return {
		...result,
		resultType: "complete"
	};
	if (provided === "complete") return result;
	if (EXTENDED_RESULT_TYPE_METHODS.includes(method)) return result;
	throw new ProtocolError(ProtocolErrorCode.InternalError, `Handler for ${method} returned resultType '${String(provided)}', but results of ${method} only support 'complete' on protocol revision 2026-07-28`);
}
/**
* Step 2 of the encode contract: fill the required `ttlMs`/`cacheScope` fields
* on cacheable results.
*
* Applies only when the (post-stamp) `resultType` is `'complete'` and the
* method is one of the cacheable operations; everything else is returned
* untouched apart from removing the configured-hint carrier. Field resolution
* is per field, most specific author first: a valid handler-returned value,
* then the configured cache hint attached by the server layer, then the
* defaults. Handler-returned values are validated at encode time (`ttlMs`
* must be a non-negative integer, `cacheScope` must be `'public'` or
* `'private'`); invalid values are ignored rather than emitted.
*/
function fillCacheFields(method, result) {
	const fallback = cacheHintFallbackOf(result);
	if (result["resultType"] !== "complete" || !isCacheableResultMethod(method)) return fallback === void 0 ? result : stripCacheHintFallback(result);
	const provided = result;
	const ttlMs = isValidCacheTtlMs(provided["ttlMs"]) ? provided["ttlMs"] : resolveTtlMs(fallback);
	const cacheScope = isValidCacheScope(provided["cacheScope"]) ? provided["cacheScope"] : resolveCacheScope(fallback);
	const filled = {
		...provided,
		ttlMs,
		cacheScope
	};
	delete filled[RESULT_CACHE_HINT_FALLBACK];
	return filled;
}
function isPlainObject$4(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
/**
* Step 3 of the encode contract: stamp the server's identity into the
* result's `_meta` under `io.modelcontextprotocol/serverInfo` (spec PR #3002:
* servers SHOULD include it on every response).
*
* - No `serverInfo` supplied (a client instance, or a hand-constructed
*   protocol object) → identity function.
* - The result's `_meta` already carries the key → kept as-is (the handler
*   is the more specific author; mirrors the cache-fill resolution order).
* - A present-but-non-object `_meta` (a dynamic-caller bug) → kept as-is:
*   the stamp never rewrites handler material, and the malformed value fails
*   loudly at the peer instead of being silently replaced here.
* - Otherwise → the key is added, preserving any other `_meta` entries.
*
* Runs for every result regardless of `resultType`: the anchor types
* `Result._meta` as `ResultMetaObject` on all results, `input_required`
* included.
*/
function stampServerInfoMeta(result, serverInfo) {
	if (serverInfo === void 0) return result;
	const meta = result["_meta"];
	if (meta === void 0) return {
		...result,
		_meta: { [SERVER_INFO_META_KEY]: serverInfo }
	};
	if (!isPlainObject$4(meta)) return result;
	if (meta["io.modelcontextprotocol/serverInfo"] !== void 0) return result;
	return {
		...result,
		_meta: {
			...meta,
			[SERVER_INFO_META_KEY]: serverInfo
		}
	};
}
function resolveTtlMs(fallback) {
	return fallback !== void 0 && isValidCacheTtlMs(fallback.ttlMs) ? fallback.ttlMs : DEFAULT_CACHE_TTL_MS;
}
function resolveCacheScope(fallback) {
	return fallback !== void 0 && isValidCacheScope(fallback.cacheScope) ? fallback.cacheScope : DEFAULT_CACHE_SCOPE;
}
function stripCacheHintFallback(result) {
	const copy = { ...result };
	delete copy[RESULT_CACHE_HINT_FALLBACK];
	return copy;
}
/**
* In-band input-request vocabulary of the 2026-07-28 revision (SEP-2322
* multi round-trip requests), dispatch view.
*
* The three former server→client wire requests (`elicitation/create`,
* `sampling/createMessage`, `roots/list`) are NOT wire request methods on
* this revision — they are demoted to de-JSON-RPC'd payloads embedded in an
* `input_required` result. The multi-round-trip driver dispatches those
* embedded payloads to the client's registered handlers through the normal
* handler machinery, and these are the schemas that dispatch parses them
* with: lenient where the anchor's wire-true artifacts are strict (an
* embedded request never carries the per-request `_meta` envelope), exact
* where the vocabulary forks (the sampling shapes compose the forked
* SamplingMessage/Tool payloads).
*
* Registry membership is intentionally NOT granted here — these methods stay
* absent from the 2026-era request registry (a peer sending one as a wire
* request still gets −32601 by absence). Only the codec's
* `inputRequestSchema`/`inputResponseSchema` accessors expose them.
*/
/** The embedded input-request methods of the 2026-07-28 revision. */
var INPUT_REQUEST_METHODS_2026 = [
	"elicitation/create",
	"sampling/createMessage",
	"roots/list"
];
var maps;
function inputSchemaMaps() {
	if (maps) return maps;
	const s = buildSchemas2026();
	maps = {
		request: {
			"elicitation/create": object({
				method: literal("elicitation/create"),
				params: s.ElicitRequestParamsSchema
			}),
			"sampling/createMessage": object({
				method: literal("sampling/createMessage"),
				params: s.CreateMessageRequestParamsSchema
			}),
			"roots/list": object({
				method: literal("roots/list"),
				params: looseObject({}).optional()
			})
		},
		response: {
			"elicitation/create": s.ElicitResultSchema,
			"sampling/createMessage": s.CreateMessageResultSchema,
			"roots/list": s.ListRootsResultSchema
		}
	};
	return maps;
}
function isInputRequestMethod2026(method) {
	return INPUT_REQUEST_METHODS_2026.includes(method);
}
function getInputRequestSchema2026(method) {
	return isInputRequestMethod2026(method) ? inputSchemaMaps().request[method] : void 0;
}
function getInputResponseSchema2026(method) {
	return isInputRequestMethod2026(method) ? inputSchemaMaps().response[method] : void 0;
}
var requestMethodKeys = {
	"tools/call": null,
	"tools/list": null,
	"prompts/get": null,
	"prompts/list": null,
	"resources/list": null,
	"resources/templates/list": null,
	"resources/read": null,
	"completion/complete": null,
	"server/discover": null,
	"subscriptions/listen": null
};
var notificationMethodKeys = {
	"notifications/cancelled": null,
	"notifications/progress": null,
	"notifications/message": null,
	"notifications/resources/updated": null,
	"notifications/resources/list_changed": null,
	"notifications/tools/list_changed": null,
	"notifications/prompts/list_changed": null,
	"notifications/subscriptions/acknowledged": null
};
/** The 2026-era request-method set (registry membership = the deletion story). */
function hasRequestMethod2026(method) {
	return Object.prototype.hasOwnProperty.call(requestMethodKeys, method);
}
/** The 2026-era notification-method set. */
function hasNotificationMethod2026(method) {
	return Object.prototype.hasOwnProperty.call(notificationMethodKeys, method);
}
/** Result-map membership (same key set as the request map on this era). */
function hasResultMethod2026(method) {
	return Object.prototype.hasOwnProperty.call(requestMethodKeys, method);
}
function getRequestSchema2026(method) {
	return hasRequestMethod2026(method) ? buildSchemas2026().dispatchRequestSchemas[method] : void 0;
}
function getResultSchema2026(method) {
	return hasResultMethod2026(method) ? buildSchemas2026().dispatchResultSchemas[method] : void 0;
}
function getNotificationSchema2026(method) {
	return hasNotificationMethod2026(method) ? buildSchemas2026().notificationSchemas2026[method] : void 0;
}
Object.keys(requestMethodKeys);
Object.keys(notificationMethodKeys);
function isPlainObject$3(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
/** Tri-state wrap of an optional Zod schema lookup (the function-only contract). */
function triState(schema, raw) {
	if (schema === void 0) return {
		ok: false,
		reason: "not-in-era"
	};
	const parsed = schema.safeParse(raw);
	return parsed.success ? {
		ok: true,
		value: parsed.data
	} : {
		ok: false,
		reason: "invalid",
		message: String(parsed.error)
	};
}
var NOT_IN_ERA = {
	ok: false,
	reason: "not-in-era"
};
/**
* The reserved `_meta` keys an envelope must carry on this era (in reporting
* order). `clientInfo` is NOT here: spec PR #3002 demoted it to SHOULD, so a
* request without it is accepted (a present-but-malformed value still fails
* the envelope schema parse below).
*/
var REQUIRED_ENVELOPE_KEYS = [PROTOCOL_VERSION_META_KEY, CLIENT_CAPABILITIES_META_KEY];
/** Strip the known deleted-field set from an outbound result (Q1-SD3 iii). */
function enforceDeletedFields(method, result) {
	let next = result;
	let copied = false;
	const copy = () => {
		if (!copied) {
			next = { ...next };
			copied = true;
		}
		return next;
	};
	const tools = result.tools;
	if (method === "tools/list" && Array.isArray(tools) && tools.some((tool) => isPlainObject$3(tool) && "execution" in tool)) copy().tools = tools.map((tool) => {
		if (!isPlainObject$3(tool) || !("execution" in tool)) return tool;
		const rest = { ...tool };
		delete rest["execution"];
		return rest;
	});
	const capabilities = result.capabilities;
	if (isPlainObject$3(capabilities) && "tasks" in capabilities) {
		const rest = { ...capabilities };
		delete rest["tasks"];
		copy().capabilities = rest;
	}
	return next;
}
var rev2026Codec = {
	era: "2026-07-28",
	hasRequestMethod: hasRequestMethod2026,
	hasNotificationMethod: hasNotificationMethod2026,
	hasInputRequestMethod: (method) => getInputRequestSchema2026(method) !== void 0,
	validateRequest: (method, raw) => triState(getRequestSchema2026(method), raw),
	validateResult: (method, raw) => triState(getResultSchema2026(method), raw),
	validateNotification: (method, raw) => triState(getNotificationSchema2026(method), raw),
	validateInputRequest: (method, raw) => triState(getInputRequestSchema2026(method), raw),
	validateInputResponse: (method, raw) => triState(getInputResponseSchema2026(method), raw),
	samplingResultVariant: () => NOT_IN_ERA,
	outboundEnvelope(material) {
		return {
			[PROTOCOL_VERSION_META_KEY]: material.protocolVersion,
			[CLIENT_INFO_META_KEY]: material.clientInfo,
			[CLIENT_CAPABILITIES_META_KEY]: material.clientCapabilities,
			...material.logLevel !== void 0 && { ["io.modelcontextprotocol/logLevel"]: material.logLevel }
		};
	},
	validateEnvelopeMeta(meta) {
		const issues = [];
		for (const key of REQUIRED_ENVELOPE_KEYS) if (!(key in meta)) issues.push({
			key,
			problem: "missing"
		});
		const parsed = buildSchemas2026().RequestMetaEnvelopeSchema.safeParse(meta);
		if (!parsed.success) for (const issue of parsed.error.issues) {
			const path = issue.path.map(String);
			const key = path.length > 0 ? path.join(".") : "_meta";
			if (path.length === 1 && issues.some((existing) => existing.key === key && existing.problem === "missing")) continue;
			issues.push({
				key,
				problem: issue.message
			});
		}
		return issues;
	},
	projectCallToolResult: (result) => appendTextFallbackForNonObject(result),
	inputRequestSchema: getInputRequestSchema2026,
	decodeResult(method, raw) {
		if (!isPlainObject$3(raw)) return {
			kind: "invalid",
			error: new SdkError(SdkErrorCode.InvalidResult, `Invalid result for ${method}: not an object`, { method })
		};
		const rawResultType = raw["resultType"];
		if (rawResultType === void 0) return {
			kind: "invalid",
			error: new SdkError(SdkErrorCode.InvalidResult, `Invalid result for ${method}: missing required resultType — servers implementing protocol revision 2026-07-28 MUST include it (the absent-means-complete bridge applies only to earlier-revision servers)`, {
				method,
				violation: "missing-resultType"
			})
		};
		if (typeof rawResultType !== "string") return {
			kind: "invalid",
			error: new SdkError(SdkErrorCode.InvalidResult, `Invalid result for ${method}: non-string resultType`, {
				method,
				resultType: rawResultType
			})
		};
		if (rawResultType === "input_required") {
			const rawInputRequests = raw["inputRequests"];
			const inputRequests = isPlainObject$3(rawInputRequests) ? rawInputRequests : {};
			const requestState = raw["requestState"];
			const metaParse = raw["_meta"] === void 0 ? void 0 : buildSchemas2026().ResultMetaSchema.safeParse(raw["_meta"]);
			const meta = metaParse?.success ? metaParse.data : void 0;
			if (Object.keys(inputRequests).length === 0 && typeof requestState !== "string") return {
				kind: "invalid",
				error: new SdkError(SdkErrorCode.InvalidResult, `Invalid result for ${method}: input_required carries neither inputRequests nor requestState (every input_required result must include at least one of the two)`, {
					method,
					violation: "input-required-missing-both"
				})
			};
			return {
				kind: "input_required",
				inputRequests,
				...typeof requestState === "string" && { requestState },
				...meta !== void 0 && { _meta: meta }
			};
		}
		if (rawResultType !== "complete") return {
			kind: "invalid",
			error: new SdkError(SdkErrorCode.UnsupportedResultType, `Unsupported result type '${rawResultType}' for ${method}`, {
				resultType: rawResultType,
				method
			})
		};
		const wireResultSchemas = getWireResultSchemas();
		const wireSchema = Object.hasOwn(wireResultSchemas, method) ? wireResultSchemas[method] : void 0;
		if (wireSchema !== void 0) {
			const parsed = wireSchema.safeParse(raw);
			if (!parsed.success) return {
				kind: "invalid",
				error: new SdkError(SdkErrorCode.InvalidResult, `Invalid result for ${method}: ${parsed.error}`, { method })
			};
		}
		const lifted = { ...raw };
		delete lifted["resultType"];
		return {
			kind: "complete",
			result: lifted
		};
	},
	encodeResult(method, result, serverInfo) {
		return stampServerInfoMeta(fillCacheFields(method, stampResultType(method, enforceDeletedFields(method, result))), serverInfo);
	},
	encodeErrorCode: (code) => code === -32002 ? -32602 : code,
	checkInboundEnvelope(material) {
		if (material.envelope === void 0) return "Request is missing the required _meta envelope for protocol revision 2026-07-28 (io.modelcontextprotocol/protocolVersion, io.modelcontextprotocol/clientCapabilities)";
		const parsed = buildSchemas2026().RequestMetaEnvelopeSchema.safeParse(material.envelope);
		if (!parsed.success) return `Invalid _meta envelope for protocol revision 2026-07-28: ${parsed.error.issues.map((issue) => issue.message).join("; ")}`;
	}
};
/** Wire-true result wrappers consulted by decode step 2, keyed by method —
* built once through the era's schema memo on the first decode. */
var wireResultSchemasMemo;
function getWireResultSchemas() {
	if (wireResultSchemasMemo) return wireResultSchemasMemo;
	const s = buildSchemas2026();
	wireResultSchemasMemo = {
		"tools/call": s.CallToolResultSchema,
		"tools/list": s.ListToolsResultSchema,
		"prompts/get": s.GetPromptResultSchema,
		"prompts/list": s.ListPromptsResultSchema,
		"resources/list": s.ListResourcesResultSchema,
		"resources/templates/list": s.ListResourceTemplatesResultSchema,
		"resources/read": s.ReadResourceResultSchema,
		"completion/complete": s.CompleteResultSchema,
		"server/discover": s.DiscoverResultSchema
	};
	return wireResultSchemasMemo;
}
/**
* The modern wire revision literal. Internal only — deliberately NOT a public
* constant (G-D2-4: no public modern-version constant ships before era-aware
* list semantics exist).
*/
var MODERN_WIRE_REVISION = "2026-07-28";
/**
* Era resolution, many-to-one (Q1-SD1): every modern-era revision
* (`>= 2026-07-28`) → the 2026-era codec; every legacy revision (the five
* `SUPPORTED_PROTOCOL_VERSIONS`) and `undefined`/unknown → the 2025-era
* codec (the DV-13 default posture — hand-constructed instances and
* unclassified traffic are legacy-era). This is the same era predicate the
* rest of the SDK uses ({@link isModernProtocolVersion}); a pinned modern
* revision other than the literal '2026-07-28' must still resolve modern.
*/
function codecForVersion(version) {
	return version !== void 0 && isModernProtocolVersion(version) ? rev2026Codec : rev2025Codec;
}
/**
* The wire era an edge classification names (Q2 — produced at the
* transport/entry edge; this layer only CONSUMES it). The dispatch funnel no
* longer resolves a codec FROM the classification: era is instance state, and
* a classified inbound message is VALIDATED against the instance era — a
* mismatch is an entry/routing error, never a per-message era switch. The
* exact `revision` wins over the coarse era flag when both are present.
*/
function classifiedWireEra(classification) {
	if (classification.revision !== void 0) return codecForVersion(classification.revision).era;
	return classification.era === "modern" ? rev2026Codec.era : rev2025Codec.era;
}
/**
* The derived spec-method universe: the union of every codec registry. A
* method in this set is era-gated at dispatch and send time; a method outside
* it is a consumer-owned extension method (era-blind, schema-explicit).
* Derived from the registries — never hand-curated (the LEGACY_ONLY_METHODS
* table class is exactly what registry membership replaces).
*/
function isSpecRequestMethod(method) {
	return ALL_CODECS.some((codec) => codec.hasRequestMethod(method));
}
function isSpecNotificationMethod(method) {
	return ALL_CODECS.some((codec) => codec.hasNotificationMethod(method));
}
/** The names SEP-2663 re-defines for the Tasks extension on the era that removed them from core. */
function isExtensionReusedRequestMethod(method) {
	return method === "tasks/get" || method === "tasks/cancel";
}
var ALL_CODECS = [rev2025Codec, rev2026Codec];
var schemas_exports = /* @__PURE__ */ __exportAll({
	AnnotationsSchema: () => AnnotationsSchema,
	AudioContentSchema: () => AudioContentSchema,
	BaseMetadataSchema: () => BaseMetadataSchema,
	BaseRequestParamsSchema: () => BaseRequestParamsSchema,
	BlobResourceContentsSchema: () => BlobResourceContentsSchema,
	BooleanSchemaSchema: () => BooleanSchemaSchema,
	CallToolRequestParamsSchema: () => CallToolRequestParamsSchema,
	CallToolRequestSchema: () => CallToolRequestSchema,
	CallToolResultSchema: () => CallToolResultSchema,
	CancelTaskRequestSchema: () => CancelTaskRequestSchema,
	CancelTaskResultSchema: () => CancelTaskResultSchema,
	CancelledNotificationParamsSchema: () => CancelledNotificationParamsSchema,
	CancelledNotificationSchema: () => CancelledNotificationSchema,
	ClientCapabilitiesSchema: () => ClientCapabilitiesSchema,
	ClientNotificationSchema: () => ClientNotificationSchema,
	ClientRequestSchema: () => ClientRequestSchema,
	ClientResultSchema: () => ClientResultSchema,
	ClientTasksCapabilitySchema: () => ClientTasksCapabilitySchema,
	CompatibilityCallToolResultSchema: () => CompatibilityCallToolResultSchema,
	CompleteRequestParamsSchema: () => CompleteRequestParamsSchema,
	CompleteRequestSchema: () => CompleteRequestSchema,
	CompleteResultSchema: () => CompleteResultSchema,
	ContentBlockSchema: () => ContentBlockSchema,
	CreateMessageRequestParamsSchema: () => CreateMessageRequestParamsSchema,
	CreateMessageRequestSchema: () => CreateMessageRequestSchema,
	CreateMessageResultSchema: () => CreateMessageResultSchema,
	CreateMessageResultWithToolsSchema: () => CreateMessageResultWithToolsSchema,
	CreateTaskResultSchema: () => CreateTaskResultSchema,
	CursorSchema: () => CursorSchema,
	DiscoverRequestSchema: () => DiscoverRequestSchema,
	DiscoverResultSchema: () => DiscoverResultSchema,
	ElicitRequestFormParamsSchema: () => ElicitRequestFormParamsSchema,
	ElicitRequestParamsSchema: () => ElicitRequestParamsSchema,
	ElicitRequestSchema: () => ElicitRequestSchema,
	ElicitRequestURLParamsSchema: () => ElicitRequestURLParamsSchema,
	ElicitResultSchema: () => ElicitResultSchema,
	ElicitationCompleteNotificationParamsSchema: () => ElicitationCompleteNotificationParamsSchema,
	ElicitationCompleteNotificationSchema: () => ElicitationCompleteNotificationSchema,
	EmbeddedResourceSchema: () => EmbeddedResourceSchema,
	EmptyResultSchema: () => EmptyResultSchema,
	EnumSchemaSchema: () => EnumSchemaSchema,
	GetPromptRequestParamsSchema: () => GetPromptRequestParamsSchema,
	GetPromptRequestSchema: () => GetPromptRequestSchema,
	GetPromptResultSchema: () => GetPromptResultSchema,
	GetTaskPayloadRequestSchema: () => GetTaskPayloadRequestSchema,
	GetTaskPayloadResultSchema: () => GetTaskPayloadResultSchema,
	GetTaskRequestSchema: () => GetTaskRequestSchema,
	GetTaskResultSchema: () => GetTaskResultSchema,
	IconSchema: () => IconSchema,
	IconsSchema: () => IconsSchema,
	ImageContentSchema: () => ImageContentSchema,
	ImplementationSchema: () => ImplementationSchema,
	InitializeRequestParamsSchema: () => InitializeRequestParamsSchema,
	InitializeRequestSchema: () => InitializeRequestSchema,
	InitializeResultSchema: () => InitializeResultSchema,
	InitializedNotificationSchema: () => InitializedNotificationSchema,
	JSONArraySchema: () => JSONArraySchema,
	JSONObjectSchema: () => JSONObjectSchema,
	JSONRPCErrorResponseSchema: () => JSONRPCErrorResponseSchema,
	JSONRPCMessageSchema: () => JSONRPCMessageSchema,
	JSONRPCNotificationSchema: () => JSONRPCNotificationSchema,
	JSONRPCRequestSchema: () => JSONRPCRequestSchema,
	JSONRPCResponseSchema: () => JSONRPCResponseSchema,
	JSONRPCResultResponseSchema: () => JSONRPCResultResponseSchema,
	JSONValueSchema: () => JSONValueSchema,
	LegacyTitledEnumSchemaSchema: () => LegacyTitledEnumSchemaSchema,
	ListChangedOptionsBaseSchema: () => ListChangedOptionsBaseSchema,
	ListPromptsRequestSchema: () => ListPromptsRequestSchema,
	ListPromptsResultSchema: () => ListPromptsResultSchema,
	ListResourceTemplatesRequestSchema: () => ListResourceTemplatesRequestSchema,
	ListResourceTemplatesResultSchema: () => ListResourceTemplatesResultSchema,
	ListResourcesRequestSchema: () => ListResourcesRequestSchema,
	ListResourcesResultSchema: () => ListResourcesResultSchema,
	ListRootsRequestSchema: () => ListRootsRequestSchema,
	ListRootsResultSchema: () => ListRootsResultSchema,
	ListTasksRequestSchema: () => ListTasksRequestSchema,
	ListTasksResultSchema: () => ListTasksResultSchema,
	ListToolsRequestSchema: () => ListToolsRequestSchema,
	ListToolsResultSchema: () => ListToolsResultSchema,
	LoggingLevelSchema: () => LoggingLevelSchema,
	LoggingMessageNotificationParamsSchema: () => LoggingMessageNotificationParamsSchema,
	LoggingMessageNotificationSchema: () => LoggingMessageNotificationSchema,
	ModelHintSchema: () => ModelHintSchema,
	ModelPreferencesSchema: () => ModelPreferencesSchema,
	MultiSelectEnumSchemaSchema: () => MultiSelectEnumSchemaSchema,
	NotificationSchema: () => NotificationSchema,
	NotificationsParamsSchema: () => NotificationsParamsSchema,
	NumberSchemaSchema: () => NumberSchemaSchema,
	PaginatedRequestParamsSchema: () => PaginatedRequestParamsSchema,
	PaginatedRequestSchema: () => PaginatedRequestSchema,
	PaginatedResultSchema: () => PaginatedResultSchema,
	PingRequestSchema: () => PingRequestSchema,
	PrimitiveSchemaDefinitionSchema: () => PrimitiveSchemaDefinitionSchema,
	ProgressNotificationParamsSchema: () => ProgressNotificationParamsSchema,
	ProgressNotificationSchema: () => ProgressNotificationSchema,
	ProgressSchema: () => ProgressSchema,
	ProgressTokenSchema: () => ProgressTokenSchema,
	PromptArgumentSchema: () => PromptArgumentSchema,
	PromptListChangedNotificationSchema: () => PromptListChangedNotificationSchema,
	PromptMessageSchema: () => PromptMessageSchema,
	PromptReferenceSchema: () => PromptReferenceSchema,
	PromptSchema: () => PromptSchema,
	ReadResourceRequestParamsSchema: () => ReadResourceRequestParamsSchema,
	ReadResourceRequestSchema: () => ReadResourceRequestSchema,
	ReadResourceResultSchema: () => ReadResourceResultSchema,
	RelatedTaskMetadataSchema: () => RelatedTaskMetadataSchema,
	RequestIdSchema: () => RequestIdSchema,
	RequestMetaSchema: () => RequestMetaSchema,
	RequestSchema: () => RequestSchema,
	ResourceContentsSchema: () => ResourceContentsSchema,
	ResourceLinkSchema: () => ResourceLinkSchema,
	ResourceListChangedNotificationSchema: () => ResourceListChangedNotificationSchema,
	ResourceRequestParamsSchema: () => ResourceRequestParamsSchema,
	ResourceSchema: () => ResourceSchema,
	ResourceTemplateReferenceSchema: () => ResourceTemplateReferenceSchema,
	ResourceTemplateSchema: () => ResourceTemplateSchema,
	ResourceUpdatedNotificationParamsSchema: () => ResourceUpdatedNotificationParamsSchema,
	ResourceUpdatedNotificationSchema: () => ResourceUpdatedNotificationSchema,
	ResultMetaObjectSchema: () => ResultMetaObjectSchema,
	ResultSchema: () => ResultSchema,
	RoleSchema: () => RoleSchema,
	RootSchema: () => RootSchema,
	RootsListChangedNotificationSchema: () => RootsListChangedNotificationSchema,
	SamplingContentSchema: () => SamplingContentSchema,
	SamplingMessageContentBlockSchema: () => SamplingMessageContentBlockSchema,
	SamplingMessageSchema: () => SamplingMessageSchema,
	ServerCapabilitiesSchema: () => ServerCapabilitiesSchema,
	ServerNotificationSchema: () => ServerNotificationSchema,
	ServerRequestSchema: () => ServerRequestSchema,
	ServerResultSchema: () => ServerResultSchema,
	ServerTasksCapabilitySchema: () => ServerTasksCapabilitySchema,
	SetLevelRequestParamsSchema: () => SetLevelRequestParamsSchema,
	SetLevelRequestSchema: () => SetLevelRequestSchema,
	SingleSelectEnumSchemaSchema: () => SingleSelectEnumSchemaSchema,
	StringSchemaSchema: () => StringSchemaSchema,
	SubscribeRequestParamsSchema: () => SubscribeRequestParamsSchema,
	SubscribeRequestSchema: () => SubscribeRequestSchema,
	SubscriptionFilterSchema: () => SubscriptionFilterSchema,
	SubscriptionsAcknowledgedNotificationParamsSchema: () => SubscriptionsAcknowledgedNotificationParamsSchema,
	SubscriptionsAcknowledgedNotificationSchema: () => SubscriptionsAcknowledgedNotificationSchema,
	SubscriptionsListenRequestParamsSchema: () => SubscriptionsListenRequestParamsSchema,
	SubscriptionsListenRequestSchema: () => SubscriptionsListenRequestSchema,
	SubscriptionsListenResultMetaSchema: () => SubscriptionsListenResultMetaSchema,
	SubscriptionsListenResultSchema: () => SubscriptionsListenResultSchema,
	TaskAugmentedRequestParamsSchema: () => TaskAugmentedRequestParamsSchema,
	TaskCreationParamsSchema: () => TaskCreationParamsSchema,
	TaskMetadataSchema: () => TaskMetadataSchema,
	TaskSchema: () => TaskSchema,
	TaskStatusNotificationParamsSchema: () => TaskStatusNotificationParamsSchema,
	TaskStatusNotificationSchema: () => TaskStatusNotificationSchema,
	TaskStatusSchema: () => TaskStatusSchema,
	TextContentSchema: () => TextContentSchema,
	TextResourceContentsSchema: () => TextResourceContentsSchema,
	TitledMultiSelectEnumSchemaSchema: () => TitledMultiSelectEnumSchemaSchema,
	TitledSingleSelectEnumSchemaSchema: () => TitledSingleSelectEnumSchemaSchema,
	ToolAnnotationsSchema: () => ToolAnnotationsSchema,
	ToolChoiceSchema: () => ToolChoiceSchema,
	ToolExecutionSchema: () => ToolExecutionSchema,
	ToolListChangedNotificationSchema: () => ToolListChangedNotificationSchema,
	ToolResultContentSchema: () => ToolResultContentSchema,
	ToolSchema: () => ToolSchema,
	ToolUseContentSchema: () => ToolUseContentSchema,
	UnsubscribeRequestParamsSchema: () => UnsubscribeRequestParamsSchema,
	UnsubscribeRequestSchema: () => UnsubscribeRequestSchema,
	UntitledMultiSelectEnumSchemaSchema: () => UntitledMultiSelectEnumSchemaSchema,
	UntitledSingleSelectEnumSchemaSchema: () => UntitledSingleSelectEnumSchemaSchema
});
var isJSONRPCRequest = (value) => JSONRPCRequestSchema.safeParse(value).success;
var isJSONRPCNotification = (value) => JSONRPCNotificationSchema.safeParse(value).success;
/**
* Checks if a value is a valid {@linkcode JSONRPCResultResponse}.
* @param value - The value to check.
*
* @returns True if the value is a valid {@linkcode JSONRPCResultResponse}, false otherwise.
*/
var isJSONRPCResultResponse = (value) => JSONRPCResultResponseSchema.safeParse(value).success;
/**
* Checks if a value is a valid {@linkcode JSONRPCErrorResponse}.
* @param value - The value to check.
*
* @returns True if the value is a valid {@linkcode JSONRPCErrorResponse}, false otherwise.
*/
var isJSONRPCErrorResponse = (value) => JSONRPCErrorResponseSchema.safeParse(value).success;
ProtocolErrorCode.InvalidRequest, ProtocolErrorCode.UnsupportedProtocolVersion, ProtocolErrorCode.InvalidParams, ProtocolErrorCode.MethodNotFound, ProtocolErrorCode.InvalidParams, ProtocolErrorCode.MissingRequiredClientCapability;
ProtocolErrorCode.ParseError, ProtocolErrorCode.InvalidRequest, ProtocolErrorCode.MethodNotFound, ProtocolErrorCode.UnsupportedProtocolVersion, ProtocolErrorCode.MissingRequiredClientCapability;
/**
* Internal Zod schema utilities for protocol handling.
* These are used internally by the SDK for protocol message validation.
*/
/**
* Parses data against a Zod schema (synchronous).
* Returns a discriminated union with success/error.
*/
function parseSchema(schema, data) {
	return safeParse(schema, data);
}
/**
* Union of the declared shape keys across several Zod object schemas.
*/
function shapeKeys(schemas) {
	return new Set(schemas.flatMap((schema) => Object.keys(schema.shape)));
}
/**
* Standard Schema utilities for user-provided schemas.
* Supports Zod v4, Valibot, ArkType, and other Standard Schema implementations.
* @see https://standardschema.dev
*/
function isStandardSchema(schema) {
	if (schema == null) return false;
	const schemaType = typeof schema;
	if (schemaType !== "object" && schemaType !== "function") return false;
	if (!("~standard" in schema)) return false;
	return typeof schema["~standard"]?.validate === "function";
}
var warnedZodFallback = false;
/** JSON Schema draft targeted by every conversion; shared so pattern references above stay in lockstep. */
var JSON_SCHEMA_CONVERSION_TARGET = "draft-2020-12";
/**
* Converts a StandardSchema to JSON Schema for use as an MCP tool/prompt schema.
*
* MCP requires `type: "object"` at the root of tool `inputSchema` and prompt
* argument schemas; `outputSchema` may have any JSON Schema root (SEP-2106).
* Zod's discriminated unions emit `{oneOf: [...]}` without a top-level `type`,
* so for `io: 'input'` this function defaults `type` to `"object"` when absent
* and throws on an explicit non-object `type` (e.g. `z.string()`). For
* `io: 'output'` a non-object root is returned as-is; the `"object"` default is
* applied only when the root is provably object-shaped.
*/
function standardSchemaToJsonSchema(schema, io = "input") {
	const std = schema["~standard"];
	let result;
	if (std.jsonSchema) result = std.jsonSchema[io]({ target: JSON_SCHEMA_CONVERSION_TARGET });
	else if (std.vendor === "zod") {
		if (!("_zod" in schema)) throw new Error("Schema appears to be from zod 3, which the SDK cannot convert to JSON Schema. Upgrade to zod >=4.2.0, or wrap your JSON Schema with fromJsonSchema().");
		if (!warnedZodFallback) {
			warnedZodFallback = true;
			console.warn("[mcp-sdk] Your zod version does not implement `~standard.jsonSchema` (added in zod 4.2.0). Falling back to z.toJSONSchema(). Upgrade to zod >=4.2.0 to silence this warning.");
		}
		result = toJSONSchema(schema, {
			target: JSON_SCHEMA_CONVERSION_TARGET,
			io
		});
	} else throw new Error(`Schema library "${std.vendor}" does not implement StandardJSONSchemaV1 (\`~standard.jsonSchema\`). Upgrade to a version that does, or wrap your JSON Schema with fromJsonSchema().`);
	if (io === "output") {
		if (result.type !== void 0) return result;
		return isProvablyObjectShapedRoot(result) ? {
			type: "object",
			...result
		} : result;
	}
	if (result.type !== void 0 && result.type !== "object") throw new Error(`MCP tool and prompt schemas must describe objects (got type: ${JSON.stringify(result.type)}). Wrap your schema in z.object({...}) or equivalent.`);
	return {
		type: "object",
		...result
	};
}
/**
* A typeless JSON Schema root is "provably object-shaped" when either it carries object keywords
* directly (`properties`/`patternProperties`/`additionalProperties`/`required`), or it is a
* composition (`oneOf`/`anyOf`/`allOf`) whose every member is itself `type:'object'` or recursively
* provably object-shaped (e.g. a nested `discriminatedUnion`). `$ref` is not followed. Used to
* decide whether stamping `type:'object'` is safe (redundant-but-valid) versus self-contradictory.
*/
function isProvablyObjectShapedRoot(schema) {
	if ("properties" in schema || "patternProperties" in schema || "additionalProperties" in schema || "required" in schema) return true;
	for (const key of [
		"oneOf",
		"anyOf",
		"allOf"
	]) {
		const members = schema[key];
		if (Array.isArray(members) && members.length > 0) return members.every((m) => m !== null && typeof m === "object" && (m.type === "object" || isProvablyObjectShapedRoot(m)));
	}
	return false;
}
function formatIssue(issue) {
	if (!issue.path?.length) return issue.message;
	return `${issue.path.map((p) => String(typeof p === "object" ? p.key : p)).join(".")}: ${issue.message}`;
}
async function validateStandardSchema(schema, data) {
	const result = await schema["~standard"].validate(data);
	if (result.issues && result.issues.length > 0) return {
		success: false,
		error: result.issues.map((i) => formatIssue(i)).join(", ")
	};
	return {
		success: true,
		data: result.value
	};
}
function zodEmittedPattern(schema) {
	const jsonSchema = toJSONSchema(schema, {
		target: JSON_SCHEMA_CONVERSION_TARGET,
		io: "input"
	});
	return typeof jsonSchema.pattern === "string" ? jsonSchema.pattern : void 0;
}
var DATETIME_FRACTION_DIGITS = /\\\.\\d\{(\d+)\}/;
function datetimeReferenceSchemas(pattern) {
	const fractionDigits = DATETIME_FRACTION_DIGITS.exec(pattern);
	const precisions = [
		void 0,
		-1,
		0
	];
	if (fractionDigits) precisions.push(Number(fractionDigits[1]));
	return [false, true].flatMap((local) => [false, true].flatMap((offset) => precisions.map((precision) => datetime({
		local,
		offset,
		precision
	}))));
}
function referencePatternsForFormat(format, pattern) {
	let referenceSchemas;
	switch (format) {
		case "email":
			referenceSchemas = [email()];
			break;
		case "uri":
			referenceSchemas = [url()];
			break;
		case "date":
			referenceSchemas = [date$1()];
			break;
		case "date-time":
			referenceSchemas = datetimeReferenceSchemas(pattern);
			break;
	}
	return new Set(referenceSchemas.map((schema) => zodEmittedPattern(schema)).filter((emitted) => emitted !== void 0));
}
/** Whether `pattern` is the library's own realization of `format` (droppable) rather than a user customization. */
function isLibraryFormatPattern(format, pattern, vendor) {
	if (vendor !== "zod") return true;
	return referencePatternsForFormat(format, pattern).has(pattern);
}
function isJsonObject(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function convertStandardElicitationSchema(schema) {
	try {
		return standardSchemaToJsonSchema(schema, "input");
	} catch (error) {
		const detail = error instanceof Error ? error.message : String(error);
		throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Elicitation requestedSchema must describe an object with flat primitive properties: ${detail}`);
	}
}
var ANNOTATION_ONLY_JSON_SCHEMA_KEYWORDS = /* @__PURE__ */ new Set([
	"$comment",
	"deprecated",
	"description",
	"examples",
	"readOnly",
	"title",
	"writeOnly"
]);
function isAnnotationOnlyJsonSchemaKeyword(key) {
	return ANNOTATION_ONLY_JSON_SCHEMA_KEYWORDS.has(key) || key.startsWith("x-");
}
var ROOT_KEYS = /* @__PURE__ */ new Set(["$schema", ...Object.keys(ElicitRequestFormParamsSchema.shape.requestedSchema.shape)]);
var PROPERTY_KEYS_BY_TYPE = {
	string: shapeKeys([
		StringSchemaSchema,
		UntitledSingleSelectEnumSchemaSchema,
		TitledSingleSelectEnumSchemaSchema,
		LegacyTitledEnumSchemaSchema
	]),
	number: shapeKeys([NumberSchemaSchema]),
	integer: shapeKeys([NumberSchemaSchema]),
	boolean: shapeKeys([BooleanSchemaSchema]),
	array: shapeKeys([UntitledMultiSelectEnumSchemaSchema, TitledMultiSelectEnumSchemaSchema])
};
var SUPPORTED_STRING_FORMATS = new Set(StringSchemaSchema.shape.format.unwrap().options);
/** Walks one property node: keeps grammar keys, drops the library format pattern, rejects unknown constraints. */
function walkProperty(node, path, vendor, unsupported) {
	if (!isJsonObject(node)) return node;
	const allowedKeys = typeof node.type === "string" && Object.hasOwn(PROPERTY_KEYS_BY_TYPE, node.type) ? PROPERTY_KEYS_BY_TYPE[node.type] : void 0;
	if (allowedKeys === void 0) return node;
	const pruned = {};
	for (const [key, value] of Object.entries(node)) if (allowedKeys.has(key) || isAnnotationOnlyJsonSchemaKeyword(key)) pruned[key] = value;
	else if (key === "pattern" && node.type === "string" && typeof node.format === "string") {
		if (!SUPPORTED_STRING_FORMATS.has(node.format)) pruned[key] = value;
		else if (typeof value !== "string" || !isLibraryFormatPattern(node.format, value, vendor)) unsupported.push(`${path}.${key}`);
	} else unsupported.push(`${path}.${key}`);
	return pruned;
}
/** Walks the schema root: keeps the spec root keys, drops annotations, rejects the rest. */
function walkRequestedSchema(converted, vendor) {
	const pruned = {};
	const unsupported = [];
	for (const [key, value] of Object.entries(converted)) if (key === "properties" && isJsonObject(value)) pruned[key] = Object.fromEntries(Object.entries(value).map(([name, node]) => [name, walkProperty(node, `properties.${name}`, vendor, unsupported)]));
	else if (ROOT_KEYS.has(key)) pruned[key] = value;
	else if (!isAnnotationOnlyJsonSchemaKeyword(key)) unsupported.push(key);
	if (unsupported.length > 0) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Elicitation requestedSchema contains unsupported JSON Schema constraint(s) after Standard Schema conversion: ${unsupported.join(", ")}`);
	return pruned;
}
/** Names the properties that fail value validation, instead of surfacing a raw union dump. */
function describeUnsupportedProperties(pruned, fallback) {
	if (!isJsonObject(pruned.properties)) return fallback;
	const offenders = Object.entries(pruned.properties).filter(([, node]) => !parseSchema(PrimitiveSchemaDefinitionSchema, node).success).map(([name]) => `properties.${name}`);
	return offenders.length > 0 ? offenders.join(", ") : fallback;
}
function findDroppedConstraintPaths(original, parsed, path = "") {
	if (Array.isArray(original) && Array.isArray(parsed)) return original.flatMap((item, index) => findDroppedConstraintPaths(item, parsed[index], `${path}[${index}]`));
	if (!isJsonObject(original) || !isJsonObject(parsed)) return [];
	return Object.entries(original).flatMap(([key, value]) => {
		const childPath = path ? `${path}.${key}` : key;
		if (!Object.prototype.hasOwnProperty.call(parsed, key)) return isAnnotationOnlyJsonSchemaKeyword(key) ? [] : [childPath];
		return findDroppedConstraintPaths(value, parsed[key], childPath);
	});
}
/** Converts an authoring-friendly elicitation input into its wire-ready form. */
function normalizeElicitInputParams(input) {
	if (!isStandardSchema(input.requestedSchema)) return {
		...input,
		mode: "form",
		requestedSchema: input.requestedSchema
	};
	const vendor = input.requestedSchema["~standard"].vendor;
	const pruned = walkRequestedSchema(convertStandardElicitationSchema(input.requestedSchema), vendor);
	const parsed = parseSchema(ElicitRequestFormParamsSchema.shape.requestedSchema, pruned);
	if (!parsed.success) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Elicitation requestedSchema only supports flat primitive properties (string, number, integer, boolean, and string enums): ${describeUnsupportedProperties(pruned, parsed.error.message)}`);
	const droppedConstraints = findDroppedConstraintPaths(pruned, parsed.data);
	if (droppedConstraints.length > 0) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Elicitation requestedSchema contains unsupported JSON Schema constraint(s) after Standard Schema conversion: ${droppedConstraints.join(", ")}`);
	const danglingRequired = (parsed.data.required ?? []).filter((key) => !Object.prototype.hasOwnProperty.call(parsed.data.properties, key));
	if (danglingRequired.length > 0) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Elicitation requestedSchema lists required properties that are not defined in properties: ${danglingRequired.join(", ")}`);
	return {
		...input,
		mode: "form",
		requestedSchema: parsed.data
	};
}
/**
* Authoring helpers for multi-round-trip requests (protocol revision
* 2026-07-28).
*
* A handler for one of the multi-round-trip methods (`tools/call`,
* `prompts/get`, `resources/read`) requests additional client input by
* returning an {@linkcode InputRequiredResult} instead of a final result. The
* helpers here build that return value and its embedded requests as NEUTRAL
* values; only the 2026-07-28 wire codec maps them to/from the wire. The
* 2025-era codec has no input-required vocabulary — on a 2025-era request the
* server's legacy shim (on by default) fulfils the embedded requests as real
* server→client requests and re-enters the handler, so the same return shape
* serves both eras; `ServerOptions.inputRequired.legacyShim: false` restores
* the pre-shim loud failure.
*
* There is no nominal brand: `resultType: 'input_required'` is the
* discriminator, and hand-built result literals are equally legal — the
* server seam re-checks the at-least-one rule for them.
*/
function buildInputRequired(spec) {
	const hasInputRequests = spec.inputRequests !== void 0 && Object.keys(spec.inputRequests).length > 0;
	const hasRequestState = typeof spec.requestState === "string";
	if (!hasInputRequests && !hasRequestState) throw new TypeError("inputRequired() requires at least one of inputRequests (with at least one entry) or requestState (spec: every InputRequiredResult MUST include at least one of the two)");
	return {
		resultType: "input_required",
		...spec.inputRequests !== void 0 && { inputRequests: spec.inputRequests },
		...spec.requestState !== void 0 && { requestState: spec.requestState }
	};
}
Object.assign(buildInputRequired, {
	elicit(params) {
		try {
			return {
				method: "elicitation/create",
				params: normalizeElicitInputParams(params)
			};
		} catch (error) {
			throw error instanceof ProtocolError ? new TypeError(error.message, { cause: error }) : error;
		}
	},
	elicitUrl(params) {
		return {
			method: "elicitation/create",
			params: {
				...params,
				mode: "url"
			}
		};
	},
	createMessage(params) {
		return {
			method: "sampling/createMessage",
			params
		};
	},
	listRoots() {
		return { method: "roots/list" };
	}
});
/**
* Explicit allowlist of protocol Zod schemas that correspond to a public spec type in `types.ts`.
*
* This intentionally excludes internal helper schemas exported from `schemas.ts` that have no
* matching public type (e.g. `ListChangedOptionsBaseSchema`, `BaseRequestParamsSchema`,
* `NotificationsParamsSchema`, `ClientTasksCapabilitySchema`, `ServerTasksCapabilitySchema`).
* Keeping the list explicit means new public spec types must be added here deliberately, and
* internals never leak into `SpecTypeName`.
*
* `ResourceTemplateSchema` is included; its public type is exported as `ResourceTemplateType`
* (the bare name collides with the server package's `ResourceTemplate` class), so
* `SpecTypes['ResourceTemplate']` is structurally equal to `ResourceTemplateType` rather than to
* a type literally named `ResourceTemplate`.
*/
var SPEC_SCHEMA_KEYS = [
	"AnnotationsSchema",
	"AudioContentSchema",
	"BaseMetadataSchema",
	"BlobResourceContentsSchema",
	"BooleanSchemaSchema",
	"CallToolRequestSchema",
	"CallToolRequestParamsSchema",
	"CallToolResultSchema",
	"CancelledNotificationSchema",
	"CancelledNotificationParamsSchema",
	"CancelTaskRequestSchema",
	"CancelTaskResultSchema",
	"ClientCapabilitiesSchema",
	"ClientNotificationSchema",
	"ClientRequestSchema",
	"ClientResultSchema",
	"CompatibilityCallToolResultSchema",
	"CompleteRequestSchema",
	"CompleteRequestParamsSchema",
	"CompleteResultSchema",
	"ContentBlockSchema",
	"CreateMessageRequestSchema",
	"CreateMessageRequestParamsSchema",
	"CreateMessageResultSchema",
	"CreateMessageResultWithToolsSchema",
	"CreateTaskResultSchema",
	"CursorSchema",
	"DiscoverRequestSchema",
	"DiscoverResultSchema",
	"ElicitationCompleteNotificationSchema",
	"ElicitationCompleteNotificationParamsSchema",
	"ElicitRequestSchema",
	"ElicitRequestFormParamsSchema",
	"ElicitRequestParamsSchema",
	"ElicitRequestURLParamsSchema",
	"ElicitResultSchema",
	"EmbeddedResourceSchema",
	"EmptyResultSchema",
	"EnumSchemaSchema",
	"GetPromptRequestSchema",
	"GetPromptRequestParamsSchema",
	"GetPromptResultSchema",
	"GetTaskPayloadRequestSchema",
	"GetTaskPayloadResultSchema",
	"GetTaskRequestSchema",
	"GetTaskResultSchema",
	"IconSchema",
	"IconsSchema",
	"ImageContentSchema",
	"ImplementationSchema",
	"InitializedNotificationSchema",
	"InitializeRequestSchema",
	"InitializeRequestParamsSchema",
	"InitializeResultSchema",
	"JSONArraySchema",
	"JSONObjectSchema",
	"JSONRPCErrorResponseSchema",
	"JSONRPCMessageSchema",
	"JSONRPCNotificationSchema",
	"JSONRPCRequestSchema",
	"JSONRPCResponseSchema",
	"JSONRPCResultResponseSchema",
	"JSONValueSchema",
	"LegacyTitledEnumSchemaSchema",
	"ListPromptsRequestSchema",
	"ListPromptsResultSchema",
	"ListResourcesRequestSchema",
	"ListResourcesResultSchema",
	"ListResourceTemplatesRequestSchema",
	"ListResourceTemplatesResultSchema",
	"ListRootsRequestSchema",
	"ListRootsResultSchema",
	"ListTasksRequestSchema",
	"ListTasksResultSchema",
	"ListToolsRequestSchema",
	"ListToolsResultSchema",
	"LoggingLevelSchema",
	"LoggingMessageNotificationSchema",
	"LoggingMessageNotificationParamsSchema",
	"ModelHintSchema",
	"ModelPreferencesSchema",
	"MultiSelectEnumSchemaSchema",
	"NotificationSchema",
	"NumberSchemaSchema",
	"PaginatedRequestSchema",
	"PaginatedRequestParamsSchema",
	"PaginatedResultSchema",
	"PingRequestSchema",
	"PrimitiveSchemaDefinitionSchema",
	"ProgressSchema",
	"ProgressNotificationSchema",
	"ProgressNotificationParamsSchema",
	"ProgressTokenSchema",
	"PromptSchema",
	"PromptArgumentSchema",
	"PromptListChangedNotificationSchema",
	"PromptMessageSchema",
	"PromptReferenceSchema",
	"ReadResourceRequestSchema",
	"ReadResourceRequestParamsSchema",
	"ReadResourceResultSchema",
	"RelatedTaskMetadataSchema",
	"RequestSchema",
	"RequestIdSchema",
	"RequestMetaSchema",
	"ResourceSchema",
	"ResourceContentsSchema",
	"ResourceLinkSchema",
	"ResourceListChangedNotificationSchema",
	"ResourceRequestParamsSchema",
	"ResourceTemplateSchema",
	"ResourceTemplateReferenceSchema",
	"ResourceUpdatedNotificationSchema",
	"ResourceUpdatedNotificationParamsSchema",
	"ResultMetaObjectSchema",
	"ResultSchema",
	"RoleSchema",
	"RootSchema",
	"RootsListChangedNotificationSchema",
	"SamplingContentSchema",
	"SamplingMessageSchema",
	"SamplingMessageContentBlockSchema",
	"ServerCapabilitiesSchema",
	"ServerNotificationSchema",
	"ServerRequestSchema",
	"ServerResultSchema",
	"SetLevelRequestSchema",
	"SetLevelRequestParamsSchema",
	"SingleSelectEnumSchemaSchema",
	"StringSchemaSchema",
	"SubscribeRequestSchema",
	"SubscribeRequestParamsSchema",
	"SubscriptionFilterSchema",
	"SubscriptionsAcknowledgedNotificationSchema",
	"SubscriptionsAcknowledgedNotificationParamsSchema",
	"SubscriptionsListenRequestSchema",
	"SubscriptionsListenRequestParamsSchema",
	"SubscriptionsListenResultSchema",
	"SubscriptionsListenResultMetaSchema",
	"TaskAugmentedRequestParamsSchema",
	"TaskCreationParamsSchema",
	"TaskMetadataSchema",
	"TaskSchema",
	"TaskStatusSchema",
	"TaskStatusNotificationSchema",
	"TaskStatusNotificationParamsSchema",
	"TextContentSchema",
	"TextResourceContentsSchema",
	"TitledMultiSelectEnumSchemaSchema",
	"TitledSingleSelectEnumSchemaSchema",
	"ToolSchema",
	"ToolAnnotationsSchema",
	"ToolChoiceSchema",
	"ToolExecutionSchema",
	"ToolListChangedNotificationSchema",
	"ToolResultContentSchema",
	"ToolUseContentSchema",
	"UnsubscribeRequestSchema",
	"UnsubscribeRequestParamsSchema",
	"UntitledMultiSelectEnumSchemaSchema",
	"UntitledSingleSelectEnumSchemaSchema"
];
var authSchemas = {
	IdJagTokenExchangeResponseSchema,
	OAuthClientInformationFullSchema,
	OAuthClientInformationSchema,
	OAuthClientMetadataSchema,
	OAuthClientRegistrationErrorSchema,
	OAuthErrorResponseSchema,
	OAuthMetadataSchema,
	OAuthProtectedResourceMetadataSchema,
	OAuthTokenRevocationRequestSchema,
	OAuthTokensSchema,
	OpenIdProviderDiscoveryMetadataSchema,
	OpenIdProviderMetadataSchema
};
var _specTypeSchemas = {};
var _isSpecType = {};
function register(key, schema) {
	const name = key.slice(0, -6);
	_specTypeSchemas[name] = schema;
	_isSpecType[name] = (v) => schema.safeParse(v).success;
}
for (const key of SPEC_SCHEMA_KEYS) register(key, schemas_exports[key]);
for (const [key, schema] of Object.entries(authSchemas)) register(key, schema);
Object.freeze(_specTypeSchemas);
Object.freeze(_isSpecType);
function bootstrapOutboundCodec(method) {
	switch (method) {
		case "initialize":
		case "notifications/initialized": return codecForVersion(void 0);
		case "server/discover": return codecForVersion(MODERN_WIRE_REVISION);
		default: return;
	}
}
/**
* The reserved per-request `_meta` envelope keys (protocol revision
* 2026-07-28). The protocol layer lifts these out of inbound `_meta` before
* handlers run and surfaces them at `ctx.mcpReq.envelope` — they are
* wire-level bookkeeping, not handler material.
*/
var RESERVED_ENVELOPE_META_KEYS = [
	PROTOCOL_VERSION_META_KEY,
	CLIENT_INFO_META_KEY,
	CLIENT_CAPABILITIES_META_KEY,
	LOG_LEVEL_META_KEY
];
/**
* Top-level params members carrying multi-round-trip driver material
* (protocol revision 2026-07-28). The spec reserves these names on
* client-initiated REQUESTS only — notification params keep them untouched
* (a vendor notification may legitimately use the same names).
*/
var RETRY_PARAMS_KEYS = ["inputResponses", "requestState"];
/**
* Lift wire-only material out of an inbound message so handlers see exactly
* the 2025-era shape, and surface it for the protocol layer (requests: via
* `ctx.mcpReq`). What counts as wire-only depends on the message kind: the
* reserved envelope `_meta` keys are reserved on every message, while the
* multi-round-trip retry fields (`inputResponses`/`requestState`) are
* reserved on client-initiated requests only — so notifications get only the
* envelope lift, and their top-level params stay untouched. Messages without
* wire-only material are returned unchanged (same reference).
*/
function liftWireOnlyMaterial(message, kind) {
	const params = message.params;
	if (!isPlainObject$1(params)) return {
		message,
		lifted: {}
	};
	const meta = params._meta;
	const envelopeKeys = isPlainObject$1(meta) ? RESERVED_ENVELOPE_META_KEYS.filter((key) => key in meta) : [];
	const retryKeys = kind === "request" ? RETRY_PARAMS_KEYS.filter((key) => key in params) : [];
	if (envelopeKeys.length === 0 && retryKeys.length === 0) return {
		message,
		lifted: {}
	};
	const lifted = {};
	const nextParams = { ...params };
	if (envelopeKeys.length > 0 && isPlainObject$1(meta)) {
		const envelope = {};
		const nextMeta = { ...meta };
		for (const key of envelopeKeys) {
			envelope[key] = meta[key];
			delete nextMeta[key];
		}
		lifted.envelope = envelope;
		if (Object.keys(nextMeta).length > 0) nextParams._meta = nextMeta;
		else delete nextParams._meta;
	}
	for (const key of retryKeys) {
		if (key === "inputResponses") lifted.inputResponses = nextParams[key];
		if (key === "requestState") lifted.requestState = nextParams[key];
		delete nextParams[key];
	}
	return {
		message: {
			...message,
			params: nextParams
		},
		lifted
	};
}
/**
* Standard Schema adapter over the era codec's `validateResult` function (the
* function-only WireCodec contract exposes no schema objects). Used by the
* spec-method `request()` overload so the request funnel keeps a single
* `StandardSchemaV1`-shaped validation seam for both spec and explicit-schema
* paths.
*
* Returns `undefined` when the method has no result entry on this era's
* registry — the caller maps that to the synchronous "pass a result schema"
* TypeError, exactly matching the pre-function-only behavior the
* typedMapAlignment suite pins (the result map deliberately excludes the
* `tasks/*` methods, so the spec-method overload refuses them up front).
*/
function codecResultValidator(codec, method) {
	const probe = codec.validateResult(method, void 0);
	if (!probe.ok && probe.reason === "not-in-era") return void 0;
	return { "~standard": {
		version: 1,
		vendor: "mcp-wire-codec",
		validate(value) {
			const outcome = codec.validateResult(method, value);
			if (outcome.ok) return { value: outcome.value };
			return { issues: [{ message: outcome.reason === "invalid" ? outcome.message : `not-in-era: ${method}` }] };
		}
	} };
}
/**
* Builds the `ctx.mcpReq.requestState` accessor for a resolved value. The
* `as T` below is the one place {@linkcode RequestStateAccessor}'s
* caller-asserted typing is implemented — no implementation can produce an
* arbitrary `T` from a runtime value honestly.
*/
function requestStateAccessor(value) {
	return () => value;
}
/** Shared no-state accessor: the common case allocates nothing per request. */
var NO_REQUEST_STATE = requestStateAccessor(void 0);
/**
* Implements MCP protocol framing on top of a pluggable transport, including
* features like request/response linking, notifications, and progress.
*
* `Protocol` is abstract; `Client` and `Server` are the concrete role-specific
* implementations most code should use.
*/
var Protocol = class {
	_transport;
	_requestMessageId = 0;
	_requestHandlers = /* @__PURE__ */ new Map();
	/** Methods registered with an explicit schema; the era gate in `_onrequest` reads it for the Tasks extension names. */
	_customSchemaRequestMethods = /* @__PURE__ */ new Set();
	_requestHandlerAbortControllers = /* @__PURE__ */ new Map();
	_notificationHandlers = /* @__PURE__ */ new Map();
	_responseHandlers = /* @__PURE__ */ new Map();
	_progressHandlers = /* @__PURE__ */ new Map();
	_timeoutInfo = /* @__PURE__ */ new Map();
	_pendingDebouncedNotifications = /* @__PURE__ */ new Set();
	/**
	* The protocol version negotiated for the current connection (`undefined`
	* before negotiation completes), which determines the wire era this
	* instance speaks. Set by the SDK's negotiation and initialize paths
	* (`Client.connect`, `Server._oninitialize`).
	*/
	_negotiatedProtocolVersion;
	static {}
	_supportedProtocolVersions;
	/**
	* Callback for when the connection is closed for any reason.
	*
	* This is invoked when {@linkcode Protocol.close | close()} is called as well.
	*/
	onclose;
	/**
	* Callback for when an error occurs.
	*
	* Note that errors are not necessarily fatal; they are used for reporting any kind of exceptional condition out of band.
	*/
	onerror;
	/**
	* A handler to invoke for any request types that do not have their own handler installed.
	*/
	fallbackRequestHandler;
	/**
	* A handler to invoke for any notification types that do not have their own handler installed.
	*/
	fallbackNotificationHandler;
	constructor(_options) {
		this._options = _options;
		this._supportedProtocolVersions = _options?.supportedProtocolVersions ?? SUPPORTED_PROTOCOL_VERSIONS;
		this.setNotificationHandler("notifications/cancelled", (notification) => {
			this._oncancel(notification);
		});
		this.setNotificationHandler("notifications/progress", (notification) => {
			this._onprogress(notification);
		});
		this.setRequestHandler("ping", (_request) => ({}));
	}
	/**
	* Drop consult for inbound messages whose transport did not classify them
	* at the edge — long-lived channels such as stdio, where a role class may
	* need to decline traffic the negotiated era has no answer for (the
	* client-side inbound-request drop on modern-era connections: the
	* 2026-07-28 era has no server→client request channel, and on stdio the
	* client must never write JSON-RPC responses).
	*
	* Consulted ONLY when the transport supplied no
	* {@linkcode MessageExtraInfo.classification}: edge-classified traffic
	* never reaches the hook. Returning `'drop'` discards the message without
	* writing any response (requests are surfaced via `onerror`). The base
	* implementation returns `undefined`: unclassified traffic keeps today's
	* dispatch path unchanged. Era selection never happens here — era is
	* instance state, owned by the serving entry that constructed and
	* connected the instance.
	*/
	_shouldDropInbound(_message) {}
	/**
	* The per-request `_meta` envelope this instance attaches to every outgoing
	* request and notification, when one applies. The base implementation
	* returns `undefined` (no envelope — the 2025-era posture, so legacy-era
	* outbound traffic is byte-identical to a build without this seam).
	* `Client` overrides it on a connection that negotiated a modern (2026-07-28+)
	* era to return the reserved protocol-version / client-info /
	* client-capabilities keys. User-supplied `_meta` keys take precedence over
	* the auto-attached ones.
	*/
	_outboundMetaEnvelope() {}
	/**
	* Attach this instance's outbound `_meta` envelope (when one is configured)
	* to a request or notification. A no-op when the seam returns `undefined`
	* — the message returns by reference, so the legacy-era wire stays
	* byte-identical. User-supplied `_meta` keys are spread last so they win
	* over the auto-attached envelope keys.
	*/
	_envelopeOutbound(message) {
		const envelope = this._outboundMetaEnvelope();
		if (envelope === void 0) return message;
		const params = message.params ?? {};
		return {
			...message,
			params: {
				...params,
				_meta: {
					...envelope,
					...params._meta
				}
			}
		};
	}
	/**
	* Extension point for non-`complete` decoded results in the response
	* funnel: a result the wire codec discriminated into a kind other than
	* `'complete'` or `'invalid'` is handed here for the role class to
	* resolve. The base default surfaces it as a typed
	* {@linkcode SdkErrorCode.UnsupportedResultType} error (no retry).
	*
	* Intended consumers (named so the seam stays accountable):
	* - the `Client`'s multi-round-trip auto-fulfilment engine, which fulfils
	*   `'input_required'` results through the registered
	*   elicitation/sampling/roots handlers and retries via `flow.retry`;
	* - a future client-side terminal-result handler for
	*   `subscriptions/listen`, when the spec defines one.
	*
	* `Server` instances never receive `input_required` responses on their
	* outbound legs and leave the base behavior in place.
	*/
	_resolveNonCompleteResult(decoded, flow) {
		return Promise.reject(new SdkError(SdkErrorCode.UnsupportedResultType, `Unsupported result type '${decoded.kind}' for ${flow.request.method}`, {
			resultType: decoded.kind,
			method: flow.request.method
		}));
	}
	/**
	* Protected accessor for a registered request handler. Used by role
	* classes that dispatch synthesized requests through the same stored
	* handler chain (e.g. the `Client` fulfilling an embedded multi-round-trip
	* input request).
	*/
	_getRequestHandler(method) {
		return this._requestHandlers.get(method);
	}
	async _oncancel(notification) {
		if (notification.params.requestId === void 0) return;
		this._requestHandlerAbortControllers.get(notification.params.requestId)?.abort(notification.params.reason);
	}
	_setupTimeout(messageId, timeout, maxTotalTimeout, onTimeout, resetTimeoutOnProgress = false) {
		this._timeoutInfo.set(messageId, {
			timeoutId: setTimeout(onTimeout, timeout),
			startTime: Date.now(),
			timeout,
			maxTotalTimeout,
			resetTimeoutOnProgress,
			onTimeout
		});
	}
	_resetTimeout(messageId) {
		const info = this._timeoutInfo.get(messageId);
		if (!info) return false;
		const totalElapsed = Date.now() - info.startTime;
		if (info.maxTotalTimeout && totalElapsed >= info.maxTotalTimeout) {
			this._timeoutInfo.delete(messageId);
			throw new SdkError(SdkErrorCode.RequestTimeout, "Maximum total timeout exceeded", {
				maxTotalTimeout: info.maxTotalTimeout,
				totalElapsed
			});
		}
		clearTimeout(info.timeoutId);
		info.timeoutId = setTimeout(info.onTimeout, info.timeout);
		return true;
	}
	_cleanupTimeout(messageId) {
		const info = this._timeoutInfo.get(messageId);
		if (info) {
			clearTimeout(info.timeoutId);
			this._timeoutInfo.delete(messageId);
		}
	}
	/**
	* Attaches to the given transport, starts it, and starts listening for messages.
	*
	* The caller assumes ownership of the {@linkcode Transport}, replacing any callbacks that have already been set, and expects that it is the only user of the {@linkcode Transport} instance going forward.
	*/
	async connect(transport) {
		this._transport = transport;
		const _onclose = this.transport?.onclose;
		this._transport.onclose = () => {
			try {
				_onclose?.();
			} finally {
				this._onclose();
			}
		};
		const _onerror = this.transport?.onerror;
		this._transport.onerror = (error) => {
			_onerror?.(error);
			this._onerror(error);
		};
		const _onmessage = this._transport?.onmessage;
		this._transport.onmessage = (message, extra) => {
			_onmessage?.(message, extra);
			if (isJSONRPCResultResponse(message) || isJSONRPCErrorResponse(message)) this._onresponse(message);
			else if (isJSONRPCRequest(message)) this._onrequest(message, extra);
			else if (isJSONRPCNotification(message)) this._onnotification(message, extra);
			else this._onerror(/* @__PURE__ */ new Error(`Unknown message type: ${JSON.stringify(message)}`));
		};
		transport.setSupportedProtocolVersions?.(this._supportedProtocolVersions);
		await this._transport.start();
	}
	/**
	* Transport-close hook. Subclass overrides MUST call `super._onclose()`
	* after their own cleanup — base teardown (response-handler settlement,
	* timeout clearing, in-flight request abort) does not run otherwise.
	*/
	_onclose() {
		const responseHandlers = this._responseHandlers;
		this._responseHandlers = /* @__PURE__ */ new Map();
		this._progressHandlers.clear();
		this._pendingDebouncedNotifications.clear();
		for (const info of this._timeoutInfo.values()) clearTimeout(info.timeoutId);
		this._timeoutInfo.clear();
		const requestHandlerAbortControllers = this._requestHandlerAbortControllers;
		this._requestHandlerAbortControllers = /* @__PURE__ */ new Map();
		const error = new SdkError(SdkErrorCode.ConnectionClosed, "Connection closed");
		this._transport = void 0;
		try {
			this.onclose?.();
		} finally {
			for (const handler of responseHandlers.values()) handler(error);
			for (const controller of requestHandlerAbortControllers.values()) controller.abort(error);
		}
	}
	_onerror(error) {
		this.onerror?.(error);
	}
	/**
	* Inbound-notification dispatch. Subclass overrides MUST delegate
	* unmatched traffic to `super._onnotification(rawNotification, extra)` —
	* an override that consumes only what it owns and falls through to base
	* dispatch for everything else.
	*/
	_onnotification(rawNotification, extra) {
		const { message: notification } = liftWireOnlyMaterial(rawNotification, "notification");
		const codec = this._negotiatedWireCodec();
		if (extra?.classification === void 0 && this._shouldDropInbound(rawNotification) === "drop") return;
		if (extra?.classification !== void 0) {
			const classified = classifiedWireEra(extra.classification);
			if (classified !== codec.era) {
				this._onerror(/* @__PURE__ */ new Error(`Era mismatch on inbound notification '${notification.method}': classified as ${classified} but this instance serves ${codec.era}`));
				return;
			}
		}
		if (isSpecNotificationMethod(notification.method) && !codec.hasNotificationMethod(notification.method)) return;
		const handler = this._notificationHandlers.get(notification.method);
		const fallback = this.fallbackNotificationHandler;
		if (handler === void 0 && fallback === void 0) return;
		Promise.resolve().then(() => handler === void 0 ? fallback(notification) : handler(notification, codec)).catch((error) => this._onerror(/* @__PURE__ */ new Error(`Uncaught error in notification handler: ${error}`)));
	}
	_onrequest(rawRequest, extra) {
		const { message: request, lifted } = liftWireOnlyMaterial(rawRequest, "request");
		const codec = this._negotiatedWireCodec();
		if (extra?.classification === void 0 && this._shouldDropInbound(rawRequest) === "drop") {
			this._onerror(/* @__PURE__ */ new Error(`Dropped inbound request '${rawRequest.method}': not servable on this connection's protocol era`));
			return;
		}
		const capturedTransport = this._transport;
		const sendErrorResponse = (code, message, data) => {
			const errorResponse = {
				jsonrpc: "2.0",
				id: request.id,
				error: {
					code,
					message,
					...data !== void 0 && { data }
				}
			};
			capturedTransport?.send(errorResponse).catch((error) => this._onerror(/* @__PURE__ */ new Error(`Failed to send an error response: ${error}`)));
		};
		if (extra?.classification !== void 0) {
			const classified = classifiedWireEra(extra.classification);
			if (classified !== codec.era) {
				this._onerror(/* @__PURE__ */ new Error(`Era mismatch on inbound request '${request.method}': classified as ${classified} but this instance serves ${codec.era}`));
				const requested = extra.classification.revision ?? classified;
				sendErrorResponse(ProtocolErrorCode.UnsupportedProtocolVersion, `Unsupported protocol version: ${requested}`, {
					supported: this._supportedProtocolVersions,
					requested
				});
				return;
			}
		}
		if (isSpecRequestMethod(request.method) && !codec.hasRequestMethod(request.method) && !(isExtensionReusedRequestMethod(request.method) && this._customSchemaRequestMethods.has(request.method))) {
			sendErrorResponse(ProtocolErrorCode.MethodNotFound, "Method not found");
			return;
		}
		const handler = this._requestHandlers.get(request.method) ?? this.fallbackRequestHandler;
		if (handler === void 0) {
			sendErrorResponse(ProtocolErrorCode.MethodNotFound, "Method not found");
			return;
		}
		const envelopeError = codec.checkInboundEnvelope(lifted);
		if (envelopeError !== void 0) {
			sendErrorResponse(ProtocolErrorCode.InvalidParams, envelopeError);
			return;
		}
		const sendNotification = (notification, options) => this._notificationViaCodec(this._resolveOutboundCodec(notification.method), notification, {
			...options,
			relatedRequestId: request.id
		});
		const sendRequest = (r, resultSchema, options) => this._requestWithSchemaViaCodec(this._resolveOutboundCodec(r.method), r, resultSchema, {
			...options,
			relatedRequestId: request.id
		});
		const abortController = new AbortController();
		this._requestHandlerAbortControllers.set(request.id, abortController);
		const partitionedInputResponses = lifted.inputResponses === void 0 ? void 0 : partitionInputResponses(lifted.inputResponses);
		const baseCtx = {
			sessionId: capturedTransport?.sessionId,
			mcpReq: {
				id: request.id,
				method: request.method,
				_meta: request.params?._meta,
				...lifted.envelope !== void 0 && { envelope: lifted.envelope },
				...partitionedInputResponses !== void 0 && { inputResponses: partitionedInputResponses.accepted },
				...partitionedInputResponses !== void 0 && partitionedInputResponses.droppedKeys.length > 0 && { droppedInputResponseKeys: partitionedInputResponses.droppedKeys },
				requestState: lifted.requestState === void 0 ? NO_REQUEST_STATE : requestStateAccessor(lifted.requestState),
				signal: abortController.signal,
				send: ((r, schemaOrOptions, maybeOptions) => {
					const sendCodec = this._resolveOutboundCodec(r.method);
					this._assertOutboundRequestInEra(sendCodec, r.method);
					if (isStandardSchema(schemaOrOptions)) return sendRequest(r, schemaOrOptions, maybeOptions);
					const validate = codecResultValidator(sendCodec, r.method);
					if (validate === void 0) throw new TypeError(`'${r.method}' is not a spec method; pass a result schema as the second argument to ctx.mcpReq.send().`);
					return sendRequest(r, validate, schemaOrOptions);
				}),
				notify: sendNotification
			},
			http: extra?.authInfo ? { authInfo: extra.authInfo } : void 0
		};
		const ctx = this.buildContext(baseCtx, extra);
		Promise.resolve().then(() => handler(request, ctx)).then(async (result) => {
			if (abortController.signal.aborted) return;
			let encoded;
			try {
				encoded = codec.encodeResult(request.method, result, this._outboundServerInfo());
			} catch (error) {
				this._onerror(/* @__PURE__ */ new Error(`Failed to encode result for ${request.method}: ${error}`));
				sendErrorResponse(ProtocolErrorCode.InternalError, "Internal error");
				return;
			}
			const response = {
				result: encoded,
				jsonrpc: "2.0",
				id: request.id
			};
			await capturedTransport?.send(response);
		}, async (error) => {
			if (abortController.signal.aborted) return;
			const thrownCode = Number.isSafeInteger(error["code"]) ? error["code"] : ProtocolErrorCode.InternalError;
			const errorResponse = {
				jsonrpc: "2.0",
				id: request.id,
				error: {
					code: codec.encodeErrorCode(thrownCode),
					message: error.message ?? "Internal error",
					...error["data"] !== void 0 && { data: error["data"] }
				}
			};
			await capturedTransport?.send(errorResponse);
		}).catch((error) => this._onerror(/* @__PURE__ */ new Error(`Failed to send response: ${error}`))).finally(() => {
			if (this._requestHandlerAbortControllers.get(request.id) === abortController) this._requestHandlerAbortControllers.delete(request.id);
		});
	}
	_onprogress(notification) {
		const { progressToken, ...params } = notification.params;
		const messageId = Number(progressToken);
		const handler = this._progressHandlers.get(messageId);
		if (!handler) {
			this._onerror(/* @__PURE__ */ new Error(`Received a progress notification for an unknown token: ${JSON.stringify(notification)}`));
			return;
		}
		const responseHandler = this._responseHandlers.get(messageId);
		const timeoutInfo = this._timeoutInfo.get(messageId);
		if (timeoutInfo && responseHandler && timeoutInfo.resetTimeoutOnProgress) try {
			this._resetTimeout(messageId);
		} catch (error) {
			this._responseHandlers.delete(messageId);
			this._progressHandlers.delete(messageId);
			this._cleanupTimeout(messageId);
			responseHandler(error);
			return;
		}
		handler(params);
	}
	/**
	* Inbound-response dispatch. Subclass overrides MUST delegate unmatched
	* traffic to `super._onresponse(response)` — an override that consumes
	* only what it owns and falls through to base dispatch for everything
	* else.
	*/
	_onresponse(response) {
		const messageId = Number(response.id);
		const handler = this._responseHandlers.get(messageId);
		if (handler === void 0) {
			this._onerror(/* @__PURE__ */ new Error(`Received a response for an unknown message ID: ${JSON.stringify(response)}`));
			return;
		}
		this._responseHandlers.delete(messageId);
		this._cleanupTimeout(messageId);
		this._progressHandlers.delete(messageId);
		if (isJSONRPCResultResponse(response)) handler(response);
		else handler(ProtocolError.fromError(response.error.code, response.error.message, response.error.data));
	}
	get transport() {
		return this._transport;
	}
	/**
	* Closes the connection.
	*/
	async close() {
		await this._transport?.close();
	}
	request(request, schemaOrOptions, maybeOptions) {
		const codec = this._resolveOutboundCodec(request.method);
		if (isStandardSchema(schemaOrOptions)) {
			if (!isExtensionReusedRequestMethod(request.method)) this._assertOutboundRequestInEra(codec, request.method);
			return this._requestWithSchemaViaCodec(codec, request, schemaOrOptions, maybeOptions);
		}
		this._assertOutboundRequestInEra(codec, request.method);
		const validate = codecResultValidator(codec, request.method);
		if (validate === void 0) throw new TypeError(`'${request.method}' is not a spec method; pass a result schema as the second argument to request().`);
		return this._requestWithSchemaViaCodec(codec, request, validate, schemaOrOptions);
	}
	/**
	* The wire codec for this instance's negotiated era — the phase-2 truth:
	* everything an established connection sends and receives resolves
	* through it. Legacy until a version has been negotiated.
	*/
	_negotiatedWireCodec() {
		return codecForVersion(this._negotiatedProtocolVersion);
	}
	/**
	* Protected accessor for the instance's negotiated wire codec, for role
	* classes (Client/Server/McpServer) routing era-dependent behavior
	* through the codec's function-only surface — `samplingResultVariant`,
	* `outboundEnvelope`, `projectCallToolResult` — instead of branching on
	* the protocol version themselves.
	*/
	_wireCodec() {
		return this._negotiatedWireCodec();
	}
	/**
	* Outbound codec resolution: while the negotiated version is still unset
	* (the negotiation window), lifecycle messages are bootstrap-pinned BY
	* METHOD — they self-identify their era (`initialize` IS the legacy
	* handshake, `server/discover` IS the modern probe). Once a version has
	* been negotiated, the instance era is authoritative for everything — a
	* negotiated session never re-routes a method onto the other era.
	*/
	_resolveOutboundCodec(method) {
		if (this._negotiatedProtocolVersion === void 0) {
			const pinned = bootstrapOutboundCodec(method);
			if (pinned) return pinned;
		}
		return this._negotiatedWireCodec();
	}
	/**
	* Era gate for outbound requests — deletions are physical in BOTH
	* directions: sending a spec method that the resolved era does not define
	* dies locally with a typed error before anything reaches the transport.
	* Methods outside the spec universe are consumer-owned extension methods
	* and stay era-blind.
	*/
	_assertOutboundRequestInEra(codec, method) {
		if (isSpecRequestMethod(method) && !codec.hasRequestMethod(method)) throw new SdkError(SdkErrorCode.MethodNotSupportedByProtocolVersion, `Method '${method}' is not supported by the negotiated protocol version (wire era ${codec.era})`, {
			method,
			era: codec.era
		});
	}
	/**
	* Sends a request and waits for a response, using the provided schema for
	* validation instead of the era registry's method-keyed entry.
	*
	* This is the internal implementation used by SDK methods whose result
	* schema cannot be expressed as a method-keyed registry entry — the one
	* surviving case is `server.createMessage`, whose result schema depends
	* on the REQUEST params (tools vs no tools) — and by callers passing
	* explicit compatibility schemas. Spec methods are still era-gated here:
	* an explicit schema never smuggles a deleted method onto the wire.
	*/
	_requestWithSchema(request, resultSchema, options) {
		const codec = this._resolveOutboundCodec(request.method);
		this._assertOutboundRequestInEra(codec, request.method);
		return this._requestWithSchemaViaCodec(codec, request, resultSchema, options);
	}
	/**
	* The request funnel proper, keyed by the resolved era codec: the codec
	* owns result decoding (raw-first `resultType` discrimination — V-1 —
	* and the era's lift posture) before the schema validation step.
	*/
	_requestWithSchemaViaCodec(codec, request, resultSchema, options) {
		const { relatedRequestId, resumptionToken, onresumptiontoken, headers } = options ?? {};
		const flowStartedAt = Date.now();
		let onAbort;
		let cleanupMessageId;
		return new Promise((resolve, reject) => {
			const earlyReject = (error) => {
				reject(error);
			};
			if (!this._transport) {
				earlyReject(/* @__PURE__ */ new Error("Not connected"));
				return;
			}
			if (this._options?.enforceStrictCapabilities === true) try {
				this.assertCapabilityForMethod(request.method);
			} catch (error) {
				earlyReject(error);
				return;
			}
			if (options?.signal?.aborted) {
				const reason = options.signal.reason;
				throw reason instanceof SdkError ? reason : new SdkError(SdkErrorCode.RequestTimeout, String(reason));
			}
			const requestAbort = codec.era === "2026-07-28" && this._transport.hasPerRequestStream === true ? new AbortController() : void 0;
			const messageId = this._requestMessageId++;
			cleanupMessageId = messageId;
			const jsonrpcRequest = {
				...request,
				jsonrpc: "2.0",
				id: messageId
			};
			if (options?.onprogress) {
				this._progressHandlers.set(messageId, options.onprogress);
				jsonrpcRequest.params = {
					...request.params,
					_meta: {
						...request.params?._meta,
						progressToken: messageId
					}
				};
			}
			const outbound = this._envelopeOutbound(jsonrpcRequest);
			let responseReceived = false;
			const cancel = (reason) => {
				if (responseReceived) return;
				this._progressHandlers.delete(messageId);
				if (requestAbort === void 0) {
					if (request.method !== "initialize") this._transport?.send(this._envelopeOutbound({
						jsonrpc: "2.0",
						method: "notifications/cancelled",
						params: {
							requestId: messageId,
							reason: String(reason)
						}
					}), {
						relatedRequestId,
						resumptionToken,
						onresumptiontoken
					}).catch((error) => this._onerror(/* @__PURE__ */ new Error(`Failed to send cancellation: ${error}`)));
				} else requestAbort.abort();
				reject(reason instanceof SdkError ? reason : new SdkError(SdkErrorCode.RequestTimeout, String(reason)));
			};
			this._responseHandlers.set(messageId, (response) => {
				if (options?.signal?.aborted) return;
				responseReceived = true;
				if (response instanceof Error) return reject(response);
				let decoded;
				try {
					decoded = codec.decodeResult(request.method, response.result);
				} catch (error) {
					return reject(error instanceof Error ? error : new Error(String(error)));
				}
				if (decoded.kind === "invalid") return reject(decoded.error);
				if (decoded.kind === "input_required") {
					if (options?.allowInputRequired === true) return resolve(manualInputRequiredValue(decoded));
					const flow = {
						codec,
						request,
						resultSchema,
						options,
						flowStartedAt,
						retry: (params, legOptions) => this._requestWithSchemaViaCodec(codec, params === void 0 ? { method: request.method } : {
							method: request.method,
							params
						}, resultSchema, legOptions)
					};
					return resolve(this._resolveNonCompleteResult(decoded, flow));
				}
				const result = decoded.result;
				validateStandardSchema(resultSchema, result).then((parseResult) => {
					if (parseResult.success) resolve(parseResult.data);
					else reject(new SdkError(SdkErrorCode.InvalidResult, `Invalid result for ${request.method}: ${parseResult.error}`));
				}, reject);
			});
			onAbort = () => cancel(options?.signal?.reason);
			options?.signal?.addEventListener("abort", onAbort, { once: true });
			const timeout = options?.timeout ?? 6e4;
			const timeoutHandler = () => cancel(new SdkError(SdkErrorCode.RequestTimeout, "Request timed out", { timeout }));
			this._setupTimeout(messageId, timeout, options?.maxTotalTimeout, timeoutHandler, options?.resetTimeoutOnProgress ?? false);
			this._transport.send(outbound, {
				relatedRequestId,
				resumptionToken,
				onresumptiontoken,
				headers,
				requestSignal: requestAbort?.signal
			}).catch((error) => {
				this._progressHandlers.delete(messageId);
				reject(error);
			});
		}).finally(() => {
			if (onAbort) options?.signal?.removeEventListener("abort", onAbort);
			if (cleanupMessageId !== void 0) {
				this._responseHandlers.delete(cleanupMessageId);
				this._cleanupTimeout(cleanupMessageId);
			}
		});
	}
	/**
	* Emits a notification, which is a one-way message that does not expect a response.
	*/
	async notification(notification, options) {
		return await this._notificationViaCodec(this._resolveOutboundCodec(notification.method), notification, options);
	}
	/**
	* The notification funnel proper, keyed by the resolved era codec —
	* direct sends and related notifications (`ctx.mcpReq.notify`) alike
	* resolve through the instance's negotiated era at send time.
	*/
	async _notificationViaCodec(codec, notification, options) {
		if (!this._transport) throw new SdkError(SdkErrorCode.NotConnected, "Not connected");
		if (isSpecNotificationMethod(notification.method) && !codec.hasNotificationMethod(notification.method)) throw new SdkError(SdkErrorCode.MethodNotSupportedByProtocolVersion, `Notification '${notification.method}' is not supported by the negotiated protocol version (wire era ${codec.era})`, {
			method: notification.method,
			era: codec.era
		});
		this.assertNotificationCapability(notification.method);
		const jsonrpcNotification = this._envelopeOutbound({
			jsonrpc: "2.0",
			...notification
		});
		if ((this._options?.debouncedNotificationMethods ?? []).includes(notification.method) && !notification.params && options?.relatedRequestId === void 0) {
			if (this._pendingDebouncedNotifications.has(notification.method)) return;
			this._pendingDebouncedNotifications.add(notification.method);
			Promise.resolve().then(() => {
				this._pendingDebouncedNotifications.delete(notification.method);
				if (!this._transport) return;
				this._transport?.send(jsonrpcNotification, options).catch((error) => this._onerror(error));
			});
			return;
		}
		await this._transport.send(jsonrpcNotification, options);
	}
	setRequestHandler(method, schemasOrHandler, maybeHandler) {
		this.assertRequestHandlerCapability(method);
		let stored;
		if (typeof schemasOrHandler === "function") {
			if (!isSpecRequestMethod(method)) throw new TypeError(`'${method}' is not a spec request method; pass schemas as the second argument to setRequestHandler().`);
			stored = (request, ctx) => {
				const dispatchCodec = this._negotiatedWireCodec();
				let outcome = dispatchCodec.validateRequest(method, request);
				if (!outcome.ok && outcome.reason === "not-in-era") outcome = dispatchCodec.validateInputRequest(method, request);
				if (!outcome.ok) {
					if (outcome.reason === "not-in-era") throw new ProtocolError(ProtocolErrorCode.InternalError, `No wire schema for ${method} in the resolved era`);
					throw new Error(outcome.message);
				}
				return Promise.resolve(schemasOrHandler(outcome.value, ctx));
			};
		} else if (maybeHandler) stored = async (request, ctx) => {
			const parsed = await validateStandardSchema(schemasOrHandler.params, { ...request.params });
			if (!parsed.success) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Invalid params for ${method}: ${parsed.error}`);
			return maybeHandler(parsed.data, ctx);
		};
		else throw new TypeError("setRequestHandler: handler is required");
		if (typeof schemasOrHandler === "function") this._customSchemaRequestMethods.delete(method);
		else this._customSchemaRequestMethods.add(method);
		this._requestHandlers.set(method, this._wrapHandler(method, stored));
	}
	/**
	* Hook for subclasses to wrap a registered request handler with role-specific
	* validation or behavior (e.g. `Server` validates `tools/call` results, `Client`
	* validates `elicitation/create` mode and result). Runs for both the 2-arg and
	* 3-arg registration paths. The default implementation is identity.
	*
	* Subclasses overriding this hook avoid redeclaring `setRequestHandler`'s overload set.
	*/
	_wrapHandler(_method, handler) {
		return handler;
	}
	/**
	* Hook for subclasses to supply the implementation identity the 2026-era
	* encode seam stamps into outbound result `_meta` under
	* `io.modelcontextprotocol/serverInfo` (spec PR #3002: servers SHOULD
	* identify themselves on every response). The default is `undefined` — no
	* stamp. Only `Server` overrides this: the key identifies the software
	* producing a response, and the 2025-era codec never stamps anything
	* regardless (the never-stamp guarantee).
	*/
	_outboundServerInfo() {}
	/**
	* Removes the request handler for the given method.
	*/
	removeRequestHandler(method) {
		this._requestHandlers.delete(method);
		this._customSchemaRequestMethods.delete(method);
	}
	/**
	* Asserts that a request handler has not already been set for the given method, in preparation for a new one being automatically installed.
	*/
	assertCanSetRequestHandler(method) {
		if (this._requestHandlers.has(method)) throw new Error(`A request handler for ${method} already exists, which would be overridden`);
	}
	setNotificationHandler(method, schemasOrHandler, maybeHandler) {
		if (typeof schemasOrHandler === "function") {
			if (!isSpecNotificationMethod(method)) throw new TypeError(`'${method}' is not a spec notification method; pass schemas as the second argument to setNotificationHandler().`);
			this._notificationHandlers.set(method, (notification, codec) => {
				const outcome = codec.validateNotification(method, notification);
				if (!outcome.ok) {
					if (outcome.reason === "not-in-era") throw new ProtocolError(ProtocolErrorCode.InternalError, `No wire schema for ${method} in the resolved era`);
					throw new Error(outcome.message);
				}
				return Promise.resolve(schemasOrHandler(outcome.value));
			});
			return;
		}
		if (!maybeHandler) throw new TypeError("setNotificationHandler: handler is required");
		this._notificationHandlers.set(method, async (notification) => {
			const parsed = await validateStandardSchema(schemasOrHandler.params, { ...notification.params });
			if (!parsed.success) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Invalid params for notification ${method}: ${parsed.error}`);
			await maybeHandler(parsed.data, notification);
		});
	}
	/**
	* Removes the notification handler for the given method.
	*/
	removeNotificationHandler(method) {
		this._notificationHandlers.delete(method);
	}
};
function isPlainObject$1(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
/**
* The multi-round-trip auto-fulfilment ENGINE (protocol revision 2026-07-28):
* the wiring between the protocol layer's response funnel, the
* already-registered input handlers, and the pure {@link runInputRequiredDriver}
* loop. The engine is what the `Client` plugs into the funnel's
* `_resolveNonCompleteResult` extension point — `Protocol` itself only knows
* the input-required branch exists.
*
* Relocated here so the shared `Protocol` base stays generic: the only
* MRTR-specific code that remains in `protocol.ts` is the irreducible
* input-required branch in the response path, the type surface (the
* `allowInputRequired` request option and the `inputResponses`/`requestState`/
* `droppedInputResponseKeys` context fields), and the named extension point.
*/
function isPlainObject(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
/**
* Splits a retried request's `inputResponses` map into the BARE response
* entries the spec defines and everything else. The spec's embedded responses
* are the bare result objects (an `ElicitResult`, `CreateMessageResult`, or
* `ListRootsResult`); a wrapped `{method, result}` envelope (a shape some
* peers emit) is never accepted as a response — its key is recorded so the
* handler can re-issue the corresponding input request.
*/
function partitionInputResponses(inputResponses) {
	const accepted = {};
	const droppedKeys = [];
	if (!isPlainObject(inputResponses)) return {
		accepted,
		droppedKeys
	};
	for (const [key, entry] of Object.entries(inputResponses)) {
		if (!isPlainObject(entry) || "method" in entry || "result" in entry) {
			droppedKeys.push(key);
			continue;
		}
		accepted[key] = entry;
	}
	return {
		accepted,
		droppedKeys
	};
}
/**
* Builds the manual-mode {@linkcode InputRequiredResult} value from the
* codec's decoded payload — what an `allowInputRequired: true` caller
* receives instead of the auto-fulfilled complete result.
*/
function manualInputRequiredValue(decoded) {
	return {
		resultType: "input_required",
		inputRequests: decoded.inputRequests,
		...decoded.requestState !== void 0 && { requestState: decoded.requestState },
		...decoded._meta !== void 0 && { _meta: decoded._meta }
	};
}
/*!
* content-type
* Copyright(c) 2015 Douglas Christopher Wilson
* MIT Licensed
*/
(/* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* RegExp to match *( ";" parameter ) in RFC 7231 sec 3.1.1.1
	*
	* parameter     = token "=" ( token / quoted-string )
	* token         = 1*tchar
	* tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
	*               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
	*               / DIGIT / ALPHA
	*               ; any VCHAR, except delimiters
	* quoted-string = DQUOTE *( qdtext / quoted-pair ) DQUOTE
	* qdtext        = HTAB / SP / %x21 / %x23-5B / %x5D-7E / obs-text
	* obs-text      = %x80-FF
	* quoted-pair   = "\" ( HTAB / SP / VCHAR / obs-text )
	*/
	var PARAM_REGEXP = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g;
	/**
	* RegExp to match quoted-pair in RFC 7230 sec 3.2.6
	*
	* quoted-pair = "\" ( HTAB / SP / VCHAR / obs-text )
	* obs-text    = %x80-FF
	*/
	var QESC_REGEXP = /\\([\u000b\u0020-\u00ff])/g;
	/**
	* RegExp to match type in RFC 7231 sec 3.1.1.1
	*
	* media-type = type "/" subtype
	* type       = token
	* subtype    = token
	*/
	var TYPE_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
	exports.parse = parse;
	/**
	* Parse media type to object.
	*
	* @param {string|object} string
	* @return {Object}
	* @public
	*/
	function parse(string) {
		if (!string) throw new TypeError("argument string is required");
		var header = typeof string === "object" ? getcontenttype(string) : string;
		if (typeof header !== "string") throw new TypeError("argument string is required to be a string");
		var index = header.indexOf(";");
		var type = index !== -1 ? header.slice(0, index).trim() : header.trim();
		if (!TYPE_REGEXP.test(type)) throw new TypeError("invalid media type");
		var obj = new ContentType(type.toLowerCase());
		if (index !== -1) {
			var key;
			var match;
			var value;
			PARAM_REGEXP.lastIndex = index;
			while (match = PARAM_REGEXP.exec(header)) {
				if (match.index !== index) throw new TypeError("invalid parameter format");
				index += match[0].length;
				key = match[1].toLowerCase();
				value = match[2];
				if (value.charCodeAt(0) === 34) {
					value = value.slice(1, -1);
					if (value.indexOf("\\") !== -1) value = value.replace(QESC_REGEXP, "$1");
				}
				obj.parameters[key] = value;
			}
			if (index !== header.length) throw new TypeError("invalid parameter format");
		}
		return obj;
	}
	/**
	* Get content-type from req/res objects.
	*
	* @param {object}
	* @return {Object}
	* @private
	*/
	function getcontenttype(obj) {
		var header;
		if (typeof obj.getHeader === "function") header = obj.getHeader("content-type");
		else if (typeof obj.headers === "object") header = obj.headers && obj.headers["content-type"];
		if (typeof header !== "string") throw new TypeError("content-type header is missing from object");
		return header;
	}
	/**
	* Class to represent a content type.
	* @private
	*/
	function ContentType(type) {
		this.parameters = Object.create(null);
		this.type = type;
	}
})))();
typeof self !== "undefined" && self.location && self.location.origin !== "null" ? new URL(self.location.origin + self.location.pathname + location.search) : new URL("https://github.com/cfworker");
var TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
var HOSTNAME = /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i;
var URIREF = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
var URITEMPLATE = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i;
var URL_ = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)(?:\.(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu;
var UUID = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
var JSON_POINTER = /^(?:\/(?:[^~/]|~0|~1)*)*$/;
var JSON_POINTER_URI_FRAGMENT = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i;
var RELATIVE_JSON_POINTER = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;
var IPV4 = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
var IPV6 = /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i;
function bind(r) {
	return r.test.bind(r);
}
time.bind(void 0, false), bind(URIREF), bind(URITEMPLATE), bind(URL_), bind(HOSTNAME), bind(IPV4), bind(IPV6), bind(UUID), bind(JSON_POINTER), bind(JSON_POINTER_URI_FRAGMENT), bind(RELATIVE_JSON_POINTER);
function time(full, str) {
	const matches = str.match(TIME);
	if (!matches) return false;
	const hour = +matches[1];
	const minute = +matches[2];
	const second = +matches[3];
	const timeZone = !!matches[5];
	return (hour <= 23 && minute <= 59 && second <= 59 || hour == 23 && minute == 59 && second == 60) && (!full || timeZone);
}
globalThis.crypto;
//#endregion
//#region node_modules/eventsource-parser/dist/index.js
var ParseError = class extends Error {
	constructor(message, options) {
		super(message), this.name = "ParseError", this.type = options.type, this.field = options.field, this.value = options.value, this.line = options.line;
	}
};
var LF = 10;
var CR = 13;
var SPACE = 32;
function noop(_arg) {}
function createParser(config) {
	if (typeof config == "function") throw new TypeError("`config` must be an object, got a function instead. Did you mean `createParser({onEvent: fn})`?");
	const { onEvent = noop, onError = noop, onRetry = noop, onComment, maxBufferSize } = config, pendingFragments = [];
	let pendingFragmentsLength = 0, isFirstChunk = !0, id, data = "", dataLines = 0, eventType, terminated = !1;
	function feed(chunk) {
		if (terminated) throw new Error("Cannot feed parser: it was terminated after exceeding the configured max buffer size. Call `reset()` to resume parsing.");
		if (isFirstChunk && (isFirstChunk = !1, chunk.charCodeAt(0) === 239 && chunk.charCodeAt(1) === 187 && chunk.charCodeAt(2) === 191 && (chunk = chunk.slice(3))), pendingFragments.length === 0) {
			const trailing2 = processLines(chunk);
			trailing2 !== "" && (pendingFragments.push(trailing2), pendingFragmentsLength = trailing2.length), checkBufferSize();
			return;
		}
		if (chunk.indexOf(`
`) === -1 && chunk.indexOf("\r") === -1) {
			pendingFragments.push(chunk), pendingFragmentsLength += chunk.length, checkBufferSize();
			return;
		}
		pendingFragments.push(chunk);
		const input = pendingFragments.join("");
		pendingFragments.length = 0, pendingFragmentsLength = 0;
		const trailing = processLines(input);
		trailing !== "" && (pendingFragments.push(trailing), pendingFragmentsLength = trailing.length), checkBufferSize();
	}
	function checkBufferSize() {
		maxBufferSize !== void 0 && (pendingFragmentsLength + data.length <= maxBufferSize || (terminated = !0, pendingFragments.length = 0, pendingFragmentsLength = 0, id = void 0, data = "", dataLines = 0, eventType = void 0, onError(new ParseError(`Buffered data exceeded max buffer size of ${maxBufferSize} characters`, { type: "max-buffer-size-exceeded" }))));
	}
	function processLines(chunk) {
		let searchIndex = 0;
		if (chunk.indexOf("\r") === -1) {
			let lfIndex = chunk.indexOf(`
`, searchIndex);
			for (; lfIndex !== -1;) {
				if (searchIndex === lfIndex) {
					dataLines > 0 && onEvent({
						id,
						event: eventType,
						data
					}), id = void 0, data = "", dataLines = 0, eventType = void 0, searchIndex = lfIndex + 1, lfIndex = chunk.indexOf(`
`, searchIndex);
					continue;
				}
				const firstCharCode = chunk.charCodeAt(searchIndex);
				if (isDataPrefix(chunk, searchIndex, firstCharCode)) {
					const valueStart = chunk.charCodeAt(searchIndex + 5) === SPACE ? searchIndex + 6 : searchIndex + 5, value = chunk.slice(valueStart, lfIndex);
					if (dataLines === 0 && chunk.charCodeAt(lfIndex + 1) === LF) {
						onEvent({
							id,
							event: eventType,
							data: value
						}), id = void 0, data = "", eventType = void 0, searchIndex = lfIndex + 2, lfIndex = chunk.indexOf(`
`, searchIndex);
						continue;
					}
					data = dataLines === 0 ? value : `${data}
${value}`, dataLines++;
				} else isEventPrefix(chunk, searchIndex, firstCharCode) ? eventType = chunk.slice(chunk.charCodeAt(searchIndex + 6) === SPACE ? searchIndex + 7 : searchIndex + 6, lfIndex) || void 0 : parseLine(chunk, searchIndex, lfIndex);
				searchIndex = lfIndex + 1, lfIndex = chunk.indexOf(`
`, searchIndex);
			}
			return chunk.slice(searchIndex);
		}
		for (; searchIndex < chunk.length;) {
			const crIndex = chunk.indexOf("\r", searchIndex), lfIndex = chunk.indexOf(`
`, searchIndex);
			let lineEnd = -1;
			if (crIndex !== -1 && lfIndex !== -1 ? lineEnd = crIndex < lfIndex ? crIndex : lfIndex : crIndex !== -1 ? crIndex === chunk.length - 1 ? lineEnd = -1 : lineEnd = crIndex : lfIndex !== -1 && (lineEnd = lfIndex), lineEnd === -1) break;
			parseLine(chunk, searchIndex, lineEnd), searchIndex = lineEnd + 1, chunk.charCodeAt(searchIndex - 1) === CR && chunk.charCodeAt(searchIndex) === LF && searchIndex++;
		}
		return chunk.slice(searchIndex);
	}
	function parseLine(chunk, start, end) {
		if (start === end) {
			dispatchEvent();
			return;
		}
		const firstCharCode = chunk.charCodeAt(start);
		if (isDataPrefix(chunk, start, firstCharCode)) {
			const valueStart = chunk.charCodeAt(start + 5) === SPACE ? start + 6 : start + 5, value2 = chunk.slice(valueStart, end);
			data = dataLines === 0 ? value2 : `${data}
${value2}`, dataLines++;
			return;
		}
		if (isEventPrefix(chunk, start, firstCharCode)) {
			eventType = chunk.slice(chunk.charCodeAt(start + 6) === SPACE ? start + 7 : start + 6, end) || void 0;
			return;
		}
		if (firstCharCode === 105 && chunk.charCodeAt(start + 1) === 100 && chunk.charCodeAt(start + 2) === 58) {
			const value2 = chunk.slice(chunk.charCodeAt(start + 3) === SPACE ? start + 4 : start + 3, end);
			value2.includes("\0") || (id = value2);
			return;
		}
		if (firstCharCode === 58) {
			if (onComment) {
				const line2 = chunk.slice(start, end);
				onComment(line2.slice(chunk.charCodeAt(start + 1) === SPACE ? 2 : 1));
			}
			return;
		}
		const line = chunk.slice(start, end), fieldSeparatorIndex = line.indexOf(":");
		if (fieldSeparatorIndex === -1) {
			processField(line, "", line);
			return;
		}
		const field = line.slice(0, fieldSeparatorIndex), offset = line.charCodeAt(fieldSeparatorIndex + 1) === SPACE ? 2 : 1;
		processField(field, line.slice(fieldSeparatorIndex + offset), line);
	}
	function processField(field, value, line) {
		switch (field) {
			case "event":
				eventType = value || void 0;
				break;
			case "data":
				data = dataLines === 0 ? value : `${data}
${value}`, dataLines++;
				break;
			case "id":
				value.includes("\0") || (id = value);
				break;
			case "retry":
				/^\d+$/.test(value) ? onRetry(parseInt(value, 10)) : onError(new ParseError(`Invalid \`retry\` value: "${value}"`, {
					type: "invalid-retry",
					value,
					line
				}));
				break;
			default:
				onError(new ParseError(`Unknown field "${field.length > 20 ? `${field.slice(0, 20)}\u2026` : field}"`, {
					type: "unknown-field",
					field,
					value,
					line
				}));
				break;
		}
	}
	function dispatchEvent() {
		dataLines > 0 && onEvent({
			id,
			event: eventType,
			data
		}), id = void 0, data = "", dataLines = 0, eventType = void 0;
	}
	function reset(options = {}) {
		if (options.consume && pendingFragments.length > 0) {
			const incompleteLine = pendingFragments.join("");
			parseLine(incompleteLine, 0, incompleteLine.length);
		}
		isFirstChunk = !0, id = void 0, data = "", dataLines = 0, eventType = void 0, pendingFragments.length = 0, pendingFragmentsLength = 0, terminated = !1;
	}
	return {
		feed,
		reset
	};
}
function isDataPrefix(chunk, i, firstCharCode) {
	return firstCharCode === 100 && chunk.charCodeAt(i + 1) === 97 && chunk.charCodeAt(i + 2) === 116 && chunk.charCodeAt(i + 3) === 97 && chunk.charCodeAt(i + 4) === 58;
}
function isEventPrefix(chunk, i, firstCharCode) {
	return firstCharCode === 101 && chunk.charCodeAt(i + 1) === 118 && chunk.charCodeAt(i + 2) === 101 && chunk.charCodeAt(i + 3) === 110 && chunk.charCodeAt(i + 4) === 116 && chunk.charCodeAt(i + 5) === 58;
}
//#endregion
//#region node_modules/eventsource/dist/index.js
var ErrorEvent = class extends Event {
	/**
	* Constructs a new `ErrorEvent` instance. This is typically not called directly,
	* but rather emitted by the `EventSource` object when an error occurs.
	*
	* @param type - The type of the event (should be "error")
	* @param errorEventInitDict - Optional properties to include in the error event
	*/
	constructor(type, errorEventInitDict) {
		var _a, _b;
		super(type), this.code = (_a = errorEventInitDict == null ? void 0 : errorEventInitDict.code) != null ? _a : void 0, this.message = (_b = errorEventInitDict == null ? void 0 : errorEventInitDict.message) != null ? _b : void 0;
	}
	/**
	* Node.js "hides" the `message` and `code` properties of the `ErrorEvent` instance,
	* when it is `console.log`'ed. This makes it harder to debug errors. To ease debugging,
	* we explicitly include the properties in the `inspect` method.
	*
	* This is automatically called by Node.js when you `console.log` an instance of this class.
	*
	* @param _depth - The current depth
	* @param options - The options passed to `util.inspect`
	* @param inspect - The inspect function to use (prevents having to import it from `util`)
	* @returns A string representation of the error
	*/
	[Symbol.for("nodejs.util.inspect.custom")](_depth, options, inspect) {
		return inspect(inspectableError(this), options);
	}
	/**
	* Deno "hides" the `message` and `code` properties of the `ErrorEvent` instance,
	* when it is `console.log`'ed. This makes it harder to debug errors. To ease debugging,
	* we explicitly include the properties in the `inspect` method.
	*
	* This is automatically called by Deno when you `console.log` an instance of this class.
	*
	* @param inspect - The inspect function to use (prevents having to import it from `util`)
	* @param options - The options passed to `Deno.inspect`
	* @returns A string representation of the error
	*/
	[Symbol.for("Deno.customInspect")](inspect, options) {
		return inspect(inspectableError(this), options);
	}
};
function syntaxError(message) {
	const DomException = globalThis.DOMException;
	return typeof DomException == "function" ? new DomException(message, "SyntaxError") : new SyntaxError(message);
}
function flattenError(err) {
	return err instanceof Error ? "errors" in err && Array.isArray(err.errors) ? err.errors.map(flattenError).join(", ") : "cause" in err && err.cause instanceof Error ? `${err}: ${flattenError(err.cause)}` : err.message : `${err}`;
}
function inspectableError(err) {
	return {
		type: err.type,
		message: err.message,
		code: err.code,
		defaultPrevented: err.defaultPrevented,
		cancelable: err.cancelable,
		timeStamp: err.timeStamp
	};
}
var __typeError = (msg) => {
	throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _readyState;
var _url;
var _redirectUrl;
var _withCredentials;
var _fetch;
var _reconnectInterval;
var _reconnectTimer;
var _lastEventId;
var _controller;
var _parser;
var _onError;
var _onMessage;
var _onOpen;
var _EventSource_instances;
var connect_fn;
var _onFetchResponse;
var _onFetchError;
var getRequestOptions_fn;
var _onEvent;
var _onRetryChange;
var failConnection_fn;
var scheduleReconnect_fn;
var _reconnect;
var EventSource = class extends EventTarget {
	constructor(url, eventSourceInitDict) {
		var _a, _b;
		super(), __privateAdd(this, _EventSource_instances), this.CONNECTING = 0, this.OPEN = 1, this.CLOSED = 2, __privateAdd(this, _readyState), __privateAdd(this, _url), __privateAdd(this, _redirectUrl), __privateAdd(this, _withCredentials), __privateAdd(this, _fetch), __privateAdd(this, _reconnectInterval), __privateAdd(this, _reconnectTimer), __privateAdd(this, _lastEventId, null), __privateAdd(this, _controller), __privateAdd(this, _parser), __privateAdd(this, _onError, null), __privateAdd(this, _onMessage, null), __privateAdd(this, _onOpen, null), __privateAdd(this, _onFetchResponse, async (response) => {
			var _a2;
			__privateGet(this, _parser).reset();
			const { body, redirected, status, headers } = response;
			if (status === 204) {
				__privateMethod(this, _EventSource_instances, failConnection_fn).call(this, "Server sent HTTP 204, not reconnecting", 204), this.close();
				return;
			}
			if (redirected ? __privateSet(this, _redirectUrl, new URL(response.url)) : __privateSet(this, _redirectUrl, void 0), status !== 200) {
				__privateMethod(this, _EventSource_instances, failConnection_fn).call(this, `Non-200 status code (${status})`, status);
				return;
			}
			if (!(headers.get("content-type") || "").startsWith("text/event-stream")) {
				__privateMethod(this, _EventSource_instances, failConnection_fn).call(this, "Invalid content type, expected \"text/event-stream\"", status);
				return;
			}
			if (__privateGet(this, _readyState) === this.CLOSED) return;
			__privateSet(this, _readyState, this.OPEN);
			const openEvent = new Event("open");
			if ((_a2 = __privateGet(this, _onOpen)) == null || _a2.call(this, openEvent), this.dispatchEvent(openEvent), typeof body != "object" || !body || !("getReader" in body)) {
				__privateMethod(this, _EventSource_instances, failConnection_fn).call(this, "Invalid response body, expected a web ReadableStream", status), this.close();
				return;
			}
			const decoder = new TextDecoder(), reader = body.getReader();
			let open = !0;
			do {
				const { done, value } = await reader.read();
				value && __privateGet(this, _parser).feed(decoder.decode(value, { stream: !done })), done && (open = !1, __privateGet(this, _parser).reset(), __privateMethod(this, _EventSource_instances, scheduleReconnect_fn).call(this));
			} while (open);
		}), __privateAdd(this, _onFetchError, (err) => {
			__privateSet(this, _controller, void 0), !(err.name === "AbortError" || err.type === "aborted") && __privateMethod(this, _EventSource_instances, scheduleReconnect_fn).call(this, flattenError(err));
		}), __privateAdd(this, _onEvent, (event) => {
			typeof event.id == "string" && __privateSet(this, _lastEventId, event.id);
			const messageEvent = new MessageEvent(event.event || "message", {
				data: event.data,
				origin: __privateGet(this, _redirectUrl) ? __privateGet(this, _redirectUrl).origin : __privateGet(this, _url).origin,
				lastEventId: event.id || ""
			});
			__privateGet(this, _onMessage) && (!event.event || event.event === "message") && __privateGet(this, _onMessage).call(this, messageEvent), this.dispatchEvent(messageEvent);
		}), __privateAdd(this, _onRetryChange, (value) => {
			__privateSet(this, _reconnectInterval, value);
		}), __privateAdd(this, _reconnect, () => {
			__privateSet(this, _reconnectTimer, void 0), __privateGet(this, _readyState) === this.CONNECTING && __privateMethod(this, _EventSource_instances, connect_fn).call(this);
		});
		try {
			if (url instanceof URL) __privateSet(this, _url, url);
			else if (typeof url == "string") __privateSet(this, _url, new URL(url, getBaseURL()));
			else throw new Error("Invalid URL");
		} catch {
			throw syntaxError("An invalid or illegal string was specified");
		}
		__privateSet(this, _parser, createParser({
			onEvent: __privateGet(this, _onEvent),
			onRetry: __privateGet(this, _onRetryChange)
		})), __privateSet(this, _readyState, this.CONNECTING), __privateSet(this, _reconnectInterval, 3e3), __privateSet(this, _fetch, (_a = eventSourceInitDict == null ? void 0 : eventSourceInitDict.fetch) != null ? _a : globalThis.fetch), __privateSet(this, _withCredentials, (_b = eventSourceInitDict == null ? void 0 : eventSourceInitDict.withCredentials) != null ? _b : !1), __privateMethod(this, _EventSource_instances, connect_fn).call(this);
	}
	/**
	* Returns the state of this EventSource object's connection. It can have the values described below.
	*
	* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/readyState)
	*
	* Note: typed as `number` instead of `0 | 1 | 2` for compatibility with the `EventSource` interface,
	* defined in the TypeScript `dom` library.
	*
	* @public
	*/
	get readyState() {
		return __privateGet(this, _readyState);
	}
	/**
	* Returns the URL providing the event stream.
	*
	* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/url)
	*
	* @public
	*/
	get url() {
		return __privateGet(this, _url).href;
	}
	/**
	* Returns true if the credentials mode for connection requests to the URL providing the event stream is set to "include", and false otherwise.
	*
	* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/withCredentials)
	*/
	get withCredentials() {
		return __privateGet(this, _withCredentials);
	}
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/error_event) */
	get onerror() {
		return __privateGet(this, _onError);
	}
	set onerror(value) {
		__privateSet(this, _onError, value);
	}
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/message_event) */
	get onmessage() {
		return __privateGet(this, _onMessage);
	}
	set onmessage(value) {
		__privateSet(this, _onMessage, value);
	}
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/open_event) */
	get onopen() {
		return __privateGet(this, _onOpen);
	}
	set onopen(value) {
		__privateSet(this, _onOpen, value);
	}
	addEventListener(type, listener, options) {
		const listen = listener;
		super.addEventListener(type, listen, options);
	}
	removeEventListener(type, listener, options) {
		const listen = listener;
		super.removeEventListener(type, listen, options);
	}
	/**
	* Aborts any instances of the fetch algorithm started for this EventSource object, and sets the readyState attribute to CLOSED.
	*
	* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/close)
	*
	* @public
	*/
	close() {
		__privateGet(this, _reconnectTimer) && clearTimeout(__privateGet(this, _reconnectTimer)), __privateGet(this, _readyState) !== this.CLOSED && (__privateGet(this, _controller) && __privateGet(this, _controller).abort(), __privateSet(this, _readyState, this.CLOSED), __privateSet(this, _controller, void 0));
	}
};
_readyState = /* @__PURE__ */ new WeakMap(), _url = /* @__PURE__ */ new WeakMap(), _redirectUrl = /* @__PURE__ */ new WeakMap(), _withCredentials = /* @__PURE__ */ new WeakMap(), _fetch = /* @__PURE__ */ new WeakMap(), _reconnectInterval = /* @__PURE__ */ new WeakMap(), _reconnectTimer = /* @__PURE__ */ new WeakMap(), _lastEventId = /* @__PURE__ */ new WeakMap(), _controller = /* @__PURE__ */ new WeakMap(), _parser = /* @__PURE__ */ new WeakMap(), _onError = /* @__PURE__ */ new WeakMap(), _onMessage = /* @__PURE__ */ new WeakMap(), _onOpen = /* @__PURE__ */ new WeakMap(), _EventSource_instances = /* @__PURE__ */ new WeakSet(), connect_fn = function() {
	__privateSet(this, _readyState, this.CONNECTING), __privateSet(this, _controller, new AbortController()), __privateGet(this, _fetch)(__privateGet(this, _url), __privateMethod(this, _EventSource_instances, getRequestOptions_fn).call(this)).then(__privateGet(this, _onFetchResponse)).catch(__privateGet(this, _onFetchError));
}, _onFetchResponse = /* @__PURE__ */ new WeakMap(), _onFetchError = /* @__PURE__ */ new WeakMap(), getRequestOptions_fn = function() {
	var _a;
	const init = {
		mode: "cors",
		redirect: "follow",
		headers: {
			Accept: "text/event-stream",
			...__privateGet(this, _lastEventId) ? { "Last-Event-ID": __privateGet(this, _lastEventId) } : void 0
		},
		cache: "no-store",
		signal: (_a = __privateGet(this, _controller)) == null ? void 0 : _a.signal
	};
	return "window" in globalThis && (init.credentials = this.withCredentials ? "include" : "same-origin"), init;
}, _onEvent = /* @__PURE__ */ new WeakMap(), _onRetryChange = /* @__PURE__ */ new WeakMap(), failConnection_fn = function(message, code) {
	var _a;
	__privateGet(this, _readyState) !== this.CLOSED && __privateSet(this, _readyState, this.CLOSED);
	const errorEvent = new ErrorEvent("error", {
		code,
		message
	});
	(_a = __privateGet(this, _onError)) == null || _a.call(this, errorEvent), this.dispatchEvent(errorEvent);
}, scheduleReconnect_fn = function(message, code) {
	var _a;
	if (__privateGet(this, _readyState) === this.CLOSED) return;
	__privateSet(this, _readyState, this.CONNECTING);
	const errorEvent = new ErrorEvent("error", {
		code,
		message
	});
	(_a = __privateGet(this, _onError)) == null || _a.call(this, errorEvent), this.dispatchEvent(errorEvent), __privateSet(this, _reconnectTimer, setTimeout(__privateGet(this, _reconnect), __privateGet(this, _reconnectInterval)));
}, _reconnect = /* @__PURE__ */ new WeakMap(), EventSource.CONNECTING = 0, EventSource.OPEN = 1, EventSource.CLOSED = 2;
function getBaseURL() {
	const doc = "document" in globalThis ? globalThis.document : void 0;
	return doc && typeof doc == "object" && "baseURI" in doc && typeof doc.baseURI == "string" ? doc.baseURI : void 0;
}
TransformStream;
//#endregion
//#region node_modules/@modelcontextprotocol/client/dist/index.mjs
/**
* Base class for the OAuth-client-flow error family. Concrete subclasses are
* added to this module alongside the SEP-2468/837/2207/2350/2352 behavior
* changes that throw them, so callers can catch the whole family with a single
* `instanceof OAuthClientFlowError` guard once those land.
*
* @remarks Nothing in the SDK throws this base class directly. In the release
* that introduces it no subclass exists yet — the guard is a forward-compat
* hook and will not match anything until the first behavior change ships.
*/
var OAuthClientFlowError = class extends Error {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.OAuthClientFlowError" });
	}
	static [Symbol.hasInstance](value) {
		return brandedHasInstance(this, value);
	}
	/**
	* Brand-based type guard: equivalent to `value instanceof this`, as an
	* explicit static predicate (the axios/AWS-SDK `isInstance` style). Reads
	* the caller's own brand via `this`, so every branded subclass gets a
	* correctly-scoped guard by inheritance. Must be invoked on the class —
	* in callback position write `v => SdkError.isInstance(v)`, not
	* `.filter(SdkError.isInstance)` (detached calls throw rather than
	* silently matching nothing).
	*/
	static isInstance(value) {
		if (typeof this !== "function") throw new TypeError("isInstance must be called on the class (e.g. `SdkError.isInstance(value)`); for callbacks use `v => SdkError.isInstance(v)`");
		return brandedHasInstance(this, value);
	}
	constructor(message) {
		super(message);
		this.name = new.target.name;
		stampErrorBrands(this, new.target);
	}
};
(class extends OAuthClientFlowError {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.IssuerMismatchError" });
	}
	/** Which check failed — metadata echo (RFC 8414 §3.3) or authorization-response `iss` (RFC 9207). */
	kind;
	/** The issuer the client expected (from validated metadata / discovery input). */
	expected;
	/** The issuer value that was received. Attacker-controllable on the `'authorization_response'` path. */
	received;
	constructor(kind, expected, received) {
		super(`Issuer mismatch in ${kind === "metadata" ? "authorization server metadata (RFC 8414 §3.3)" : "authorization response (RFC 9207)"}: expected ${JSON.stringify(expected)}, received ${JSON.stringify(received)}`);
		this.kind = kind;
		this.expected = expected;
		this.received = received;
	}
});
(class extends OAuthClientFlowError {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.RegistrationRejectedError" });
	}
	/** HTTP status code returned by the registration endpoint. */
	status;
	/** Raw response body text (typically an RFC 7591 error JSON document). */
	body;
	/** The exact client metadata that was POSTed (after SDK defaults were applied). */
	submittedMetadata;
	constructor(args) {
		super(`Dynamic Client Registration rejected (HTTP ${args.status}): ${args.body}`);
		this.status = args.status;
		this.body = args.body;
		this.submittedMetadata = args.submittedMetadata;
	}
});
(class extends OAuthClientFlowError {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.InsecureTokenEndpointError" });
	}
	/** The token endpoint URL that was rejected. */
	tokenEndpoint;
	constructor(tokenEndpoint) {
		super(`Refusing to send credentials to non-https token endpoint '${tokenEndpoint}'. OAuth token requests MUST use TLS (localhost / *.localhost / 127.0.0.1 / ::1 are exempt).`);
		this.tokenEndpoint = tokenEndpoint;
	}
});
(class extends OAuthClientFlowError {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.AuthorizationServerMismatchError" });
	}
	constructor(recordedIssuer, currentIssuer) {
		super(`Authorization server mismatch: credentials are bound to ${JSON.stringify(recordedIssuer)} but this call resolved ${JSON.stringify(currentIssuer)}; refusing to present them to a different authorization server`);
		this.recordedIssuer = recordedIssuer;
		this.currentIssuer = currentIssuer;
	}
});
(class extends OAuthClientFlowError {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.InsufficientScopeError" });
	}
	/** The `scope` value from the `WWW-Authenticate` challenge — the scopes the resource server says are required. */
	requiredScope;
	/** The `resource_metadata` URL from the `WWW-Authenticate` challenge, if present. */
	resourceMetadataUrl;
	/** The `error_description` from the `WWW-Authenticate` challenge, if present. */
	errorDescription;
	constructor(init) {
		super(`Insufficient scope${init.requiredScope ? `: required "${init.requiredScope}"` : ""}`);
		this.requiredScope = init.requiredScope;
		this.resourceMetadataUrl = init.resourceMetadataUrl;
		this.errorDescription = init.errorDescription;
	}
});
(class extends Error {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.UnauthorizedError" });
	}
	static [Symbol.hasInstance](value) {
		return brandedHasInstance(this, value);
	}
	/**
	* Brand-based type guard: equivalent to `value instanceof this`, as an
	* explicit static predicate (the axios/AWS-SDK `isInstance` style). Reads
	* the caller's own brand via `this`, so every branded subclass gets a
	* correctly-scoped guard by inheritance. Must be invoked on the class —
	* in callback position write `v => SdkError.isInstance(v)`, not
	* `.filter(SdkError.isInstance)` (detached calls throw rather than
	* silently matching nothing).
	*/
	static isInstance(value) {
		if (typeof this !== "function") throw new TypeError("isInstance must be called on the class (e.g. `SdkError.isInstance(value)`); for callbacks use `v => SdkError.isInstance(v)`");
		return brandedHasInstance(this, value);
	}
	constructor(message) {
		super(message ?? "Unauthorized");
		this.name = "UnauthorizedError";
		stampErrorBrands(this, new.target);
	}
});
(class extends Error {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.SseError" });
	}
	static [Symbol.hasInstance](value) {
		return brandedHasInstance(this, value);
	}
	/**
	* Brand-based type guard: equivalent to `value instanceof this`, as an
	* explicit static predicate (the axios/AWS-SDK `isInstance` style). Reads
	* the caller's own brand via `this`, so every branded subclass gets a
	* correctly-scoped guard by inheritance. Must be invoked on the class —
	* in callback position write `v => SdkError.isInstance(v)`, not
	* `.filter(SdkError.isInstance)` (detached calls throw rather than
	* silently matching nothing).
	*/
	static isInstance(value) {
		if (typeof this !== "function") throw new TypeError("isInstance must be called on the class (e.g. `SdkError.isInstance(value)`); for callbacks use `v => SdkError.isInstance(v)`");
		return brandedHasInstance(this, value);
	}
	constructor(code, message, event) {
		super(`SSE error: ${message}`);
		this.code = code;
		this.event = event;
		stampErrorBrands(this, new.target);
	}
});
//#endregion
//#region node_modules/@modelcontextprotocol/ext-apps/dist/src/app.js
var n = "ui/resourceUri";
var o = "text/html;profile=mcp-app";
var L = class {
	_eventSlots = /* @__PURE__ */ new Map();
	setHandler(X, Y) {
		let Z = this._ensureEventSlot(X);
		if (Z.onHandler && Y) console.warn(`[MCP Apps] on${String(X)} handler replaced. Use addEventListener("${String(X)}", …) to add multiple listeners without replacing.`);
		Z.onHandler = Y;
	}
	getHandler(X) {
		return this._eventSlots.get(X)?.onHandler;
	}
	addEventListener(X, Y) {
		this._ensureEventSlot(X).listeners.push(Y);
	}
	removeEventListener(X, Y) {
		let Z = this._eventSlots.get(X);
		if (!Z) return;
		let $ = Z.listeners.indexOf(Y);
		if ($ !== -1) Z.listeners.splice($, 1);
	}
	dispatch(X, Y) {
		let Z = this._eventSlots.get(X);
		if (!Z) return;
		Z.onHandler?.(Y);
		for (let $ of [...Z.listeners]) $(Y);
	}
	_ensureEventSlot(X) {
		let Y = this._eventSlots.get(X);
		if (!Y) Y = { listeners: [] }, this._eventSlots.set(X, Y);
		return Y;
	}
};
var _ = class {
	_methods = /* @__PURE__ */ new Set();
	claim(X, Y) {
		if (this._methods.has(X)) throw Error(`Handler for "${X}" already registered (via ${Y}). Use addEventListener() to attach multiple listeners, or the on* setter for replace semantics.`);
		this._methods.add(X);
	}
	replace(X) {
		this._methods.add(X);
	}
	release(X) {
		this._methods.delete(X);
	}
	has(X) {
		return this._methods.has(X);
	}
};
var f = /* @__PURE__ */ new Set();
function O(X, Y) {
	let [Z, $] = Y, D = Z?.shape;
	if (typeof D?.method?.value !== "string") return;
	let K = D.method.value, W = X === "request" ? "setRequestHandler" : "setNotificationHandler";
	if (!f.has(W)) f.add(W), console.warn(`[ext-apps] ${W}(Schema, handler) is deprecated; use ${W}("${K}", { params: Schema.shape.params }, handler).`);
	let G = $;
	return [
		K,
		{ params: D.params },
		X === "request" ? (J, N) => G({
			method: K,
			params: J
		}, a(N)) : (J) => G({
			method: K,
			params: J
		})
	];
}
function a(X) {
	return {
		signal: X.mcpReq.signal,
		requestId: X.mcpReq.id,
		sessionId: X.sessionId,
		_meta: X.mcpReq._meta,
		sendRequest: X.mcpReq.send,
		sendNotification: X.mcpReq.notify,
		authInfo: X.http?.authInfo
	};
}
var E = "2026-01-26";
var s = "ui/open-link";
var t = "ui/download-file";
var e = "ui/message";
var QQ = "ui/notifications/sandbox-proxy-ready";
var XQ = "ui/notifications/sandbox-resource-ready";
var YQ = "ui/notifications/size-changed";
var ZQ = "ui/notifications/tool-input";
var q = "ui/notifications/tool-input-partial";
var $Q = "ui/notifications/tool-result";
var DQ = "ui/notifications/tool-cancelled";
var KQ = "ui/notifications/host-context-changed";
var WQ = "ui/notifications/request-teardown";
var GQ = "ui/resource-teardown";
var JQ = "ui/initialize";
var NQ = "ui/notifications/initialized";
var VQ = "ui/request-display-mode";
var j = class {
	eventTarget;
	eventSource;
	messageListener;
	constructor(X = window.parent, Y) {
		this.eventTarget = X;
		this.eventSource = Y;
		this.messageListener = (Z) => {
			if (Y && Z.source !== this.eventSource) {
				console.debug("Ignoring message from unknown source", Z);
				return;
			}
			let $ = JSONRPCMessageSchema.safeParse(Z.data);
			if ($.success) console.debug("Parsed message", $.data), this.onmessage?.($.data);
			else if (Z.data?.jsonrpc !== "2.0") console.debug("Ignoring non-JSON-RPC message", $.error.message, Z);
			else console.error("Failed to parse message", $.error.message, Z), this.onerror?.(Error("Invalid JSON-RPC message received: " + $.error.message));
		};
	}
	async start() {
		window.addEventListener("message", this.messageListener);
	}
	async send(X, Y) {
		if (X.method !== "ui/notifications/tool-input-partial") console.debug("Sending message", X);
		this.eventTarget.postMessage(X, "*");
	}
	async close() {
		window.removeEventListener("message", this.messageListener), this.onclose?.();
	}
	onclose;
	onerror;
	onmessage;
	sessionId;
	setProtocolVersion;
};
var d = union([literal("light"), literal("dark")]).describe("Color theme preference for the host environment.");
var V = union([
	literal("inline"),
	literal("fullscreen"),
	literal("pip")
]).describe("Display mode for UI presentation.");
var qQ = record(union([
	literal("--color-background-primary"),
	literal("--color-background-secondary"),
	literal("--color-background-tertiary"),
	literal("--color-background-inverse"),
	literal("--color-background-ghost"),
	literal("--color-background-info"),
	literal("--color-background-danger"),
	literal("--color-background-success"),
	literal("--color-background-warning"),
	literal("--color-background-disabled"),
	literal("--color-text-primary"),
	literal("--color-text-secondary"),
	literal("--color-text-tertiary"),
	literal("--color-text-inverse"),
	literal("--color-text-ghost"),
	literal("--color-text-info"),
	literal("--color-text-danger"),
	literal("--color-text-success"),
	literal("--color-text-warning"),
	literal("--color-text-disabled"),
	literal("--color-border-primary"),
	literal("--color-border-secondary"),
	literal("--color-border-tertiary"),
	literal("--color-border-inverse"),
	literal("--color-border-ghost"),
	literal("--color-border-info"),
	literal("--color-border-danger"),
	literal("--color-border-success"),
	literal("--color-border-warning"),
	literal("--color-border-disabled"),
	literal("--color-ring-primary"),
	literal("--color-ring-secondary"),
	literal("--color-ring-inverse"),
	literal("--color-ring-info"),
	literal("--color-ring-danger"),
	literal("--color-ring-success"),
	literal("--color-ring-warning"),
	literal("--font-sans"),
	literal("--font-mono"),
	literal("--font-weight-normal"),
	literal("--font-weight-medium"),
	literal("--font-weight-semibold"),
	literal("--font-weight-bold"),
	literal("--font-text-xs-size"),
	literal("--font-text-sm-size"),
	literal("--font-text-md-size"),
	literal("--font-text-lg-size"),
	literal("--font-heading-xs-size"),
	literal("--font-heading-sm-size"),
	literal("--font-heading-md-size"),
	literal("--font-heading-lg-size"),
	literal("--font-heading-xl-size"),
	literal("--font-heading-2xl-size"),
	literal("--font-heading-3xl-size"),
	literal("--font-text-xs-line-height"),
	literal("--font-text-sm-line-height"),
	literal("--font-text-md-line-height"),
	literal("--font-text-lg-line-height"),
	literal("--font-heading-xs-line-height"),
	literal("--font-heading-sm-line-height"),
	literal("--font-heading-md-line-height"),
	literal("--font-heading-lg-line-height"),
	literal("--font-heading-xl-line-height"),
	literal("--font-heading-2xl-line-height"),
	literal("--font-heading-3xl-line-height"),
	literal("--border-radius-xs"),
	literal("--border-radius-sm"),
	literal("--border-radius-md"),
	literal("--border-radius-lg"),
	literal("--border-radius-xl"),
	literal("--border-radius-full"),
	literal("--border-width-regular"),
	literal("--shadow-hairline"),
	literal("--shadow-sm"),
	literal("--shadow-md"),
	literal("--shadow-lg")
]).describe("CSS variable keys available to MCP apps for theming.").describe(`Style variables for theming MCP apps.

Individual style keys are optional - hosts may provide any subset of these values.
Values are strings containing CSS values (colors, sizes, font stacks, etc.).

Note: This type uses \`Record<K, string | undefined>\` rather than \`Partial<Record<K, string>>\`
for compatibility with Zod schema generation. Both are functionally equivalent for validation.`), union([string(), _undefined()]).describe(`Style variables for theming MCP apps.

Individual style keys are optional - hosts may provide any subset of these values.
Values are strings containing CSS values (colors, sizes, font stacks, etc.).

Note: This type uses \`Record<K, string | undefined>\` rather than \`Partial<Record<K, string>>\`
for compatibility with Zod schema generation. Both are functionally equivalent for validation.`)).describe(`Style variables for theming MCP apps.

Individual style keys are optional - hosts may provide any subset of these values.
Values are strings containing CSS values (colors, sizes, font stacks, etc.).

Note: This type uses \`Record<K, string | undefined>\` rather than \`Partial<Record<K, string>>\`
for compatibility with Zod schema generation. Both are functionally equivalent for validation.`);
var FQ = object({
	method: literal("ui/open-link"),
	params: object({ url: string().describe("URL to open in the host's browser") })
});
var I = object({ isError: boolean().optional().describe("True if the host failed to open the URL (e.g., due to security policy).") }).passthrough();
var P = object({ isError: boolean().optional().describe("True if the download failed (e.g., user cancelled or host denied).") }).passthrough();
var R = object({ isError: boolean().optional().describe("True if the host rejected or failed to deliver the message.") }).passthrough();
var IQ = object({
	method: literal("ui/notifications/sandbox-proxy-ready"),
	params: object({})
});
var z = object({
	connectDomains: array(string()).optional().describe(`Origins for network requests (fetch/XHR/WebSocket).

- Maps to CSP \`connect-src\` directive
- Empty or omitted → no network connections (secure default)`),
	resourceDomains: array(string()).optional().describe("Origins for static resources (images, scripts, stylesheets, fonts, media).\n\n- Maps to CSP `img-src`, `script-src`, `style-src`, `font-src`, `media-src` directives\n- Wildcard subdomains supported: `https://*.example.com`\n- Empty or omitted → no network resources (secure default)"),
	frameDomains: array(string()).optional().describe("Origins for nested iframes.\n\n- Maps to CSP `frame-src` directive\n- Empty or omitted → no nested iframes allowed (`frame-src 'none'`)"),
	baseUriDomains: array(string()).optional().describe("Allowed base URIs for the document.\n\n- Maps to CSP `base-uri` directive\n- Empty or omitted → only same origin allowed (`base-uri 'self'`)")
});
var B = object({
	camera: object({}).optional().describe("Request camera access.\n\nMaps to Permission Policy `camera` feature."),
	microphone: object({}).optional().describe("Request microphone access.\n\nMaps to Permission Policy `microphone` feature."),
	geolocation: object({}).optional().describe("Request geolocation access.\n\nMaps to Permission Policy `geolocation` feature."),
	clipboardWrite: object({}).optional().describe("Request clipboard write access.\n\nMaps to Permission Policy `clipboard-write` feature.")
});
var PQ = object({
	method: literal("ui/notifications/size-changed"),
	params: object({
		width: number().optional().describe("New width in pixels."),
		height: number().optional().describe("New height in pixels.")
	})
});
var w = object({
	method: literal("ui/notifications/tool-input"),
	params: object({ arguments: record(string(), unknown().describe("Complete tool call arguments as key-value pairs.")).optional().describe("Complete tool call arguments as key-value pairs.") })
});
var A = object({
	method: literal("ui/notifications/tool-input-partial"),
	params: object({ arguments: record(string(), unknown().describe("Partial tool call arguments (incomplete, may change).")).optional().describe("Partial tool call arguments (incomplete, may change).") })
});
var H = object({
	method: literal("ui/notifications/tool-cancelled"),
	params: object({ reason: string().optional().describe("Optional reason for the cancellation (e.g., \"user action\", \"timeout\").") })
});
var h = object({ fonts: string().optional() });
var m = object({
	variables: qQ.optional().describe("CSS variables for theming the app."),
	css: h.optional().describe("CSS blocks that apps can inject.")
});
var U = object({
	method: literal("ui/resource-teardown"),
	params: object({})
});
var T = record(string(), unknown());
var F = object({
	text: object({}).optional().describe("Host supports text content blocks."),
	image: object({}).optional().describe("Host supports image content blocks."),
	audio: object({}).optional().describe("Host supports audio content blocks."),
	resource: object({}).optional().describe("Host supports resource content blocks."),
	resourceLink: object({}).optional().describe("Host supports resource link content blocks."),
	structuredContent: object({}).optional().describe("Host supports structured content.")
});
var RQ = object({
	method: literal("ui/notifications/request-teardown"),
	params: object({}).optional()
});
var c = object({
	experimental: record(string(), record(string(), any()).describe("Experimental features keyed by identifier.")).optional().describe("Experimental features keyed by identifier."),
	openLinks: object({}).optional().describe("Host supports opening external URLs."),
	downloadFile: object({}).optional().describe("Host supports file downloads via ui/download-file."),
	serverTools: object({ listChanged: boolean().optional().describe("Host supports tools/list_changed notifications.") }).optional().describe("Host can proxy tool calls to the MCP server."),
	serverResources: object({ listChanged: boolean().optional().describe("Host supports resources/list_changed notifications.") }).optional().describe("Host can proxy resource reads to the MCP server."),
	logging: object({}).optional().describe("Host accepts log messages."),
	sandbox: object({
		permissions: B.optional().describe("Permissions granted by the host (camera, microphone, geolocation)."),
		csp: z.optional().describe("CSP domains approved by the host.")
	}).optional().describe("Sandbox configuration applied by the host."),
	updateModelContext: F.optional().describe("Host accepts context updates (ui/update-model-context) to be included in the model's context for future turns."),
	message: F.optional().describe("Host supports receiving content messages (ui/message) from the view."),
	sampling: object({ tools: object({}).optional().describe("Host supports tool use via `tools` and `toolChoice` parameters.") }).optional().describe("Host supports LLM sampling (sampling/createMessage) from the view.\nMirrors the MCP `ClientCapabilities.sampling` shape so hosts can pass it through.")
});
var p = object({
	experimental: record(string(), record(string(), any()).describe("Experimental features keyed by identifier.")).optional().describe("Experimental features keyed by identifier."),
	tools: object({ listChanged: boolean().optional().describe("App supports tools/list_changed notifications.") }).optional().describe("App exposes MCP-style tools that the host can call."),
	availableDisplayModes: array(V).optional().describe("Display modes the app supports.")
});
var wQ = object({
	method: literal("ui/notifications/initialized"),
	params: object({}).optional()
});
var AQ = object({
	csp: z.optional().describe("Content Security Policy configuration for UI resources."),
	permissions: B.optional().describe("Sandbox permissions requested by the UI resource."),
	domain: string().optional().describe(`Dedicated origin for view sandbox.

Useful when views need stable, dedicated origins for OAuth callbacks, CORS policies, or API key allowlists.

**Host-dependent:** The format and validation rules for this field are determined by each host. Servers MUST consult host-specific documentation for the expected domain format. Common patterns include:
- Hash-based subdomains (e.g., \`{hash}.claudemcpcontent.com\`)
- URL-derived subdomains (e.g., \`www-example-com.oaiusercontent.com\`)

If omitted, host uses default sandbox origin (typically per-conversation).`),
	prefersBorder: boolean().optional().describe(`Visual boundary preference - true if view prefers a visible border.

Boolean requesting whether a visible border and background is provided by the host. Specifying an explicit value for this is recommended because hosts' defaults may vary.

- \`true\`: request visible border + background
- \`false\`: request no visible border + background
- omitted: host decides border`)
});
var HQ = object({
	method: literal("ui/request-display-mode"),
	params: object({ mode: V.describe("The display mode being requested.") })
});
var C = object({ mode: V.describe("The display mode that was actually set. May differ from requested if not supported.") }).passthrough();
var i = union([literal("model"), literal("app")]).describe("Tool visibility scope - who can access the tool.");
var UQ = object({
	resourceUri: string().optional(),
	visibility: array(i).optional().describe(`Who can access this tool. Default: ["model", "app"]
- "model": Tool visible to and callable by the agent
- "app": Tool callable by the app from this server only`),
	csp: never().optional(),
	permissions: never().optional()
});
object({ mimeTypes: array(string()).optional().describe("Array of supported MIME types for UI resources.\nMust include `\"text/html;profile=mcp-app\"` for MCP Apps support.") });
var TQ = object({
	method: literal("ui/download-file"),
	params: object({ contents: array(union([EmbeddedResourceSchema, ResourceLinkSchema])).describe("Resource contents to download — embedded (inline data) or linked (host fetches). Uses standard MCP resource types.") })
});
var CQ = object({
	method: literal("ui/message"),
	params: object({
		role: literal("user").describe("Message role, currently only \"user\" is supported."),
		content: array(ContentBlockSchema).describe("Message content blocks (text, image, etc.).")
	})
});
var MQ = object({
	method: literal("ui/notifications/sandbox-resource-ready"),
	params: object({
		html: string().describe("HTML content to load into the inner iframe."),
		sandbox: string().optional().describe("Optional override for the inner iframe's sandbox attribute."),
		csp: z.optional().describe("CSP configuration from resource metadata."),
		permissions: B.optional().describe("Sandbox permissions from resource metadata.")
	})
});
var M = object({
	method: literal("ui/notifications/tool-result"),
	params: CallToolResultSchema.describe("Standard MCP tool execution result.")
});
var k = object({
	toolInfo: object({
		id: RequestIdSchema.optional().describe("JSON-RPC id of the tools/call request."),
		tool: ToolSchema.describe("Tool definition including name, inputSchema, etc.")
	}).optional().describe("Metadata of the tool call that instantiated this App."),
	theme: d.optional().describe("Current color theme preference."),
	styles: m.optional().describe("Style configuration for theming the app."),
	displayMode: V.optional().describe("How the UI is currently displayed."),
	availableDisplayModes: array(V).optional().describe("Display modes the host supports."),
	containerDimensions: union([object({ height: number().describe("Fixed container height in pixels.") }), object({ maxHeight: union([number(), _undefined()]).optional().describe("Maximum container height in pixels.") })]).and(union([object({ width: number().describe("Fixed container width in pixels.") }), object({ maxWidth: union([number(), _undefined()]).optional().describe("Maximum container width in pixels.") })])).optional().describe(`Container dimensions. Represents the dimensions of the iframe or other
container holding the app. Specify either width or maxWidth, and either height or maxHeight.`),
	locale: string().optional().describe("User's language and region preference in BCP 47 format."),
	timeZone: string().optional().describe("User's timezone in IANA format."),
	userAgent: string().optional().describe("Host application identifier."),
	platform: union([
		literal("web"),
		literal("desktop"),
		literal("mobile")
	]).optional().describe("Platform type for responsive design decisions."),
	deviceCapabilities: object({
		touch: boolean().optional().describe("Whether the device supports touch input."),
		hover: boolean().optional().describe("Whether the device supports hover interactions.")
	}).optional().describe("Device input capabilities."),
	safeAreaInsets: object({
		top: number().describe("Top safe area inset in pixels."),
		right: number().describe("Right safe area inset in pixels."),
		bottom: number().describe("Bottom safe area inset in pixels."),
		left: number().describe("Left safe area inset in pixels.")
	}).optional().describe("Mobile safe area boundaries in pixels.")
}).passthrough();
var b = object({
	method: literal("ui/notifications/host-context-changed"),
	params: k.describe("Partial context update containing only changed fields.")
});
var kQ = object({
	method: literal("ui/update-model-context"),
	params: object({
		content: array(ContentBlockSchema).optional().describe("Context content blocks (text, image, etc.)."),
		structuredContent: record(string(), unknown().describe("Structured content for machine-readable context data.")).optional().describe("Structured content for machine-readable context data.")
	})
});
var bQ = object({
	method: literal("ui/initialize"),
	params: object({
		appInfo: ImplementationSchema.describe("App identification (name and version)."),
		appCapabilities: p.describe("Features and capabilities this app provides."),
		protocolVersion: string().describe("Protocol version this app supports.")
	})
});
var S = object({
	protocolVersion: string().describe("Negotiated protocol version string (e.g., \"2025-11-21\")."),
	hostInfo: ImplementationSchema.describe("Host application identification and version."),
	hostCapabilities: c.describe("Features and capabilities provided by the host."),
	hostContext: k.describe("Rich context about the host environment.")
}).passthrough();
var SQ = { target: "draft-2020-12" };
async function y(X, Y) {
	let Z = X["~standard"];
	if (Z.jsonSchema) return Z.jsonSchema[Y](SQ);
	throw Error(`Schema (vendor: ${Z.vendor}) does not implement Standard JSON Schema (~standard.jsonSchema). Use a library that does (zod v4, ArkType, Valibot) or wrap your schema accordingly.`);
}
async function x(X, Y, Z = "") {
	let $ = await X["~standard"].validate(Y);
	if ($.issues) {
		let D = $.issues.map((K) => {
			let W = K.path?.map((G) => typeof G === "object" ? G.key : G).join(".");
			return W ? `${W}: ${K.message}` : K.message;
		}).join("; ");
		throw Error(Z + D);
	}
	return $.value;
}
function yQ() {
	let X = document.documentElement.getAttribute("data-theme");
	if (X === "dark" || X === "light") return X;
	return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
function xQ(X) {
	let Y = document.documentElement;
	Y.setAttribute("data-theme", X), Y.style.colorScheme = X;
}
function uQ(X, Y = document.documentElement) {
	for (let [Z, $] of Object.entries(X)) if ($ !== void 0) Y.style.setProperty(Z, $);
}
function fQ(X) {
	if (document.getElementById("__mcp-host-fonts")) return;
	let Z = document.createElement("style");
	Z.id = "__mcp-host-fonts", Z.textContent = X, document.head.appendChild(Z);
}
function hQ(X, Y) {
	let Z = {
		...X,
		...Y
	};
	if (Y.experimental !== void 0) Z.experimental = {
		...X.experimental,
		...Y.experimental
	};
	if (Y.tools !== void 0) Z.tools = {
		...X.tools,
		...Y.tools
	};
	return Z;
}
var l = class l extends Protocol {
	_appInfo;
	_appCapabilities;
	options;
	_hostCapabilities;
	_hostInfo;
	_hostContext;
	_registeredTools = {};
	_initializedSent = !1;
	_registeredEvents = /* @__PURE__ */ new Set();
	_events = new L();
	_methods = new _();
	setRequestHandler = (...X) => {
		let [Y, ...Z] = O("request", X) ?? X;
		this._methods.claim(Y, "setRequestHandler"), super.setRequestHandler.call(this, Y, ...Z);
	};
	setNotificationHandler = (...X) => {
		let [Y, ...Z] = O("notification", X) ?? X;
		this._methods.claim(Y, "setNotificationHandler"), super.setNotificationHandler.call(this, Y, ...Z);
	};
	removeRequestHandler = (X) => {
		this._methods.release(X), super.removeRequestHandler(X);
	};
	removeNotificationHandler = (X) => {
		this._methods.release(X), super.removeNotificationHandler(X);
	};
	replaceRequestHandler = (X, ...Y) => {
		this._methods.replace(X), super.setRequestHandler.call(this, X, ...Y);
	};
	_assertInitialized(X) {
		if (this._initializedSent) return;
		let Y = `[ext-apps] App.${X}() called before connect() completed the ui/initialize handshake. Await app.connect() before calling this method, or move data loading to an ontoolresult handler.`;
		if (this.options?.strict) throw Error(Y);
		console.warn(`${Y}. This will throw in a future release.`);
	}
	eventSchemas = {
		toolinput: w,
		toolinputpartial: A,
		toolresult: M,
		toolcancelled: H,
		hostcontextchanged: b
	};
	static ONE_SHOT_EVENTS = /* @__PURE__ */ new Set([
		"toolinput",
		"toolinputpartial",
		"toolresult",
		"toolcancelled"
	]);
	_everHadListener = /* @__PURE__ */ new Set();
	_assertHandlerTiming(X) {
		if (!l.ONE_SHOT_EVENTS.has(X) || this._everHadListener.has(X)) return;
		if (this._everHadListener.add(X), !this._initializedSent) return;
		let Y = `[ext-apps] "${String(X)}" handler registered after connect() completed the ui/initialize handshake. The host may have already sent this notification. Register handlers before calling app.connect().`;
		if (this.options?.strict) throw Error(Y);
		console.warn(Y);
	}
	setEventHandler(X, Y) {
		if (Y) this._assertHandlerTiming(X);
		this._ensureEventSlot(X), this._events.setHandler(X, Y);
	}
	addEventListener(X, Y) {
		this._assertHandlerTiming(X), this._ensureEventSlot(X), this._events.addEventListener(X, Y);
	}
	removeEventListener(X, Y) {
		this._events.removeEventListener(X, Y);
	}
	_ensureEventSlot(X) {
		if (this._registeredEvents.has(X)) return;
		let Y = this.eventSchemas[X];
		if (!Y) throw Error(`Unknown event: ${String(X)}`);
		this.setNotificationHandler(Y.shape.method.value, { params: Y.shape.params }, (Z) => {
			let $ = Z;
			if (X === "hostcontextchanged") this._hostContext = {
				...this._hostContext,
				...$
			};
			this._events.dispatch(X, $);
		}), this._registeredEvents.add(X);
	}
	getEventHandler(X) {
		return this._events.getHandler(X);
	}
	warnIfRequestHandlerReplaced(X, Y, Z) {
		if (Y && Z) console.warn(`[MCP Apps] ${X} handler replaced. Previous handler will no longer be called.`);
	}
	constructor(X, Y = {}, Z = { autoResize: !0 }) {
		super(Z);
		this._appInfo = X;
		this._appCapabilities = Y;
		this.options = Z;
		if (this._methods.replace("notifications/cancelled"), this._methods.replace("notifications/progress"), !Z.allowUnsafeEval) config({ jitless: !0 });
		this.replaceRequestHandler("ping", ($) => {
			return console.log("Received ping:", $.params), {};
		}), this.setEventHandler("hostcontextchanged", void 0);
	}
	buildContext(X) {
		return X;
	}
	registerAppCapabilities(X) {
		if (this.transport) throw Error("Cannot register capabilities after transport is established");
		this._appCapabilities = hQ(this._appCapabilities, X);
	}
	registerTool(X, Y, Z) {
		if (this._registeredTools[X]) throw Error(`Tool ${X} is already registered`);
		let $ = this, D = () => {
			if ($._initializedSent && $._appCapabilities.tools?.listChanged) $.sendToolListChanged();
		}, K = Y.inputSchema !== void 0, W = {
			title: Y.title,
			description: Y.description,
			inputSchema: Y.inputSchema,
			outputSchema: Y.outputSchema,
			annotations: Y.annotations,
			_meta: Y._meta,
			enabled: !0,
			enable() {
				this.enabled = !0, D();
			},
			disable() {
				this.enabled = !1, D();
			},
			update(G) {
				Object.assign(this, G), D();
			},
			remove() {
				if ($._registeredTools[X] !== W) return;
				delete $._registeredTools[X], D();
			},
			handler: async (G, J) => {
				if (!W.enabled) throw Error(`Tool ${X} is disabled`);
				let N;
				if (K) {
					let u = W.inputSchema;
					N = await Z(u ? await x(u, G ?? {}, `Invalid input for tool ${X}: `) : G ?? {}, J);
				} else N = await Z(J);
				if (W.outputSchema && !N.isError) N.structuredContent = await x(W.outputSchema, N.structuredContent, `Invalid output for tool ${X}: `);
				return N;
			}
		};
		if (this._registeredTools[X] = W, !this._appCapabilities.tools && !this.transport) this.registerAppCapabilities({ tools: { listChanged: !0 } });
		return this.ensureToolHandlersInitialized(), D(), W;
	}
	_toolHandlersInitialized = !1;
	ensureToolHandlersInitialized() {
		if (this._toolHandlersInitialized) return;
		this._toolHandlersInitialized = !0, this.oncalltool = async (X, Y) => {
			let Z = this._registeredTools[X.name];
			if (!Z) throw Error(`Tool ${X.name} not found`);
			return Z.handler(X.arguments, Y);
		}, this.onlisttools = async (X, Y) => {
			return { tools: await Promise.all(Object.entries(this._registeredTools).filter(([$, D]) => D.enabled).map(async ([$, D]) => {
				let K = {
					name: $,
					title: D.title,
					description: D.description,
					inputSchema: D.inputSchema ? await y(D.inputSchema, "input") : {
						type: "object",
						properties: {}
					}
				};
				if (D.outputSchema) K.outputSchema = await y(D.outputSchema, "output");
				if (D.annotations) K.annotations = D.annotations;
				if (D._meta) K._meta = D._meta;
				return K;
			})) };
		};
	}
	async sendToolListChanged(X = {}) {
		this._assertInitialized("sendToolListChanged"), await this.notification({
			method: "notifications/tools/list_changed",
			params: X
		});
	}
	getHostCapabilities() {
		return this._hostCapabilities;
	}
	getHostVersion() {
		return this._hostInfo;
	}
	getHostContext() {
		return this._hostContext;
	}
	get ontoolinput() {
		return this.getEventHandler("toolinput");
	}
	set ontoolinput(X) {
		this.setEventHandler("toolinput", X);
	}
	get ontoolinputpartial() {
		return this.getEventHandler("toolinputpartial");
	}
	set ontoolinputpartial(X) {
		this.setEventHandler("toolinputpartial", X);
	}
	get ontoolresult() {
		return this.getEventHandler("toolresult");
	}
	set ontoolresult(X) {
		this.setEventHandler("toolresult", X);
	}
	get ontoolcancelled() {
		return this.getEventHandler("toolcancelled");
	}
	set ontoolcancelled(X) {
		this.setEventHandler("toolcancelled", X);
	}
	get onhostcontextchanged() {
		return this.getEventHandler("hostcontextchanged");
	}
	set onhostcontextchanged(X) {
		this.setEventHandler("hostcontextchanged", X);
	}
	_onteardown;
	get onteardown() {
		return this._onteardown;
	}
	set onteardown(X) {
		this.warnIfRequestHandlerReplaced("onteardown", this._onteardown, X), this._onteardown = X, this.replaceRequestHandler("ui/resource-teardown", {
			params: U.shape.params,
			result: T
		}, (Y, Z) => {
			if (!this._onteardown) throw Error("No onteardown handler set");
			return this._onteardown(Y, Z);
		});
	}
	_oncalltool;
	get oncalltool() {
		return this._oncalltool;
	}
	set oncalltool(X) {
		this.warnIfRequestHandlerReplaced("oncalltool", this._oncalltool, X), this._oncalltool = X, this.replaceRequestHandler("tools/call", (Y, Z) => {
			if (!this._oncalltool) throw Error("No oncalltool handler set");
			return this._oncalltool(Y.params, Z);
		});
	}
	_onlisttools;
	get onlisttools() {
		return this._onlisttools;
	}
	set onlisttools(X) {
		this.warnIfRequestHandlerReplaced("onlisttools", this._onlisttools, X), this._onlisttools = X, this.replaceRequestHandler("tools/list", (Y, Z) => {
			if (!this._onlisttools) throw Error("No onlisttools handler set");
			return this._onlisttools(Y.params, Z);
		});
	}
	assertCapabilityForMethod(X) {
		switch (X) {
			case "sampling/createMessage":
				if (!this._hostCapabilities?.sampling) throw Error(`Host does not support sampling (required for ${X})`);
				break;
		}
	}
	assertRequestHandlerCapability(X) {
		switch (X) {
			case "tools/call":
			case "tools/list":
				if (!this._appCapabilities.tools) throw Error(`Client does not support tool capability (required for ${X})`);
				return;
			default: return;
		}
	}
	assertNotificationCapability(X) {}
	async callServerTool(X, Y) {
		if (this._assertInitialized("callServerTool"), typeof X === "string") throw Error(`callServerTool() expects an object as its first argument, but received a string ("${X}"). Did you mean: callServerTool({ name: "${X}", arguments: { ... } })?`);
		return await this.request({
			method: "tools/call",
			params: X
		}, {
			onprogress: () => {},
			resetTimeoutOnProgress: !0,
			...Y
		});
	}
	async readServerResource(X, Y) {
		return this._assertInitialized("readServerResource"), await this.request({
			method: "resources/read",
			params: X
		}, Y);
	}
	async listServerResources(X, Y) {
		return this._assertInitialized("listServerResources"), await this.request({
			method: "resources/list",
			params: X
		}, Y);
	}
	async createSamplingMessage(X, Y) {
		return this._assertInitialized("createSamplingMessage"), await this.request({
			method: "sampling/createMessage",
			params: X
		}, Y);
	}
	sendMessage(X, Y) {
		return this._assertInitialized("sendMessage"), this.request({
			method: "ui/message",
			params: X
		}, R, Y);
	}
	sendLog(X) {
		return this.notification({
			method: "notifications/message",
			params: X
		});
	}
	updateModelContext(X, Y) {
		return this._assertInitialized("updateModelContext"), this.request({
			method: "ui/update-model-context",
			params: X
		}, EmptyResultSchema, Y);
	}
	openLink(X, Y) {
		return this._assertInitialized("openLink"), this.request({
			method: "ui/open-link",
			params: X
		}, I, Y);
	}
	sendOpenLink = this.openLink;
	downloadFile(X, Y) {
		return this._assertInitialized("downloadFile"), this.request({
			method: "ui/download-file",
			params: X
		}, P, Y);
	}
	requestTeardown(X = {}) {
		return this.notification({
			method: "ui/notifications/request-teardown",
			params: X
		});
	}
	requestDisplayMode(X, Y) {
		return this._assertInitialized("requestDisplayMode"), this.request({
			method: "ui/request-display-mode",
			params: X
		}, C, Y);
	}
	sendSizeChanged(X) {
		return this.notification({
			method: "ui/notifications/size-changed",
			params: X
		});
	}
	setupSizeChangedNotifications() {
		let X = !1, Y = 0, Z = 0, $ = () => {
			if (X) return;
			X = !0, requestAnimationFrame(() => {
				X = !1;
				let K = document.documentElement, W = K.style.height;
				K.style.height = "max-content";
				let G = Math.ceil(K.getBoundingClientRect().height);
				K.style.height = W;
				let J = Math.ceil(window.innerWidth);
				if (J !== Y || G !== Z) Y = J, Z = G, this.sendSizeChanged({
					width: J,
					height: G
				});
			});
		};
		$();
		let D = new ResizeObserver($);
		return D.observe(document.documentElement), D.observe(document.body), () => D.disconnect();
	}
	async connect(X = new j(window.parent, window.parent), Y) {
		if (this.transport) throw Error("App is already connected. Call close() before connecting again.");
		this._initializedSent = !1;
		try {
			await super.connect(X);
			let Z = await this.request({
				method: "ui/initialize",
				params: {
					appCapabilities: this._appCapabilities,
					appInfo: this._appInfo,
					protocolVersion: E
				}
			}, S, Y);
			if (Z === void 0) throw Error(`Server sent invalid initialize result: ${Z}`);
			if (this._hostCapabilities = Z.hostCapabilities, this._hostInfo = Z.hostInfo, this._hostContext = Z.hostContext, await this.notification({ method: "ui/notifications/initialized" }), this._initializedSent = !0, this.options?.autoResize) this.setupSizeChangedNotifications();
		} catch (Z) {
			throw this.close(), Z;
		}
	}
};
//#endregion
export { l as App, t as DOWNLOAD_FILE_METHOD, L as EventDispatcher, KQ as HOST_CONTEXT_CHANGED_METHOD, NQ as INITIALIZED_METHOD, JQ as INITIALIZE_METHOD, E as LATEST_PROTOCOL_VERSION, e as MESSAGE_METHOD, p as McpUiAppCapabilitiesSchema, V as McpUiDisplayModeSchema, TQ as McpUiDownloadFileRequestSchema, P as McpUiDownloadFileResultSchema, c as McpUiHostCapabilitiesSchema, b as McpUiHostContextChangedNotificationSchema, k as McpUiHostContextSchema, h as McpUiHostCssSchema, m as McpUiHostStylesSchema, bQ as McpUiInitializeRequestSchema, S as McpUiInitializeResultSchema, wQ as McpUiInitializedNotificationSchema, CQ as McpUiMessageRequestSchema, R as McpUiMessageResultSchema, FQ as McpUiOpenLinkRequestSchema, I as McpUiOpenLinkResultSchema, HQ as McpUiRequestDisplayModeRequestSchema, C as McpUiRequestDisplayModeResultSchema, RQ as McpUiRequestTeardownNotificationSchema, z as McpUiResourceCspSchema, AQ as McpUiResourceMetaSchema, B as McpUiResourcePermissionsSchema, U as McpUiResourceTeardownRequestSchema, T as McpUiResourceTeardownResultSchema, IQ as McpUiSandboxProxyReadyNotificationSchema, MQ as McpUiSandboxResourceReadyNotificationSchema, PQ as McpUiSizeChangedNotificationSchema, F as McpUiSupportedContentBlockModalitiesSchema, d as McpUiThemeSchema, H as McpUiToolCancelledNotificationSchema, w as McpUiToolInputNotificationSchema, A as McpUiToolInputPartialNotificationSchema, UQ as McpUiToolMetaSchema, M as McpUiToolResultNotificationSchema, i as McpUiToolVisibilitySchema, kQ as McpUiUpdateModelContextRequestSchema, s as OPEN_LINK_METHOD, j as PostMessageTransport, VQ as REQUEST_DISPLAY_MODE_METHOD, WQ as REQUEST_TEARDOWN_METHOD, o as RESOURCE_MIME_TYPE, GQ as RESOURCE_TEARDOWN_METHOD, n as RESOURCE_URI_META_KEY, QQ as SANDBOX_PROXY_READY_METHOD, XQ as SANDBOX_RESOURCE_READY_METHOD, YQ as SIZE_CHANGED_METHOD, DQ as TOOL_CANCELLED_METHOD, ZQ as TOOL_INPUT_METHOD, q as TOOL_INPUT_PARTIAL_METHOD, $Q as TOOL_RESULT_METHOD, xQ as applyDocumentTheme, fQ as applyHostFonts, uQ as applyHostStyleVariables, yQ as getDocumentTheme };
