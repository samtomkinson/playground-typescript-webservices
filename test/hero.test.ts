import app from '../src/App';

import * as supertest from 'supertest'

const request = supertest(app);

describe('GET api/v1/heroes', () => {
    it('responds with a JSON array', () => {
        return request
            .get('/api/v1/heroes')
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('should include wolverine', () => {
        return request.get('/api/v1/heroes')
            .then(res => {
                const wolverine = res.body.find(hero => hero.name === 'Wolverine');
                expect(wolverine).toBeDefined();
            });
    });
});

describe('GET api/v1/heroes/:id', () => {
    it('response with single JSON object', () => {
        return request
            .get('/api/v1/heroes/1')
            .expect(200)
            .then(res => {
                expect(Array.isArray(res.body)).toBeFalsy();
            });
    });

    it('should be Luke Cage', () => {
        return request
            .get('/api/v1/heroes/1')
            .expect(200)
            .then(res => {
                expect(res.body.hero.name).toBe('Luke Cage');
            });
    })
})
