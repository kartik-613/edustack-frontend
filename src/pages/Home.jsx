import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SubjectCard from "../components/cards/SubjectCard";
import PaperCard from "../components/cards/PaperCard";

const Home = () => {
  // Example data for demonstration
  const subjects = [
    { title: "Mathematics", semester: 1 },
    { title: "Physics", semester: 1 },
    { title: "Chemistry", semester: 1 },
    { title: "Computer Science", semester: 1 },
  ];

  const papers = [
    { title: "Math PYQ", year: 2022, type: "PYQ" },
    { title: "Physics PYQ", year: 2021, type: "PYQ" },
    { title: "Chemistry PYQ", year: 2020, type: "PYQ" },
    { title: "CS PYQ", year: 2022, type: "PYQ" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#020202] text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      {/* Page Heading */}
      <section className="pt-32 px-6 text-center animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">
          Welcome Back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">Student!</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-16">
          Explore your subjects, Previous Year Questions (PYQs), answers, and premium study notes all in one place.
        </p>
      </section>

      {/* Subjects */}
      <section className="px-6 max-w-7xl mx-auto mb-16 w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Subjects</h2>
          <button className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {subjects.map((sub, i) => (
            <SubjectCard
              key={sub.title}
              title={sub.title}
              semester={sub.semester}
              onClick={() => alert(`${sub.title} clicked!`)}
            />
          ))}
        </div>
      </section>

      {/* PYQs */}
      <section className="px-6 max-w-7xl mx-auto mb-20 w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Previous Year Papers</h2>
          <button className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">View Library</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {papers.map((paper, i) => (
            <PaperCard
              key={paper.title}
              title={paper.title}
              year={paper.year}
              type={paper.type}
              onClick={() => alert(`${paper.title} clicked!`)}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
