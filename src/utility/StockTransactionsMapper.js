import Utils from '../server/Utils';
import { StockTransaction } from '../model/StockTransaction';

export default class StockTransactionsMapper {
  static convertArrayToObject(stockTransactions) {
    const result = [];
    stockTransactions.forEach((stockTransaction) => {
      if (stockTransaction[0] !== '') {
        const stockTransactionObject = new StockTransaction(
          stockTransaction[0],
          stockTransaction[1],
          stockTransaction[2],
          stockTransaction[3],
          stockTransaction[4],
          stockTransaction[5],
          stockTransaction[6],
          stockTransaction[7] ? Utils.parseDate(stockTransaction[7]) : '',
          stockTransaction[8]
        );
        result.push(stockTransactionObject);
      }
    });
    return result;
  }

  static convertObjectToArray(stockTransactions) {
    const result = [];
    stockTransactions.forEach((stockTransaction) => {
      const stockTransactionArray = [];
      stockTransactionArray.push(stockTransaction.id);
      stockTransactionArray.push(stockTransaction.stockId);
      stockTransactionArray.push(stockTransaction.stockDetailsId);
      stockTransactionArray.push(stockTransaction.receivedFrom);
      stockTransactionArray.push(stockTransaction.receivedQuantity);
      stockTransactionArray.push(stockTransaction.issuedTo);
      stockTransactionArray.push(stockTransaction.issuedQuantity);
      stockTransactionArray.push(stockTransaction.createdAt);
      stockTransactionArray.push(stockTransaction.createdBy);
      result.push(stockTransactionArray);
    });
    return result;
  }
}
