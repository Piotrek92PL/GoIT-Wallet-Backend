import supertest from 'supertest';
import app from '../../src/app';
import { addTransaction } from '../../src/services/transactions';

jest.mock('../../src/services/transactions/index');

describe('addTransaction controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add a new transaction successfully', async () => {
    const mockTransactionId = 'abc123';
    const mockRequestBody = {
      date: '2023-01-01',
      type: 'expense',
      category: 1,
      comment: 'Monthly grocery shopping',
      amount: 50.00,
    };

    // Ustawienie mocka dla usługi addTransaction
    addTransaction.mockResolvedValueOnce({ _id: mockTransactionId });

    const req = { body: mockRequestBody, user: { id: 'user123' } };
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };

    await app(req, res); 

    expect(addTransaction).toHaveBeenCalledWith({
      date: '2023-01-01',
      type: 'expense',
      category: 1,
      comment: 'Monthly grocery shopping',
      amount: 50.00,
      userId: 'user123',
    });

    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      data: mockTransactionId,
    });

    expect(res.status).not.toHaveBeenCalled();
  });

  it('should handle validation errors and return 400 status', async () => {
    const mockValidationErrors = ['Invalid amount, must be a positive number'];

    // Ustawienie mocka dla validateTransaction zwracającego błędy walidacji
    jest.mock('../../src/controllers/transactions/add', () => ({
      validateTransaction: jest.fn(() => mockValidationErrors),
    }));

    const req = { body: {} };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await app(req, res);

    expect(addTransaction).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 400,
      message: 'Invalid transaction data',
      errors: mockValidationErrors,
    });
  });

  it('should handle internal server error and return 500 status', async () => {
    const mockError = 'Some error';

    // Ustawienie mocka dla services.addTransaction zwracającego błąd
    addTransaction.mockRejectedValueOnce(mockError);

    const req = { body: { date: '2023-01-01', type: 'expense', category: 1, amount: 50.00 }, user: { id: 'user123' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await app(req, res);

    expect(addTransaction).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: `Internal server error: ${mockError}`,
    });
  });
});
