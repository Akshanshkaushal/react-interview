import { memo } from "react";

const PaymentMethods = memo(({ method, setMethod }) => {
  return (
    <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-slate-900">Payment method</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { value: "card", label: "Card" },
          { value: "upi", label: "UPI" },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
              method === option.value
                ? "border-indigo-600 bg-indigo-600 text-white shadow"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"
            }`}
            onClick={() => setMethod(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
});

export default PaymentMethods;
