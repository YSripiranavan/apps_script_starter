const DBID = '1cvMUeNeigc9r3WuX8VnKz4quQjh_jicUsdFe8PkISv8';
const STOCKS_SHEETS_NAME = 'Stocks';
const STOCK_DETAILS_SHEETS_NAME = 'Stock Details';
const STOCK_TRANSACTIONS_SHEETS_NAME = 'Stock Transactions';
const USERS_SHEETS_NAME = 'Users';

const TIME_ZONE = 'Asia/Colombo';
const DATE_FORMAT = 'MM/dd/yyyy HH:mm:ss';
export default class Utils {
  static getUniqueId() {
    // use the current time and a random number to generate a unique id
    return new Date().getTime() + Math.random();
  }

  static parseDate(dateString) {
    const date = Utilities.formatDate(
      new Date(dateString),
      TIME_ZONE,
      DATE_FORMAT
    );
    return date;
  }

  static getStocksDBConnection() {
    return SpreadsheetApp.openById(DBID).getSheetByName(STOCKS_SHEETS_NAME);
  }

  static getStockDetailsDBConnection() {
    return SpreadsheetApp.openById(DBID).getSheetByName(
      STOCK_DETAILS_SHEETS_NAME
    );
  }

  static getStockTransactionsDBConnection() {
    return SpreadsheetApp.openById(DBID).getSheetByName(
      STOCK_TRANSACTIONS_SHEETS_NAME
    );
  }

  static getUsersDBConnection() {
    return SpreadsheetApp.openById(DBID).getSheetByName(USERS_SHEETS_NAME);
  }

  static getCurrentDate() {
    const date = Utilities.formatDate(new Date(), TIME_ZONE, DATE_FORMAT);
    return date;
  }

  static getCurrentUser() {
    const user = Session.getEffectiveUser().getEmail();
    return user;
  }

  static giveEditPermissionToStockSheet(userEmail) {
    const sheet = SpreadsheetApp.openById(DBID);
    sheet.addEditor(userEmail);
  }

  static removeEditPermissionFromStockSheet(userEmail) {
    const sheet = SpreadsheetApp.openById(DBID);
    sheet.removeEditor(userEmail);
  }
}
