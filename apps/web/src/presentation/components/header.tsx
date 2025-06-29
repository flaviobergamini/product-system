function HeaderComponent() {
  return (
    <header className="bg-gray-900 shadow-md px-6 py-4 flex items-center gap-3">
      
      <svg 
        className="w-12 h-12 text-green-400" 
        fill="gray"
        width="800px" 
        height="800px" 
        viewBox="0 0 24 24" 
        id="_003_ECOMMERCE_03" 
        data-name="003_ECOMMERCE_03" 
        xmlns="http://www.w3.org/2000/svg">
        <title>003_085</title>
        <path d="M11,21H4a.99974.99974,0,0,1-1-1V4A.99974.99974,0,0,1,4,3H20a.99974.99974,0,0,1,1,1v7a1,1,0,0,1-2,0V5H5V19h6a1,1,0,0,1,0,2Z"/>
        <polygon points="10 4 10 10 12 8 14 10 14 4 10 4"/>
        <path d="M17,21a.99974.99974,0,0,1-1-1V14a1,1,0,0,1,2,0v6A.99974.99974,0,0,1,17,21Z"/>
        <path d="M20,18H14a1,1,0,0,1,0-2h6a1,1,0,0,1,0,2Z"/>
      </svg>     
      <h1 className="text-3x1 font-semibold text-white">Produtos</h1>
    </header>
  );
};

export default HeaderComponent;
