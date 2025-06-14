import type { Product } from "../../domain/entities/product";

function ProductDetailsModal({ product, onClose }: {
  product: Product;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-700 p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <p><strong>ID:</strong> {product.id}</p>
        <p><strong>Categoria:</strong> {product.category}</p>
        <p><strong>Quantidade:</strong> {product.quantity}</p>
        <p><strong>Preço:</strong> R$ {product.price.toFixed(2)}</p>
        <p><strong>Descrição:</strong> {product.description}</p>

        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-black text-white rounded">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsModal;
