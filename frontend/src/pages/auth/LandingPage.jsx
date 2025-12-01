export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-white text-gray-900">

      {/* HERO */}
      <section className="px-8 md:px-24 pt-28 pb-32">
        <div className="max-w-6xl mx-auto">
          
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8">
            Home services,  
            <span className="block bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              delivered with trust.
            </span>
          </h1>

          <p className="text-xl text-gray-700 max-w-xl leading-relaxed mb-12">
            Book verified, highly rated professionals for cleaning, AC repair, 
            plumbing, electrical work and more — all with transparent pricing 
            and instant scheduling.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex gap-5">
            <a href="/signup">
              <button className="px-8 py-3 bg-teal-600 text-white rounded-xl text-lg font-semibold 
                                 hover:bg-teal-700 transition shadow-lg active:scale-95">
                Get Started
              </button>
            </a>

            <a href="/login">
              <button className="px-8 py-3 bg-white border border-gray-300 rounded-xl text-lg font-semibold 
                                 hover:bg-gray-100 transition active:scale-95 shadow">
                Login
              </button>
            </a>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="px-8 md:px-24 pb-32">
        <h2 className="text-4xl font-bold text-center mb-20">
          Why people choose <span className="text-teal-600">FieldTrust</span>
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

          <div className="p-10 bg-white rounded-2xl shadow-sm border border-teal-100 hover:shadow-lg transition">
            <div className="h-14 w-14 rounded-xl bg-teal-100"></div>
            <h3 className="text-xl font-semibold text-teal-700 mt-6 mb-2">
              Verified Professionals
            </h3>
            <p className="text-gray-600">
              Only trained, certified, quality-checked experts join our platform.
            </p>
          </div>

          <div className="p-10 bg-white rounded-2xl shadow-sm border border-teal-100 hover:shadow-lg transition">
            <div className="h-14 w-14 rounded-xl bg-cyan-100"></div>
            <h3 className="text-xl font-semibold text-teal-700 mt-6 mb-2">
              Instant Booking
            </h3>
            <p className="text-gray-600">
              Schedule services within seconds with our simple interface.
            </p>
          </div>

          <div className="p-10 bg-white rounded-2xl shadow-sm border border-teal-100 hover:shadow-lg transition">
            <div className="h-14 w-14 rounded-xl bg-teal-50 border border-teal-200"></div>
            <h3 className="text-xl font-semibold text-teal-700 mt-6 mb-2">
              Transparent Pricing
            </h3>
            <p className="text-gray-600">
              No hidden costs. Clear, honest, upfront rates.
            </p>
          </div>

        </div>
      </section>

      {/* ROLE SECTION */}
      <section className="px-8 md:px-24 pb-32">
        <h2 className="text-4xl font-bold text-center mb-16">
          Start with FieldTrust
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

          {/* Customer */}
          <div className="p-12 bg-gradient-to-br from-teal-50 to-white rounded-2xl border border-teal-100 shadow-sm hover:shadow-lg transition">
            <h3 className="text-3xl font-bold text-teal-700 mb-4">Customers</h3>
            <p className="text-gray-700 mb-6">
              Find trustworthy professionals for every home need.
            </p>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>• AC Repair</li>
              <li>• Cleaning</li>
              <li>• Electrical Work</li>
              <li>• Plumbing</li>
            </ul>
            <a href="/signup">
              <button className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition">
                Create Account →
              </button>
            </a>
          </div>

          {/* Provider */}
          <div className="p-12 bg-gradient-to-br from-cyan-50 to-white rounded-2xl border border-cyan-100 shadow-sm hover:shadow-lg transition">
            <h3 className="text-3xl font-bold text-teal-700 mb-4">Service Providers</h3>
            <p className="text-gray-700 mb-6">
              Grow your income by completing verified service requests.
            </p>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>• Daily Job Opportunities</li>
              <li>• Flexible Work Hours</li>
              <li>• Secure Payments</li>
              <li>• Boost Your Ratings</li>
            </ul>
            <a href="/signup">
              <button className="px-6 py-3 bg-white border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition">
                Join as Provider →
              </button>
            </a>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} FieldTrust — All rights reserved.
      </footer>

    </div>
  );
}
