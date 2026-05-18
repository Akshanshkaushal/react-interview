export const createPayment = async (payload) => {
  const res = await fetch("/api/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Payment Failed");
  }

  return res.json();
};
