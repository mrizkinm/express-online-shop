import request from 'supertest';
import app from '../src/app';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 5 * 1000, // 15 menit
  max: 3, // Maks 100 request per IP dalam 15 menit
  message: { errors: 'Too many requests, please try again later.' },
});

// Terapkan rate limiter pada endpoint ini
app.get('/api/test', limiter, (req, res) => {
  res.status(200).json({ message: 'Request successful' });
});

describe('Rate Limiter Middleware', () => {
  const agent = request.agent(app);
  const ip = '123.123.123.123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should allow requests under the limit', async () => {
    for (let i = 0; i < 3; i++) {
      const res = await agent.get('/api/test').set('X-Forwarded-For', ip);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Request successful');
    }
  });

  it('should block requests exceeding the limit', async () => {
    for (let i = 0; i < 3; i++) {
      await agent.get('/api/test').set('X-Forwarded-For', ip); // Habiskan limit
    }

    const res = await agent.get('/api/test').set('X-Forwarded-For', ip); // Request ke-4
    expect(res.status).toBe(429);
    expect(res.body.errors).toBe('Too many requests, please try again later.');
  });

  it(
    'should reset limit after windowMs',
    async () => {
      for (let i = 0; i < 3; i++) {
        await agent.get('/api/test').set('X-Forwarded-For', ip);
      }

      await new Promise((resolve) => setTimeout(resolve, 5000)); // Tunggu sedikit lebih dari windowMs

      const res = await agent.get('/api/test').set('X-Forwarded-For', ip); // Harus diterima
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Request successful');
    },
    10000 // ⏳ Tambahkan timeout khusus untuk test ini
  );
});