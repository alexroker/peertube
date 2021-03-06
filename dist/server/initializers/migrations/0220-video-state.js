"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tslib_1 = require("tslib");
const Sequelize = require("sequelize");
function up(utils) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        {
            const data = {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: null
            };
            yield utils.queryInterface.addColumn('video', 'waitTranscoding', data);
        }
        {
            const query = 'UPDATE video SET "waitTranscoding" = false';
            yield utils.sequelize.query(query);
        }
        {
            const data = {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: null
            };
            yield utils.queryInterface.changeColumn('video', 'waitTranscoding', data);
        }
        {
            const data = {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: null
            };
            yield utils.queryInterface.addColumn('video', 'state', data);
        }
        {
            const query = 'UPDATE video SET "state" = 1';
            yield utils.sequelize.query(query);
        }
        {
            const data = {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: null
            };
            yield utils.queryInterface.changeColumn('video', 'state', data);
        }
    });
}
exports.up = up;
function down(options) {
    throw new Error('Not implemented.');
}
exports.down = down;
