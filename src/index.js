import './server/web';
import Resource from './server/Resource';

const include = (File) => {
  return HtmlService.createHtmlOutputFromFile(File).getContent();
};
global.include = include;

// stocks
const getStocks = () => {
  try {
    return Resource.getStocks();
  } catch (error) {
    Logger.log(
      `Error occurred while fetching stocks in main Index file: ${error}`
    );
    throw new Error(
      `Error occurred while fetching stocks in main Index file: ${error}`
    );
  }
};
global.getStocks = getStocks;

const saveStock = (stock) => {
  try {
    return Resource.saveStock(stock);
  } catch (error) {
    Logger.log(
      `Error occurred while saving stock in main Index file: ${error}`
    );
    throw new Error(
      `Error occurred while saving stock in main Index file: ${error}`
    );
  }
};
global.saveStock = saveStock;

const deleteStock = (stockId) => {
  try {
    return Resource.deleteStock(stockId);
  } catch (error) {
    Logger.log(
      `Error occurred while deleting stock in main Index file: ${error}`
    );
    throw new Error(
      `Error occurred while deleting stock in main Index file: ${error}`
    );
  }
};
global.deleteStock = deleteStock;

// stock details
const getStockDetails = (stockId) => {
  try {
    return Resource.getStockDetails(stockId);
  } catch (error) {
    Logger.log(
      `Error occurred while fetching stock details in main Index file: ${error}`
    );
    throw new Error(
      `Error occurred while fetching stock details in main Index file: ${error}`
    );
  }
};
global.getStockDetails = getStockDetails;

const saveStockDetails = (stockDetails) => {
  try {
    return Resource.saveStockDetails(stockDetails);
  } catch (error) {
    Logger.log(
      `Error occurred while saving stock details in main Index file: ${error}`
    );
    throw new Error(
      `Error occurred while saving stock details in main Index file: ${error}`
    );
  }
};
global.saveStockDetails = saveStockDetails;

const deleteStockDetails = (stockDetailsId) => {
  try {
    return Resource.deleteStockDetails(stockDetailsId);
  } catch (error) {
    Logger.log(
      `Error occurred while deleting stock details in main Index file: ${error}`
    );
    throw new Error(
      `Error occurred while deleting stock details in main Index file: ${error}`
    );
  }
};
global.deleteStockDetails = deleteStockDetails;

// Stock Transactions
const getStockTransactions = (stockDetailsId) => {
  try {
    return Resource.getStockTransactions(stockDetailsId);
  } catch (error) {
    Logger.log(
      `Error occurred while fetching stock transactions in main Index file: ${error}`
    );
    throw new Error(
      `Error occurred while fetching stock transactions in main Index file: ${error}`
    );
  }
};
global.getStockTransactions = getStockTransactions;

const saveStockTransaction = (stockTransaction) => {
  try {
    return Resource.saveStockTransaction(stockTransaction);
  } catch (error) {
    Logger.log(
      `Error occurred while saving stock transaction in main Index file: ${error}`
    );
    throw new Error(
      `Error occurred while saving stock transaction in main Index file: ${error}`
    );
  }
};
global.saveStockTransaction = saveStockTransaction;

const deleteStockTransaction = (stockTransactionId) => {
  try {
    return Resource.deleteStockTransaction(stockTransactionId);
  } catch (error) {
    Logger.log(
      `Error occurred while deleting stock transaction in main Index file: ${error}`
    );
    throw new Error(
      `Error occurred while deleting stock transaction in main Index file: ${error}`
    );
  }
};
global.deleteStockTransaction = deleteStockTransaction;

// User
const getUsers = () => {
  try {
    return Resource.getUsers();
  } catch (error) {
    Logger.log(
      `Error occurred while fetching users in main Index file: ${error}`
    );
    throw new Error(
      `Error occurred while fetching users in main Index file: ${error}`
    );
  }
};
global.getUsers = getUsers;

const getCurrentUser = () => {
  try {
    return Resource.getCurrentUser();
  } catch (error) {
    Logger.log(
      `Error occurred while fetching current user in main Index file: ${error}`
    );
    throw new Error(
      `Error occurred while fetching current user in main Index file: ${error}`
    );
  }
};
global.getCurrentUser = getCurrentUser;

const giveEditPermissionToStockSheet = (userEmail) => {
  try {
    return Resource.giveEditPermissionToStockSheet(userEmail);
  } catch (error) {
    Logger.log(
      `Error occurred while giving edit permission to stock sheet in main Index file: ${error}`
    );
    throw new Error(
      `Error occurred while giving edit permission to stock sheet in main Index file: ${error}`
    );
  }
};
global.giveEditPermissionToStockSheet = giveEditPermissionToStockSheet;

const saveUser = (user) => {
  try {
    return Resource.saveUser(user);
  } catch (error) {
    Logger.log(`Error occurred while saving user in main Index file: ${error}`);
    throw new Error(
      `Error occurred while saving user in main Index file: ${error}`
    );
  }
};
global.saveUser = saveUser;

const deleteUser = (userId) => {
  try {
    return Resource.deleteUser(userId);
  } catch (error) {
    Logger.log(
      `Error occurred while deleting user in main Index file: ${error}`
    );
    throw new Error(
      `Error occurred while deleting user in main Index file: ${error}`
    );
  }
};
global.deleteUser = deleteUser;
