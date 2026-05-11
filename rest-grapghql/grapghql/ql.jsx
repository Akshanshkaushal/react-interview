import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.example.com/graphql",
  cache: new InMemoryCache(),
});

import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query {
    user(id: 1) {
      name
      email
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div>
      <h1>{data.user.name}</h1>
      <p>{data.user.email}</p>
    </div>
  );
}

export default App;