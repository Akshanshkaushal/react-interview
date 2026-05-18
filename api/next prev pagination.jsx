import { useEffect, useState } from "react";

export default function App() {

  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  // Fetch Users
  async function fetchUsers() {

    try {

      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/users?page=${page}&limit=10`
      );

      const result = await response.json();

      setUsers(result.data);

      setTotalPages(result.totalPages);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  }

  // Fetch when page changes
  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <div style={{ padding: "20px" }}>

      <h2>Users List</h2>

      {/* Loading */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid black",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <h3>{user.name}</h3>

            <p>{user.email}</p>
          </div>
        ))
      )}

      {/* Pagination Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >

        {/* Prev Button */}
        <button
          disabled={page === 1}
          onClick={() =>
            setPage((prev) => prev - 1)
          }
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          disabled={page === totalPages}
          onClick={() =>
            setPage((prev) => prev + 1)
          }
        >
          Next
        </button>

      </div>
    </div>
  );
}