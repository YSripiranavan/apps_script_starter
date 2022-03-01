import StockDetailsMapper from '../utility/StockDetailsMapper';
import StockMapper from '../utility/StockMapper';
import StockTransactionsMapper from '../utility/StockTransactionsMapper';
import Utils from './Utils';

export default class DBOperations {
  // stock
  static getStocks() {
    try {
      const dbConnection = Utils.getStocksDBConnection();
      const rowNum = dbConnection.getLastRow();
      if (rowNum > 1) {
        const stocks = dbConnection
          .getRange(2, 1, rowNum, dbConnection.getLastColumn())
          .getDisplayValues();
        return stocks;
      }
      return [];
    } catch (error) {
      Logger.log(
        `Error occurred while fetching stocks in DBOperations: ${error}`
      );
      throw new Error(
        `Error occurred while fetching stocks in DBOperations: ${error}`
      );
    }
  }

  static getStockById(stockId) {
    try {
      const dbConnection = Utils.getStocksDBConnection();
      const rowNum = dbConnection.getLastRow();
      if (rowNum > 1) {
        const stocks = dbConnection
          .getRange(2, 1, rowNum, dbConnection.getLastColumn())
          .getDisplayValues();
        const convertedSP = StockMapper.convertArrayToObject(stocks);
        const filteredSP = convertedSP.filter((sp) => sp.id == stockId);
        return filteredSP;
      }
      return [];
    } catch (error) {
      Logger.log(
        `Error occurred while fetch stock by id in DBOperations: ${error}`
      );
      throw new Error(
        `Error occurred while fetch stock by id in DBOperations: ${error}`
      );
    }
  }

  static saveStock(stock) {
    try {
      const dbConnection = Utils.getStocksDBConnection();
      const res = dbConnection
        .getRange(
          dbConnection.getLastRow() + 1,
          1,
          1,
          dbConnection.getLastColumn()
        )
        .setValues(stock);
      return res;
    } catch (error) {
      Logger.log(`Error occurred while saving stock in DBOperations: ${error}`);
      throw new Error(
        `Error occurred while saving stock in DBOperations: ${error}`
      );
    }
  }

  static deleteStock(stockId) {
    try {
      const dbConnection = Utils.getStocksDBConnection();
      const rowNum = dbConnection.getLastRow();
      if (rowNum > 1) {
        // Check any transactions exists
        const dbConnectionTransactions =
          Utils.getStockTransactionsDBConnection();
        const rowNumTransactions = dbConnectionTransactions.getLastRow();
        if (rowNumTransactions > 1) {
          const resTransaction = dbConnectionTransactions
            .getRange(2, 1, rowNumTransactions, 10)
            .getDisplayValues();
          let countTransactions = 0;
          let numTransactions = 0;
          resTransaction.filter((r) => {
            countTransactions++;
            if (r[1].trim() == stockId) {
              dbConnectionTransactions.deleteRow(
                countTransactions + 1 - numTransactions
              );
              numTransactions++;
            }
          });
        }
        // Check any details exists
        const dbConnectionDetails = Utils.getStockDetailsDBConnection();
        const rowNumDetails = dbConnectionDetails.getLastRow();
        if (rowNumDetails > 1) {
          const resDetails = dbConnectionDetails
            .getRange(2, 1, rowNumDetails, 10)
            .getDisplayValues();
          let countDetails = 0;
          let numDetails = 0;
          resDetails.filter((r) => {
            countDetails++;
            if (r[1].trim() == stockId) {
              dbConnectionDetails.deleteRow(countDetails + 1 - numDetails);
              numDetails++;
            }
          });
        }
        // delete the stock
        const res = dbConnection.getRange(2, 1, rowNum, 8).getDisplayValues();
        let count = 0;
        let numCount = 0;
        let retVal = 'Failure';
        res.filter((r) => {
          count++;
          if (r[0].trim() == stockId) {
            dbConnection.deleteRow(count + 1 - numCount);
            numCount++;
            retVal = 'Success';
          }
        });
        return retVal;
      }
      return 'Failure';
    } catch (error) {
      Logger.log(
        `Error occurred while deleting stock in DBOperations: ${error}`
      );
      throw new Error(
        `Error occurred while deleting stock in DBOperations: ${error}`
      );
    }
  }

  // stock details
  static saveStockDetails(stockDetails) {
    try {
      const dbConnection = Utils.getStockDetailsDBConnection();
      const res = dbConnection
        .getRange(
          dbConnection.getLastRow() + 1,
          1,
          1,
          dbConnection.getLastColumn()
        )
        .setValues(stockDetails);
      return res;
    } catch (error) {
      Logger.log(
        `Error occurred while saving stock details in DBOperations: ${error}`
      );
      throw new Error(
        `Error occurred while saving stock details in DBOperations: ${error}`
      );
    }
  }

  static updateStockDetails(stockDetails) {
    try {
      const dbConnection = Utils.getStockDetailsDBConnection();
      const res = dbConnection
        .getRange(2, 1, dbConnection.getLastRow(), dbConnection.getLastColumn())
        .getDisplayValues();
      let count = 0;
      let retVal = 'Failure';
      res.filter((r) => {
        count++;
        if (r[0].trim() == stockDetails.id) {
          const outerArray = [stockDetails];
          const convertedSP =
            StockDetailsMapper.convertObjectToArray(outerArray);
          dbConnection.getRange(count + 1, 1, 1, 12).setValues(convertedSP);
          retVal = 'Success';
        }
      });
      return retVal;
    } catch (error) {
      Logger.log(
        `Error occurred while updating stock details in DBOperations: ${error}`
      );
      throw new Error(
        `Error occurred while updating stock details in DBOperations: ${error}`
      );
    }
  }

  static getStockDetails(stockId) {
    try {
      const dbConnection = Utils.getStockDetailsDBConnection();
      const rowNum = dbConnection.getLastRow();
      if (rowNum > 1) {
        const stockDetails = dbConnection
          .getRange(2, 1, rowNum, dbConnection.getLastColumn())
          .getDisplayValues();
        const convertedSP =
          StockDetailsMapper.convertArrayToObject(stockDetails);
        const filteredSP = convertedSP.filter((sp) => sp.stockId == stockId);
        return filteredSP;
      }
      return [];
    } catch (error) {
      Logger.log(
        `Error occurred while fetching stock details in DBOperations: ${error}`
      );
      throw new Error(
        `Error occurred while fetching stock details in DBOperations: ${error}`
      );
    }
  }

  static getStockDetailsById(stockDetailsId) {
    try {
      const dbConnection = Utils.getStockDetailsDBConnection();
      const rowNum = dbConnection.getLastRow();
      if (rowNum > 1) {
        const stockDetails = dbConnection
          .getRange(2, 1, rowNum, dbConnection.getLastColumn())
          .getDisplayValues();
        const convertedSP =
          StockDetailsMapper.convertArrayToObject(stockDetails);
        const filteredSP = convertedSP.filter((sp) => sp.id == stockDetailsId);
        return filteredSP;
      }
      return [];
    } catch (error) {
      Logger.log(
        `Error occurred while fetching stock details in DBOperations: ${error}`
      );
      throw new Error(
        `Error occurred while fetching stock details in DBOperations: ${error}`
      );
    }
  }

  static deleteStockDetails(stockId) {
    try {
      const dbConnection = Utils.getStockDetailsDBConnection();
      const rowNum = dbConnection.getLastRow();
      if (rowNum > 1) {
        const res = dbConnection.getRange(2, 1, rowNum, 10).getDisplayValues();
        let count = 0;
        let retVal = 'Failure';
        res.filter((r) => {
          count++;
          if (r[0].trim() == stockId) {
            dbConnection.deleteRow(count + 1);
            retVal = 'Success';
          }
        });
        return retVal;
      }
      return 'Failure';
    } catch (error) {
      Logger.log(
        `Error occurred while deleting stock details in DBOperations: ${error}`
      );
      throw new Error(
        `Error occurred while deleting stock details in DBOperations: ${error}`
      );
    }
  }

  // Stock Transactions
  static saveStockTransaction(
    stockTransaction,
    stockDetailsId,
    receivedQuantity,
    issuedQuantity
  ) {
    try {
      const dbConnection = Utils.getStockTransactionsDBConnection();
      const res = dbConnection
        .getRange(
          dbConnection.getLastRow() + 1,
          1,
          1,
          dbConnection.getLastColumn()
        )
        .setValues(stockTransaction);

      const stockDetails = DBOperations.getStockDetailsById(stockDetailsId);
      const stockDetailsObj = stockDetails[0];
      const stockDetailsBalance = parseInt(stockDetailsObj.stockBalance);
      const newStockDetailsBalance =
        (+stockDetailsBalance ? +stockDetailsBalance : 0) +
        (+receivedQuantity ? +receivedQuantity : 0) -
        (+issuedQuantity ? +issuedQuantity : 0);
      const stockDetailsObjNew = {
        ...stockDetailsObj,
        stockBalance: newStockDetailsBalance,
        updatedAt: Utils.getCurrentDate(),
        updatedBy: Utils.getCurrentUser(),
      };
      DBOperations.updateStockDetails(stockDetailsObjNew);
      return res;
    } catch (error) {
      Logger.log(
        `Error occurred while saving stock transaction in DBOperations: ${error}`
      );
      throw new Error(
        `Error occurred while saving stock transaction in DBOperations: ${error}`
      );
    }
  }

  static getStockTransactions(stockDetailsId) {
    try {
      const dbConnection = Utils.getStockTransactionsDBConnection();
      const rowNum = dbConnection.getLastRow();
      if (rowNum > 1) {
        const stockTransactions = dbConnection
          .getRange(2, 1, rowNum, dbConnection.getLastColumn())
          .getDisplayValues();
        const convertedST =
          StockTransactionsMapper.convertArrayToObject(stockTransactions);
        const filteredST = convertedST.filter(
          (st) => st.stockDetailsId == stockDetailsId
        );
        return filteredST;
      }
      return [];
    } catch (error) {
      Logger.log(
        `Error occurred while fetching stock transactions in DBOperations: ${error}`
      );
      throw new Error(
        `Error occurred while fetching stock transactions in DBOperations: ${error}`
      );
    }
  }

  static deleteStockTransaction(stockTransactionsId) {
    try {
      const dbConnection = Utils.getStockTransactionsDBConnection();
      const rowNum = dbConnection.getLastRow();
      if (rowNum > 1) {
        const res = dbConnection.getRange(2, 1, rowNum, 10).getDisplayValues();
        let count = 0;
        let retVal = 'Failure';
        res.filter((r) => {
          count++;
          if (r[0].trim() == stockTransactionsId) {
            dbConnection.deleteRow(count + 1);
            retVal = 'Success';
          }
        });
        return retVal;
      }
      return 'Failure';
    } catch (error) {
      Logger.log(
        `Error occurred while deleting stock transaction in DBOperations: ${error}`
      );
      throw new Error(
        `Error occurred while deleting stock transaction in DBOperations: ${error}`
      );
    }
  }
  // user
  static saveUser(user) {
    try {
      const dbConnection = Utils.getUsersDBConnection();
      const res = dbConnection
        .getRange(
          dbConnection.getLastRow() + 1,
          1,
          1,
          dbConnection.getLastColumn()
        )
        .setValues(user);
      // give permission to access the sheet
      Utils.giveEditPermissionToStockSheet(user[0][2]);
      return res;
    } catch (error) {
      Logger.log(`Error occurred while saving user in DBOperations: ${error}`);
      throw new Error(
        `Error occurred while saving user in DBOperations: ${error}`
      );
    }
  }

  static getUsers() {
    try {
      const dbConnection = Utils.getUsersDBConnection();
      const rowNum = dbConnection.getLastRow();
      if (rowNum > 1) {
        const users = dbConnection
          .getRange(2, 1, rowNum, dbConnection.getLastColumn())
          .getDisplayValues();
        return users;
      }
      return [];
    } catch (error) {
      Logger.log(
        `Error occurred while fetching users in DBOperations: ${error}`
      );
      throw new Error(
        `Error occurred while fetching users in DBOperations: ${error}`
      );
    }
  }

  static deleteUser(userId) {
    try {
      const dbConnection = Utils.getUsersDBConnection();
      const rowNum = dbConnection.getLastRow();
      if (rowNum > 1) {
        const res = dbConnection.getRange(2, 1, rowNum, 10).getDisplayValues();
        const user = res.filter((r) => r[0].trim() == userId);
        if (user.length > 0) {
          Utils.removeEditPermissionFromStockSheet(user[0][2]);
        }
        let count = 0;
        let retVal = 'Failure';
        res.filter((r) => {
          count++;
          if (r[0].trim() == userId) {
            dbConnection.deleteRow(count + 1);
            retVal = 'Success';
          }
        });
        return retVal;
      }
      return 'Failure';
    } catch (error) {
      Logger.log(
        `Error occurred while deleting user in DBOperations: ${error}`
      );
      throw new Error(
        `Error occurred while deleting user in DBOperations: ${error}`
      );
    }
  }
}
