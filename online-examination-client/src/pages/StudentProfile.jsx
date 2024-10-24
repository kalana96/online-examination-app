import { useParams, useNavigate } from "react-router-dom";
import StudentService from "../service/StudentService";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faCalendarAlt,
  faAddressCard,
  faUser,
  faEdit,
  faArrowLeft,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";

const StudentProfile = () => {
  const { id } = useParams(); // Get student id from URL
  const [student, setStudent] = useState(null); // Local state to store the student data
  const navigate = useNavigate();

  // Fetch student details on component mount
  useEffect(() => {
    fetchStudent();
  }, [id]);

  // Retrieve token from local storage for authentication
  const token = localStorage.getItem("token");

  // Function to fetch individual student data
  const fetchStudent = async () => {
    try {
      const response = await StudentService.getStudentById(id, token);
      if (response.code === "00") {
        setStudent(response.content); // Populate the Student state with the fetched data
      } else {
        console.error("Failed to fetch Student", response.message);
      }
    } catch (error) {
      console.error("Error fetching Student:", error);
    }
  };

  // Handle back button
  const handleBack = () => {
    navigate("/admin/student");
  };

  // Function to open the Edit Form and set the selected student
  const handleEdit = (id) => {
    navigate(`/admin/EditStudent/${id}`);
  };

  if (!student) {
    return <p>Student not found</p>;
  }

  return (
    // <div className="max-w-4xl mx-auto my-8 p-8 bg-white rounded-lg shadow-lg">
    //   {/* Profile Header */}
    //   <div className="flex flex-col items-center">
    //     {/* Profile Photo */}
    //     <div className="relative w-32 h-32">
    //       {/* <img
    //         src={student.profilePhoto || "/default-profile.png"}
    //         alt="Profile"
    //         className="w-full h-full object-cover rounded-full shadow-lg"
    //       /> */}
    //     </div>
    //     {/* Student Name */}
    //     <h2 className="mt-4 text-2xl font-semibold text-gray-700">
    //       {student.firstName} {student.lastName}
    //     </h2>
    //     {/* Registration Number */}
    //     <p className="text-sm text-gray-500 mt-1">
    //       Registration No: {student.registrationNumber}
    //     </p>
    //   </div>

    //   {/* Profile Details */}
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
    //     {/* Personal Details */}
    //     <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
    //       <h3 className="text-xl font-semibold mb-4 text-gray-600">
    //         Personal Details
    //       </h3>
    //       <div className="space-y-2">
    //         <p className="text-gray-700">
    //           <strong>NIC:</strong> {student.nic}
    //         </p>
    //         <p className="text-gray-700">
    //           <strong>Email:</strong> {student.email}
    //         </p>
    //         <p className="text-gray-700">
    //           <strong>Contact No:</strong> {student.contactNo}
    //         </p>
    //         <p className="text-gray-700">
    //           <strong>Date of Birth:</strong> {student.dob}
    //         </p>
    //         <p className="text-gray-700">
    //           <strong>Gender:</strong> {student.gender}
    //         </p>
    //         <p className="text-gray-700">
    //           <strong>Address:</strong> {student.address}
    //         </p>
    //       </div>
    //     </div>

    //     {/* Academic Information */}
    //     <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
    //       <h3 className="text-xl font-semibold mb-4 text-gray-600">
    //         Academic Information
    //       </h3>
    //       <div className="space-y-2">
    //         <p className="text-gray-700">
    //           <strong>Class:</strong> {student.class}
    //         </p>
    //         <p className="text-gray-700">
    //           <strong>Subjects:</strong>{" "}
    //           {/* {student.subjects.map((subject, index) => (
    //             <span key={index} className="mr-2">
    //               {subject}
    //             </span>
    //           ))} */}
    //         </p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Action Buttons */}
    //   <div className="mt-8 flex justify-between">
    //     <button
    //       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    //       onClick={() => handleEdit(student.id)}
    //     >
    //       Edit Profile
    //     </button>
    //     <button
    //       className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    //       onClick={handleBack}
    //     >
    //       Back to List
    //     </button>
    //   </div>
    // </div>

    <div className="max-w-4xl mx-auto my-8 p-8 bg-white rounded-lg shadow-lg">
      {/* Profile Header */}
      <div className="flex flex-col items-center">
        {/* Profile Photo */}
        <div className="relative w-32 h-32">
          <img
            src={student.profilePhoto || "/default-profile.png"}
            alt="Profile"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>

        {/* Student Name */}
        <h2 className="mt-4 text-3xl font-bold text-gray-800">
          {student.firstName} {student.lastName}
        </h2>

        {/* Registration Number */}
        <p className="text-sm text-gray-500 mt-1">
          Registration No: {student.registrationNumber}
        </p>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Personal Details */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            <FontAwesomeIcon icon={faUser} className="text-blue-500 mr-2" />{" "}
            Personal Details
          </h3>
          <div className="space-y-3">
            <p className="text-gray-700">
              <strong>NIC:</strong> {student.nic}
            </p>
            <p className="text-gray-700">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-blue-500 mr-2"
              />
              <strong>Email:</strong> {student.email}
            </p>
            <p className="text-gray-700">
              <FontAwesomeIcon icon={faPhone} className="text-blue-500 mr-2" />
              <strong>Contact No:</strong> {student.contactNo}
            </p>
            <p className="text-gray-700">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="text-blue-500 mr-2"
              />
              <strong>Date of Birth:</strong> {student.dob}
            </p>
            <p className="text-gray-700">
              <FontAwesomeIcon icon={faUser} className="text-blue-500 mr-2" />
              <strong>Gender:</strong> {student.gender}
            </p>
            <p className="text-gray-700">
              <FontAwesomeIcon
                icon={faAddressCard}
                className="text-blue-500 mr-2"
              />
              <strong>Address:</strong> {student.address}
            </p>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            <FontAwesomeIcon icon={faUser} className="text-blue-500 mr-2" />{" "}
            Academic Information
          </h3>
          <div className="space-y-3">
            <p className="text-gray-700">
              {/* <strong>Class:</strong> {student.class} */}
            </p>
            <p className="text-gray-700">
              <strong>Subjects:</strong>{" "}
              {/* {student.subjects.map((subject, index) => (
                <span
                  key={index}
                  className="mr-2 bg-gray-200 rounded-full px-3 py-1 text-sm"
                >
                  {subject}
                </span>
              ))} */}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          onClick={() => handleEdit(student.id)}
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Edit Profile
        </button>

        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          onClick={handleBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to List
        </button>
      </div>
    </div>
  );
};

export default StudentProfile;
