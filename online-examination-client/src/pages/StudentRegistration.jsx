import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import { useNavigate } from "react-router-dom";
import StudentService from "../service/StudentService"; // Adjust this to match your service path
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";

function StudentRegistration() {
  // State to hold the list of students
  const [students, setStudents] = useState([]);
  // State to hold the selected student (for editing or deleting)
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  // Retrieve token from local storage for authentication
  const token = localStorage.getItem("token");

  // State for holding the form data (used when adding a student)
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    age: "",
  });

  // State for validation errors
  const [formErrors, setFormErrors] = useState({
    studentName: "",
    email: "",
    age: "",
  });

  // Handle input change for student edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch all students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to fetch all students using StudentService
  const fetchStudents = async () => {
    try {
      const response = await StudentService.getAllStudents(token);
      if (response.code === "00") {
        setStudents(response.content); // Populate the students state with the fetched data
      } else {
        console.error("Failed to fetch students", response.message);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Function to open the Edit Form and set the selected student
  const handleEdit = (id) => {
    navigate(`/admin/EditStudent/${id}`);
  };

  // Function to handle the View student profile
  const handleView = (id) => {
    navigate(`/admin/viewStudent/${id}`);
  };

  // Function to delete a student with confirmation
  const deleteStudent = async (studentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Student?"
    );
    if (confirmDelete) {
      try {
        const response = await StudentService.deleteStudent(studentId, token);
        if (response.code === "00") {
          alert(response.message);
          fetchStudents(); // Refresh the list after deletion
        } else {
          console.error("Failed to delete student", response.message);
        }
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  // Function to handle student update after confirmation
  const handleUpdate = async (e) => {
    e.preventDefault();
    const confirmUpdate = window.confirm(
      "Are you sure you want to update this Student?"
    );
    if (confirmUpdate) {
      try {
        const editStudent = {
          studentName: selectedStudent?.studentName || "",
          email: selectedStudent?.email || "",
          age: selectedStudent?.age || "",
          id: selectedStudent?.id || "",
        };

        const response = await StudentService.updateStudent(editStudent, token);
        if (response.code === "00") {
          alert(response.message);
          fetchStudents(); // Refresh the list after updating
          closeModal(); // Close the modal after successful update
        } else {
          console.error("Failed to update student", response.message);
          alert(response.message);
        }
      } catch (error) {
        console.error("Error updating student:", error);
        alert(
          "An error occurred while updating the student. Please try again."
        );
      }
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
        <Header />
        <main className="grow p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Student Registration
          </h1>

          {/* Add Student Button */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mb-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            onClick={() => navigate("/admin/addStudent")}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Student
          </button>

          {/* Table of students */}
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="w-1/12 px-4 py-3 text-left font-semibold">#</th>
                <th className="w-2/12 px-4 py-3 text-left font-semibold">
                  Registration No
                </th>
                <th className="w-2/12 px-4 py-3 text-left font-semibold">
                  First Name
                </th>
                <th className="w-2/12 px-4 py-3 text-left font-semibold">
                  Last Name
                </th>
                <th className="w-3/12 px-4 py-3 text-left font-semibold">
                  Email
                </th>
                <th className="w-2/12 px-4 py-3 text-left font-semibold">
                  Contact No
                </th>
                <th className="w-1/12 px-4 py-3 text-left font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="border px-4 py-3 text-gray-700">
                    {index + 1}
                  </td>
                  <td className="border px-4 py-3 text-gray-800">
                    {item.registrationNumber}
                  </td>
                  <td className="border px-4 py-3 text-gray-600">
                    {item.firstName}
                  </td>
                  <td className="border px-4 py-3 text-gray-600">
                    {item.lastName}
                  </td>
                  <td className="border px-4 py-3 text-gray-600">
                    {item.email}
                  </td>
                  <td className="border px-4 py-3 text-gray-600">
                    {item.contactNo}
                  </td>
                  <td className="border px-4 py-3 flex justify-center space-x-2">
                    {/* View Button */}
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-150"
                      onClick={() => handleView(item.id)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    {/* Edit Button */}
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition duration-150"
                      onClick={() => handleEdit(item.id)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    {/* Delete Button */}
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-150"
                      onClick={() => deleteStudent(item.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}

export default StudentRegistration;
