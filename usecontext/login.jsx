const AuthContext = createContext();

function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}


// Usage
const { user } = useContext(AuthContext);





const CartContext = createContext();

function CartProvider({ children }) {

  const [cart, setCart] = useState([]);

  function addItem(item) {
    setCart([...cart, item]);
  }

  return (
    <CartContext.Provider value={{ cart, addItem }}>
      {children}
    </CartContext.Provider>
  );
}


// Usage
const { cart, addItem } = useContext(CartContext);


// Create
const MyContext = createContext();

// Provide
<MyContext.Provider value={data}>
   <App />
</MyContext.Provider>

// Consume
const data = useContext(MyContext);