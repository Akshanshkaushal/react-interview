export default function CardInput({ formData, setFormData }) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-700">
        Card number
        <input
          value={formData.cardNumber}
          onChange={(event) =>
            setFormData({ ...formData, cardNumber: event.target.value })
          }
          placeholder="1234 5678 9012 3456"
          inputMode="numeric"
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm input-focus"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Expiry date
          <input
            value={formData.expiry}
            onChange={(event) =>
              setFormData({ ...formData, expiry: event.target.value })
            }
            placeholder="MM/YY"
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm input-focus"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          CVC
          <input
            value={formData.cvc}
            onChange={(event) =>
              setFormData({ ...formData, cvc: event.target.value })
            }
            placeholder="123"
            inputMode="numeric"
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm input-focus"
          />
        </label>
      </div>
    </div>
  );
}
