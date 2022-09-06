export class Product {
  id: number | null;
  name: string;
  price: number;
  provider: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number | null, name: string, price: number, provider: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.provider = provider;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromApi(args: any): Product {
    return new Product(
      Number(args['id']),
      args['name'],
      Number(args['price']),
      args['provider'],
      new Date(args['createdAt']),
      new Date(args['updatedAt']),
    );
  }

  static empty(): Product{
    return new Product(
      null,
      "",
      0,
      "",
      new Date(),
      new Date()
    );
  }
}
