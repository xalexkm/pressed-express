const request = require('supertest');
const app  = require('../../app.js');

describe('test the app', () => {
    test('should respond to GET method', async () => {
        const users = await request(app).get('/users');
        expect(users.statusCode).toBe(200);
    });
})