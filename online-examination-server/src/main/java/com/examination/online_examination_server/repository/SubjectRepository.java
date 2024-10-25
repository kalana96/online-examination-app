package com.examination.online_examination_server.repository;

import com.examination.online_examination_server.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SubjectRepository extends JpaRepository <Subject, Integer> {
    Optional<Subject> findByName(String name);
    // Custom query to find soft-deleted subjects
    @Query("SELECT s FROM Subject s WHERE s.isDeleted = true")
    List<Subject> findAllDeletedSubjects();
}
