import { useState } from 'react';
import type { ProductRequestModel } from '../../domain/usecases/add-product/interfaces/product-request-model';

interface Props {
  onClose: () => void;
  onSubmit: (data: ProductRequestModel) => void;
}

export function ProductFormModal({ onClose, onSubmit }: Props) {
  const [form, setForm] = useState<ProductRequestModel>({
    name: '',
    category: '',
    quantity: 1,
    price: 0,
    description: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value,
    }));
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-700 rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Cadastrar Produto</h2>

        <div className="space-y-3">
          <input name="name" placeholder="Nome" className="w-full border p-2" onChange={handleChange} />
          <input name="category" placeholder="Categoria" className="w-full border p-2" onChange={handleChange} />
          <input name="quantity" placeholder="Quantidade" type="number" className="w-full border p-2" onChange={handleChange} />
          <input name="price" placeholder="Preço" type="number" className="w-full border p-2" onChange={handleChange} />
          <textarea name="description" placeholder="Descrição" className="w-full border p-2" onChange={handleChange} />
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button className="text-gray-300" onClick={onClose}>Cancelar</button>
          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={() => onSubmit(form)}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
