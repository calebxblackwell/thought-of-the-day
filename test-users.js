mongoose.connect('mongodb://localhost:27017/full-stack-capstone');
const chai = require('chai');
const chaiHttp = require('chai-http');
//in order to run user tests, you need to access the server.js and router.js info
const {app, runServer, closeServer} = require('../server');//server.js file
const {User} = require('../router');//router.js file (has users info)
//this part of the test defines the names used.
describe('/router', function(){
  const username = 'testuser';
  const password = 'testpassword';
  const firstName = 'Test';
  const lastName = 'User';
  const usernameB = 'testuserB';
  const passwordB = 'testpasswordB';
  const firstNameB = 'TestB';
  const lastNameB = 'UserB';

//this part of the test starts and stops the server.
before(function() {
   return runServer();
 });
 after(function() {
   return closeServer();
 });
//this is the part of the test that sends a post request
//to reject users with no username
describe('/router', function() {
  describe('POST', function() {
        it('Rejects users without a username', function() {
          return chai
            .request(app)
            .post('/router')
            .send({
              password,
              firstName,
              lastName
            })
            .then(() =>
              expect.fail(null, null, 'Request denied')
            )
            .catch(err => {
              if (err instanceof chai.AssertionError) {
                throw err;
              }

              const res = err.response;
              expect(res).to.have.status(422);
              expect(res.body.reason).to.equal('Not valid');
              expect(res.body.message).to.equal('Missing');
              expect(res.body.location).to.equal('username');
            });
        });
//this is the part that rejects users with a missing password.
        it('Rejects users without a password', function() {
            return chai
              .request(app)
              .post('/router')
              .send({
                username,
                firstName,
                lastName
              })
              .then(() =>
              expect.fail(null, null, 'Request denied')
          )
            .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('Not valid');
            expect(res.body.message).to.equal('Missing');
            expect(res.body.location).to.equal('password');
          });
      });
//this is the part that rejects users based off of the type of username.
      it('Rejects users with non-string username', function() {
   return chai
     .request(app)
     .post('/router')
     .send({
       username: 123456,
       password,
       firstName,
       lastName
     })
     .then(() =>
       expect.fail(null, null, 'Request denied')
     )
     .catch(err => {
       if (err instanceof chai.AssertionError) {
         throw err;
       }

       const res = err.response;
       expect(res).to.have.status(422);
       expect(res.body.reason).to.equal('Not valid');
       expect(res.body.message).to.equal(
         'Incorrect field type: expected string'
       );
       expect(res.body.location).to.equal('username');
     });
 });
//this is the part that rejects users with wrong type of password.
it('Rejects users with non-string password', function() {
        return chai
          .request(app)
          .post('/router')
          .send({
            username,
            password: 123456,
            firstName,
            lastName
          })
          .then(() =>
            expect.fail(null, null, 'Request denied')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('Not valid');
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            );
            expect(res.body.location).to.equal('password');
          });
      });
//this part rejects users with incorrect characters in first name
it('Rejects users with non-string first name', function() {
        return chai
          .request(app)
          .post('/router')
          .send({
            username,
            password,
            firstName: 123456,
            lastName
          })
          .then(() =>
            expect.fail(null, null, 'Request denied')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('Not valid');
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            );
            expect(res.body.location).to.equal('firstName');
          });
      });
//this part rejects users with incorrect characters in last name
it('Rejects users with non-string last name', function() {
        return chai
          .request(app)
          .post('/router')
          .send({
            username,
            password,
            firstName,
            lastName: 123456
          })
          .then(() =>
            expect.fail(null, null, 'Request denied')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('Not valid');
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            );
            expect(res.body.location).to.equal('lastName');
          });
      });
//this part rejects users with usernames with spaces
it('Rejects users with non-trimmed username', function() {
        return chai
          .request(app)
          .post('/router')
          .send({
            username: ` ${username} `,
            password,
            firstName,
            lastName
          })
          .then(() =>
            expect.fail(null, null, 'Request denied')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('Not valid');
            expect(res.body.message).to.equal(
              'Cannot start or end with whitespace'
            );
            expect(res.body.location).to.equal('username');
          });
      });
//this part rejects users with passwords with spaces
it('Rejects users with non-trimmed password', function() {
       return chai
         .request(app)
         .post('/router')
         .send({
           username,
           password: ` ${password} `,
           firstName,
           lastName
         })
         .then(() =>
           expect.fail(null, null, 'Request denied')
         )
         .catch(err => {
           if (err instanceof chai.AssertionError) {
             throw err;
           }

           const res = err.response;
           expect(res).to.have.status(422);
           expect(res.body.reason).to.equal('Not valid');
           expect(res.body.message).to.equal(
             'Cannot start or end with whitespace'
           );
           expect(res.body.location).to.equal('password');
         });
     });
//this part rejects users without a username
it('Rejects users with empty username field', function() {
        return chai
          .request(app)
          .post('/router')
          .send({
            username: '',
            password,
            firstName,
            lastName
          })
          .then(() =>
            expect.fail(null, null, 'Request denied')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('Not valid');
            expect(res.body.message).to.equal(
              'Must be at least 1 characters long'
            );
            expect(res.body.location).to.equal('username');
          });
      });
//this part rejects users with passwords that are too short.
it('Rejects users with password less than ten characters', function() {
       return chai
         .request(app)
         .post('/router')
         .send({
           username,
           password: '123456789',
           firstName,
           lastName
         })
         .then(() =>
           expect.fail(null, null, 'Request denied')
         )
         .catch(err => {
           if (err instanceof chai.AssertionError) {
             throw err;
           }

           const res = err.response;
           expect(res).to.have.status(422);
           expect(res.body.reason).to.equal('Not valid');
           expect(res.body.message).to.equal(
             'Must be at least 10 characters long'
           );
           expect(res.body.location).to.equal('password');
         });
     });
//this part rejects users with passwords that are too long.
it('Rejects users with password greater than 72 characters', function() {
        return chai
          .request(app)
          .post('/router')
          .send({
            username,
            password: new Array(73).fill('a').join(''),
            firstName,
            lastName
          })
          .then(() =>
            expect.fail(null, null, 'Request denied')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('Not valid');
            expect(res.body.message).to.equal(
              'Cannot be more than 72 characters long'
            );
            expect(res.body.location).to.equal('password');
          });
      });
//this test tries to create more than one user with the same name.
it('Rejects users with duplicate username', function() {
   // Create first user
   return User.create({
     username,
     password,
     firstName,
     lastName
   })
     .then(() =>
       // Try to create a second user with the same username
       chai.request(app).post('/router').send({
         username,
         password,
         firstName,
         lastName
       })
     )
     .then(() =>
       expect.fail(null, null, 'Request denied')
     )
     .catch(err => {
       if (err instanceof chai.AssertionError) {
         throw err;
       }

       const res = err.response;
       expect(res).to.have.status(422);
       expect(res.body.reason).to.equal('Not valid');
       expect(res.body.message).to.equal(
         'Username already taken'
       );
       expect(res.body.location).to.equal('username');
     });
 });
//this test actually creates a new user, with correct info.
it('Creates a new user', function() {
        return chai
          .request(app)
          .post('/router')
          .send({
            username,
            password,
            firstName,
            lastName
          })
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.keys(
              'username',
              'firstName',
              'lastName'
            );
            expect(res.body.username).to.equal(username);
            expect(res.body.firstName).to.equal(firstName);
            expect(res.body.lastName).to.equal(lastName);
            return User.findOne({
              username
            });
          })
          .then(user => {
            expect(user).to.not.be.null;
            expect(user.firstName).to.equal(firstName);
            expect(user.lastName).to.equal(lastName);
            return user.validatePassword(password);
          })
          .then(passwordIsCorrect => {
            expect(passwordIsCorrect).to.be.true;
          });
      });
//this test creates first names and last names that don't have spaces.
it('Trims firstName and lastName', function() {
      return chai
        .request(app)
        .post('/router')
        .send({
          username,
          password,
          firstName: ` ${firstName} `,
          lastName: ` ${lastName} `
        })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys(
            'username',
            'firstName',
            'lastName'
          );
          expect(res.body.username).to.equal(username);
          expect(res.body.firstName).to.equal(firstName);
          expect(res.body.lastName).to.equal(lastName);
          return User.findOne({
            username
          });
        })
        .then(user => {
          expect(user).to.not.be.null;
          expect(user.firstName).to.equal(firstName);
          expect(user.lastName).to.equal(lastName);
        });
    });
});
//this tests the GET function.
describe('GET', function() {
  it('Returns an empty array initially', function() {
    return chai.request(app).get('/router').then(res => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.length(0);
    });
  });
  it('Returns an array of users', function() {
    return User.create(
      {
        username,
        password,
        firstName,
        lastName
      },
      {
        username: usernameB,
        password: passwordB,
        firstName: firstNameB,
        lastName: lastNameB
      }
    )
      .then(() => chai.request(app).get('/router'))
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(2);
        expect(res.body[0]).to.deep.equal({
          username,
          firstName,
          lastName
        });
        expect(res.body[1]).to.deep.equal({
          username: usernameB,
          firstName: firstNameB,
          lastName: lastNameB
        });
      });
  });
});
});
//end.
});
