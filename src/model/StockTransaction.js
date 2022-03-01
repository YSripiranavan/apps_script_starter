export class StockTransaction {
  constructor(
    id,
    stockId,
    stockDetailsId,
    receivedFrom,
    receivedQuantity,
    issuedTo,
    issuedQuantity,
    createdAt,
    createdBy
  ) {
    this.id = id;
    this.stockId = stockId;
    this.stockDetailsId = stockDetailsId;
    this.receivedFrom = receivedFrom;
    this.receivedQuantity = receivedQuantity;
    this.issuedTo = issuedTo;
    this.issuedQuantity = issuedQuantity;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }
}
