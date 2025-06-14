import type { Product } from "../../domain/entities/product";

function ProductCard({ product, onClick, innerRef, categoryCount}: {
  product: Product;
  categoryCount: number;
  onClick: () => void;
  innerRef?: (node: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={innerRef}
      onClick={onClick}
      className="border rounded p-4 shadow-sm bg-gray-700 cursor-pointer hover:bg-gray-600 transition"
    >
      <p className="text-sm text-gray-400">ID: {product.id}</p>
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-sm">Categoria: {product.category}</p>
      <p className="text-sm font-medium">Preço: R$ {product.price.toFixed(2)}</p>
      <p className="text-sm font-semibold text-gray-300">Quantidade disponível: {product.quantity}</p>
      <p className="text-sm font-semibold text-gray-300">Quantidade disponível por categoria: {categoryCount}</p>
    </div>
  );
}

export default ProductCard;
