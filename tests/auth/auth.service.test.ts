// -------------------------
//  AUTH SERVICE TESTS
// -------------------------

import { AuthService } from '../../src/infrastructure/auth/auth.service'; 
import { AppDataSource } from '../../src/config/data-source'; 
import * as bcrypt from 'bcryptjs';

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  compare: jest.fn()
}));

// Mock del data source
jest.mock('../../src/config/data-source');

describe('AuthService', () => {
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = { findOne: jest.fn() };
    // @ts-ignore
    jest.spyOn(AppDataSource, 'getRepository').mockReturnValue(mockRepo);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Login correcto -> devuelve token y refreshToken y crea refresh en DB', async () => {
    const admin = { id: 1, email: 'admin@test.com', passwordHash: 'hashed' } as any;
    mockRepo.findOne.mockResolvedValue(admin);

    // bcrypt.compare mock
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const signJwt = jest
      .spyOn(require('../../src/infrastructure/auth/jwt'), 'signJwt')
      .mockReturnValue('access-token');

    const createSpy = jest
      .spyOn(
        require('../../src/domain/services/RefreshTokenService').RefreshTokenService.prototype,
        'create'
      )
      .mockResolvedValue({} as any);

    const svc = new AuthService();
    const result = await svc.login({ email: 'admin@test.com', password: 'password' });

    expect(signJwt).toHaveBeenCalledWith({ id: admin.id, email: admin.email });
    expect(result.token).toBe('access-token');
    expect(typeof result.refreshToken).toBe('string');
    expect(result.refreshToken.length).toBeGreaterThanOrEqual(40);
    expect(createSpy).toHaveBeenCalledWith(admin, result.refreshToken, expect.any(Date));
  });

  test('Email inexistente -> lanza error', async () => {
    mockRepo.findOne.mockResolvedValue(null);
    const svc = new AuthService();
    await expect(
      svc.login({ email: 'noone@test.com', password: 'x' })
    ).rejects.toThrow('Credenciales inválidas');
  });

  test('Contraseña incorrecta -> lanza error', async () => {
    const admin = { id: 1, email: 'admin@test.com', passwordHash: 'hashed' } as any;
    mockRepo.findOne.mockResolvedValue(admin);

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const svc = new AuthService();
    await expect(
      svc.login({ email: 'admin@test.com', password: 'wrong' })
    ).rejects.toThrow('Credenciales inválidas');
  });
});

// -------------------------
//  AUTH CONTROLLER TESTS
// -------------------------

describe('AuthController refresh/logout flows (unit)', () => {
  const AuthController = require('../../src/infrastructure/auth/auth.controller').AuthController;

  let res: any;

  beforeEach(() => {
    res = {
      json: jest.fn(),
      clearCookie: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  afterEach(() => jest.restoreAllMocks());

  test('Refresh token válido genera nuevos tokens', async () => {
    const mockStored = {
      token: 'rt',
      expiresAt: new Date(Date.now() + 10000),
      admin: { id: 1, email: 'a@a.com' }
    };

    jest
      .spyOn(
        require('../../src/domain/services/RefreshTokenService').RefreshTokenService.prototype,
        'findByToken'
      )
      .mockResolvedValue(mockStored as any);

    jest
      .spyOn(require('../../src/infrastructure/auth/jwt'), 'signJwt')
      .mockReturnValue('new-access');

    const controller = new AuthController(
      new (require('../../src/infrastructure/auth/auth.service').AuthService)()
    );

    const req: any = { cookies: { refreshToken: 'rt' }, body: {} };
    const next = jest.fn();

    await controller.refresh(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();

    const sent = res.json.mock.calls[0][0];
    expect(sent.success).toBe(true);
    expect(sent.data.accessToken).toBe('new-access');
  });

  test('Refresh token inválido -> responde 401', async () => {
    jest
      .spyOn(
        require('../../src/domain/services/RefreshTokenService').RefreshTokenService.prototype,
        'findByToken'
      )
      .mockResolvedValue(null);

    const controller = new AuthController(
      new (require('../../src/infrastructure/auth/auth.service').AuthService)()
    );

    const req: any = { cookies: { refreshToken: 'invalid' }, body: {} };
    const next = jest.fn();

    await controller.refresh(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  test('Logout elimina el token y limpia cookie', async () => {
    const deleteSpy = jest
      .spyOn(
        require('../../src/domain/services/RefreshTokenService').RefreshTokenService.prototype,
        'deleteByToken'
      )
      .mockResolvedValue(undefined);

    const controller = new AuthController(
      new (require('../../src/infrastructure/auth/auth.service').AuthService)()
    );

    const req: any = { cookies: { refreshToken: 'rt' }, body: {} };
    const next = jest.fn();

    await controller.logout(req, res, next);

    expect(deleteSpy).toHaveBeenCalledWith('rt');
    expect(res.clearCookie).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
