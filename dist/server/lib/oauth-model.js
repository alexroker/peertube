"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToken = exports.revokeToken = exports.getUser = exports.getRefreshToken = exports.getClient = exports.getAccessToken = exports.clearCacheByToken = exports.clearCacheByUserId = exports.deleteUserToken = void 0;
const tslib_1 = require("tslib");
const oauth2_server_1 = require("oauth2-server");
const logger_1 = require("../helpers/logger");
const user_1 = require("../models/account/user");
const oauth_client_1 = require("../models/oauth/oauth-client");
const oauth_token_1 = require("../models/oauth/oauth-token");
const constants_1 = require("../initializers/constants");
const config_1 = require("../initializers/config");
const LRUCache = require("lru-cache");
const user_flag_model_1 = require("@shared/models/users/user-flag.model");
const user_2 = require("./user");
const plugin_manager_1 = require("@server/lib/plugins/plugin-manager");
const actor_1 = require("@server/models/activitypub/actor");
const accessTokenCache = new LRUCache({ max: constants_1.LRU_CACHE.USER_TOKENS.MAX_SIZE });
const userHavingToken = new LRUCache({ max: constants_1.LRU_CACHE.USER_TOKENS.MAX_SIZE });
function deleteUserToken(userId, t) {
    clearCacheByUserId(userId);
    return oauth_token_1.OAuthTokenModel.deleteUserToken(userId, t);
}
exports.deleteUserToken = deleteUserToken;
function clearCacheByUserId(userId) {
    const token = userHavingToken.get(userId);
    if (token !== undefined) {
        accessTokenCache.del(token);
        userHavingToken.del(userId);
    }
}
exports.clearCacheByUserId = clearCacheByUserId;
function clearCacheByToken(token) {
    const tokenModel = accessTokenCache.get(token);
    if (tokenModel !== undefined) {
        userHavingToken.del(tokenModel.userId);
        accessTokenCache.del(token);
    }
}
exports.clearCacheByToken = clearCacheByToken;
function getAccessToken(bearerToken) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        logger_1.logger.debug('Getting access token (bearerToken: ' + bearerToken + ').');
        if (!bearerToken)
            return undefined;
        let tokenModel;
        if (accessTokenCache.has(bearerToken)) {
            tokenModel = accessTokenCache.get(bearerToken);
        }
        else {
            tokenModel = yield oauth_token_1.OAuthTokenModel.getByTokenAndPopulateUser(bearerToken);
            if (tokenModel) {
                accessTokenCache.set(bearerToken, tokenModel);
                userHavingToken.set(tokenModel.userId, tokenModel.accessToken);
            }
        }
        if (!tokenModel)
            return undefined;
        if (tokenModel.User.pluginAuth) {
            const valid = yield plugin_manager_1.PluginManager.Instance.isTokenValid(tokenModel, 'access');
            if (valid !== true)
                return undefined;
        }
        return tokenModel;
    });
}
exports.getAccessToken = getAccessToken;
function getClient(clientId, clientSecret) {
    logger_1.logger.debug('Getting Client (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ').');
    return oauth_client_1.OAuthClientModel.getByIdAndSecret(clientId, clientSecret);
}
exports.getClient = getClient;
function getRefreshToken(refreshToken) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        logger_1.logger.debug('Getting RefreshToken (refreshToken: ' + refreshToken + ').');
        const tokenInfo = yield oauth_token_1.OAuthTokenModel.getByRefreshTokenAndPopulateClient(refreshToken);
        if (!tokenInfo)
            return undefined;
        const tokenModel = tokenInfo.token;
        if (tokenModel.User.pluginAuth) {
            const valid = yield plugin_manager_1.PluginManager.Instance.isTokenValid(tokenModel, 'refresh');
            if (valid !== true)
                return undefined;
        }
        return tokenInfo;
    });
}
exports.getRefreshToken = getRefreshToken;
function getUser(usernameOrEmail, password) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const res = this.request.res;
        if (res.locals.bypassLogin && res.locals.bypassLogin.bypass === true) {
            const obj = res.locals.bypassLogin;
            logger_1.logger.info('Bypassing oauth login by plugin %s.', obj.pluginName);
            let user = yield user_1.UserModel.loadByEmail(obj.user.email);
            if (!user)
                user = yield createUserFromExternal(obj.pluginName, obj.user);
            if (!user)
                throw new oauth2_server_1.AccessDeniedError('Cannot create such user: an actor with that name already exists.');
            if (user.pluginAuth !== null) {
                if (user.pluginAuth !== obj.pluginName)
                    return null;
                return user;
            }
        }
        logger_1.logger.debug('Getting User (username/email: ' + usernameOrEmail + ', password: ******).');
        const user = yield user_1.UserModel.loadByUsernameOrEmail(usernameOrEmail);
        if (!user || user.pluginAuth !== null || !password)
            return null;
        const passwordMatch = yield user.isPasswordMatch(password);
        if (passwordMatch !== true)
            return null;
        if (user.blocked)
            throw new oauth2_server_1.AccessDeniedError('User is blocked.');
        if (config_1.CONFIG.SIGNUP.REQUIRES_EMAIL_VERIFICATION && user.emailVerified === false) {
            throw new oauth2_server_1.AccessDeniedError('User email is not verified.');
        }
        return user;
    });
}
exports.getUser = getUser;
function revokeToken(tokenInfo) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const res = this.request.res;
        const token = yield oauth_token_1.OAuthTokenModel.getByRefreshTokenAndPopulateUser(tokenInfo.refreshToken);
        if (token) {
            if (res.locals.explicitLogout === true && token.User.pluginAuth && token.authName) {
                plugin_manager_1.PluginManager.Instance.onLogout(token.User.pluginAuth, token.authName, token.User);
            }
            clearCacheByToken(token.accessToken);
            token.destroy()
                .catch(err => logger_1.logger.error('Cannot destroy token when revoking token.', { err }));
            return true;
        }
        return false;
    });
}
exports.revokeToken = revokeToken;
function saveToken(token, client, user) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const res = this.request.res;
        let authName = null;
        if (((_a = res.locals.bypassLogin) === null || _a === void 0 ? void 0 : _a.bypass) === true) {
            authName = res.locals.bypassLogin.authName;
        }
        else if (res.locals.refreshTokenAuthName) {
            authName = res.locals.refreshTokenAuthName;
        }
        logger_1.logger.debug('Saving token ' + token.accessToken + ' for client ' + client.id + ' and user ' + user.id + '.');
        const tokenToCreate = {
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            refreshToken: token.refreshToken,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            authName,
            oAuthClientId: client.id,
            userId: user.id
        };
        const tokenCreated = yield oauth_token_1.OAuthTokenModel.create(tokenToCreate);
        user.lastLoginDate = new Date();
        yield user.save();
        return Object.assign(tokenCreated, { client, user });
    });
}
exports.saveToken = saveToken;
function createUserFromExternal(pluginAuth, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const actor = yield actor_1.ActorModel.loadLocalByName(options.username);
        if (actor)
            return null;
        const userToCreate = new user_1.UserModel({
            username: options.username,
            password: null,
            email: options.email,
            nsfwPolicy: config_1.CONFIG.INSTANCE.DEFAULT_NSFW_POLICY,
            autoPlayVideo: true,
            role: options.role,
            videoQuota: config_1.CONFIG.USER.VIDEO_QUOTA,
            videoQuotaDaily: config_1.CONFIG.USER.VIDEO_QUOTA_DAILY,
            adminFlags: user_flag_model_1.UserAdminFlag.NONE,
            pluginAuth
        });
        const { user } = yield user_2.createUserAccountAndChannelAndPlaylist({
            userToCreate,
            userDisplayName: options.displayName
        });
        return user;
    });
}
