import { createApp } from '../../src/app';
import request from 'supertest';


let app: any;

beforeAll(async () => {
    app = await createApp();
});

describe('Health Endpoint', () => {
    it('debería retornar 200 OK y el estado correcto', async () => {
        const response = await request(app).get('/api/health');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('ok', true);
        expect(response.body).toHaveProperty('message', 'API UP');
    });
});