import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';

chai.use(chaiHttp);
const should = chai.should();

describe('Auth', () => {
    it('should create a new user and send an email on /api/auth/create-account POST', (done) => {
        const user = {
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
            mobileNumber: "1234567890"
        };
        chai.request(server)
            .post('/api/auth/create-account')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('User created successfully');
                done();
            });
    });

    it('should login a user and return a token on /api/auth/login POST', (done) => {
        const user = {
            firstname: "John",
            password: "JohnDoe1234567890"
        };
        chai.request(server)
            .post('/api/auth/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                done();
            });
    });
});
