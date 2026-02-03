import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Pages
import RoleSelection from "../pages/RoleSelection/RoleSelection";
import Landing from "../pages/Landing/Landing";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";

// Student Pages
import StudentDashboard from "../pages/Student/StudentDashboard";
import University from "../pages/University/University";
import Courses from "../pages/Courses/Courses";
import Branch from "../pages/Branch/Branch";
import Semester from "../pages/Semester/Semester";
import Subject from "../pages/Subject/Subject";
import Content from "../pages/Content/Content";

// Teacher Pages
import TeacherDashboard from "../pages/Teacher/TeacherDashboard";
import TeacherContent from "../pages/Teacher/TeacherContent";

// Admin Pages
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminContent from "../pages/Admin/AdminContent";
import AdminUsers from "../pages/Admin/AdminUsers";
import AdminUniversities from "../pages/Admin/AdminUniversities";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Entry Points */}
        <Route path="/" element={<RoleSelection />} />
        <Route path="/landing" element={<Landing />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/universities"
          element={
            <ProtectedRoute>
              <University />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/branches"
          element={
            <ProtectedRoute>
              <Branch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/semesters"
          element={
            <ProtectedRoute>
              <Semester />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subjects"
          element={
            <ProtectedRoute>
              <Subject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/content"
          element={
            <ProtectedRoute>
              <Content />
            </ProtectedRoute>
          }
        />

        {/* Teacher Routes */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/:type"
          element={
            <ProtectedRoute>
              <TeacherContent />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/content"
          element={
            <ProtectedRoute>
              <AdminContent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/universities"
          element={
            <ProtectedRoute>
              <AdminUniversities />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
