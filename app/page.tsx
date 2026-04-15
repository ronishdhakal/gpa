import Navbar from "@/components/Navbar";
import HomeHero from "@/components/home/HomeHero";
import HomeFeatures from "@/components/home/HomeFeatures";
import HomeAbout from "@/components/home/HomeAbout";
import HomeCTA from "@/components/home/HomeCTA";

export const metadata = {
  title: "GPA Calculator Nepal | SEE GPA Calculator",
  description:
    "Free GPA Calculator website for Nepal students. Use our SEE GPA Calculator online, understand grading systems, and access simple education tools",

  verification: {
    google: "In_u6RGEpUbj3PhoaLjXNsloEjIUZ2cXTcYqfLi_iYU",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "GPA Calculator Nepal | SEE GPA Calculator",
    description:
      "Free online GPA calculator for Nepal students with SEE tools and student-friendly resources",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-gray-900">
        <HomeHero />
        <HomeFeatures />
        <HomeAbout />
        <HomeCTA />
      </main>
    </>
  );
}