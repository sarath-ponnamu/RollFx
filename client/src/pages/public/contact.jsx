import NavBar from "../../components/public/navbar";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-gray-100 text-gray-800">
      <NavBar />

      {/* Contact Section */}
      <section className="text-center px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
          Contact <span className="text-yellow-500">Us</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
          Reach Out to the ROLLFX Team.
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed mb-8">
          We'd love to hear from you! For any questions, support, or business inquiries,
          feel free to reach out to us at the email below.
        </p>

        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
          <p className="text-lg md:text-xl text-gray-700 font-semibold">
            📧 Email:{" "}
            <a
              href="mailto:info.rollfx@gmail.com"
              className="text-blue-600 hover:underline"
            >
              info.rollfx@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ROLLFX. All rights reserved.
      </footer>
    </div>
  );
}
