"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tslib_1 = require("tslib");
const Sequelize = require("sequelize");
function up(utils) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        {
            const data = {
                type: Sequelize.ENUM('do_not_list', 'blur', 'display'),
                allowNull: true,
                defaultValue: null
            };
            yield utils.queryInterface.addColumn('user', 'nsfwPolicy', data);
        }
        {
            const query = 'UPDATE "user" SET "nsfwPolicy" = \'do_not_list\'';
            yield utils.sequelize.query(query);
        }
        {
            const query = 'UPDATE "user" SET "nsfwPolicy" = \'display\' WHERE "displayNSFW" = true';
            yield utils.sequelize.query(query);
        }
        {
            const query = 'ALTER TABLE "user" ALTER COLUMN "nsfwPolicy" SET NOT NULL';
            yield utils.sequelize.query(query);
        }
        {
            yield utils.queryInterface.removeColumn('user', 'displayNSFW');
        }
    });
}
exports.up = up;
function down(options) {
    throw new Error('Not implemented.');
}
exports.down = down;
