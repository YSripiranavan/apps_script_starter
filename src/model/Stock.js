export class Stock {
  constructor(
    id,
    material,
    stockBook,
    stockBookReference,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy
  ) {
    this.id = id;
    this.material = material;
    this.stockBook = stockBook;
    this.stockBookReference = stockBookReference;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
