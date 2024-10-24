import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/style.css";

// Import pages
import Class from "./pages/Class";
import Subject from "./pages/Subject";
import LoginForm from "./pages/Login";
import AdminDashboard from "./screens/admin/AdminDashboard";
import StudentDashboard from "./screens/student/StudentDashboard";
import TeacherDashboard from "./screens/teacher/TeacherDashboard";
import StudentRegistration from "./pages/StudentRegistration";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import StudentProfile from "./pages/StudentProfile";

function App() {
  const location = useLocation();
  // const cors = require("cors");
  // app.use(cors());

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route exact path="/admin" element={<AdminDashboard />} />
        <Route exact path="/student" element={<StudentDashboard />} />
        <Route exact path="/teacher" element={<TeacherDashboard />} />
        <Route exact path="/admin/subject" element={<Subject />} />
        <Route exact path="/admin/class" element={<Class />} />
        <Route exact path="/admin/addStudent" element={<AddStudent />} />
        <Route exact path="/admin/EditStudent/:id" element={<EditStudent />} />
        <Route
          exact
          path="//admin/viewStudent/:id"
          element={<StudentProfile />}
        />
        {/* <Route exact path="/admin/EditStudent" element={<EditStudent />} /> */}
        <Route exact path="/admin/student" element={<StudentRegistration />} />
        <Route exact path="/teacher/subject" element={<Subject />} />
      </Routes>
    </>
  );
}

export default App;
