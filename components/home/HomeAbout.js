export default function HomeAbout() {
  return (
    <section id="about" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Built for Students in Nepal
          </h2>

          <p className="mt-5 text-base leading-8 text-gray-600">
            This website is created to make GPA calculation simple and accessible
            for students. Instead of complicated manual conversion, students can
            enter their marks and instantly view an estimated GPA in a clear and
            understandable format.
          </p>

          <p className="mt-4 text-base leading-8 text-gray-600">
            Our goal is to provide useful academic tools with a clean interface,
            helpful explanation, and SEO-friendly content so students can easily
            find and use the platform when they need it most.
          </p>
        </div>
      </div>
    </section>
  );
}