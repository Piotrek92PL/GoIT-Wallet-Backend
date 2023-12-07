import * as services from '#services/transactions/index.js';

const validateTransaction = data => {
  const { date, type, category, comment, amount } = data;
  const errors = [];

  if (!date || isNaN(new Date(date).getTime())) {
    errors.push('Invalid date format');
  }

  const validTypes = ['income', 'expense'];
  if (!type || !validTypes.includes(type)) {
    errors.push('Invalid type, must be either income or expense');
  }

  if (!category || typeof category !== 'number' || category < 0) {
    errors.push('Invalid category, must be a positive number');
  }

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    errors.push('Invalid amount, must be a positive number');
  }

  if (comment && typeof comment !== 'string') {
    errors.push('Comment must be a string');
  }

  return errors;
};

export const add = async (req, res, next) => {
  try {
    const validationErrors = validateTransaction(req.body);

    if (validationErrors.length === 0) {
      const { date, type, category, comment, amount } = req.body;
      const userId = req.user.id;
      const result = await services.addTransaction({
        date,
        type,
        category,
        comment,
        amount,
        userId,
      });
      return res.json({
        status: 200,
        data: result['_id'],
      });
    }

    // Walidacja nieudana:
    return res.status(400).json({
      status: 400,
      message: 'Invalid transaction data',
      errors: validationErrors,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};
