// “Virtualization improves performance by rendering only the visible items in the
//  viewport instead of rendering all rows in the DOM.

// npm install react-window
import { FixedSizeList as List } from "react-window";

function VirtualizedTable({ data }) {
  const Row = ({ index, style }) => {
    const item = data[index];

    return (
      <div
        style={style}
        className="flex border-b px-4 py-2"
      >
        <div className="w-24">{item.id}</div>

        <div className="w-48">{item.user}</div>

        <div>₹{item.amount}</div>
      </div>
    );
  };

  return (
    <List
      height={600}
      itemCount={data.length}
      itemSize={60}
      width={"100%"}
    >
      {Row}
    </List>
  );
}



// Pagination + Virtualization Together

// This is what real fintech dashboards do.

// Example:

// Backend sends 100 rows
// Virtualization renders only visible rows

import { useEffect, useState } from "react";

import { FixedSizeList as List } from "react-window";

const PAGE_SIZE = 100;

export default function App() {

  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  // Fetch Users
  async function fetchUsers() {

    try {

      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/users?page=${page}&limit=${PAGE_SIZE}`
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

  // Refetch when page changes
  useEffect(() => {
    fetchUsers();
  }, [page]);

  // Virtualized Row
  const Row = ({ index, style }) => {

    const user = users[index];

    if (!user) return null;

    return (
      <div
        style={{
          ...style, // VERY IMPORTANT
          borderBottom: "1px solid gray",
          padding: "10px",
        }}
      >
        <h3>{user.name}</h3>

        <p>{user.email}</p>
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Users Dashboard</h2>

      {/* Loading */}
      {loading ? (
        <p>Loading...</p>
      ) : (

        // Virtualized List
        <List
          height={500}
          itemCount={users.length}
          itemSize={80}
          width={"100%"}
        >
          {Row}
        </List>
      )}

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >

        {/* Prev */}
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

        {/* Next */}
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
