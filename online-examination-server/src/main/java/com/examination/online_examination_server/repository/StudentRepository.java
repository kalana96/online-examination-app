package com.examination.online_examination_server.repository;

import com.examination.online_examination_server.entity.Class;
import com.examination.online_examination_server.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudentRepository extends JpaRepository <Student, Integer> {

    // Custom query to find soft-deleted class
    @Query("SELECT s FROM Student s WHERE s.isDeleted = true")
    List<Student> findAllDeletedStudent();

    // Custom method to check if a student exists by registration number
    boolean existsByRegistrationNumber(String registrationNumber);

    // Custom method to find registration number
    boolean findByRegistrationNumber(String registrationNumber);
}
