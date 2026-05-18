export default function PaymentSummary({ method, amount, formData }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:sticky sm:top-8">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Order summary</h2>
      <div className="space-y-4 text-sm text-slate-700">
        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <p className="text-slate-500">Amount</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">₹{amount}</p>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <p className="text-slate-500">Payment type</p>
          <p className="mt-1 font-medium text-slate-900">{method === "card" ? "Card" : "UPI"}</p>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <p className="text-slate-500">Payer</p>
          <p className="mt-1 text-slate-900">
            {formData.name || "Guest user"}
          </p>
          <p className="text-slate-500">{formData.email || "No email provided"}</p>
        </div>

        {method === "upi" && (
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <p className="text-slate-500">UPI ID</p>
            <p className="mt-1 font-medium text-slate-900">{formData.upiId || "Not entered"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
