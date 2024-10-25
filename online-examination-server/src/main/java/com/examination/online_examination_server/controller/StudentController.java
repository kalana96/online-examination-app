package com.examination.online_examination_server.controller;

import com.examination.online_examination_server.Utility.VarList;
import com.examination.online_examination_server.dto.StudentDTO;
import com.examination.online_examination_server.dto.ResponseDTO;
import com.examination.online_examination_server.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("admin/api/v2/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private ResponseDTO responseDTO;

    // Save a new student
    @PostMapping("/saveStudent")
    public ResponseEntity SaveStudent(@RequestBody StudentDTO studentDTO) {
        try {
            String resp = studentService.SaveStudent(studentDTO); // Save the student using studentService
            if (resp.equals("00")) {
                responseDTO.setCode(VarList.RES_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(studentDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else if (resp.equals("06")) {
                responseDTO.setCode(VarList.RES_DUPLICATE);
                responseDTO.setMessage("Student already exists");
                responseDTO.setContent(studentDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            } else {
                responseDTO.setCode(VarList.RES_FAILURE);
                responseDTO.setMessage("Error");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception ex) {
            responseDTO.setCode(VarList.RES_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(ex);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get all students
    @GetMapping("/getAllStudents")
    public ResponseEntity GetAllStudents() {
        try {
            List<StudentDTO> studentList = studentService.GetAllStudents(); // Fetch all students
            responseDTO.setCode(VarList.RES_SUCCESS);
            responseDTO.setMessage("Success");
            responseDTO.setContent(studentList);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            responseDTO.setCode(VarList.RES_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update an existing student
    @PutMapping("/updateStudent")
    public ResponseEntity UpdateStudent(@RequestBody StudentDTO studentDTO) {
        try {
            String resp = studentService.UpdateStudent(studentDTO); // Update student using studentService
            if (resp.equals("00")) {
                responseDTO.setCode(VarList.RES_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(studentDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else if (resp.equals("01")) {
                responseDTO.setCode(VarList.RES_NO_DATE_FOUND);
                responseDTO.setMessage("Student Not Found");
                responseDTO.setContent(studentDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            } else {
                responseDTO.setCode(VarList.RES_FAILURE);
                responseDTO.setMessage("Error");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception ex) {
            responseDTO.setCode(VarList.RES_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete a student by ID
    @DeleteMapping("/deleteStudent/{id}")
    public ResponseEntity deleteStudent(@PathVariable int id) {
        try {
            String res = studentService.deleteStudent(id); // Delete student using studentService
            if (res.equals("00")) {
                responseDTO.setCode(VarList.RES_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else {
                responseDTO.setCode(VarList.RES_NO_DATE_FOUND);
                responseDTO.setMessage("No Student Available for this ID");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            responseDTO.setCode(VarList.RES_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(e);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Search for a specific student by ID
    @GetMapping("/searchStudent/{id}")
    public ResponseEntity SearchStudent(@PathVariable int id) {
        try {
            StudentDTO studentDTO = studentService.SearchStudent(id); // Fetch student using studentService
            if (studentDTO != null) {
                responseDTO.setCode(VarList.RES_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(studentDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else {
                responseDTO.setCode(VarList.RES_NO_DATE_FOUND);
                responseDTO.setMessage("Student Not Found for this ID");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception ex) {
            responseDTO.setCode(VarList.RES_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}