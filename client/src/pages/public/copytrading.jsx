import NavBar from "../../components/public/navbar";

export default function CopyTrading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-gray-100 text-gray-800">
      <NavBar />

      {/* Copy Trading Section */}
      <section className="text-center px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
          Copy <span className="text-yellow-500">Trading</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
          Trade Smarter by Following Experts at ROLLFX.
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
          <span className="font-bold">Copy Trading</span> is a powerful strategy that allows you to automatically
          replicate the trades of experienced and successful traders in real time. Rather than navigating the markets
          alone, you benefit from the insights, expertise, and trading decisions of professionals — helping you
          learn and grow as you earn. It’s ideal for beginners or those with limited time to analyze the market.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ROLLFX. All rights reserved.
      </footer>
    </div>
  );
}
