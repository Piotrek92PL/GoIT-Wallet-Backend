import { getAll } from '../../src/controllers/categories/getAll';
import * as services from '../../src/services/categories/index';

jest.mock('../../src/services/categories/index');

describe('getAll controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get all categories successfully', async () => {
    const mockCategories = ['Category1', 'Category2'];
    services.getCategories.mockResolvedValueOnce(mockCategories);

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };

    await getAll(req, res);

    expect(services.getCategories).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      data: mockCategories,
    });
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should handle an error and return 500 status', async () => {
    const mockError = 'Some error';
    services.getCategories.mockRejectedValueOnce(mockError);

    const req = {};
     // Inicjalizacja obiektu res z odpowiednimi funkcjami
     const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(), // Aby umożliwić łańcuchowanie (return this)
    };


    await getAll(req, res);

    expect(services.getCategories).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: `Internal server error: ${mockError}`,
    });
  });
});

  it('should handle asynchronous code correctly', async () => {
    const mockCategories = ['Category1', 'Category2'];
    services.getCategories.mockResolvedValueOnce(mockCategories);

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };

    await getAll(req, res);

    expect(services.getCategories).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      data: mockCategories,
    });
    expect(res.status).not.toHaveBeenCalled();
  });
;
