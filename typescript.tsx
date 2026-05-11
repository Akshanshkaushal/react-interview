import { useState } from "react";

/* 1. Define Types */
interface User {
  id: number;
  name: string;
}

/* 2. Props Type */
interface Props {
  title: string;
}

function App({ title }: Props) {
  /* 3. State Type */
  const [user, setUser] = useState<User | null>(null);

  /* 4. Event Type */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(e.target.value);
  };

  /* 5. Example Function */
  const getUser = (): User => {
    return {
      id: 1,
      name: "Akshansh",
    };
  };

  return (
    <div>
      <h1>{title}</h1>

      <input onChange={handleChange} />

      <button onClick={() => setUser(getUser())}>
        Load User
      </button>

      <p>{user?.name}</p>
    </div>
  );
}

export default App;