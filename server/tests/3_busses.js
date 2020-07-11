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
];

const data = [
    {
        plate:'RAE 300 A',
        company:'KBS',
    },
    {
        plate:'RA% 200 A',
        company:'KBS',
    },
    {
        plate:'RA 200 A',
        company:'KBS',
    },
    {
        plate:'RAE 300 A',
        company:'KBS',
        routeNumber:205,
        origin:'DOWNTOWN',
        destination:'GIKONGO',
    },
    {
        plate:'RAC 900 B',
        company:'KBS',
        routeNumber:505,
        origin:'GIKONGO',
        destination:'DOWNTOWN',
        status:'active'
    },
    {
        plate:'RAC 820 B',
        company:'KBS',
        routeNumber:595,
        origin:'GIKONGO',
        destination:'DOWNTOWN',
        status:'active'
    },
    {
        origin:'GIKONDO',
        destination:'DOWNTOWN',
    },
    {
        origin:'DOWNTOWN',
        destination:'GIKONDO',
    },
];

describe('>>> Testing Busses  <<<',()=>{
  let ManagerToken,UserToken,bus_id;
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

    it('Bus creation Validation',(done)=>{
        chai
        .request(app)
        .post('/api/v1/busses')
        .set('authorization',ManagerToken)
        .send({plate:''})
        .end((err,res)=>{
            expect(res.statusCode).to.equal(400)
            done();
        })
    })

    it('Bus creation character Validation',(done)=>{
        chai
        .request(app)
        .post('/api/v1/busses')
        .set('authorization',ManagerToken)
        .send(data[1])
        .end((err,res)=>{
            expect(res.statusCode).to.equal(400)
            done();
        })
    })

    it('Bus creation plate Validation',(done)=>{
        chai
        .request(app)
        .post('/api/v1/busses')
        .set('authorization',ManagerToken)
        .send(data[2])
        .end((err,res)=>{
            expect(res.statusCode).to.equal(400)
            done();
        })
    })

    it('Bus creation success',(done)=>{
        chai
        .request(app)
        .post('/api/v1/busses')
        .set('authorization',ManagerToken)
        .send(data[0])
        .end((err,res)=>{
            bus_id = res.body.data.id;
            expect(res.statusCode).to.equal(201)
            done();
        })
    })

    it('Bus creation plate conflict',(done)=>{
        chai
        .request(app)
        .post('/api/v1/busses')
        .set('authorization',ManagerToken)
        .send(data[0])
        .end((err,res)=>{
            expect(res.statusCode).to.equal(409)
            done();
        })
    })

    it('Bus update plate conflicts',(done)=>{
        chai
        .request(app)
        .patch(`/api/v1/busses/${bus_id}`)
        .set('authorization',ManagerToken)
        .send(data[4])
        .end((err,res)=>{
            expect(res.statusCode).to.equal(409)
            done();
        })
    })

    it('Bus update validation',(done)=>{
        chai
        .request(app)
        .patch(`/api/v1/busses/908`)
        .set('authorization',ManagerToken)
        .set({company:'iyu'})
        .end((err,res)=>{
            expect(res.statusCode).to.equal(400)
            done();
        })
    })

    it('Bus update BusNotFound',(done)=>{
        chai
        .request(app)
        .patch(`/api/v1/busses/908`)
        .set('authorization',ManagerToken)
        .send(data[3])
        .end((err,res)=>{
            expect(res.statusCode).to.equal(404)
            done();
        })
    })

    it('Bus update RouteNumberNotFound',(done)=>{
        chai
        .request(app)
        .patch(`/api/v1/busses/${bus_id}`)
        .set('authorization',ManagerToken)
        .send(data[5])
        .end((err,res)=>{
            expect(res.statusCode).to.equal(404)
            done();
        })
    })

    it('Bus update success',(done)=>{
        chai
        .request(app)
        .patch(`/api/v1/busses/${bus_id}`)
        .set('authorization',ManagerToken)
        .send(data[3])
        .end((err,res)=>{
            expect(res.statusCode).to.equal(200)
            done();
        })
    })

    it('Get AllBus Validation',(done)=>{
        chai
        .request(app)
        .post(`/api/v1/busses/route/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d`)
        .set('authorization',ManagerToken)
        .send({plate:''})
        .end((err,res)=>{
            expect(res.statusCode).to.equal(400)
            done();
        })
    })

    it('Get AllBus RouteIdNotFound',(done)=>{
        chai
        .request(app)
        .post(`/api/v1/busses/route/2b1deb4d-9b7d-4bad-9bdd-2b0d7b3dcb6d`)
        .set('authorization',ManagerToken)
        .send(data[6])
        .end((err,res)=>{
            expect(res.statusCode).to.equal(404)
            done();
        })
    })

    it('Get AllBus restricted',(done)=>{
        chai
        .request(app)
        .post(`/api/v1/busses/route/1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed`)
        .set('authorization',UserToken)
        .send(data[6])
        .end((err,res)=>{
            expect(res.statusCode).to.equal(403)
            done();
        })
    })

    it('Get AllBus Direction of Empty',(done)=>{
        chai
        .request(app)
        .post(`/api/v1/busses/route/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d`)
        .set('authorization',ManagerToken)
        .send(data[6])
        .end((err,res)=>{
            expect(res.statusCode).to.equal(404)
            done();
        })
    })

    it('Get AllBus Direction of Empty',(done)=>{
        chai
        .request(app)
        .post(`/api/v1/busses/route/1b5d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed`)
        .set('authorization',ManagerToken)
        .send(data[6])
        .end((err,res)=>{
            expect(res.statusCode).to.equal(404)
            done();
        })
    })
    
    it('Get AllBus Success',(done)=>{
        chai
        .request(app)
        .post(`/api/v1/busses/route/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d`)
        .set('authorization',ManagerToken)
        .send(data[7])
        .end((err,res)=>{
            expect(res.statusCode).to.equal(200)
            done();
        })
    })

    it('Get OneBus NotFound',(done)=>{
        chai
        .request(app)
        .get(`/api/v1/busses/543`)
        .set('authorization',ManagerToken)
        .end((err,res)=>{
            expect(res.statusCode).to.equal(404)
            done();
        })
    })

    it('Get OneBus success',(done)=>{
        chai
        .request(app)
        .get(`/api/v1/busses/${bus_id}`)
        .set('authorization',ManagerToken)
        .end((err,res)=>{
            expect(res.statusCode).to.equal(200)
            done();
        })
    })
});
