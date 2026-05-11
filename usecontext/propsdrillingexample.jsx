function App() {
  const data = "Hello";

  return <Parent data={data} />;
}

function Parent({ data }) {
  return <Child data={data} />;
}

function Child({ data }) {
  return <h1>{data}</h1>;
}