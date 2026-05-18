import { useState, useCallback } from "react";
import { createPayment } from "../services/paymentApi";

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const pay = useCallback(async (payload) => {
    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      await createPayment(payload);

      setSuccess(true);
    } catch (err) {
      setError(err?.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    success,
    pay,
  };
};
