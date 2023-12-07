import Transaction from '../../models/transaction.model.js';

export const getUserStatisticsByDate = async (req, res, next) => {
  try {
    const { userId, year, month } = req.params;

    const yearNumber = parseInt(year, 10);
    const monthNumber = parseInt(month, 10);

    if (isNaN(yearNumber) || isNaN(monthNumber)) {
      return res.status(400).json({ message: 'Invalid year or month' });
    }

    console.log(`Year: ${yearNumber}, Month: ${monthNumber}`);

    const startDate = new Date(yearNumber, monthNumber - 1, 1);
    const endDate = new Date(yearNumber, monthNumber, 0);

    const transactions = await Transaction.find({
      owner: userId,
      date: { $gte: startDate, $lte: endDate },
    });

    let sumOfIncome = 0;
    let sumOfExpense = 0;

    for (const transaction of transactions) {
      if (transaction.type === 'income') {
        sumOfIncome += transaction.amount;
      } else if (transaction.type === 'expense') {
        sumOfExpense += transaction.amount;
      }
    }

    res.json({ transactions, sumOfIncome, sumOfExpense });
  } catch (err) {
    console.error(`Error in getUserStatisticsByDate: ${err}`);
    res.status(500).json({ message: `Internal server error: ${err}` });
  }
};
