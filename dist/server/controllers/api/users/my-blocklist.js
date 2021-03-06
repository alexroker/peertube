"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myBlocklistRouter = void 0;
const tslib_1 = require("tslib");
const express = require("express");
require("multer");
const utils_1 = require("../../../helpers/utils");
const middlewares_1 = require("../../../middlewares");
const validators_1 = require("../../../middlewares/validators");
const account_blocklist_1 = require("../../../models/account/account-blocklist");
const blocklist_1 = require("../../../lib/blocklist");
const server_blocklist_1 = require("../../../models/server/server-blocklist");
const myBlocklistRouter = express.Router();
exports.myBlocklistRouter = myBlocklistRouter;
myBlocklistRouter.get('/me/blocklist/accounts', middlewares_1.authenticate, middlewares_1.paginationValidator, validators_1.accountsBlocklistSortValidator, middlewares_1.setDefaultSort, middlewares_1.setDefaultPagination, middlewares_1.asyncMiddleware(listBlockedAccounts));
myBlocklistRouter.post('/me/blocklist/accounts', middlewares_1.authenticate, middlewares_1.asyncMiddleware(validators_1.blockAccountValidator), middlewares_1.asyncRetryTransactionMiddleware(blockAccount));
myBlocklistRouter.delete('/me/blocklist/accounts/:accountName', middlewares_1.authenticate, middlewares_1.asyncMiddleware(middlewares_1.unblockAccountByAccountValidator), middlewares_1.asyncRetryTransactionMiddleware(unblockAccount));
myBlocklistRouter.get('/me/blocklist/servers', middlewares_1.authenticate, middlewares_1.paginationValidator, validators_1.serversBlocklistSortValidator, middlewares_1.setDefaultSort, middlewares_1.setDefaultPagination, middlewares_1.asyncMiddleware(listBlockedServers));
myBlocklistRouter.post('/me/blocklist/servers', middlewares_1.authenticate, middlewares_1.asyncMiddleware(validators_1.blockServerValidator), middlewares_1.asyncRetryTransactionMiddleware(blockServer));
myBlocklistRouter.delete('/me/blocklist/servers/:host', middlewares_1.authenticate, middlewares_1.asyncMiddleware(validators_1.unblockServerByAccountValidator), middlewares_1.asyncRetryTransactionMiddleware(unblockServer));
function listBlockedAccounts(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = res.locals.oauth.token.User;
        const resultList = yield account_blocklist_1.AccountBlocklistModel.listForApi({
            start: req.query.start,
            count: req.query.count,
            sort: req.query.sort,
            search: req.query.search,
            accountId: user.Account.id
        });
        return res.json(utils_1.getFormattedObjects(resultList.data, resultList.total));
    });
}
function blockAccount(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = res.locals.oauth.token.User;
        const accountToBlock = res.locals.account;
        yield blocklist_1.addAccountInBlocklist(user.Account.id, accountToBlock.id);
        return res.status(204).end();
    });
}
function unblockAccount(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const accountBlock = res.locals.accountBlock;
        yield blocklist_1.removeAccountFromBlocklist(accountBlock);
        return res.status(204).end();
    });
}
function listBlockedServers(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = res.locals.oauth.token.User;
        const resultList = yield server_blocklist_1.ServerBlocklistModel.listForApi({
            start: req.query.start,
            count: req.query.count,
            sort: req.query.sort,
            search: req.query.search,
            accountId: user.Account.id
        });
        return res.json(utils_1.getFormattedObjects(resultList.data, resultList.total));
    });
}
function blockServer(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = res.locals.oauth.token.User;
        const serverToBlock = res.locals.server;
        yield blocklist_1.addServerInBlocklist(user.Account.id, serverToBlock.id);
        return res.status(204).end();
    });
}
function unblockServer(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const serverBlock = res.locals.serverBlock;
        yield blocklist_1.removeServerFromBlocklist(serverBlock);
        return res.status(204).end();
    });
}
