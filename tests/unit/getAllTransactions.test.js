import { getAll } from '../../src/controllers/transactions/getAll';
import * as services from '../../src/services/transactions/index';

jest.mock('../../src/services/transactions/index');

describe('getAll controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get all transactions successfully', async () => {
    const mockUserId = 'user123';
    const mockTransactions = [{ id: '1', amount: 50.00 }, { id: '2', amount: 30.00 }];

    // Ustawienie mocka dla services.listTransactions
    services.listTransactions.mockResolvedValueOnce(mockTransactions);

    const req = { user: { id: mockUserId } };
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };

    await getAll(req, res);

    expect(services.listTransactions).toHaveBeenCalledWith({ userId: mockUserId });
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      data: mockTransactions,
    });
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should handle internal server error and return 500 status', async () => {
    const mockUserId = 'user123';
    const mockError = 'Some error';

    // Ustawienie mocka dla services.listTransactions zwracającego błąd
    services.listTransactions.mockRejectedValueOnce(mockError);

    const req = { user: { id: mockUserId } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await getAll(req, res);

    expect(services.listTransactions).toHaveBeenCalledWith({ userId: mockUserId });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: `Internal server error: ${mockError}`,
    });
  });
});
