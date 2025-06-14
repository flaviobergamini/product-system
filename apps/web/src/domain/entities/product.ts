export class Product {
    constructor (
        public readonly id: string,
        public readonly name: string,
        public readonly category: string,
        public readonly quantity: number,
        public readonly price: number,
        public readonly description: string,
    ) {}
}
