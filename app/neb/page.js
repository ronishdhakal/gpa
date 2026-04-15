import Navbar from "@/components/Navbar";
import NebHero from "./components/NebHero";
import NebCalculator from "./components/NebCalculator";

export const metadata = {
  title: "NEB GPA Calculator 2083 | Class 11 & 12 GPA Calculator",
  description:
    "Free NEB GPA Calculator for Class 11 and Class 12 students in Nepal. Enter theory marks, practical marks, credit hours, and calculate your GPA instantly.",
  alternates: {
    canonical: "/neb",
  },
  keywords: [
    "NEB GPA Calculator",
    "Class 12 GPA Calculator",
    "Class 11 GPA Calculator",
    "NEB Grade Calculator Nepal",
    "NEB Calculator",
  ],
  openGraph: {
    title: "NEB GPA Calculator 2083",
    description:
      "Calculate your NEB GPA online using theory marks, practical marks, and credit hours.",
    url: "/neb",
    type: "website",
  },
};

export default function NebPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-gray-900">
        <NebHero />
        <NebCalculator />
      </main>
    </>
  );
}