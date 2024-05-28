const request = require('supertest');
const mockedApp = require("../../app");

describe('test the users route GET method', () => {
    afterEach(() => {
        jest.resetModules();
    });

    test('should respond to GET method', async () => {
        const mockedApp = require('../../app');
        const response = await request(mockedApp).get('/users');

        expect(response.statusCode).toBe(200);
    });

    test('should return a list of users', async () => {
        jest.doMock('../../clients/users', () => ({
            getAllUsers: jest.fn().mockReturnValue([
                {
                    "id": 1,
                    "name": "Alice",
                    "email": "alice@example.com",
                    "created_at": "2024-05-24T16:44:11.000Z"
                },
                {
                    "id": 2,
                    "name": "Bob",
                    "email": "bob@example.com",
                    "created_at": "2024-05-24T16:44:11.000Z"
                }
            ]),
        }));

        const mockedApp = require('../../app.js'); // Re-import app after module reset and mock setup
        const response = await request(mockedApp).get('/users');

        expect(response.body).toEqual([
            {
                "id": 1,
                "name": "Alice",
                "email": "alice@example.com",
                "created_at": "2024-05-24T16:44:11.000Z"
            },
            {
                "id": 2,
                "name": "Bob",
                "email": "bob@example.com",
                "created_at": "2024-05-24T16:44:11.000Z"
            }
        ]);
    });

    test('should return 500 on error', async () => {
        jest.doMock('../../clients/users', () => ({
            getAllUsers: jest.fn().mockRejectedValue(new Error('Database error')),
        }));

        const mockedApp = require('../../app');
        const response = await request(mockedApp).get('/users');

        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});

describe('test the users route PUT method', () => {
    const userData = {
        name: 'Alice',
        email: 'alice@example.com',
    }

    afterEach(() => {
        jest.resetModules();
    });

    test('should return the passed object back when successful', async () => {
        jest.doMock('../../clients/users', () => ({
            addUser: jest.fn(),
        }));

        const mockedApp = require('../../app');
        const response = await request(mockedApp).put('/users').send(userData);

        expect(response.body).toEqual(userData);
    });

    test('should return 500 on error', async () => {
        jest.doMock('../../clients/users', () => ({
            addUser: jest.fn().mockRejectedValue(new Error('Database error')),
        }));

        const mockedApp = require('../../app');
        const response = await request(mockedApp).put('/users').send(userData);

        expect(response.statusCode).toBe(500);
    });

    test('should return 200 on success', async () => {
        jest.doMock('../../clients/users', () => ({
            addUser: jest.fn(),
        }));

        const mockedApp = require('../../app');
        const response = await request(mockedApp).put('/users').send(userData);

        expect(response.statusCode).toBe(200);
    });

    test('should return 400 on missing body', async () => {
        jest.doMock('../../clients/users', () => ({
            addUser: jest.fn(),
        }));

        const mockedApp = require('../../app');
        const response = await request(mockedApp).put('/users').send();

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'Name and email failed to validate. Try different values.' });
    });

    test('should return 400 on invalid email', async () => {
        const wrongBody = {
            name: 'Alice',
            email: 'aliceexample.com',
        }

        jest.doMock('../../clients/users', () => ({
            addUser: jest.fn(),
        }));

        const mockedApp = require('../../app');
        const response = await request(mockedApp).put('/users').send();

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'Name and email failed to validate. Try different values.' });
    });
})
