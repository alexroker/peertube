"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPostImportVideoAccepted = exports.isPreImportVideoAccepted = exports.isLocalVideoCommentReplyAccepted = exports.isRemoteVideoCommentAccepted = exports.isRemoteVideoAccepted = exports.isLocalVideoThreadAccepted = exports.isLocalVideoAccepted = void 0;
function isLocalVideoAccepted(object) {
    return { accepted: true };
}
exports.isLocalVideoAccepted = isLocalVideoAccepted;
function isLocalVideoThreadAccepted(_object) {
    return { accepted: true };
}
exports.isLocalVideoThreadAccepted = isLocalVideoThreadAccepted;
function isLocalVideoCommentReplyAccepted(_object) {
    return { accepted: true };
}
exports.isLocalVideoCommentReplyAccepted = isLocalVideoCommentReplyAccepted;
function isRemoteVideoAccepted(_object) {
    return { accepted: true };
}
exports.isRemoteVideoAccepted = isRemoteVideoAccepted;
function isRemoteVideoCommentAccepted(_object) {
    return { accepted: true };
}
exports.isRemoteVideoCommentAccepted = isRemoteVideoCommentAccepted;
function isPreImportVideoAccepted(object) {
    return { accepted: true };
}
exports.isPreImportVideoAccepted = isPreImportVideoAccepted;
function isPostImportVideoAccepted(object) {
    return { accepted: true };
}
exports.isPostImportVideoAccepted = isPostImportVideoAccepted;
