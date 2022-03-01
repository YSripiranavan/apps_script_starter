import { StockDetails } from '../model/StockDetails';
import Utils from '../server/Utils';

export default class StockDetailsMapper {
  static convertArrayToObject(stockDetails) {
    const result = [];
    stockDetails.forEach((stockDetail) => {
      if (stockDetail[0] !== '') {
        const stockDetailObject = new StockDetails(
          stockDetail[0],
          stockDetail[1],
          stockDetail[2],
          stockDetail[3],
          stockDetail[4],
          stockDetail[5],
          stockDetail[6],
          stockDetail[7],
          stockDetail[8] ? Utils.parseDate(stockDetail[8]) : '',
          stockDetail[9] ? Utils.parseDate(stockDetail[9]) : '',
          stockDetail[10],
          stockDetail[11]
        );
        result.push(stockDetailObject);
      }
    });
    return result;
  }

  static convertObjectToArray(stockDetails) {
    const result = [];
    stockDetails.forEach((stockDetail) => {
      const stockDetailArray = [];
      stockDetailArray.push(stockDetail.id);
      stockDetailArray.push(stockDetail.stockId);
      stockDetailArray.push(stockDetail.minimumStock);
      stockDetailArray.push(stockDetail.stockBalance);
      stockDetailArray.push(stockDetail.units);
      stockDetailArray.push(stockDetail.unitPrice);
      stockDetailArray.push(stockDetail.store);
      stockDetailArray.push(stockDetail.remarks);
      stockDetailArray.push(stockDetail.createdAt);
      stockDetailArray.push(stockDetail.updatedAt);
      stockDetailArray.push(stockDetail.createdBy);
      stockDetailArray.push(stockDetail.updatedBy);
      result.push(stockDetailArray);
    });
    return result;
  }
}
