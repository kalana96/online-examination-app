package com.examination.online_examination_server.service;

import com.examination.online_examination_server.Utility.VarList;
import com.examination.online_examination_server.dto.StudentDTO;
import com.examination.online_examination_server.dto.SubjectDTO;
import com.examination.online_examination_server.entity.Student;
import com.examination.online_examination_server.entity.Subject;
import com.examination.online_examination_server.repository.StudentRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ModelMapper modelMapper;


    // Save a new student
    public String SaveStudent(StudentDTO studentDTO) {
        if (studentRepository.existsByRegistrationNumber(studentDTO.getRegistrationNumber())) {
            return VarList.RES_DUPLICATE; // Return a duplicate response if student already exists
        } else {
            studentRepository.save(modelMapper.map(studentDTO, Student.class)); // Save the student entity
            return VarList.RES_SUCCESS;
        }
    }

    // Retrieve all students
    public List<StudentDTO> GetAllStudents() {
        List<Student> studentList = studentRepository.findAll(); // Fetch all students
        return modelMapper.map(studentList, new TypeToken<List<StudentDTO>>(){}.getType()); // Convert to DTO
    }

    // Search for a specific student by id
    public StudentDTO SearchStudent(int id) {
        if (studentRepository.existsById(id)) {
            Student student = studentRepository.findById(id).orElse(null); // Fetch subject by ID
            return modelMapper.map(student, StudentDTO.class); // Map to DTO
        } else {
            return null; // Return null if subject doesn't exist
        }
    }

    // Update an existing student
    public String UpdateStudent(StudentDTO studentDTO) {
        if (studentRepository.existsByRegistrationNumber(studentDTO.getRegistrationNumber())) {
            studentRepository.save(modelMapper.map(studentDTO, Student.class)); // Update student if it exists
            return VarList.RES_SUCCESS;
        } else {
            return VarList.RES_NO_DATE_FOUND; // Return a "no data found" response if student doesn't exist
        }
    }

    // Soft delete a student by registration number
//    public String deleteStudent(int id) {
//        Optional<Student> studentOptional = studentRepository.findById(id);
//        if (studentOptional.isPresent()) {
//            Student student = studentOptional.get();
//            if (!student.isDeleted()) { // Check if student is not already deleted
//                student.setDeleted(true); // Mark the student as deleted (soft delete)
//                studentRepository.save(student); // Save the updated entity
//                return VarList.RES_SUCCESS; // Success code
//            } else {
//                return VarList.RES_ALREADY_DELETED; // Student is already deleted
//            }
//        } else {
//            return VarList.RES_NO_DATE_FOUND; // Return a "no data found" response if student doesn't exist
//        }
//    }


    // Soft delete a student by soft delete
    public String deleteStudent(int id) {
        Optional<Student> subjectOptional = studentRepository.findById(id);
        if (subjectOptional.isPresent()) {
            Student student = subjectOptional.get();
            if (!student.isDeleted()) {
                studentRepository.deleteById(id); // Trigger the soft delete SQL
                return VarList.RES_SUCCESS; // Success code
            } else {
                return VarList.RES_ALREADY_DELETED; // Return a "no data found" response if subject doesn't exist
            }
        } else {
            return VarList.RES_NO_DATE_FOUND; // Return a "no data found" response if subject doesn't exist
        }
    }



}
