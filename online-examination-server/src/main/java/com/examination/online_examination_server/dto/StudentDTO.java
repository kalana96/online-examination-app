package com.examination.online_examination_server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDTO {
    private int id; // Unique registration number
    private String registrationNumber; // Unique registration number
    private String firstName;           // First name of the student
    private String middleName;          // Middle name of the student (optional)
    private String lastName;            // Last name of the student
    private String nic;                 // National Identity Card number
    private String email;               // Email of the student
    private String contactNo;           // Contact number of the student
    private String address;             // Address of the student
    private Integer age;                // Age of the student
    private LocalDate dob;              // Date of birth of the student
    private String gender;              // Gender of the student
    private int cls;               // ID of the class the student belongs to
    private List<Long> subjectIds;      // List of subject IDs associated with the student
    private String profilePhoto;        // URL or path to the student's profile photo
}
