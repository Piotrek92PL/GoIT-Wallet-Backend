import { register } from '../../src/controllers/ctrlUser/registerUser';
import userService from '#services/user/userService.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mockowanie usługi użytkownika, bcrypt i jsonwebtoken
jest.mock('../../src/services/user/userService');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

// Opis testów dla kontrolera rejestracji
describe('Register Controller', () => {
  beforeEach(() => {
    // Czyszczenie mocków przed każdym testem
    jest.clearAllMocks();
  });

  // Test dla poprawnej rejestracji nowego użytkownika
  it('should register a new user and return a token', async () => {
    // Przygotowanie danych żądania
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };

    // Przygotowanie obiektu odpowiedzi
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Konfiguracja mocków dla przypadku poprawnej rejestracji
    userService.findUserByEmail.mockResolvedValueOnce(null);
    userService.registerUser.mockResolvedValueOnce({ _id: 'userId', email: 'test@example.com' });
    bcrypt.hash.mockResolvedValueOnce('hashedPassword');
    jwt.sign.mockReturnValueOnce('token');

    // Wywołanie kontrolera rejestracji
    await register(req, res);

    // Sprawdzenie, czy funkcje zostały wywołane z odpowiednimi argumentami
    expect(userService.findUserByEmail).toHaveBeenCalledWith('test@example.com');
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(userService.registerUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'hashedPassword',
    });
    expect(jwt.sign).toHaveBeenCalledWith({ id: 'userId' }, process.env.SECRET, { expiresIn: '1h' });
    expect(userService.updateToken).toHaveBeenCalledWith('userId', 'token');

    // Sprawdzenie, czy funkcje odpowiedzi zostały wywołane z odpowiednimi argumentami
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      user: { email: 'test@example.com' },
      token: 'token',
    });
  });

  // Test dla przypadku, gdy email jest już w użyciu
  it('should return 409 status if email is already in use', async () => {
    // Przygotowanie danych żądania
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };

    // Przygotowanie obiektu odpowiedzi
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Konfiguracja mocka dla przypadku, gdy email jest już w użyciu
    userService.findUserByEmail.mockResolvedValueOnce({ _id: 'existingUserId', email: 'test@example.com' });

    // Wywołanie kontrolera rejestracji
    await register(req, res);

    // Sprawdzenie, czy funkcje zostały wywołane z odpowiednimi argumentami
    expect(userService.findUserByEmail).toHaveBeenCalledWith('test@example.com');
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(userService.registerUser).not.toHaveBeenCalled();
    expect(jwt.sign).not.toHaveBeenCalled();
    expect(userService.updateToken).not.toHaveBeenCalled();

    // Sprawdzenie, czy funkcje odpowiedzi zostały wywołane z odpowiednimi argumentami
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email in use' });
  });

  // Test dla obsługi błędów podczas rejestracji
  it('should handle errors during registration', async () => {
    // Przygotowanie danych żądania
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };

    // Przygotowanie obiektu odpowiedzi
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Konfiguracja mocka dla przypadku, gdy występuje błąd podczas rejestracji
    const error = new Error('Some error during findUserByEmail');
    userService.findUserByEmail.mockRejectedValueOnce(error);

    // Wywołanie kontrolera rejestracji
    await register(req, res);

    // Sprawdzenie, czy funkcje zostały wywołane z odpowiednimi argumentami
    expect(userService.findUserByEmail).toHaveBeenCalledWith('test@example.com');
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(userService.registerUser).not.toHaveBeenCalled();
    expect(jwt.sign).not.toHaveBeenCalled();
    expect(userService.updateToken).not.toHaveBeenCalled();

    // Sprawdzenie, czy funkcje odpowiedzi zostały wywołane z odpowiednimi argumentami
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: `Internal server error: ${error.message}` });
  });
});
