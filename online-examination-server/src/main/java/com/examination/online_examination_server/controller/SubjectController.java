package com.examination.online_examination_server.controller;

import com.examination.online_examination_server.Utility.VarList;
import com.examination.online_examination_server.dto.SubjectDTO;
import com.examination.online_examination_server.dto.ResponseDTO;
import com.examination.online_examination_server.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("admin/api/v2/subject")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;
    @Autowired
    private ResponseDTO responseDTO;

    // Save a new subject
    @PostMapping("/saveSubject")
    public ResponseEntity SaveSubject(@RequestBody SubjectDTO subjectDTO) {
        try {
            String resp = subjectService.SaveSubject(subjectDTO); // Save the subject using subjectService
            if (resp.equals("00")) {
                responseDTO.setCode(VarList.RES_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(subjectDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else if (resp.equals("06")) {
                responseDTO.setCode(VarList.RES_DUPLICATE);
                responseDTO.setMessage("Subject already exists");
                responseDTO.setContent(subjectDTO);
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

    // Get all subjects
    @GetMapping("/getAllSubjects")
    public ResponseEntity GetAllSubjects() {
        try {
            List<SubjectDTO> subjectList = subjectService.GetAllSubjects(); // Fetch all subjects
            responseDTO.setCode(VarList.RES_SUCCESS);
            responseDTO.setMessage("Success");
            responseDTO.setContent(subjectList);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            responseDTO.setCode(VarList.RES_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update an existing subject
    @PutMapping("/updateSubject")
    public ResponseEntity UpdateSubject(@RequestBody SubjectDTO subjectDTO) {
        try {
            String resp = subjectService.UpdateSubject(subjectDTO); // Update subject using subjectService
            if (resp.equals("00")) {
                responseDTO.setCode(VarList.RES_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(subjectDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else if (resp.equals("01")) {
                responseDTO.setCode(VarList.RES_NO_DATE_FOUND);
                responseDTO.setMessage("Subject Not Found");
                responseDTO.setContent(subjectDTO);
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

    // Delete a subject by ID
    @DeleteMapping("/deleteSubject/{id}")
    public ResponseEntity deleteSubject(@PathVariable int id) {
        try {
            String res = subjectService.deleteSubject(id); // Delete subject using subjectService
            if (res.equals("00")) {
                responseDTO.setCode(VarList.RES_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else {
                responseDTO.setCode(VarList.RES_NO_DATE_FOUND);
                responseDTO.setMessage("No Subject Available for this ID");
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

    // Search for a specific subject by ID
    @GetMapping("/searchSubject/{id}")
    public ResponseEntity SearchSubject(@PathVariable int id) {
        try {
            SubjectDTO subjectDTO = subjectService.SearchSubject(id); // Fetch subject using subjectService
            if (subjectDTO != null) {
                responseDTO.setCode(VarList.RES_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(subjectDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else {
                responseDTO.setCode(VarList.RES_NO_DATE_FOUND);
                responseDTO.setMessage("Subject Not Found for this ID");
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
