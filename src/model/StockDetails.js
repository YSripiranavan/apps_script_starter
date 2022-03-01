export class StockDetails {
  constructor(
    id,
    stockId,
    minimumStock,
    stockBalance,
    units,
    unitPrice,
    store,
    remarks,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy
  ) {
    this.id = id;
    this.stockId = stockId;
    this.minimumStock = minimumStock;
    this.stockBalance = stockBalance;
    this.units = units;
    this.unitPrice = unitPrice;
    this.store = store;
    this.remarks = remarks;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
