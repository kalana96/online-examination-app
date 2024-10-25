package com.examination.online_examination_server.controller;

import com.examination.online_examination_server.Utility.VarList;
import com.examination.online_examination_server.dto.ResponseDTO;
import com.examination.online_examination_server.dto.TeacherDTO;
import com.examination.online_examination_server.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("admin/api/v2/teacher")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private ResponseDTO responseDTO;

    // Save a new teacher
    @PostMapping("/saveTeacher")
    public ResponseEntity SaveTeacher(@RequestBody TeacherDTO teacherDTO) {
        try {
            String resp = teacherService.SaveTeacher(teacherDTO); // Save the teacher using teacherService
            if (resp.equals("00")) {
                responseDTO.setCode(VarList.RES_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(teacherDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else if (resp.equals("06")) {
                responseDTO.setCode(VarList.RES_DUPLICATE);
                responseDTO.setMessage("Teacher already exists");
                responseDTO.setContent(teacherDTO);
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

    // Get all teachers
    @GetMapping("/getAllTeachers")
    public ResponseEntity GetAllTeachers() {
        try {
            List<TeacherDTO> teacherList = teacherService.GetAllTeachers(); // Fetch all teachers
            responseDTO.setCode(VarList.RES_SUCCESS);
            responseDTO.setMessage("Success");
            responseDTO.setContent(teacherList);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            responseDTO.setCode(VarList.RES_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update an existing teacher
    @PutMapping("/updateTeacher")
    public ResponseEntity UpdateTeacher(@RequestBody TeacherDTO teacherDTO) {
        try {
            String resp = teacherService.UpdateTeacher(teacherDTO); // Update teacher using teacherService
            if (resp.equals("00")) {
                responseDTO.setCode(VarList.RES_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(teacherDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else if (resp.equals("01")) {
                responseDTO.setCode(VarList.RES_NO_DATE_FOUND);
                responseDTO.setMessage("Teacher Not Found");
                responseDTO.setContent(teacherDTO);
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

    // Delete a teacher by ID
    @DeleteMapping("/deleteTeacher/{id}")
    public ResponseEntity deleteTeacher(@PathVariable int id) {
        try {
            String res = teacherService.deleteTeacher(id); // Delete teacher using teacherService
            if (res.equals("00")) {
                responseDTO.setCode(VarList.RES_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else {
                responseDTO.setCode(VarList.RES_NO_DATE_FOUND);
                responseDTO.setMessage("No Teacher Available for this ID");
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

    // Search for a specific teacher by ID
    @GetMapping("/searchTeacher/{id}")
    public ResponseEntity SearchTeacher(@PathVariable int id) {
        try {
            TeacherDTO teacherDTO = teacherService.SearchTeacher(id); // Fetch teacher using teacherService
            if (teacherDTO != null) {
                responseDTO.setCode(VarList.RES_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(teacherDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else {
                responseDTO.setCode(VarList.RES_NO_DATE_FOUND);
                responseDTO.setMessage("Teacher Not Found for this ID");
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
