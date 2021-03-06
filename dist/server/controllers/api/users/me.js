"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meRouter = void 0;
const tslib_1 = require("tslib");
require("multer");
const express = require("express");
const express_utils_1 = require("../../../helpers/express-utils");
const utils_1 = require("../../../helpers/utils");
const config_1 = require("../../../initializers/config");
const constants_1 = require("../../../initializers/constants");
const database_1 = require("../../../initializers/database");
const send_1 = require("../../../lib/activitypub/send");
const avatar_1 = require("../../../lib/avatar");
const user_1 = require("../../../lib/user");
const middlewares_1 = require("../../../middlewares");
const validators_1 = require("../../../middlewares/validators");
const avatar_2 = require("../../../middlewares/validators/avatar");
const account_1 = require("../../../models/account/account");
const account_video_rate_1 = require("../../../models/account/account-video-rate");
const user_2 = require("../../../models/account/user");
const video_1 = require("../../../models/video/video");
const video_import_1 = require("../../../models/video/video-import");
const reqAvatarFile = express_utils_1.createReqFiles(['avatarfile'], constants_1.MIMETYPES.IMAGE.MIMETYPE_EXT, { avatarfile: config_1.CONFIG.STORAGE.TMP_DIR });
const meRouter = express.Router();
exports.meRouter = meRouter;
meRouter.get('/me', middlewares_1.authenticate, middlewares_1.asyncMiddleware(getUserInformation));
meRouter.delete('/me', middlewares_1.authenticate, validators_1.deleteMeValidator, middlewares_1.asyncMiddleware(deleteMe));
meRouter.get('/me/video-quota-used', middlewares_1.authenticate, middlewares_1.asyncMiddleware(getUserVideoQuotaUsed));
meRouter.get('/me/videos/imports', middlewares_1.authenticate, middlewares_1.paginationValidator, validators_1.videoImportsSortValidator, middlewares_1.setDefaultSort, middlewares_1.setDefaultPagination, middlewares_1.asyncMiddleware(getUserVideoImports));
meRouter.get('/me/videos', middlewares_1.authenticate, middlewares_1.paginationValidator, validators_1.videosSortValidator, middlewares_1.setDefaultSort, middlewares_1.setDefaultPagination, middlewares_1.asyncMiddleware(getUserVideos));
meRouter.get('/me/videos/:videoId/rating', middlewares_1.authenticate, middlewares_1.asyncMiddleware(middlewares_1.usersVideoRatingValidator), middlewares_1.asyncMiddleware(getUserVideoRating));
meRouter.put('/me', middlewares_1.authenticate, middlewares_1.asyncMiddleware(middlewares_1.usersUpdateMeValidator), middlewares_1.asyncRetryTransactionMiddleware(updateMe));
meRouter.post('/me/avatar/pick', middlewares_1.authenticate, reqAvatarFile, avatar_2.updateAvatarValidator, middlewares_1.asyncRetryTransactionMiddleware(updateMyAvatar));
function getUserVideos(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = res.locals.oauth.token.User;
        const resultList = yield video_1.VideoModel.listUserVideosForApi(user.Account.id, req.query.start, req.query.count, req.query.sort, req.query.search);
        const additionalAttributes = {
            waitTranscoding: true,
            state: true,
            scheduledUpdate: true,
            blacklistInfo: true
        };
        return res.json(utils_1.getFormattedObjects(resultList.data, resultList.total, { additionalAttributes }));
    });
}
function getUserVideoImports(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = res.locals.oauth.token.User;
        const resultList = yield video_import_1.VideoImportModel.listUserVideoImportsForApi(user.id, req.query.start, req.query.count, req.query.sort);
        return res.json(utils_1.getFormattedObjects(resultList.data, resultList.total));
    });
}
function getUserInformation(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = yield user_2.UserModel.loadForMeAPI(res.locals.oauth.token.user.username);
        return res.json(user.toMeFormattedJSON());
    });
}
function getUserVideoQuotaUsed(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = res.locals.oauth.token.user;
        const videoQuotaUsed = yield user_2.UserModel.getOriginalVideoFileTotalFromUser(user);
        const videoQuotaUsedDaily = yield user_2.UserModel.getOriginalVideoFileTotalDailyFromUser(user);
        const data = {
            videoQuotaUsed,
            videoQuotaUsedDaily
        };
        return res.json(data);
    });
}
function getUserVideoRating(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const videoId = res.locals.videoId.id;
        const accountId = +res.locals.oauth.token.User.Account.id;
        const ratingObj = yield account_video_rate_1.AccountVideoRateModel.load(accountId, videoId, null);
        const rating = ratingObj ? ratingObj.type : 'none';
        const json = {
            videoId,
            rating
        };
        return res.json(json);
    });
}
function deleteMe(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = res.locals.oauth.token.User;
        yield user.destroy();
        return res.sendStatus(204);
    });
}
function updateMe(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        let sendVerificationEmail = false;
        const user = res.locals.oauth.token.user;
        if (body.password !== undefined)
            user.password = body.password;
        if (body.nsfwPolicy !== undefined)
            user.nsfwPolicy = body.nsfwPolicy;
        if (body.webTorrentEnabled !== undefined)
            user.webTorrentEnabled = body.webTorrentEnabled;
        if (body.autoPlayVideo !== undefined)
            user.autoPlayVideo = body.autoPlayVideo;
        if (body.autoPlayNextVideo !== undefined)
            user.autoPlayNextVideo = body.autoPlayNextVideo;
        if (body.autoPlayNextVideoPlaylist !== undefined)
            user.autoPlayNextVideoPlaylist = body.autoPlayNextVideoPlaylist;
        if (body.videosHistoryEnabled !== undefined)
            user.videosHistoryEnabled = body.videosHistoryEnabled;
        if (body.videoLanguages !== undefined)
            user.videoLanguages = body.videoLanguages;
        if (body.theme !== undefined)
            user.theme = body.theme;
        if (body.noInstanceConfigWarningModal !== undefined)
            user.noInstanceConfigWarningModal = body.noInstanceConfigWarningModal;
        if (body.noWelcomeModal !== undefined)
            user.noWelcomeModal = body.noWelcomeModal;
        if (body.email !== undefined) {
            if (config_1.CONFIG.SIGNUP.REQUIRES_EMAIL_VERIFICATION) {
                user.pendingEmail = body.email;
                sendVerificationEmail = true;
            }
            else {
                user.email = body.email;
            }
        }
        yield database_1.sequelizeTypescript.transaction((t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield user.save({ transaction: t });
            if (body.displayName !== undefined || body.description !== undefined) {
                const userAccount = yield account_1.AccountModel.load(user.Account.id, t);
                if (body.displayName !== undefined)
                    userAccount.name = body.displayName;
                if (body.description !== undefined)
                    userAccount.description = body.description;
                yield userAccount.save({ transaction: t });
                yield send_1.sendUpdateActor(userAccount, t);
            }
        }));
        if (sendVerificationEmail === true) {
            yield user_1.sendVerifyUserEmail(user, true);
        }
        return res.sendStatus(204);
    });
}
function updateMyAvatar(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const avatarPhysicalFile = req.files['avatarfile'][0];
        const user = res.locals.oauth.token.user;
        const userAccount = yield account_1.AccountModel.load(user.Account.id);
        const avatar = yield avatar_1.updateActorAvatarFile(avatarPhysicalFile, userAccount);
        return res.json({ avatar: avatar.toFormattedJSON() });
    });
}
