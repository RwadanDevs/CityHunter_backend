import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;

dotenv.config()

const User = [{
  email: "firaduk@ygmail.com",
  firstname: "kazitunga",
  lastname: "Dativa",
  googleId:32723098641678272,
  facebookId:"",
},{
    email: process.env.Super_Admin_Email,
}]

describe('>>> Testing Route (User Auth) <<<',()=>{
  let AdminToken,UserToken
    it('Welcome Route',(done)=>{
        chai
      .request(app)
      .get('/')
      .send(User[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    })

    it('Route NotFound',(done)=>{
        chai
      .request(app)
      .post('/api/v1/jjkhauth/user')
      .send(User[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
    })

    it('user created successful',(done)=>{
        chai
      .request(app)
      .post('/api/v1/auth/user')
      .send(User[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
    })

    it('Admin signin successful',(done)=>{
        chai
      .request(app)
      .post('/api/v1/auth/user')
      .send(User[1])
      .end((err, res) => {
        AdminToken = res.body.data.token;
        expect(res.statusCode).to.equal(200);
        done();
      });
    })

    it('user signin successful',(done)=>{
        chai
      .request(app)
      .post('/api/v1/auth/user')
      .send(User[0])
      .end((err, res) => {
        UserToken = res.body.data.token;
        expect(res.statusCode).to.equal(200);
        done();
      });
    })

    it('User Token Signin',(done)=>{
        chai
      .request(app)
      .get(`/api/v1/auth/token/${UserToken}`)
      .end((err, res) => {
        UserToken = res.body.data.token;
        expect(res.statusCode).to.equal(200);
        done();
      });
    })

    it('User Token Damaged',(done)=>{
        chai
      .request(app)
      .get(`/api/v1/auth/token/kjhjkh`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
    })

    it('No Authorisation token provided',(done)=>{
        chai
      .request(app)
      .patch('/api/v1/auth/update/3')
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
    })

    it('Expired Token Provided',(done)=>{
        chai
      .request(app)
      .patch('/api/v1/auth/update/3')
      .set("Authorization",`kjgkjgbra`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
    })

    it('Action Forbidden With Token Provided',(done)=>{
        chai
      .request(app)
      .patch('/api/v1/auth/update/3')
      .set('Authorization',UserToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        done();
      });
    })

    it('No Role Provided',(done)=>{
        chai
      .request(app)
      .patch('/api/v1/auth/update/3')
      .set('Authorization',AdminToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
    })

    it('UserId Provided NotFound',(done)=>{
        chai
      .request(app)
      .patch('/api/v1/auth/update/309')
      .set('Authorization',AdminToken)
      .send({ role : 'Manager' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
    })

    it('Wrong Role Provided',(done)=>{
        chai
      .request(app)
      .patch('/api/v1/auth/update/3')
      .set('Authorization',AdminToken)
      .send({ role : 'A Wrong Role' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
    })

    it('Role Update Successfly',(done)=>{
        chai
      .request(app)
      .patch('/api/v1/auth/update/2')
      .send({ role : 'Manager' })
      .set('Authorization',AdminToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    })

})
