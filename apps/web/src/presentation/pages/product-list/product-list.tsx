import { useEffect, useState, useRef, useCallback } from "react";
import { ListProductsUseCase } from "../../../domain/usecases/list-products/list-product-use-case";
import { ProductHttpService } from "../../../infrastructure/services/product-http-service";
import type { Product } from "../../../domain/entities/product";
import { ProductFormModal } from "../../components/product-form";
import type { ProductRequestModel } from "../../../domain/usecases/add-product/interfaces/product-request-model";
import { AddProductUseCase } from "../../../domain/usecases/add-product/add-product-use-case";
import ProductCard from "../../components/product-card";
import ProductDetailsModal from "../../components/product-details-modal";
import { ProductWebSocketService } from "../../../infrastructure/services/product-web-socket-service";

const productService = new ProductHttpService();
const socketService = new ProductWebSocketService();
const listProductsUseCase = new ListProductsUseCase(productService);
const addProductUseCase = new AddProductUseCase(productService);

function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const loadProducts = useCallback(async () => {
    const res = await listProductsUseCase.execute({ page, category });

    if (page === 1) {
      setProducts(res.data);
    } else {
      setProducts((prev) => [...prev, ...res.data]);
    }

    setHasMore(res.data.length > 0);
  }, [page, category]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    socketService.onNewProduct((newProduct) => {
      setProducts((prev) => {
        const exists = prev.some(p => p.id === newProduct.id);
        if (exists) return prev;
        return [newProduct, ...prev];
      });
    });
  }, []);

  const handleSearch = () => {
    const normalizedInput = inputValue.trim().toLowerCase();

    if (normalizedInput !== category) {
      setProducts([]);
      setPage(1);
      setCategory(normalizedInput);
    }
  };

  async function handleProductCreate(data: ProductRequestModel) {
    await addProductUseCase.execute(data);
    
    setShowModal(false);
    setCategory('');
    setInputValue('');
    setPage(1);

    await loadProducts();
  }

  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const categoryCounts = products.reduce((productList, product) => {
    productList[product.category] = (productList[product.category] || 0) + 1;

    return productList;
  }, {} as Record<string, number>);

  return (
    <div className="w-full min-h-screen p-4 bg-gray-800 text-white">
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por categoria..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full sm:w-auto flex-1 border border-gray-300 rounded px-4 py-2"/>
        <button
          onClick={handleSearch}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
          Pesquisar
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Cadastrar Produto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {products.map((p, i) => (
          <ProductCard
            key={p.id}
            product={p}
            categoryCount={categoryCounts[p.category] || 0}
            innerRef={i === products.length - 1 ? lastProductRef : undefined}
            onClick={() => setSelectedProduct(p)}/>
        ))}
      </div>

        {showModal && (
        <ProductFormModal
          onClose={() => setShowModal(false)}
          onSubmit={handleProductCreate}/>
      )}

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}/>
      )}
    </div>
  );
}

export default ProductListPage;
