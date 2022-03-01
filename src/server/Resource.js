import UserMapper from '../utility/UserMapper';
import DBOperations from './dbOperations';
import StockMapper from '../utility/StockMapper';
import Utils from './Utils';
import StockDetailsMapper from '../utility/StockDetailsMapper';
import StockTransactionsMapper from '../utility/StockTransactionsMapper';

export default class Resource {
  // stock
  static getStocks() {
    try {
      const stocks = DBOperations.getStocks();
      const convertedSP = StockMapper.convertArrayToObject(stocks);
      return convertedSP;
    } catch (error) {
      Logger.log(`Error occurred while fetching stocks in Resource: ${error}`);
      throw new Error(
        `Error occurred while fetching stocks in Resource: ${error}`
      );
    }
  }

  static saveStock(stock) {
    try {
      const outerArray = [
        {
          ...stock,
          id: Utils.getUniqueId(),
          createdAt: Utils.getCurrentDate(),
          updatedAt: Utils.getCurrentDate(),
          createdBy: Utils.getCurrentUser(),
          updatedBy: Utils.getCurrentUser(),
        },
      ];
      const convertedSP = StockMapper.convertObjectToArray(outerArray);
      const res = DBOperations.saveStock(convertedSP);
      if (res.length > 0) {
        return 'Success';
      }
      return 'Failure';
    } catch (error) {
      Logger.log(`Error occurred while saving stock in Resource: ${error}`);
      throw new Error(
        `Error occurred while saving stock in Resource: ${error}`
      );
    }
  }

  static deleteStock(stockId) {
    try {
      DBOperations.deleteStock(stockId);
      const stocks = DBOperations.getStocks();
      const convertedSP = StockMapper.convertArrayToObject(stocks);
      return convertedSP;
    } catch (error) {
      Logger.log(`Error occurred while deleting stock in Resource: ${error}`);
      throw new Error(
        `Error occurred while deleting stock in Resource: ${error}`
      );
    }
  }

  // stock details
  static getStockDetails(stockId) {
    try {
      return DBOperations.getStockDetails(stockId);
    } catch (error) {
      Logger.log(
        `Error occurred while fetching stock details in Resource: ${error}`
      );
      throw new Error(
        `Error occurred while fetching stock details in Resource: ${error}`
      );
    }
  }

  static saveStockDetails(stockDetails) {
    try {
      const outerArray = [
        {
          ...stockDetails,
          id: Utils.getUniqueId(),
          stockBalance: 0,
          createdAt: Utils.getCurrentDate(),
          updatedAt: Utils.getCurrentDate(),
          createdBy: Utils.getCurrentUser(),
          updatedBy: Utils.getCurrentUser(),
        },
      ];
      const stockId = stockDetails.stockId;
      const stock = DBOperations.getStockById(stockId);
      if (stock.length > 0) {
        const convertedSP = StockDetailsMapper.convertObjectToArray(outerArray);
        const res = DBOperations.saveStockDetails(convertedSP);
        return {
          message: 'Success',
          stockId: stockId,
          material: stock[0].material,
        };
      } else {
        return {
          message: 'Failed',
        };
      }
    } catch (error) {
      Logger.log(
        `Error occurred while saving stock details in Resource: ${error}`
      );
      throw new Error(
        `Error occurred while saving stock details in Resource: ${error}`
      );
    }
  }

  static deleteStockDetails(stockDetailsId) {
    try {
      return DBOperations.deleteStockDetails(stockDetailsId);
    } catch (error) {
      Logger.log(
        `Error occurred while deleting stock details in Resource: ${error}`
      );
      throw new Error(
        `Error occurred while deleting stock details in Resource: ${error}`
      );
    }
  }

  // Stock Transactions
  static getStockTransactions(stockDetailsId) {
    try {
      return DBOperations.getStockTransactions(stockDetailsId);
    } catch (error) {
      Logger.log(
        `Error occurred while fetching stock transactions in Resource: ${error}`
      );
      throw new Error(
        `Error occurred while fetching stock transactions in Resource: ${error}`
      );
    }
  }

  static saveStockTransaction(stockTransaction) {
    try {
      const stockDetailsId = stockTransaction.stockDetailsId;
      const receivedQuantity = parseInt(stockTransaction.receivedQuantity);
      const issuedQuantity = parseInt(stockTransaction.issuedQuantity);
      const stockId = stockTransaction.stockId;
      const materialName = stockTransaction.materialName;
      // from the stockTransaction object remove materialName
      delete stockTransaction.materialName;
      const outerArray = [
        {
          ...stockTransaction,
          id: Utils.getUniqueId(),
          createdAt: Utils.getCurrentDate(),
          createdBy: Utils.getCurrentUser(),
        },
      ];
      const convertedSP =
        StockTransactionsMapper.convertObjectToArray(outerArray);
      const res = DBOperations.saveStockTransaction(
        convertedSP,
        stockDetailsId,
        receivedQuantity,
        issuedQuantity
      );
      return {
        message: 'success',
        stockId: stockId,
        materialName: materialName,
      };
    } catch (error) {
      Logger.log(
        `Error occurred while saving stock transaction in Resource: ${error}`
      );
      throw new Error(
        `Error occurred while saving stock transaction in Resource: ${error}`
      );
    }
  }

  static deleteStockTransaction(stockTransactionId) {
    try {
      return DBOperations.deleteStockTransaction(stockTransactionId);
    } catch (error) {
      Logger.log(
        `Error occurred while deleting stock transaction in Resource: ${error}`
      );
      throw new Error(
        `Error occurred while deleting stock transaction in Resource: ${error}`
      );
    }
  }

  // user
  static getUsers() {
    try {
      const users = DBOperations.getUsers();
      const convertedSP = UserMapper.convertArrayToObject(users);
      return convertedSP;
    } catch (error) {
      Logger.log(`Error occurred while fetching users in Resource: ${error}`);
      throw new Error(
        `Error occurred while fetching users in Resource: ${error}`
      );
    }
  }

  static getCurrentUser() {
    try {
      const currentUser = Utils.getCurrentUser();
      return currentUser;
    } catch (error) {
      Logger.log(
        `Error occurred while fetching current user in Resource: ${error}`
      );
      throw new Error(
        `Error occurred while fetching current user in Resource: ${error}`
      );
    }
  }

  static giveEditPermissionToStockSheet(userEmail) {
    try {
      return Utils.giveEditPermissionToStockSheet(userEmail);
    } catch (error) {
      Logger.log(
        `Error occurred while giving edit permission to stock sheet in Resource: ${error}`
      );
      throw new Error(
        `Error occurred while giving edit permission to stock sheet in Resource: ${error}`
      );
    }
  }

  static saveUser(user) {
    try {
      const outerArray = [
        {
          ...user,
          id: Utils.getUniqueId(),
          role: 'editor',
          createdAt: Utils.getCurrentDate(),
        },
      ];
      const convertedSP = UserMapper.convertObjectToArray(outerArray);
      const res = DBOperations.saveUser(convertedSP);
      if (res.length > 0) {
        return 'Success';
      }
      return 'Failure';
    } catch (error) {
      Logger.log(`Error occurred while saving user in Resource: ${error}`);
      throw new Error(`Error occurred while saving user in Resource: ${error}`);
    }
  }

  static deleteUser(userId) {
    try {
      DBOperations.deleteUser(userId);
      const users = DBOperations.getUsers();
      const convertedSP = UserMapper.convertArrayToObject(users);
      return convertedSP;
    } catch (error) {
      Logger.log(`Error occurred while deleting user in Resource: ${error}`);
      throw new Error(
        `Error occurred while deleting user in Resource: ${error}`
      );
    }
  }
}
