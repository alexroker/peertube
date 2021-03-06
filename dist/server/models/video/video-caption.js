"use strict";
var VideoCaptionModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoCaptionModel = exports.ScopeNames = void 0;
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const utils_1 = require("../utils");
const video_1 = require("./video");
const video_captions_1 = require("../../helpers/custom-validators/video-captions");
const constants_1 = require("../../initializers/constants");
const path_1 = require("path");
const logger_1 = require("../../helpers/logger");
const fs_extra_1 = require("fs-extra");
const config_1 = require("../../initializers/config");
const activitypub_1 = require("@server/helpers/activitypub");
var ScopeNames;
(function (ScopeNames) {
    ScopeNames["WITH_VIDEO_UUID_AND_REMOTE"] = "WITH_VIDEO_UUID_AND_REMOTE";
})(ScopeNames = exports.ScopeNames || (exports.ScopeNames = {}));
let VideoCaptionModel = VideoCaptionModel_1 = class VideoCaptionModel extends sequelize_typescript_1.Model {
    static removeFiles(instance) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!instance.Video) {
                instance.Video = yield instance.$get('Video');
            }
            if (instance.isOwned()) {
                logger_1.logger.info('Removing captions %s of video %s.', instance.Video.uuid, instance.language);
                try {
                    yield instance.removeCaptionFile();
                }
                catch (err) {
                    logger_1.logger.error('Cannot remove caption file of video %s.', instance.Video.uuid);
                }
            }
            return undefined;
        });
    }
    static loadByVideoIdAndLanguage(videoId, language) {
        const videoInclude = {
            model: video_1.VideoModel.unscoped(),
            attributes: ['id', 'remote', 'uuid'],
            where: utils_1.buildWhereIdOrUUID(videoId)
        };
        const query = {
            where: {
                language
            },
            include: [
                videoInclude
            ]
        };
        return VideoCaptionModel_1.findOne(query);
    }
    static insertOrReplaceLanguage(videoId, language, fileUrl, transaction) {
        const values = {
            videoId,
            language,
            fileUrl
        };
        return VideoCaptionModel_1.upsert(values, { transaction, returning: true })
            .then(([caption]) => caption);
    }
    static listVideoCaptions(videoId) {
        const query = {
            order: [['language', 'ASC']],
            where: {
                videoId
            }
        };
        return VideoCaptionModel_1.scope(ScopeNames.WITH_VIDEO_UUID_AND_REMOTE).findAll(query);
    }
    static getLanguageLabel(language) {
        return constants_1.VIDEO_LANGUAGES[language] || 'Unknown';
    }
    static deleteAllCaptionsOfRemoteVideo(videoId, transaction) {
        const query = {
            where: {
                videoId
            },
            transaction
        };
        return VideoCaptionModel_1.destroy(query);
    }
    isOwned() {
        return this.Video.remote === false;
    }
    toFormattedJSON() {
        return {
            language: {
                id: this.language,
                label: VideoCaptionModel_1.getLanguageLabel(this.language)
            },
            captionPath: this.getCaptionStaticPath()
        };
    }
    getCaptionStaticPath() {
        return path_1.join(constants_1.LAZY_STATIC_PATHS.VIDEO_CAPTIONS, this.getCaptionName());
    }
    getCaptionName() {
        return `${this.Video.uuid}-${this.language}.vtt`;
    }
    removeCaptionFile() {
        return fs_extra_1.remove(config_1.CONFIG.STORAGE.CAPTIONS_DIR + this.getCaptionName());
    }
    getFileUrl(video) {
        if (!this.Video)
            this.Video = video;
        if (video.isOwned())
            return constants_1.WEBSERVER.URL + this.getCaptionStaticPath();
        if (this.fileUrl)
            return this.fileUrl;
        return activitypub_1.buildRemoteVideoBaseUrl(video, this.getCaptionStaticPath());
    }
};
tslib_1.__decorate([
    sequelize_typescript_1.CreatedAt,
    tslib_1.__metadata("design:type", Date)
], VideoCaptionModel.prototype, "createdAt", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.UpdatedAt,
    tslib_1.__metadata("design:type", Date)
], VideoCaptionModel.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Is('VideoCaptionLanguage', value => utils_1.throwIfNotValid(value, video_captions_1.isVideoCaptionLanguageValid, 'language')),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], VideoCaptionModel.prototype, "language", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(constants_1.CONSTRAINTS_FIELDS.COMMONS.URL.max)),
    tslib_1.__metadata("design:type", String)
], VideoCaptionModel.prototype, "fileUrl", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.ForeignKey(() => video_1.VideoModel),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], VideoCaptionModel.prototype, "videoId", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.BelongsTo(() => video_1.VideoModel, {
        foreignKey: {
            allowNull: false
        },
        onDelete: 'CASCADE'
    }),
    tslib_1.__metadata("design:type", video_1.VideoModel)
], VideoCaptionModel.prototype, "Video", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.BeforeDestroy,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [VideoCaptionModel]),
    tslib_1.__metadata("design:returntype", Promise)
], VideoCaptionModel, "removeFiles", null);
VideoCaptionModel = VideoCaptionModel_1 = tslib_1.__decorate([
    sequelize_typescript_1.Scopes(() => ({
        [ScopeNames.WITH_VIDEO_UUID_AND_REMOTE]: {
            include: [
                {
                    attributes: ['id', 'uuid', 'remote'],
                    model: video_1.VideoModel.unscoped(),
                    required: true
                }
            ]
        }
    })),
    sequelize_typescript_1.Table({
        tableName: 'videoCaption',
        indexes: [
            {
                fields: ['videoId']
            },
            {
                fields: ['videoId', 'language'],
                unique: true
            }
        ]
    })
], VideoCaptionModel);
exports.VideoCaptionModel = VideoCaptionModel;
