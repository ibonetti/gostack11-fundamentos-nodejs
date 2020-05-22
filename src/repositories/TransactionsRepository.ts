import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (calcBalance, transaction) => {
        const bal = calcBalance;
        switch (transaction.type) {
          case 'income':
            bal.income += transaction.value;
            break;

          case 'outcome':
            bal.outcome += transaction.value;
            break;

          default:
            break;
        }

        return bal;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
