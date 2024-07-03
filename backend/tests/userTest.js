import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';

chai.use(chaiHttp);
const should = chai.should();

describe('User', () => {
    let token;

    before((done) => {
        const user = { userId: '60d0fe4f5311236168a109ca' };
        token = jwt.sign(user, config.jwtSecret, { expiresIn: '1h' });
        done();
    });

    it('should get user profile on /api/user/profile GET', (done) => {
        chai.request(server)
            .get('/api/user/profile')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('firstname');
                res.body.should.have.property('lastname');
                done();
            });
    });

    it('should update user profile on /api/user/profile PUT', (done) => {
        const user = {
            bio: "This is a bio"
        };
        chai.request(server)
            .put('/api/user/profile')
            .set('Authorization', `Bearer ${token}`)
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('bio').eql('This is a bio');
                done();
            });
    });
});
