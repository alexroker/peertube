"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processDislikeActivity = void 0;
const tslib_1 = require("tslib");
const database_utils_1 = require("../../../helpers/database-utils");
const database_1 = require("../../../initializers/database");
const account_video_rate_1 = require("../../../models/account/account-video-rate");
const videos_1 = require("../videos");
const utils_1 = require("../send/utils");
const url_1 = require("../url");
function processDislikeActivity(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { activity, byActor } = options;
        return database_utils_1.retryTransactionWrapper(processDislike, activity, byActor);
    });
}
exports.processDislikeActivity = processDislikeActivity;
function processDislike(activity, byActor) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const dislikeObject = activity.type === 'Dislike' ? activity.object : activity.object.object;
        const byAccount = byActor.Account;
        if (!byAccount)
            throw new Error('Cannot create dislike with the non account actor ' + byActor.url);
        const { video } = yield videos_1.getOrCreateVideoAndAccountAndChannel({ videoObject: dislikeObject });
        return database_1.sequelizeTypescript.transaction((t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const url = url_1.getVideoDislikeActivityPubUrl(byActor, video);
            const existingRate = yield account_video_rate_1.AccountVideoRateModel.loadByAccountAndVideoOrUrl(byAccount.id, video.id, url);
            if (existingRate && existingRate.type === 'dislike')
                return;
            yield video.increment('dislikes', { transaction: t });
            if (existingRate && existingRate.type === 'like') {
                yield video.decrement('likes', { transaction: t });
            }
            const rate = existingRate || new account_video_rate_1.AccountVideoRateModel();
            rate.type = 'dislike';
            rate.videoId = video.id;
            rate.accountId = byAccount.id;
            rate.url = url;
            yield rate.save({ transaction: t });
            if (video.isOwned()) {
                const exceptions = [byActor];
                yield utils_1.forwardVideoRelatedActivity(activity, t, exceptions, video);
            }
        }));
    });
}
