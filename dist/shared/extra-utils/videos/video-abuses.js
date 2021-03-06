"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideoAbuse = exports.updateVideoAbuse = exports.getVideoAbusesList = exports.reportVideoAbuse = void 0;
const request = require("supertest");
const requests_1 = require("../requests/requests");
function reportVideoAbuse(url, token, videoId, reason, predefinedReasons, startAt, endAt, specialStatus = 200) {
    const path = '/api/v1/videos/' + videoId + '/abuse';
    return request(url)
        .post(path)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send({ reason, predefinedReasons, startAt, endAt })
        .expect(specialStatus);
}
exports.reportVideoAbuse = reportVideoAbuse;
function getVideoAbusesList(options) {
    const { url, token, id, predefinedReason, search, state, videoIs, searchReporter, searchReportee, searchVideo, searchVideoChannel } = options;
    const path = '/api/v1/videos/abuse';
    const query = {
        sort: 'createdAt',
        id,
        predefinedReason,
        search,
        state,
        videoIs,
        searchReporter,
        searchReportee,
        searchVideo,
        searchVideoChannel
    };
    return requests_1.makeGetRequest({
        url,
        path,
        token,
        query,
        statusCodeExpected: 200
    });
}
exports.getVideoAbusesList = getVideoAbusesList;
function updateVideoAbuse(url, token, videoId, videoAbuseId, body, statusCodeExpected = 204) {
    const path = '/api/v1/videos/' + videoId + '/abuse/' + videoAbuseId;
    return requests_1.makePutBodyRequest({
        url,
        token,
        path,
        fields: body,
        statusCodeExpected
    });
}
exports.updateVideoAbuse = updateVideoAbuse;
function deleteVideoAbuse(url, token, videoId, videoAbuseId, statusCodeExpected = 204) {
    const path = '/api/v1/videos/' + videoId + '/abuse/' + videoAbuseId;
    return requests_1.makeDeleteRequest({
        url,
        token,
        path,
        statusCodeExpected
    });
}
exports.deleteVideoAbuse = deleteVideoAbuse;
