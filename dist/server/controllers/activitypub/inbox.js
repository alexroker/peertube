"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inboxRouter = void 0;
const express = require("express");
const activity_1 = require("../../helpers/custom-validators/activitypub/activity");
const logger_1 = require("../../helpers/logger");
const process_1 = require("../../lib/activitypub/process/process");
const middlewares_1 = require("../../middlewares");
const activity_2 = require("../../middlewares/validators/activitypub/activity");
const async_1 = require("async");
const inboxRouter = express.Router();
exports.inboxRouter = inboxRouter;
inboxRouter.post('/inbox', middlewares_1.signatureValidator, middlewares_1.asyncMiddleware(middlewares_1.checkSignature), middlewares_1.asyncMiddleware(activity_2.activityPubValidator), inboxController);
inboxRouter.post('/accounts/:name/inbox', middlewares_1.signatureValidator, middlewares_1.asyncMiddleware(middlewares_1.checkSignature), middlewares_1.asyncMiddleware(middlewares_1.localAccountValidator), middlewares_1.asyncMiddleware(activity_2.activityPubValidator), inboxController);
inboxRouter.post('/video-channels/:name/inbox', middlewares_1.signatureValidator, middlewares_1.asyncMiddleware(middlewares_1.checkSignature), middlewares_1.asyncMiddleware(middlewares_1.localVideoChannelValidator), middlewares_1.asyncMiddleware(activity_2.activityPubValidator), inboxController);
const inboxQueue = async_1.queue((task, cb) => {
    const options = { signatureActor: task.signatureActor, inboxActor: task.inboxActor };
    process_1.processActivities(task.activities, options)
        .then(() => cb())
        .catch(err => {
        logger_1.logger.error('Error in process activities.', { err });
        cb();
    });
});
function inboxController(req, res) {
    const rootActivity = req.body;
    let activities;
    if (['Collection', 'CollectionPage'].includes(rootActivity.type)) {
        activities = rootActivity.items;
    }
    else if (['OrderedCollection', 'OrderedCollectionPage'].includes(rootActivity.type)) {
        activities = rootActivity.orderedItems;
    }
    else {
        activities = [rootActivity];
    }
    logger_1.logger.debug('Filtering %d activities...', activities.length);
    activities = activities.filter(a => activity_1.isActivityValid(a));
    logger_1.logger.debug('We keep %d activities.', activities.length, { activities });
    const accountOrChannel = res.locals.account || res.locals.videoChannel;
    logger_1.logger.info('Receiving inbox requests for %d activities by %s.', activities.length, res.locals.signature.actor.url);
    inboxQueue.push({
        activities,
        signatureActor: res.locals.signature.actor,
        inboxActor: accountOrChannel ? accountOrChannel.Actor : undefined
    });
    return res.status(204).end();
}
