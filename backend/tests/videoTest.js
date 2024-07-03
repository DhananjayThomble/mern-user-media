import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import path from 'path';

chai.use(chaiHttp);
const should = chai.should();

describe('Video', () => {
    let token;

    before((done) => {
        const user = { userId: '60d0fe4f5311236168a109ca' };
        token = jwt.sign(user, config.jwtSecret, { expiresIn: '1h' });
        done();
    });

    it('should upload a video on /api/videos/upload POST', (done) => {
        chai.request(server)
            .post('/api/videos/upload')
            .set('Authorization', `Bearer ${token}`)
            .field('title', 'Test Video')
            .field('description', 'This is a test video')
            .attach('video', path.resolve(__dirname, 'test.mp4'))
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('title').eql('Test Video');
                res.body.should.have.property('description').eql('This is a test video');
                done();
            });
    });

    it('should get user videos on /api/videos/my-videos GET', (done) => {
        chai.request(server)
            .get('/api/videos/my-videos')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});
