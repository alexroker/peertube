"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processActivityPubFollow = void 0;
const tslib_1 = require("tslib");
const logger_1 = require("../../../helpers/logger");
const constants_1 = require("../../../initializers/constants");
const send_1 = require("../../activitypub/send");
const core_utils_1 = require("../../../helpers/core-utils");
const webfinger_1 = require("../../../helpers/webfinger");
const actor_1 = require("../../activitypub/actor");
const database_utils_1 = require("../../../helpers/database-utils");
const actor_follow_1 = require("../../../models/activitypub/actor-follow");
const actor_2 = require("../../../models/activitypub/actor");
const notifier_1 = require("../../notifier");
const database_1 = require("../../../initializers/database");
function processActivityPubFollow(job) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const payload = job.data;
        const host = payload.host;
        logger_1.logger.info('Processing ActivityPub follow in job %d.', job.id);
        let targetActor;
        if (!host || host === constants_1.WEBSERVER.HOST) {
            targetActor = yield actor_2.ActorModel.loadLocalByName(payload.name);
        }
        else {
            const sanitizedHost = core_utils_1.sanitizeHost(host, constants_1.REMOTE_SCHEME.HTTP);
            const actorUrl = yield webfinger_1.loadActorUrlOrGetFromWebfinger(payload.name + '@' + sanitizedHost);
            targetActor = yield actor_1.getOrCreateActorAndServerAndModel(actorUrl, 'all');
        }
        if (payload.assertIsChannel && !targetActor.VideoChannel) {
            logger_1.logger.warn('Do not follow %s@%s because it is not a channel.', payload.name, host);
            return;
        }
        const fromActor = yield actor_2.ActorModel.load(payload.followerActorId);
        return database_utils_1.retryTransactionWrapper(follow, fromActor, targetActor, payload.isAutoFollow);
    });
}
exports.processActivityPubFollow = processActivityPubFollow;
function follow(fromActor, targetActor, isAutoFollow = false) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (fromActor.id === targetActor.id) {
            throw new Error('Follower is the same as target actor.');
        }
        const state = !fromActor.serverId && !targetActor.serverId ? 'accepted' : 'pending';
        const actorFollow = yield database_1.sequelizeTypescript.transaction((t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const [actorFollow] = yield actor_follow_1.ActorFollowModel.findOrCreate({
                where: {
                    actorId: fromActor.id,
                    targetActorId: targetActor.id
                },
                defaults: {
                    state,
                    actorId: fromActor.id,
                    targetActorId: targetActor.id
                },
                transaction: t
            });
            actorFollow.ActorFollowing = targetActor;
            actorFollow.ActorFollower = fromActor;
            if (actorFollow.state !== 'accepted')
                send_1.sendFollow(actorFollow, t);
            return actorFollow;
        }));
        const followerFull = yield actor_2.ActorModel.loadFull(fromActor.id);
        const actorFollowFull = Object.assign(actorFollow, {
            ActorFollowing: targetActor,
            ActorFollower: followerFull
        });
        if (actorFollow.state === 'accepted')
            notifier_1.Notifier.Instance.notifyOfNewUserFollow(actorFollowFull);
        if (isAutoFollow === true)
            notifier_1.Notifier.Instance.notifyOfAutoInstanceFollowing(actorFollowFull);
        return actorFollow;
    });
}
