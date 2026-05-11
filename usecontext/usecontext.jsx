import { createContext, useContext } from "react";

// 1. Create Context
const MyContext = createContext();

function App() {

  const data = "Hello";

  return (
    // 2. Provide Data
    <MyContext.Provider value={data}>
      <Parent />
    </MyContext.Provider>
  );
}

function Parent() {

  // No need to receive or pass props
  return <Child />;
}

function Child() {

  // 3. Consume Context directly
  const data = useContext(MyContext);

  return <h1>{data}</h1>;
}

export default App;