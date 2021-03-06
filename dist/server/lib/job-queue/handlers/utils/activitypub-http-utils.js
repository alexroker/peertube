"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSignedRequestOptions = exports.computeBody = exports.buildGlobalHeaders = void 0;
const tslib_1 = require("tslib");
const activitypub_1 = require("../../../../helpers/activitypub");
const actor_1 = require("../../../../models/activitypub/actor");
const constants_1 = require("../../../../initializers/constants");
const application_1 = require("@server/models/application/application");
const peertube_crypto_1 = require("@server/helpers/peertube-crypto");
function computeBody(payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let body = payload.body;
        if (payload.signatureActorId) {
            const actorSignature = yield actor_1.ActorModel.load(payload.signatureActorId);
            if (!actorSignature)
                throw new Error('Unknown signature actor id.');
            body = yield activitypub_1.buildSignedActivity(actorSignature, payload.body, payload.contextType);
        }
        return body;
    });
}
exports.computeBody = computeBody;
function buildSignedRequestOptions(payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let actor;
        if (payload.signatureActorId) {
            actor = yield actor_1.ActorModel.load(payload.signatureActorId);
            if (!actor)
                throw new Error('Unknown signature actor id.');
        }
        else {
            actor = yield application_1.getServerActor();
        }
        const keyId = actor.url;
        return {
            algorithm: constants_1.HTTP_SIGNATURE.ALGORITHM,
            authorizationHeaderName: constants_1.HTTP_SIGNATURE.HEADER_NAME,
            keyId,
            key: actor.privateKey,
            headers: constants_1.HTTP_SIGNATURE.HEADERS_TO_SIGN
        };
    });
}
exports.buildSignedRequestOptions = buildSignedRequestOptions;
function buildGlobalHeaders(body) {
    return {
        'Digest': peertube_crypto_1.buildDigest(body),
        'Content-Type': 'application/activity+json',
        'Accept': constants_1.ACTIVITY_PUB.ACCEPT_HEADER
    };
}
exports.buildGlobalHeaders = buildGlobalHeaders;
