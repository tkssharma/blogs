require("../../helpers/intialise-env-vars");
import { expect } from "chai";
import { it } from "mocha";
import { app } from "../../../app";
import { User } from "../../../app/models/entities/User";
import { UserService } from "../../../app/services/UserService";
import { DatabaseService } from "../../../app/services/databaseService";

import { getConnection } from "typeorm";

const chai = require("chai");
const chaiHttp = require("chai-http");
import { IUser } from "../../../app/models/User";

const nock = require('nock');
const uuid = require('uuid');

chai.use(chaiHttp);

describe('User Controller', () => {

  beforeEach(async () => {
    try {
      getConnection()
    } catch (error) {
      await DatabaseService.getConnection();
    }
    return true;
  });

  afterEach(async () => {
    await getConnection().synchronize(true);
    return true;
  });

  describe('Create', () => {
    it('should  create User with valid request body', async () => {
      const params: IUser = {
        username: "test",
        password: "test",
        email: "test@gmail.com",
        role: "admin"
      }
      let response = await chai.request(app).post('/api/v1/user').type('application/json').send(params)
      expect(response.status).to.equal(200);
      expect(response.body.success).to.equal(true);
    });
    it('should not create User with valid duplicate email in request body', async () => {
      const params: IUser = {
        username: "test",
        password: "test",
        email: "test@gmail.com",
        role: "admin"
      }
      let response = await chai.request(app).post('/api/v1/user').type('application/json').send(params)
      expect(response.status).to.equal(200);
      expect(response.body.success).to.equal(true);

      let response1 = await chai.request(app).post('/api/v1/user').type('application/json').send(params)
      expect(response1.status).to.equal(400);
      expect(response1.body.success).to.equal(false);
      expect(response1.body.message).to.equal('User Already exists');
    });
    it('should get all users ', async () => {
      const response = await chai.request(app).get('/api/v1/user').type('application/json').send();
      expect(response.status).to.equal(200);
      expect(response.body.data).to.deep.equal([]);
    });
    it('should  create User with valid data and get using apis', async () => {
      const params: IUser = {
        username: "test",
        password: "test",
        email: "test@gmail.com",
        role: "admin"
      }
      let response = await chai.request(app).post('/api/v1/user').type('application/json').send(params)
      expect(response.status).to.equal(200);
      expect(response.body.success).to.deep.equal(true);

      let response1 = await chai.request(app).get('/api/v1/user').type('application/json').send()
      expect(response1.status).to.equal(200);
      expect(response1.body.success).to.equal(true);
      expect(response1.body.data.length).to.equal(1);
    });
  });
});