import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;

dotenv.config()

const User = [
  {
    email: "firaduk@ygmail.com",
    firstname: "kazitunga",
    lastname: "Dativa",
    googleId:32723098641678272,
    facebookId:"",
  },
  {
      email: process.env.Manager_Email,
  }
]

const Route = [
  {
    PointA:'nyamirambo',
    PointB:'kacyiru',
  },
  {
    PointA:'nyamirambo',
    PointB:'kacyiru',
    status:'active'
  },
]

const Stop = [
  {
    name:'rwandex',
    longitude:-30.9872998,
    latitude:20.8868988,
  },
  {
    name:'rwandex',
    longitude:-30.9872998,
    latitude:20.88128988,
  },
]

describe('>>> Testing Bus Routes  <<<',()=>{
  let ManagerToken,UserToken,route_id,stop_id;
    it('Manager signin successful',(done)=>{
        chai
      .request(app)
      .post('/api/v1/auth/user')
      .send(User[1])
      .end((err, res) => {
        ManagerToken = res.body.data.token;
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

    it('Get All Routes',(done)=>{
        chai
      .request(app)
      .get('/api/v1/routes')
      .set('authorization',UserToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    })

    it('Get Specific Bus Routes NotFound',(done)=>{
        chai
      .request(app)
      .get('/api/v1/routes/9b1deb4d-3b7d-3bad-9bdd-2b0d7b3dcb6d')
      .set('authorization',UserToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
    })

    it('Get Specific Bus Routes success',(done)=>{
        chai
      .request(app)
      .get('/api/v1/routes/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
      .set('authorization',UserToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    })

    it('Get Specific Bus Routes success But No stops',(done)=>{
        chai
      .request(app)
      .get('/api/v1/routes/1b5d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed')
      .set('authorization',UserToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    })

    it('Get Specific Bus Routes success but restricted',(done)=>{
        chai
      .request(app)
      .get('/api/v1/routes/1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed')
      .set('authorization',UserToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        done();
      });
    })

    it('Get Specific Bus Routes success',(done)=>{
        chai
      .request(app)
      .get('/api/v1/routes/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
      .set('authorization',UserToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    })

    it('Get Specific Bus Stop NotFound',(done)=>{
        chai
      .request(app)
      .get('/api/v1/stops/1b5d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed')
      .set('authorization',UserToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
    })

    it('Get Specific Bus Stop restricted',(done)=>{
        chai
      .request(app)
      .get('/api/v1/stops/9b1deb4d-3b7d-4bad-9bdd-2b0d7b9dcb6d')
      .set('authorization',UserToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        done();
      });
    })

    it('Get Specific Bus Stop success',(done)=>{
        chai
      .request(app)
      .get('/api/v1/stops/1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd5bed')
      .set('authorization',ManagerToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    })

    it('Create Bus Route Validation',(done)=>{
        chai
      .request(app)
      .post('/api/v1/routes')
      .set('authorization',ManagerToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
    })

    it('Create Bus Route success',(done)=>{
        chai
      .request(app)
      .post('/api/v1/routes')
      .set('authorization',ManagerToken)
      .send(Route[0])
      .end((err, res) => {
        route_id = res.body.data.id;
        expect(res.statusCode).to.equal(201);
        done();
      });
    })

    it('Create Bus Route conflicts',(done)=>{
        chai
      .request(app)
      .post('/api/v1/routes')
      .set('authorization',ManagerToken)
      .send(Route[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        done();
      });
    })

    it('Bus Route update NotFound',(done)=>{
        chai
      .request(app)
      .patch(`/api/v1/routes/9b1deb4d-3b7d-4bad-9bdd-2b0d7b4dcb6d`)
      .set('authorization',ManagerToken)
      .send(Route[1])
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
      });
      done();
    })

    it('Bus Route update success',(done)=>{
        chai
      .request(app)
      .patch(`/api/v1/routes/${route_id}`)
      .set('authorization',ManagerToken)
      .send(Route[1])
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    })

    it('Create Bus Stop validation',(done)=>{
        chai
      .request(app)
      .post(`/api/v1/stops/${route_id}`)
      .set('authorization',ManagerToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
    })

    it('Create Bus Stop with Route NotFound',(done)=>{
        chai
      .request(app)
      .post(`/api/v1/stops/9b1deb4d-3b7d-4bad-9bdd-2b0d7b4dcb6d`)
      .set('authorization',ManagerToken)
      .send(Stop[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
    })

    it('Create Bus Stop success',(done)=>{
        chai
      .request(app)
      .post(`/api/v1/stops/${route_id}`)
      .set('authorization',ManagerToken)
      .send(Stop[0])
      .end((err, res) => {
        stop_id = res.body.data.id
        expect(res.statusCode).to.equal(201);
        done();
      });
    })

    it('Create Bus Stop coords conflicts',(done)=>{
        chai
      .request(app)
      .post(`/api/v1/stops/${route_id}`)
      .set('authorization',ManagerToken)
      .send(Stop[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        done();
      });
    })

    it('Create Bus Stop Name conflicts',(done)=>{
        chai
      .request(app)
      .post(`/api/v1/stops/${route_id}`)
      .set('authorization',ManagerToken)
      .send(Stop[1])
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        done();
      });
    })

    it('update Bus Stop notfound',(done)=>{
        chai
      .request(app)
      .patch(`/api/v1/stops/9b1deb4d-3b7d-4bad-9bdd-2b0d7b4dcb6d`)
      .set('authorization',ManagerToken)
      .send(Stop[1])
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
      });
      done();
    })

    it('update Bus Stop success',(done)=>{
        chai
      .request(app)
      .patch(`/api/v1/stops/${stop_id}`)
      .set('authorization',ManagerToken)
      .send(Stop[1])
      .end((err, res) => {
        console.log("============res.body",res.body)
        expect(res.statusCode).to.equal(200);
        done();
      });
    })
    
})
