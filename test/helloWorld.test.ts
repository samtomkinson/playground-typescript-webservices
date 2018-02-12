import * as http from 'http';
import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import chaiAsPromised = require("chai-as-promised");

import app from '../src/App';

chai.use(chaiHttp);
chai.use(chaiAsPromised);

const expect = chai.expect;

describe('baseRoute', () => {
    const server = http.createServer(app);
    const request = chai.request(server);

    it('should be json', () => {
        return request.get('/')
        .then(res => {
            expect(res.type).to.eql('application/json');
        });
    });

    it('should have a message prop', () => {
        return request.get('/')
            .then(res => {
                expect(res.body.message).to.eql('Hello World!');
            });
    });

    after(done => {
        server.close(done);
    });

});
