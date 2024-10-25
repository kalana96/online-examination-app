import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import { useNavigate } from "react-router-dom";
import StudentService from "../service/StudentService";
import ClassService from "../service/ClassService";
import SubjectService from "../service/SubjectService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEraser,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

function AddStudent() {
  const navigate = useNavigate();

  // Retrieve token from local storage for authentication
  const token = localStorage.getItem("token");

  // State to hold the form data
  const [formData, setFormData] = useState({
    registrationNumber: "", // Auto-generated registration number
    firstName: "",
    middleName: "",
    lastName: "",
    nic: "",
    email: "",
    contactNo: "",
    address: "",
    age: "",
    dob: "",
    gender: "",
    class: "",
    subject: "",
    profilePhoto: null,
  });

  // State for holding image preview URL
  const [previewUrl, setPreviewUrl] = useState(null);

  // State for holding validation errors
  const [formErrors, setFormErrors] = useState({});

  // State to hold fetched classes and subjects
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Function to generate a unique registration number
  const generateRegistrationNumber = () => {
    const prefix = "REG"; // You can change this prefix as needed
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // e.g., "20231016"
    const randomPart = Math.floor(Math.random() * 10000); // Random number between 0-9999
    return `${prefix}-${datePart}-${randomPart}`; // e.g., "REG-20231016-1234"
  };

  // Auto-generate registration number when the component mounts
  useEffect(() => {
    const regNumber = generateRegistrationNumber();
    setFormData((prevData) => ({
      ...prevData,
      registrationNumber: regNumber,
    }));
    fetchData();
  }, []);

  // Fetch classes and subjects
  const fetchData = async () => {
    // try {
    //   const classData = await ClassService.getAllClass();
    //   const subjectData = await SubjectService.getAllSubject();
    //   setClasses(classData);
    //   setSubjects(subjectData);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }

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

    try {
      const response = await ClassService.getAllClass(token);
      if (response.code === "00") {
        setClasses(response.content); // Populate the subjects state with the fetched data
      } else {
        console.error("Failed to fetch Class", response.message);
      }
    } catch (error) {
      console.error("Error fetching Class:", error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file change (for profile photo)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profilePhoto: file,
      }));

      // Create a URL for the selected file to show the preview
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  // Handle back button
  const handleBack = () => {
    navigate("/admin/student");
  };

  // Function to validate form inputs
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.firstName) {
      errors.firstName = "First name is required.";
      isValid = false;
    }

    if (!formData.middleName) {
      errors.middleName = "Middle name is required.";
      isValid = false;
    }

    if (!formData.lastName) {
      errors.lastName = "Last name is required.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format.";
      isValid = false;
    }

    if (!formData.contactNo) {
      errors.contactNo = "Contact number is required.";
      isValid = false;
    }

    if (!formData.age || formData.age < 0) {
      errors.age = "Please enter a valid age.";
      isValid = false;
    }

    if (!formData.gender) {
      errors.gender = "Gender is required.";
      isValid = false;
    }

    if (!formData.address) {
      errors.address = "Address is required.";
      isValid = false;
    }

    if (!formData.dob) {
      errors.dob = "Dat of birth is required.";
      isValid = false;
    }

    if (!formData.class) {
      errors.class = "Class is required.";
      isValid = false;
    }

    if (!formData.subject) {
      errors.subject = "Subject is required.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Ensure this function is defined and checks all required fields

    try {
      // If uploading a profile photo, consider using FormData
      const dataToSend = {
        ...formData, // Spread the existing form data
      };

      // If you're uploading a file:
      // const formDataObj = new FormData();
      // for (const key in dataToSend) {
      //   formDataObj.append(key, dataToSend[key]);
      // }

      const response = await StudentService.addStudent(dataToSend, token); // Ensure token is valid

      if (response.code === "00") {
        alert(response.message);
      } else {
        console.error("Failed to add Student", response.message);
        alert(response.message);
      }
      navigate("/admin/student"); // Redirect after successful submission
    } catch (error) {
      console.error("Error adding Student:", error);
      alert("An error occurred while adding the Student. Please try again.");
    }
  };

  // Function to reset form to initial state
  const handleReset = () => {
    setFormData({
      registrationNumber: generateRegistrationNumber(), // Regenerate the registration number
      firstName: "",
      middleName: "",
      lastName: "",
      nic: "",
      email: "",
      contactNo: "",
      address: "",
      age: "",
      dob: "",
      gender: "",
      class: "",
      subject: "",
      profilePhoto: null,
    });

    setPreviewUrl(null); // Remove the preview image
    // setFormData(initialFormState); // Reset form data
    setPreviewUrl(null); // Clear profile photo preview
    setFormErrors({}); // Clear validation errors
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
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg space-y-6"
          >
            {/* Registration Number Section */}
            <div className="mb-6">
              <label
                htmlFor="registration_number"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Registration Number
              </label>
              <input
                type="text"
                name="registration_number"
                id="registration_number"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                readOnly
                className="shadow appearance-none border rounded w-full md:w-1/2 lg:w-1/3 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Main Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* First Name */}
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formErrors.firstName ? "border-red-500" : ""
                  }`}
                  aria-describedby="first_name_error"
                  // required
                />
                {formErrors.firstName && (
                  <p
                    id="firstName_error"
                    className="text-red-500 text-xs italic"
                  >
                    {formErrors.firstName}
                  </p>
                )}
              </div>

              {/* Middle Name */}
              <div>
                <label
                  htmlFor="middle_name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  id="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formErrors.middleName ? "border-red-500" : ""
                  }`}
                  aria-describedby="middle_name_error"
                  // required
                />
                {formErrors.middleName && (
                  <p
                    id="middle_name_error"
                    className="text-red-500 text-xs italic"
                  >
                    {formErrors.middleName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="last_name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formErrors.lastName ? "border-red-500" : ""
                  }`}
                  aria-describedby="last_name_error"
                  // required
                />
                {formErrors.lastName && (
                  <p
                    id="last_name_error"
                    className="text-red-500 text-xs italic"
                  >
                    {formErrors.lastName}
                  </p>
                )}
              </div>

              {/* NIC */}
              <div>
                <label
                  htmlFor="nic"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  NIC
                </label>
                <input
                  type="text"
                  name="nic"
                  id="nic"
                  value={formData.nic}
                  onChange={handleInputChange}
                  maxLength="10"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                />
                {formErrors.lastName && (
                  <p
                    id="last_name_error"
                    className="text-red-500 text-xs italic"
                  >
                    {formErrors.lastName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formErrors.email ? "border-red-500" : ""
                  }`}
                  aria-describedby="email_error"
                  // required
                />
                {formErrors.email && (
                  <p id="email_error" className="text-red-500 text-xs italic">
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Contact No */}
              <div>
                <label
                  htmlFor="contactNo"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Contact No
                </label>
                <input
                  type="tel"
                  name="contactNo"
                  id="contactNo"
                  value={formData.contactNo}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formErrors.contactNo ? "border-red-500" : ""
                  }`}
                  aria-describedby="contactNo_error"
                  maxLength="10"
                  // required
                />
                {formErrors.contactNo && (
                  <p
                    id="contactNo_error"
                    className="text-red-500 text-xs italic"
                  >
                    {formErrors.contactNo}
                  </p>
                )}
              </div>

              {/* Age */}
              <div>
                <label
                  htmlFor="age"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formErrors.age ? "border-red-500" : ""
                  }`}
                  aria-describedby="age_error"
                  // required
                />
                {formErrors.age && (
                  <p id="age_error" className="text-red-500 text-xs italic">
                    {formErrors.age}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dob"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formErrors.gender ? "border-red-500" : ""
                  }`}
                  aria-describedby="gender_error"
                  // required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {formErrors.gender && (
                  <p id="gender_error" className="text-red-500 text-xs italic">
                    {formErrors.gender}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="col-span-2">
                <label
                  htmlFor="address"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Address
                </label>
                <textarea
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                />
              </div>

              {/* Class */}
              <div>
                <label
                  htmlFor="class"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Class
                </label>
                <select
                  name="class"
                  id="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formErrors.class ? "border-red-500" : ""
                  }`}
                  aria-describedby="class_error"
                  // required
                >
                  <option value="">Select Class</option>
                  {classes.map((cls, index) => (
                    <option key={index} value={cls.id}>
                      {cls.className}
                    </option>
                  ))}
                </select>
                {formErrors.class && (
                  <p id="class_error" className="text-red-500 text-xs italic">
                    {formErrors.class}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Subject
                </label>
                <select
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formErrors.subject ? "border-red-500" : ""
                  }`}
                  aria-describedby="subject_error"
                  // required
                >
                  <option value="">Select Subject</option>
                  {subjects.map((sub, index) => (
                    <option key={index} value={sub.id}>
                      {sub.subjectName}
                    </option>
                  ))}
                </select>
                {formErrors.subject && (
                  <p id="subject_error" className="text-red-500 text-xs italic">
                    {formErrors.subject}
                  </p>
                )}
              </div>
            </div>

            {/* Profile Photo Preview */}
            {previewUrl && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Profile Photo Preview
                </label>
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="rounded-lg shadow-lg w-32 h-32 object-cover"
                />
              </div>
            )}

            {/* Profile Photo */}
            <div>
              <label
                htmlFor="profile_photo"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Profile Photo
              </label>
              <input
                type="file"
                name="profile_photo"
                id="profile_photo"
                accept="image/*"
                onChange={handleFileChange}
                className="shadow appearance-none border rounded w-full md:w-1/2 lg:w-1/3 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex items-center mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              >
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                SAVE
              </button>
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                onClick={handleReset}
              >
                <FontAwesomeIcon icon={faEraser} className="mr-2" />
                RESET
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold ml-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                onClick={handleBack}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                BACK
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default AddStudent;
