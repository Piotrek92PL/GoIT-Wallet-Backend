// Import kontrolera wylogowania
import { logout } from '../../src/controllers/ctrlUser/logoutUser';
// Import usługi użytkownika
import userService from '../../src/services/user/userService';

// Mockowanie usługi użytkownika
jest.mock('../../src/services/user/userService');

// Opis testów dla kontrolera wylogowania
describe('Logout Controller', () => {
  beforeEach(() => {
    // Czyszczenie mocków przed każdym testem
    jest.clearAllMocks();
  });

  // Test dla poprawnego wylogowania użytkownika
  it('should successfully log out a user', async () => {
    // Przygotowanie danych żądania
    const req = {
      user: {
        _id: 'userId',
      },
    };

    // Przygotowanie obiektu odpowiedzi
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Funkcja next nie powinna być wywołana
    const next = jest.fn();

    // Wywołanie kontrolera wylogowania
    await logout(req, res, next);

    // Sprawdzenie, czy funkcje zostały wywołane z odpowiednimi argumentami
    expect(userService.logoutUser).toHaveBeenCalledWith('userId');
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  // Test dla przypadku, gdy użytkownik nie jest uwierzytelniony
  it('should return 401 if user is not authorized', async () => {
    // Przygotowanie danych żądania
    const req = {
      user: null,
    };

    // Przygotowanie obiektu odpowiedzi
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Funkcja next nie powinna być wywołana
    const next = jest.fn();

    // Wywołanie kontrolera wylogowania
    await logout(req, res, next);

    // Sprawdzenie, czy funkcje zostały wywołane z odpowiednimi argumentami
    expect(userService.logoutUser).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized' });
    expect(next).not.toHaveBeenCalled();
  });

  // Test dla obsługi błędów podczas wylogowania
  it('should handle errors during logout', async () => {
    // Przygotowanie danych żądania
    const req = {
      user: {
        _id: 'userId',
      },
    };

    // Przygotowanie obiektu odpowiedzi
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Błąd podczas wylogowania
    const error = new Error('Some error during logout');
    userService.logoutUser.mockRejectedValueOnce(error);

    // Funkcja next
    const next = jest.fn();

    // Wywołanie kontrolera wylogowania
    await logout(req, res, next);

    // Sprawdzenie, czy funkcje zostały wywołane z odpowiednimi argumentami
    expect(userService.logoutUser).toHaveBeenCalledWith('userId');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    expect(next).toHaveBeenCalledWith(error);
  });
});
