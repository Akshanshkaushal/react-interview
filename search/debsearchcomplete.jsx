import { useEffect, useState } from 'react';

const PRODUCTS = [
  'Apple',
  'Banana',
  'Orange',
  'Mango',
  'Pineapple',
  'Grapes',
  'Watermelon',
];

/* Parent Component */
export default function App() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] =
    useState('');

  /* Debouncing Logic */
  useEffect(() => {
    // Start timer
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    /* Cleanup */
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <div>
      <h2>Debounced Product Search</h2>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <ProductList
        products={PRODUCTS}
        debouncedSearch={debouncedSearch}
      />
    </div>
  );
}

/* Search Bar Component */
function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />
  );
}

/* Product List Component */
function ProductList({
  products,
  debouncedSearch,
}) {
  const filteredProducts = products.filter(
    (product) =>
      product
        .toLowerCase()
        .includes(
          debouncedSearch.toLowerCase()
        )
  );

  return (
    <div>
      <p>
        Searching for: {debouncedSearch}
      </p>

      <ul>
        {filteredProducts.map((product, index) => (
          <li key={index}>{product}</li>
        ))}
      </ul>
    </div>
  );
}