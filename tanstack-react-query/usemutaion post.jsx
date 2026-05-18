// useMutation (POST/DELETE/UPDATE)

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const addTodo = async (todo) => {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  return res.json();
};

export default function AddTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTodo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  return (
    <button
      onClick={() =>
        mutation.mutate({
          title: "Learn React Query",
        })
      }
    >
      Add Todo
    </button>
  );
}