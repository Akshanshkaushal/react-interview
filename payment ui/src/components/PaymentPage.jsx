import { useState } from "react";
import PaymentMethods from "./PaymentMethods";
import PaymentForm from "./PaymentForm";
import PaymentSummary from "./PaymentSummary";
import { usePayment } from "../hooks/usePayment";

const initialCardState = {
  name: "",
  email: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
  upiId: "",
};

export default function PaymentPage() {
  const [method, setMethod] = useState("card");
  const [amount] = useState(499);
  const [formData, setFormData] = useState(initialCardState);
  const { loading, error, success, pay } = usePayment();

  const handlePay = async () => {
    await pay({
      amount,
      method,
      details: formData,
    });
  };

  return (
    <section className="overflow-hidden rounded-3xl bg-white p-6 shadow-soft sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-indigo-50 px-5 py-4 text-sm text-slate-700 sm:px-6">
            <span className="font-medium">Selected amount</span>
            <span className="rounded-full bg-white px-3 py-1 text-slate-900 shadow">₹{amount}</span>
          </div>

          <PaymentMethods method={method} setMethod={setMethod} />

          <PaymentForm
            method={method}
            formData={formData}
            setFormData={setFormData}
          />

          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            disabled={loading}
            onClick={handlePay}
          >
            {loading ? "Processing payment..." : "Pay Now"}
          </button>

          {error && (
            <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </p>
          )}

          {success && (
            <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Payment Successful ✅ Your order is confirmed.
            </p>
          )}
        </div>

        <PaymentSummary method={method} amount={amount} formData={formData} />
      </div>
    </section>
  );
}
