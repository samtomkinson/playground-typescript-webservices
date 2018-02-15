import app from '../src/App';

import * as supertest from 'supertest'

describe('baseRoute', () => {
    const request = supertest(app);

    it('should be json', () => {
        return request.get('/')
        .then(res => {
            expect(res.type).toBe('application/json');
        });
    });

    it('should have a message prop', () => {
        return request.get('/')
            .then(res => {
                expect(res.body.message).toBe('Hello World!');
            });
    });
});
