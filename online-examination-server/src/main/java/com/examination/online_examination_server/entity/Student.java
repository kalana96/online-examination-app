package com.examination.online_examination_server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "student") // Specifies the name of the table in the database
@SQLDelete(sql = "UPDATE student SET is_deleted = true, deleted_at = NOW() WHERE id = ?")
@Where(clause = "is_deleted = false")
public class Student {


    @Id // Primary key annotation for auto-incremented ID
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generated primary key
    private Long id; // Auto-incrementing primary key

    @Column(name = "registration_number", nullable = false, unique = true)
    private String registrationNumber; // Unique registration number (not the primary key)

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "nic", nullable = false, unique = true)
    private String nic;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "contact_no", nullable = false)
    private String contactNo;

    @Column(name = "address")
    private String address;

    @Column(name = "age")
    private Integer age;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "gender")
    private String gender;

    @Column(name = "class_id",nullable = false)
    private int cls;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    private Class classEntity;

    @ManyToMany
    @JoinTable(
    name = "student_subject",
    joinColumns = @JoinColumn(name = "student_id", referencedColumnName = "id"), // Reference to auto-incremented ID
    inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    private List<Subject> subjects;

    @Column(name = "profile_photo")
    private String profilePhoto;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt; // This field will store the deletion timestamp if soft deleted

    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted = false; // Soft delete flag
}
