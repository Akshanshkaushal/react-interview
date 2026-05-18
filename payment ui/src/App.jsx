import PaymentPage from "./components/PaymentPage";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">
            Frontend Interview Demo
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Payment UI with Tailwind
          </h1>
          <p className="mt-3 text-slate-600 sm:text-base">
            A clean, responsive checkout flow with card and UPI support.
          </p>
        </header>

        <PaymentPage />
      </div>
    </div>
  );
}
