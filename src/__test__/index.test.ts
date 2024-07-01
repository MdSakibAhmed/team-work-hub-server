// tests/index.test.ts
import request from 'supertest';
import app from '../app';
import {it,expect ,describe} from "vitest"

describe('Express Server', () => {
  it('GET / responds with Hello, World!', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello world');
  });

  
});
