export class Product {
  constructor(
    public readonly id: string,
    public name: string,
    public category: string,
    public quantity: number,
    public price: number,
    public description: string,
  ) {}
}
