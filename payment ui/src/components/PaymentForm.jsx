import CardInput from "./CardInput";

export default function PaymentForm({ method, formData, setFormData }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
      <h2 className="mb-3 text-xl font-semibold text-slate-900">Payment details</h2>
      <p className="text-sm text-slate-600">
        {method === "card"
          ? "Enter your card information to complete the checkout."
          : "Enter your UPI ID and confirm your payment."}
      </p>

      <div className="mt-6 space-y-4">
        {method === "card" ? (
          <CardInput formData={formData} setFormData={setFormData} />
        ) : (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              UPI ID
              <input
                value={formData.upiId}
                onChange={(event) =>
                  setFormData({ ...formData, upiId: event.target.value })
                }
                placeholder="example@okaxis"
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm input-focus"
              />
            </label>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Full name
            <input
              value={formData.name}
              onChange={(event) =>
                setFormData({ ...formData, name: event.target.value })
              }
              placeholder="Jhon Doe"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm input-focus"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Email address
            <input
              type="email"
              value={formData.email}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
              placeholder="hello@example.com"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm input-focus"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
