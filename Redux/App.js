import { useSelector, useDispatch } from "react-redux";

import { increment, decrement } from "./features/counter/counterSlice";

export default function App() {

  // Read state
  const count = useSelector((state) => state.counter.value);

  // Dispatch actions
  const dispatch = useDispatch();

  return (
    <div>

      <h1>{count}</h1>

      <button onClick={() => dispatch(increment())}>
        +
      </button>

      <button onClick={() => dispatch(decrement())}>
        -
      </button>

    </div>
  );
}