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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <Navbar />

      {/* Page Heading */}
      <section className="pt-24 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          Welcome Back, <span className="text-gray-300">Student!</span>
        </h1>
        <p className="text-gray-400 mb-12">
          Explore your subjects, PYQs, answers and notes here.
        </p>
      </section>

      {/* Subjects */}
      <section className="px-4 max-w-7xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Subjects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {subjects.map((sub) => (
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
      <section className="px-4 max-w-7xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Previous Year Papers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {papers.map((paper) => (
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
