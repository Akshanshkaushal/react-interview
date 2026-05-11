import { useState } from 'react';

const PRODUCTS = ['Apple', 'Banana', 'Orange', 'Mango'];

/* Parent Component */
export default function App() {
  const [searchText, setSearchText] = useState('');

  return (
    <div>
      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
      />

      <ProductList
        products={PRODUCTS}
        searchText={searchText}
      />
    </div>
  );
}

/* Search Bar Component */
function SearchBar({ searchText, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search product..."
      value={searchText}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}

/* Product List Component */
function ProductList({ products, searchText }) {
  const filteredProducts = products.filter((product) =>
    product.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ul>
      {filteredProducts.map((product, index) => (
        <li key={index}>{product}</li>
      ))}
    </ul>
  );
}