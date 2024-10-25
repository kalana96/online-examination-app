package com.examination.online_examination_server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherDTO {
    private int id; // Unique registration number
    private String teacherName;
    private String nic;
    private String email;
    private String contactNo;
    private String address;
    private String qualification;
    private Integer age;
    private LocalDate dob;
    private String gender;
    private List<Integer> classes;
    private List<Integer> subjects;
}
