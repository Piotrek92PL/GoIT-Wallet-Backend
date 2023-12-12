import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);

describe('Testing user registration', () => {
  it('Should register a new user', async () => {
    const response = await request
      .post('/signup')
      .send({
        username: 'newUser',
        password: 'password123',
        email: 'newuser@example.com',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'User registered successfully');
  });
});
