export default function AlsoCheck() {
  const featuredLinks = [
    {
      label: "Best Consultancy in Nepal (Overall)",
      href: "https://www.abroadadvise.com/featured/best-consultancy-in-nepal",
    },
    {
      label: "Best Consultancy in Nepal for Australia",
      href: "https://www.abroadadvise.com/featured/best-consultancy-in-nepal-for-australia",
    },
    {
      label: "Best Consultancy in Nepal for USA",
      href: "https://www.abroadadvise.com/featured/best-consultancy-in-nepal-for-usa",
    },
    {
      label: "Best Consultancy in Nepal for Canada",
      href: "https://www.abroadadvise.com/featured/best-consultancy-in-nepal-for-canada",
    },
    {
      label: "Best Consultancy in Nepal for UK",
      href: "https://www.abroadadvise.com/featured/best-consultancy-in-nepal-for-uk",
    },
    {
      label: "Best Consultancy in Nepal for New Zealand",
      href: "https://www.abroadadvise.com/featured/best-consultancy-in-nepal-for-new-zealand",
    },
    {
      label: "Best Consultancy in Nepal for Denmark",
      href: "https://www.abroadadvise.com/featured/best-consultancy-in-nepal-for-denmark",
    },
    {
      label: "Best Consultancy in Nepal for Japan",
      href: "https://www.abroadadvise.com/featured/best-consultancy-in-nepal-for-japan",
    },
    {
      label: "Best Consultancy in Nepal for South Korea",
      href: "https://www.abroadadvise.com/featured/best-consultancy-in-nepal-for-south-korea",
    },
    {
      label: "Best IELTS Classes in Kathmandu",
      href: "https://www.abroadadvise.com/featured/best-ielts-classes-in-kathmandu",
    },
    {
      label: "Best PTE Classes in Kathmandu",
      href: "https://www.abroadadvise.com/featured/best-pte-classes-in-kathmandu",
    },
  ];

  const groupedLinks = featuredLinks.reduce((rows, item, i, arr) => {
    if (i % 2 === 0) {
      rows.push([item, arr[i + 1]]);
    }
    return rows;
  }, []);

  return (
    <section className="w-full bg-white py-12 sm:py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Also Check:
        </h2> */}

        <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10">
          Planning to Study Abroad? Explore
        </p>

        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm md:text-base">
              <tbody>
                {groupedLinks.map((row, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    {row.map((item, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-4 sm:px-6 py-4 align-top w-1/2"
                      >
                        {item ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-xs sm:text-sm"
                          >
                            {item.label}
                          </a>
                        ) : null}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}