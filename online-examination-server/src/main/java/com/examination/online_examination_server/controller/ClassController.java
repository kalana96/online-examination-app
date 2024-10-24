package com.examination.online_examination_server.controller;

import com.examination.online_examination_server.Utility.VarList;
import com.examination.online_examination_server.dto.ClassDTO;
import com.examination.online_examination_server.dto.ResponseDTO;
import com.examination.online_examination_server.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("admin/api/v2/class")
public class ClassController {

    @Autowired
    private ClassService classService;
    @Autowired
    private ResponseDTO responseDTO;


    @PostMapping("/saveClass")
    public ResponseEntity SaveEmployee(@RequestBody ClassDTO classDTO){
        try {
            String resp = classService.SaveClass(classDTO);
            if (resp.equals("00")){
                responseDTO.setCode(VarList.RES_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(classDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else if (resp.equals("06")) {
                responseDTO.setCode(VarList.RES_DUPLICATE);
                responseDTO.setMessage("Class already exist");
                responseDTO.setContent(classDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }else {
                responseDTO.setCode(VarList.RES_FAILURE);
                responseDTO.setMessage("Error");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex){
            responseDTO.setCode(VarList.RES_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAllClass")
    public ResponseEntity GetAllClass(){
        try {
            List<ClassDTO > empList = classService.GetAllClass();
            responseDTO.setCode(VarList.RES_SUCCESS);
            responseDTO.setMessage("Success");
            responseDTO.setContent(empList);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
        }catch (Exception ex){
            responseDTO.setCode(VarList.RES_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateClass")
    public ResponseEntity UpdateClass(@RequestBody ClassDTO classDTO){
        try {
            String resp = classService.UpdateClass(classDTO);
            if (resp.equals("00")){
                responseDTO.setCode(VarList.RES_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(classDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else if (resp.equals("01")) {
                responseDTO.setCode(VarList.RES_NO_DATE_FOUND);
                responseDTO.setMessage("Class Not Found");
                responseDTO.setContent(classDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }else {
                responseDTO.setCode(VarList.RES_FAILURE);
                responseDTO.setMessage("Error");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex){
            responseDTO.setCode(VarList.RES_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteClass/{id}")
    public ResponseEntity deleteClass(@PathVariable int id){
        try {
            String res = classService.deleteClass(id);
            if (res.equals("00")) {
                responseDTO.setCode(VarList.RES_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else {
                responseDTO.setCode(VarList.RES_NO_DATE_FOUND);
                responseDTO.setMessage("No Class Available For this empID");
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

    @GetMapping("/searchClass/{id}")
    public ResponseEntity SearchEmployee(@RequestBody int id){
        try {
            ClassDTO employeeDTO = classService.SearchClass(id);
            if (employeeDTO !=null){
                responseDTO.setCode(VarList.RES_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(employeeDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            }else {
                responseDTO.setCode(VarList.RES_NO_DATE_FOUND);
                responseDTO.setMessage("Class Not Found for this id");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex){
            responseDTO.setCode(VarList.RES_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

