"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installApplication = void 0;
const tslib_1 = require("tslib");
const passwordGenerator = require("password-generator");
const shared_1 = require("../../shared");
const logger_1 = require("../helpers/logger");
const user_1 = require("../lib/user");
const user_2 = require("../models/account/user");
const application_1 = require("../models/application/application");
const oauth_client_1 = require("../models/oauth/oauth-client");
const checker_after_init_1 = require("./checker-after-init");
const constants_1 = require("./constants");
const database_1 = require("./database");
const fs_extra_1 = require("fs-extra");
const config_1 = require("./config");
function installApplication() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield Promise.all([
                database_1.sequelizeTypescript.sync()
                    .then(() => {
                    return Promise.all([
                        createApplicationIfNotExist(),
                        createOAuthClientIfNotExist(),
                        createOAuthAdminIfNotExist()
                    ]);
                }),
                removeCacheAndTmpDirectories()
                    .then(() => createDirectoriesIfNotExist())
            ]);
        }
        catch (err) {
            logger_1.logger.error('Cannot install application.', { err });
            process.exit(-1);
        }
    });
}
exports.installApplication = installApplication;
function removeCacheAndTmpDirectories() {
    const cacheDirectories = Object.keys(constants_1.FILES_CACHE)
        .map(k => constants_1.FILES_CACHE[k].DIRECTORY);
    const tasks = [];
    for (const key of Object.keys(cacheDirectories)) {
        const dir = cacheDirectories[key];
        tasks.push(fs_extra_1.remove(dir));
    }
    tasks.push(fs_extra_1.remove(config_1.CONFIG.STORAGE.TMP_DIR));
    return Promise.all(tasks);
}
function createDirectoriesIfNotExist() {
    const storage = config_1.CONFIG.STORAGE;
    const cacheDirectories = Object.keys(constants_1.FILES_CACHE)
        .map(k => constants_1.FILES_CACHE[k].DIRECTORY);
    const tasks = [];
    for (const key of Object.keys(storage)) {
        const dir = storage[key];
        tasks.push(fs_extra_1.ensureDir(dir));
    }
    for (const key of Object.keys(cacheDirectories)) {
        const dir = cacheDirectories[key];
        tasks.push(fs_extra_1.ensureDir(dir));
    }
    tasks.push(fs_extra_1.ensureDir(constants_1.HLS_STREAMING_PLAYLIST_DIRECTORY));
    return Promise.all(tasks);
}
function createOAuthClientIfNotExist() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const exist = yield checker_after_init_1.clientsExist();
        if (exist === true)
            return undefined;
        logger_1.logger.info('Creating a default OAuth Client.');
        const id = passwordGenerator(32, false, /[a-z0-9]/);
        const secret = passwordGenerator(32, false, /[a-zA-Z0-9]/);
        const client = new oauth_client_1.OAuthClientModel({
            clientId: id,
            clientSecret: secret,
            grants: ['password', 'refresh_token'],
            redirectUris: null
        });
        const createdClient = yield client.save();
        logger_1.logger.info('Client id: ' + createdClient.clientId);
        logger_1.logger.info('Client secret: ' + createdClient.clientSecret);
        return undefined;
    });
}
function createOAuthAdminIfNotExist() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const exist = yield checker_after_init_1.usersExist();
        if (exist === true)
            return undefined;
        logger_1.logger.info('Creating the administrator.');
        const username = 'root';
        const role = shared_1.UserRole.ADMINISTRATOR;
        const email = config_1.CONFIG.ADMIN.EMAIL;
        let validatePassword = true;
        let password = '';
        if (process.env.NODE_ENV === 'test') {
            password = 'test';
            if (process.env.NODE_APP_INSTANCE) {
                password += process.env.NODE_APP_INSTANCE;
            }
            validatePassword = false;
        }
        else if (process.env.PT_INITIAL_ROOT_PASSWORD) {
            password = process.env.PT_INITIAL_ROOT_PASSWORD;
        }
        else {
            password = passwordGenerator(16, true);
        }
        const userData = {
            username,
            email,
            password,
            role,
            verified: true,
            nsfwPolicy: config_1.CONFIG.INSTANCE.DEFAULT_NSFW_POLICY,
            videoQuota: -1,
            videoQuotaDaily: -1
        };
        const user = new user_2.UserModel(userData);
        yield user_1.createUserAccountAndChannelAndPlaylist({ userToCreate: user, channelNames: undefined, validateUser: validatePassword });
        logger_1.logger.info('Username: ' + username);
        logger_1.logger.info('User password: ' + password);
    });
}
function createApplicationIfNotExist() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const exist = yield checker_after_init_1.applicationExist();
        if (exist === true)
            return undefined;
        logger_1.logger.info('Creating application account.');
        const application = yield application_1.ApplicationModel.create({
            migrationVersion: constants_1.LAST_MIGRATION_VERSION
        });
        return user_1.createApplicationActor(application.id);
    });
}
