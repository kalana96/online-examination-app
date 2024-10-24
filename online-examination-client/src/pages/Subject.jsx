import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import { useNavigate } from "react-router-dom";
import SubjectService from "../service/SubjectService";

function Subject() {
  // State to hold the list of subjects
  const [subjects, setSubjects] = useState([]);
  // State to hold the selected subject (for editing or deleting)
  const [selectedSubject, setSelectedSubject] = useState(null);
  // State to manage the visibility of the Edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // State to manage the visibility of the Delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // State to manage the visibility of the Add modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  // Retrieve token from local storage for authentication
  const token = localStorage.getItem("token");

  // State for holding the form data (used when adding a subject)
  const [formData, setFormData] = useState({
    subjectName: "",
    description: "",
  });

  // State for validation errors
  const [formErrors, setFormErrors] = useState({
    subjectName: "",
    description: "",
  });

  // Handle input change for subject edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedSubject((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch all subjects on component mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  // Function to fetch all subjects using SubjectService
  const fetchSubjects = async () => {
    try {
      const response = await SubjectService.getAllSubject(token);
      if (response.code === "00") {
        setSubjects(response.content); // Populate the subjects state with the fetched data
      } else {
        console.error("Failed to fetch subjects", response.message);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // Function to open the Edit modal and set the selected subject
  const handleEdit = (id) => {
    const subjectToEdit = subjects.find((item) => item.id === id);
    setSelectedSubject(subjectToEdit);
    setIsEditModalOpen(true);
  };

  // Function to close any modal (Edit, Delete, Add)
  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedSubject(null);
    setFormData({ subjectName: "", description: "" });
    setFormErrors({ subjectName: "", description: "" }); // Reset errors on modal close
  };

  // Function to validate the form inputs
  const validateForm = () => {
    const errors = { subjectName: "", description: "" };
    let isValid = true;

    if (!formData.subjectName.trim()) {
      errors.subjectName = "Subject Name is required.";
      isValid = false;
    }
    // if (formData.subjectName.length < 3) {
    //   errors.subjectName = "Subject Name must be at least 3 characters long.";
    //   isValid = false;
    // }

    setFormErrors(errors);
    return isValid;
  };

  // Function to delete a subject with confirmation
  const deleteSubject = async (subjectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Subject?"
    );
    if (confirmDelete) {
      try {
        const response = await SubjectService.deleteSubject(subjectId, token);
        if (response.code === "00") {
          alert(response.message);
          fetchSubjects(); // Refresh the list after deletion
        } else {
          console.error("Failed to delete subject", response.message);
        }
      } catch (error) {
        console.error("Error deleting subject:", error);
      }
    }
  };

  // Function to handle subject update after confirmation
  const handleUpdate = async (e) => {
    e.preventDefault();
    const confirmUpdate = window.confirm(
      "Are you sure you want to update this Subject?"
    );
    if (confirmUpdate) {
      try {
        const editSubject = {
          subjectName: selectedSubject?.subjectName || "",
          description: selectedSubject?.description || "",
          id: selectedSubject?.id || "",
        };

        // Validate before sending the request
        // if (!validateForm()) return;

        const response = await SubjectService.updateSubject(editSubject, token);
        if (response.code === "00") {
          alert(response.message);
          fetchSubjects(); // Refresh the list after updating
          closeModal(); // Close the modal after successful update
        } else {
          console.error("Failed to update subject", response.message);
          alert(response.message);
        }
      } catch (error) {
        console.error("Error updating subject:", error);
        alert(
          "An error occurred while updating the subject. Please try again."
        );
      }
    }
  };

  // Function to handle saving a new subject
  const handleSave = async (e) => {
    e.preventDefault();

    // Validate before sending the request
    if (!validateForm()) return;

    try {
      const newSubject = {
        subjectName: formData.subjectName || "",
        description: formData.description || "",
      };
      const response = await SubjectService.addSubject(newSubject, token);
      if (response.code === "00") {
        alert(response.message);
        fetchSubjects(); // Refresh the list after adding the new subject
        closeModal(); // Close the modal after successful addition
      } else {
        console.error("Failed to add subject", response.message);
        alert(response.message);
      }
    } catch (error) {
      console.error("Error adding subject:", error);
      alert("An error occurred while adding the subject. Please try again.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
        <Header />
        <main className="grow p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Subject Management
          </h1>

          {/* Add Subject Button */}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 mb-6"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Subject
          </button>

          {/* Table of subjects */}
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="w-1/12 px-4 py-3 text-left font-semibold">#</th>
                <th className="w-4/12 px-4 py-3 text-left font-semibold">
                  Subject Name
                </th>
                <th className="w-6/12 px-4 py-3 text-left font-semibold">
                  Description
                </th>
                <th className="w-1/12 px-4 py-3 text-left font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="border px-4 py-3 text-gray-700">
                    {index + 1}
                  </td>
                  <td className="border px-4 py-3 text-gray-800">
                    {item.subjectName}
                  </td>
                  <td className="border px-4 py-3 text-gray-600">
                    {item.description}
                  </td>
                  <td className="border px-4 py-3 flex space-x-2">
                    {/* Edit Button */}
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-150"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    {/* Delete Button */}
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-150"
                      onClick={() => deleteSubject(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Edit Subject Modal */}
          {isEditModalOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                  <h2 className="text-xl font-bold mb-4">Edit Subject</h2>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Subject Name
                    </label>
                    <input
                      type="text"
                      name="subjectName"
                      value={selectedSubject?.subjectName || ""}
                      onChange={handleInputChange}
                      required
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        formErrors.subjectName ? "border-red-500" : ""
                      }`}
                    />
                    {formErrors.subjectName && (
                      <p className="text-red-500 text-xs italic">
                        {formErrors.subjectName}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={selectedSubject?.description || ""}
                      onChange={handleInputChange}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        formErrors.description ? "border-red-500" : ""
                      }`}
                    ></textarea>
                    {formErrors.description && (
                      <p className="text-red-500 text-xs italic">
                        {formErrors.description}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Subject Modal */}
          {isAddModalOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                  <h2 className="text-xl font-bold mb-4">Add Subject</h2>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Subject Name
                    </label>
                    <input
                      type="text"
                      name="subjectName"
                      value={formData.subjectName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subjectName: e.target.value,
                        })
                      }
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        formErrors.subjectName ? "border-red-500" : ""
                      }`}
                    />
                    {formErrors.subjectName && (
                      <p className="text-red-500 text-xs italic">
                        {formErrors.subjectName}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        formErrors.description ? "border-red-500" : ""
                      }`}
                    ></textarea>
                    {formErrors.description && (
                      <p className="text-red-500 text-xs italic">
                        {formErrors.description}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      onClick={handleSave}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                  <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                  <p className="mb-4">
                    Are you sure you want to delete the subject "
                    {selectedSubject?.subjectName}"?
                  </p>
                  <div className="flex justify-end">
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => deleteSubject(selectedSubject.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Subject;
