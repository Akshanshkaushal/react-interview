import { useEffect, useState } from 'react';

/* Parent Component */
export default function App() {
  return (
    <div>
      <h2>Users List</h2>
      <Users />
    </div>
  );
}

/* Users Component */
function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function fetchUsers() {
      try {
        setLoading(true);

        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();

        // Cleanup check
        if (!ignore) {
          setUsers(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    /* Cleanup Function */
    return () => {
      ignore = true;
    };
  }, []);

  /* Loading State */
  if (loading) {
    return <p>Loading...</p>;
  }

  /* Error State */
  if (error) {
    return <p>Error: {error}</p>;
  }

  /* Success State */
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}