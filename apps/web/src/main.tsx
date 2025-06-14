import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProductListPage from './presentation/pages/product-list/product-list'
import HeaderComponent from './presentation/components/header'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeaderComponent />
    <ProductListPage />
  </StrictMode>,
)
