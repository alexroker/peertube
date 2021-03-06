"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoCommentAudience = exports.audiencify = exports.getAudienceFromFollowersOf = exports.getActorsInvolvedInVideo = exports.getRemoteVideoAudience = exports.getAudience = exports.buildAudience = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("../../initializers/constants");
const actor_1 = require("../../models/activitypub/actor");
const video_share_1 = require("../../models/video/video-share");
function getRemoteVideoAudience(accountActor, actorsInvolvedInVideo) {
    return {
        to: [accountActor.url],
        cc: actorsInvolvedInVideo.map(a => a.followersUrl)
    };
}
exports.getRemoteVideoAudience = getRemoteVideoAudience;
function getVideoCommentAudience(videoComment, threadParentComments, actorsInvolvedInVideo, isOrigin = false) {
    const to = [constants_1.ACTIVITY_PUB.PUBLIC];
    const cc = [];
    if (isOrigin === false) {
        cc.push(videoComment.Video.VideoChannel.Account.Actor.url);
    }
    cc.push(videoComment.Account.Actor.followersUrl);
    for (const parentComment of threadParentComments) {
        if (parentComment.isDeleted())
            continue;
        cc.push(parentComment.Account.Actor.url);
    }
    return {
        to,
        cc: cc.concat(actorsInvolvedInVideo.map(a => a.followersUrl))
    };
}
exports.getVideoCommentAudience = getVideoCommentAudience;
function getAudienceFromFollowersOf(actorsInvolvedInObject) {
    return {
        to: [constants_1.ACTIVITY_PUB.PUBLIC].concat(actorsInvolvedInObject.map(a => a.followersUrl)),
        cc: []
    };
}
exports.getAudienceFromFollowersOf = getAudienceFromFollowersOf;
function getActorsInvolvedInVideo(video, t) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const actors = yield video_share_1.VideoShareModel.loadActorsByShare(video.id, t);
        const videoAll = video;
        const videoActor = ((_a = videoAll.VideoChannel) === null || _a === void 0 ? void 0 : _a.Account) ? videoAll.VideoChannel.Account.Actor
            : yield actor_1.ActorModel.loadFromAccountByVideoId(video.id, t);
        actors.push(videoActor);
        return actors;
    });
}
exports.getActorsInvolvedInVideo = getActorsInvolvedInVideo;
function getAudience(actorSender, isPublic = true) {
    return buildAudience([actorSender.followersUrl], isPublic);
}
exports.getAudience = getAudience;
function buildAudience(followerUrls, isPublic = true) {
    let to = [];
    let cc = [];
    if (isPublic) {
        to = [constants_1.ACTIVITY_PUB.PUBLIC];
        cc = followerUrls;
    }
    else {
        to = [];
        cc = [];
    }
    return { to, cc };
}
exports.buildAudience = buildAudience;
function audiencify(object, audience) {
    return Object.assign(object, audience);
}
exports.audiencify = audiencify;
