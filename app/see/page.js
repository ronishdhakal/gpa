import Navbar from "@/components/Navbar";
// import SeeHero from "./components/SeeHero";
import SeeCalculator from "./components/SeeCalculator";
import SeeHowItWorks from "./components/SeeHowItWorks";
import SeeGradingSystem from "./components/SeeGradingSystem";
import SeeSEOContent from "./components/SeeSEOContent";
import SeeFAQ from "./components/SeeFAQ";

export const metadata = {
  title: "SEE GPA Calculator 2083 | Free Online SEE Grade Calculator",
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
        <SeeHowItWorks />
        <SeeGradingSystem />
        <SeeSEOContent />
        <SeeFAQ />
      </main>
    </>
  );
}