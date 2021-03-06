"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tslib_1 = require("tslib");
const Sequelize = require("sequelize");
const peertube_crypto_1 = require("../../helpers/peertube-crypto");
const share_1 = require("../../lib/activitypub/share");
const url_1 = require("../../lib/activitypub/url");
const user_1 = require("../../lib/user");
const application_1 = require("../../models/application/application");
const constants_1 = require("../constants");
function up(utils) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const q = utils.queryInterface;
        const db = utils.db;
        {
            const query = 'SELECT COUNT(*) as total FROM "Pods"';
            const options = {
                type: Sequelize.QueryTypes.SELECT
            };
            const res = yield utils.sequelize.query(query, options);
            if (!res[0] || res[0].total !== 0) {
                throw new Error('You need to quit friends.');
            }
        }
        yield utils.queryInterface.renameTable('Pods', 'Servers');
        yield db.Account.sync();
        yield db.AccountFollow.sync();
        yield db.VideoAbuse.destroy({ truncate: true });
        yield utils.queryInterface.removeColumn('VideoAbuses', 'reporterPodId');
        yield utils.queryInterface.removeColumn('VideoAbuses', 'reporterUsername');
        {
            const data = {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Accounts',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            };
            yield q.addColumn('VideoAbuses', 'reporterAccountId', data);
        }
        yield utils.queryInterface.dropTable('RequestToPods');
        yield utils.queryInterface.dropTable('RequestVideoEvents');
        yield utils.queryInterface.dropTable('RequestVideoQadus');
        yield utils.queryInterface.dropTable('Requests');
        {
            const applicationInstance = yield application_1.ApplicationModel.findOne();
            const accountCreated = yield user_1.createLocalAccountWithoutKeys({
                name: constants_1.SERVER_ACTOR_NAME,
                userId: null,
                applicationId: applicationInstance.id,
                t: undefined
            });
            const { publicKey, privateKey } = yield peertube_crypto_1.createPrivateAndPublicKeys();
            accountCreated.Actor.publicKey = publicKey;
            accountCreated.Actor.privateKey = privateKey;
            yield accountCreated.save();
        }
        {
            const query = 'ALTER TABLE "VideoChannels" DROP CONSTRAINT "VideoChannels_authorId_fkey"';
            yield utils.sequelize.query(query);
        }
        const users = yield db.User.findAll();
        for (const user of users) {
            const account = yield user_1.createLocalAccountWithoutKeys({ name: user.username, userId: user.id, applicationId: null, t: undefined });
            const { publicKey, privateKey } = yield peertube_crypto_1.createPrivateAndPublicKeys();
            account.Actor.publicKey = publicKey;
            account.Actor.privateKey = privateKey;
            yield account.save();
        }
        {
            const data = {
                type: Sequelize.INTEGER,
                allowNull: true,
                onDelete: 'CASCADE',
                reference: {
                    model: 'Account',
                    key: 'id'
                }
            };
            yield q.addColumn('VideoChannels', 'accountId', data);
            {
                const query = 'UPDATE "VideoChannels" SET "accountId" = ' +
                    '(SELECT "Accounts"."id" FROM "Accounts" INNER JOIN "Authors" ON "Authors"."userId" = "Accounts"."userId" ' +
                    'WHERE "VideoChannels"."authorId" = "Authors"."id")';
                yield utils.sequelize.query(query);
            }
            data.allowNull = false;
            yield q.changeColumn('VideoChannels', 'accountId', data);
            yield q.removeColumn('VideoChannels', 'authorId');
        }
        {
            const data = {
                type: Sequelize.STRING,
                defaultValue: null,
                allowNull: true
            };
            yield q.addColumn('Videos', 'url', data);
            const videos = yield db.Video.findAll();
            for (const video of videos) {
                video.url = url_1.getVideoActivityPubUrl(video);
                yield video.save();
            }
            data.allowNull = false;
            yield q.changeColumn('Videos', 'url', data);
        }
        {
            const data = {
                type: Sequelize.STRING,
                defaultValue: null,
                allowNull: true
            };
            yield q.addColumn('VideoChannels', 'url', data);
            const videoChannels = yield db.VideoChannel.findAll();
            for (const videoChannel of videoChannels) {
                videoChannel.url = url_1.getVideoChannelActivityPubUrl(videoChannel);
                yield videoChannel.save();
            }
            data.allowNull = false;
            yield q.changeColumn('VideoChannels', 'url', data);
        }
        yield utils.queryInterface.dropTable('UserVideoRates');
        yield db.AccountVideoRate.sync();
        {
            const data = {
                type: Sequelize.ENUM('transcoding', 'activitypub-http'),
                defaultValue: 'transcoding',
                allowNull: false
            };
            yield q.addColumn('Jobs', 'category', data);
        }
        yield db.VideoShare.sync();
        yield db.VideoChannelShare.sync();
        {
            const videos = yield db.Video.findAll({
                include: [
                    {
                        model: db.Video['sequelize'].models.VideoChannel,
                        include: [
                            {
                                model: db.Video['sequelize'].models.Account,
                                include: [{ model: db.Video['sequelize'].models.Server, required: false }]
                            }
                        ]
                    },
                    {
                        model: db.Video['sequelize'].models.AccountVideoRate,
                        include: [db.Video['sequelize'].models.Account]
                    },
                    {
                        model: db.Video['sequelize'].models.VideoShare,
                        include: [db.Video['sequelize'].models.Account]
                    },
                    db.Video['sequelize'].models.Tag,
                    db.Video['sequelize'].models.VideoFile
                ]
            });
            for (const video of videos) {
                yield share_1.shareVideoByServerAndChannel(video, undefined);
            }
        }
    });
}
exports.up = up;
function down(options) {
    throw new Error('Not implemented.');
}
exports.down = down;
