"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("mocha");
const chai = require("chai");
const extra_utils_1 = require("../../../shared/extra-utils");
const jobs_1 = require("../../../shared/extra-utils/server/jobs");
const expect = chai.expect;
function assertVideoProperties(video, resolution, extname, size) {
    expect(video).to.have.nested.property('resolution.id', resolution);
    expect(video).to.have.property('magnetUri').that.includes(`.${extname}`);
    expect(video).to.have.property('torrentUrl').that.includes(`-${resolution}.torrent`);
    expect(video).to.have.property('fileUrl').that.includes(`.${extname}`);
    expect(video).to.have.property('size').that.is.above(0);
    if (size)
        expect(video.size).to.equal(size);
}
describe('Test create import video jobs', function () {
    this.timeout(60000);
    let servers = [];
    let video1UUID;
    let video2UUID;
    before(function () {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.timeout(90000);
            servers = yield extra_utils_1.flushAndRunMultipleServers(2);
            yield extra_utils_1.setAccessTokensToServers(servers);
            yield extra_utils_1.doubleFollow(servers[0], servers[1]);
            const res1 = yield extra_utils_1.uploadVideo(servers[0].url, servers[0].accessToken, { name: 'video1' });
            video1UUID = res1.body.video.uuid;
            const res2 = yield extra_utils_1.uploadVideo(servers[1].url, servers[1].accessToken, { name: 'video2' });
            video2UUID = res2.body.video.uuid;
            yield jobs_1.waitJobs(servers);
        });
    });
    it('Should run a import job on video 1 with a lower resolution', function () {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const env = extra_utils_1.getEnvCli(servers[0]);
            yield extra_utils_1.execCLI(`${env} npm run create-import-video-file-job -- -v ${video1UUID} -i server/tests/fixtures/video_short-480.webm`);
            yield jobs_1.waitJobs(servers);
            let magnetUri;
            for (const server of servers) {
                const { data: videos } = (yield extra_utils_1.getVideosList(server.url)).body;
                expect(videos).to.have.lengthOf(2);
                const video = videos.find(({ uuid }) => uuid === video1UUID);
                const videoDetail = (yield extra_utils_1.getVideo(server.url, video.uuid)).body;
                expect(videoDetail.files).to.have.lengthOf(2);
                const [originalVideo, transcodedVideo] = videoDetail.files;
                assertVideoProperties(originalVideo, 720, 'webm', 218910);
                assertVideoProperties(transcodedVideo, 480, 'webm', 69217);
                if (!magnetUri)
                    magnetUri = transcodedVideo.magnetUri;
                else
                    expect(transcodedVideo.magnetUri).to.equal(magnetUri);
            }
        });
    });
    it('Should run a import job on video 2 with the same resolution and a different extension', function () {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const env = extra_utils_1.getEnvCli(servers[1]);
            yield extra_utils_1.execCLI(`${env} npm run create-import-video-file-job -- -v ${video2UUID} -i server/tests/fixtures/video_short.ogv`);
            yield jobs_1.waitJobs(servers);
            let magnetUri;
            for (const server of servers) {
                const { data: videos } = (yield extra_utils_1.getVideosList(server.url)).body;
                expect(videos).to.have.lengthOf(2);
                const video = videos.find(({ uuid }) => uuid === video2UUID);
                const videoDetail = (yield extra_utils_1.getVideo(server.url, video.uuid)).body;
                expect(videoDetail.files).to.have.lengthOf(4);
                const [originalVideo, transcodedVideo420, transcodedVideo320, transcodedVideo240] = videoDetail.files;
                assertVideoProperties(originalVideo, 720, 'ogv', 140849);
                assertVideoProperties(transcodedVideo420, 480, 'mp4');
                assertVideoProperties(transcodedVideo320, 360, 'mp4');
                assertVideoProperties(transcodedVideo240, 240, 'mp4');
                if (!magnetUri)
                    magnetUri = originalVideo.magnetUri;
                else
                    expect(originalVideo.magnetUri).to.equal(magnetUri);
            }
        });
    });
    it('Should run a import job on video 2 with the same resolution and the same extension', function () {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const env = extra_utils_1.getEnvCli(servers[0]);
            yield extra_utils_1.execCLI(`${env} npm run create-import-video-file-job -- -v ${video1UUID} -i server/tests/fixtures/video_short2.webm`);
            yield jobs_1.waitJobs(servers);
            let magnetUri;
            for (const server of servers) {
                const { data: videos } = (yield extra_utils_1.getVideosList(server.url)).body;
                expect(videos).to.have.lengthOf(2);
                const video = videos.find(({ uuid }) => uuid === video1UUID);
                const videoDetail = (yield extra_utils_1.getVideo(server.url, video.uuid)).body;
                expect(videoDetail.files).to.have.lengthOf(2);
                const [video720, video480] = videoDetail.files;
                assertVideoProperties(video720, 720, 'webm', 942961);
                assertVideoProperties(video480, 480, 'webm', 69217);
                if (!magnetUri)
                    magnetUri = video720.magnetUri;
                else
                    expect(video720.magnetUri).to.equal(magnetUri);
            }
        });
    });
    after(function () {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield extra_utils_1.cleanupTests(servers);
        });
    });
});
