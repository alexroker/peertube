"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processUndoActivity = void 0;
const tslib_1 = require("tslib");
const database_utils_1 = require("../../../helpers/database-utils");
const logger_1 = require("../../../helpers/logger");
const database_1 = require("../../../initializers/database");
const account_video_rate_1 = require("../../../models/account/account-video-rate");
const actor_1 = require("../../../models/activitypub/actor");
const actor_follow_1 = require("../../../models/activitypub/actor-follow");
const utils_1 = require("../send/utils");
const videos_1 = require("../videos");
const video_share_1 = require("../../../models/video/video-share");
const video_redundancy_1 = require("../../../models/redundancy/video-redundancy");
function processUndoActivity(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { activity, byActor } = options;
        const activityToUndo = activity.object;
        if (activityToUndo.type === 'Like') {
            return database_utils_1.retryTransactionWrapper(processUndoLike, byActor, activity);
        }
        if (activityToUndo.type === 'Create') {
            if (activityToUndo.object.type === 'Dislike') {
                return database_utils_1.retryTransactionWrapper(processUndoDislike, byActor, activity);
            }
            else if (activityToUndo.object.type === 'CacheFile') {
                return database_utils_1.retryTransactionWrapper(processUndoCacheFile, byActor, activity);
            }
        }
        if (activityToUndo.type === 'Dislike') {
            return database_utils_1.retryTransactionWrapper(processUndoDislike, byActor, activity);
        }
        if (activityToUndo.type === 'Follow') {
            return database_utils_1.retryTransactionWrapper(processUndoFollow, byActor, activityToUndo);
        }
        if (activityToUndo.type === 'Announce') {
            return database_utils_1.retryTransactionWrapper(processUndoAnnounce, byActor, activityToUndo);
        }
        logger_1.logger.warn('Unknown activity object type %s -> %s when undo activity.', activityToUndo.type, { activity: activity.id });
        return undefined;
    });
}
exports.processUndoActivity = processUndoActivity;
function processUndoLike(byActor, activity) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const likeActivity = activity.object;
        const { video } = yield videos_1.getOrCreateVideoAndAccountAndChannel({ videoObject: likeActivity.object });
        return database_1.sequelizeTypescript.transaction((t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!byActor.Account)
                throw new Error('Unknown account ' + byActor.url);
            const rate = yield account_video_rate_1.AccountVideoRateModel.loadByAccountAndVideoOrUrl(byActor.Account.id, video.id, likeActivity.id, t);
            if (!rate || rate.type !== 'like')
                throw new Error(`Unknown like by account ${byActor.Account.id} for video ${video.id}.`);
            yield rate.destroy({ transaction: t });
            yield video.decrement('likes', { transaction: t });
            if (video.isOwned()) {
                const exceptions = [byActor];
                yield utils_1.forwardVideoRelatedActivity(activity, t, exceptions, video);
            }
        }));
    });
}
function processUndoDislike(byActor, activity) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const dislike = activity.object.type === 'Dislike'
            ? activity.object
            : activity.object.object;
        const { video } = yield videos_1.getOrCreateVideoAndAccountAndChannel({ videoObject: dislike.object });
        return database_1.sequelizeTypescript.transaction((t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!byActor.Account)
                throw new Error('Unknown account ' + byActor.url);
            const rate = yield account_video_rate_1.AccountVideoRateModel.loadByAccountAndVideoOrUrl(byActor.Account.id, video.id, dislike.id, t);
            if (!rate || rate.type !== 'dislike')
                throw new Error(`Unknown dislike by account ${byActor.Account.id} for video ${video.id}.`);
            yield rate.destroy({ transaction: t });
            yield video.decrement('dislikes', { transaction: t });
            if (video.isOwned()) {
                const exceptions = [byActor];
                yield utils_1.forwardVideoRelatedActivity(activity, t, exceptions, video);
            }
        }));
    });
}
function processUndoCacheFile(byActor, activity) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const cacheFileObject = activity.object.object;
        const { video } = yield videos_1.getOrCreateVideoAndAccountAndChannel({ videoObject: cacheFileObject.object });
        return database_1.sequelizeTypescript.transaction((t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const cacheFile = yield video_redundancy_1.VideoRedundancyModel.loadByUrl(cacheFileObject.id);
            if (!cacheFile) {
                logger_1.logger.debug('Cannot undo unknown video cache %s.', cacheFileObject.id);
                return;
            }
            if (cacheFile.actorId !== byActor.id)
                throw new Error('Cannot delete redundancy ' + cacheFile.url + ' of another actor.');
            yield cacheFile.destroy();
            if (video.isOwned()) {
                const exceptions = [byActor];
                yield utils_1.forwardVideoRelatedActivity(activity, t, exceptions, video);
            }
        }));
    });
}
function processUndoFollow(follower, followActivity) {
    return database_1.sequelizeTypescript.transaction((t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const following = yield actor_1.ActorModel.loadByUrlAndPopulateAccountAndChannel(followActivity.object, t);
        const actorFollow = yield actor_follow_1.ActorFollowModel.loadByActorAndTarget(follower.id, following.id, t);
        if (!actorFollow)
            throw new Error(`'Unknown actor follow ${follower.id} -> ${following.id}.`);
        yield actorFollow.destroy({ transaction: t });
        return undefined;
    }));
}
function processUndoAnnounce(byActor, announceActivity) {
    return database_1.sequelizeTypescript.transaction((t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const share = yield video_share_1.VideoShareModel.loadByUrl(announceActivity.id, t);
        if (!share)
            throw new Error(`Unknown video share ${announceActivity.id}.`);
        if (share.actorId !== byActor.id)
            throw new Error(`${share.url} is not shared by ${byActor.url}.`);
        yield share.destroy({ transaction: t });
        if (share.Video.isOwned()) {
            const exceptions = [byActor];
            yield utils_1.forwardVideoRelatedActivity(announceActivity, t, exceptions, share.Video);
        }
    }));
}
