import Navbar from "@/components/Navbar";
// import SeeHero from "./components/SeeHero";
import SeeCalculator from "./components/SeeCalculator";
import SeeHowItWorks from "./components/SeeHowItWorks";
import SeeGradingSystem from "./components/SeeGradingSystem";
import SeeSEOContent from "./components/SeeSEOContent";
import SeeFAQ from "./components/SeeFAQ";
import AlsoCheck from "./components/AlsoCheck";

export const metadata = {
  title: "SEE GPA Calculator 2082 | Free Online SEE Grade Calculator",
  description:
    "Use our free SEE GPA Calculator to calculate your SEE GPA online. Enter theory and practical marks, check GPA instantly, and understand the SEE grading system easily.",
  alternates: {
    canonical: "/see",
  },
};

export default function SeePage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-gray-900">
        {/* <SeeHero /> */}
        <SeeCalculator />

        {/* Links section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-2">
          <p className="text-sm sm:text-base text-gray-700">
            Check:{" "}
            <a
              href="https://see.collegeinfonepal.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              SEE Result 2082
            </a>
          </p>

          <p className="text-sm sm:text-base text-gray-700 mt-2">
            Helpful: Prepare for NEB Board Exam with{" "}
            <a
              href="https://www.nebexam.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              NEB Exam
            </a>
          </p>
        </div>

        <AlsoCheck />

        <SeeHowItWorks />
        <SeeGradingSystem />
        <SeeSEOContent />
        <SeeFAQ />
      </main>
    </>
  );
}