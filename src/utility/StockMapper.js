import { Stock } from '../model/Stock';
import Utils from '../server/Utils';

export default class StockMapper {
  static convertArrayToObject(stocks) {
    const result = [];
    stocks.forEach((stock) => {
      if (stock[0] !== '') {
        const stockObject = new Stock(
          stock[0],
          stock[1],
          stock[2],
          stock[3],
          stock[4] ? Utils.parseDate(stock[4]) : '',
          stock[5] ? Utils.parseDate(stock[5]) : '',
          stock[6],
          stock[7]
        );
        result.push(stockObject);
      }
    });
    return result;
  }

  static convertObjectToArray(stocks) {
    const result = [];
    stocks.forEach((stock) => {
      const stockArray = [];
      stockArray.push(stock.id);
      stockArray.push(stock.material);
      stockArray.push(stock.stockBook);
      stockArray.push(stock.stockBookReference);
      stockArray.push(stock.createdAt);
      stockArray.push(stock.updatedAt);
      stockArray.push(stock.createdBy);
      stockArray.push(stock.updatedBy);
      result.push(stockArray);
    });
    return result;
  }
}
