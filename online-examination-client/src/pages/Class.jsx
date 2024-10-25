import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import { useNavigate } from "react-router-dom";
import ClassService from "../service/ClassService";

function Class() {
  // State to hold the list of classes
  const [classes, setClasses] = useState([]);
  // State to hold the selected class (for editing or deleting)
  const [selectedClass, setSelectedClass] = useState(null);
  // State to manage the visibility of the Edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // State to manage the visibility of the Delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // State to manage the visibility of the Add modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Retrieve token from local storage for authentication
  const token = localStorage.getItem("token");

  // State for holding the form data (used when adding a class)
  const [formData, setFormData] = useState({
    className: "",
    description: "",
  });

  // Handle input change for class edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedClass((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch all classes on component mount
  useEffect(() => {
    fetchClass();
  }, []);

  // Function to fetch all classes using ClassService
  const fetchClass = async () => {
    try {
      const response = await ClassService.getAllClass(token);
      if (response.code === "00") {
        setClasses(response.content); // Populate the classes state with the fetched data
      } else {
        console.error("Failed to fetch classes", response.message);
      }
    } catch (error) {
      console.error("Error fetching Class:", error);
    }
  };

  // Function to open the Edit modal and set the selected class
  const handleEdit = (id) => {
    const classToEdit = classes.find((item) => item.id === id);
    setSelectedClass(classToEdit);
    setIsEditModalOpen(true);
  };

  // Function to close any modal (Edit, Delete, Add)
  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedClass(null);
  };

  // Function to delete a class with confirmation
  const deleteClass = async (classId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Class?"
    );
    if (confirmDelete) {
      try {
        const response = await ClassService.deleteClass(classId, token);
        if (response.code === "00") {
          alert(response.message);
          fetchClass(); // Refresh the list after deletion
        } else {
          console.error("Failed to Delete class", response.message);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // Function to handle class update after confirmation
  const handleUpdate = async (e) => {
    e.preventDefault();
    const confirmUpdate = window.confirm(
      "Are you sure you want to update this Class?"
    );
    if (confirmUpdate) {
      try {
        const editClass = {
          className: selectedClass?.className || "",
          description: selectedClass?.description || "",
          id: selectedClass?.id || "",
        };
        const response = await ClassService.updateClass(editClass, token);
        if (response.code === "00") {
          alert(response.message);
          fetchClass(); // Refresh the list after updating
          closeModal(); // Close the modal after successful update
        } else {
          console.error("Failed to update class", response.message);
          alert(response.message);
        }
      } catch (error) {
        console.error("Error updating class:", error);
        alert("An error occurred while updating the class. Please try again.");
      }
    }
  };

  // Function to handle saving a new class
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const newClass = {
        className: selectedClass?.className || "",
        description: selectedClass?.description || "",
      };
      const response = await ClassService.addClass(newClass, token);
      if (response.code === "00") {
        alert(response.message);
        fetchClass(); // Refresh the list after adding the new class
        closeModal(); // Close the modal after successful addition
      } else {
        console.error("Failed to add class", response.message);
        alert(response.message);
      }
    } catch (error) {
      console.error("Error adding class:", error);
      alert("An error occurred while adding the class. Please try again.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
        <Header />
        <main className="grow p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Class Management
          </h1>

          {/* Add Class Button */}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 mb-6"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Class
          </button>

          {/* Table of classes */}
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="w-1/12 px-4 py-3 text-left font-semibold">#</th>
                <th className="w-4/12 px-4 py-3 text-left font-semibold">
                  Class Name
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
              {classes.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="border px-4 py-3 text-gray-700">
                    {index + 1}
                  </td>
                  <td className="border px-4 py-3 text-gray-800">
                    {item.className}
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
                      onClick={() => deleteClass(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Edit Class Modal */}
          {isEditModalOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                  <h2 className="text-xl font-bold mb-4">Edit Class</h2>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Class Name
                    </label>
                    <input
                      type="text"
                      name="className"
                      value={selectedClass?.className || ""}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={selectedClass?.description || ""}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
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

          {/* Add Class Modal */}
          {isAddModalOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                  <h2 className="text-xl font-bold mb-4">Add Class</h2>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Class Name
                    </label>
                    <input
                      type="text"
                      name="className"
                      value={formData.className}
                      onChange={(e) =>
                        setFormData({ ...formData, className: e.target.value })
                      }
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
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
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
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
                    Are you sure you want to delete the class "
                    {selectedClass?.className}"?
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
                      onClick={() => deleteClass(selectedClass.id)}
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

export default Class;
