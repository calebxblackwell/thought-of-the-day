'use strict';
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');

chai.should();

chai.use(chaiHttp);
//pull data
function seedMockData(){
  console.info('seeding mock data');
  const seedData = [];
  for (let i=1; i <=10; i++) {
    seedData.push(generateMockData());
  }
  //returns a Promise
  return Status.insertMany(seedData);
}
function generateMockData() {
  return {
    date: faker.date(),
    text: faker.Lorem.paragraph()
  }
}
describe('status page', function () {
  it('should exist', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        res.should.have.status(200);
      });
  });
});
describe('API endpoints', function(){
  before(function() {
    return runServer();
  });
  beforeEach(function(){
    return seedMockData();
  });
  after(function() {
    return closeServer();
  });
describe('access root', function(){
  it('should return 200 and html', function(){
    return chai.request(app)
    .get('/')
    .then(function(res){
      res.should.have.status(200);
      res.should.be.html;
    });
  });
});
describe('POST endpoint', function(){
  it('should add a new status', function(){
    const textEntered=STATUS;
    return chai.request(app)
    .post('/status')
    .send(textEntered)
    .then(function(res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.include.keys('status','returns');
      res.body.status.should.equal(textEntered.status);
      return status.findbyDate(res.body.date);
    });
    .then(function(status){
      textEntered.should.equal(status.date);
    });
  });
});
  describe('PUT endpoint', function(){
    it('should post status and attach date', function(){
      const findbyDate = {
        returns: 'date of post'
      };
        return textEntered
        .then(show => {
          displayData.data = textEntered;

          return chai.request(app)
          .put (`/textEntered/${textEntered}`)
          .send(displayData);
        });
        .then(res => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');

          return textEntered.getData(res.body).exec();
        });
        .then(post => {
          post.should.equal(displayData.getData);
        });
    });
  });
});
