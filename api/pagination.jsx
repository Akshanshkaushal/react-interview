import { useEffect, useState } from 'react';

/* Parent Component */
export default function App() {
  return (
    <div>
      <h2>Infinite Scroll Users</h2>
      <UsersList />
    </div>
  );
}

function UsersList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  /* Fetch Users */
  async function fetchUsers() {
    try {
      setLoading(true);

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=3`
      );

      const data = await response.json();

      // If no data left
      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      // Append new users
      setUsers((prevUsers) => [
        ...prevUsers,
        ...data,
      ]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  /* Fetch whenever page changes */
  useEffect(() => {
    fetchUsers();
  }, [page]);

  /* Scroll Event */
  useEffect(() => {
    function handleScroll() {
      const bottomReached =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100;

      // Load next page
      if (bottomReached && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    }

    window.addEventListener('scroll', handleScroll);

    /* Cleanup */
    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );
    };
  }, [loading, hasMore]);

  return (
    <div>
      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: '1px solid black',
            margin: '10px',
            padding: '10px',
          }}
        >
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}

      {loading && <p>Loading more users...</p>}

      {!hasMore && <p>No more users</p>}
    </div>
  );
}