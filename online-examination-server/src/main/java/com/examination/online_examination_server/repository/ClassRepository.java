package com.examination.online_examination_server.repository;

import com.examination.online_examination_server.entity.Class;
import com.examination.online_examination_server.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClassRepository extends JpaRepository <Class, Integer> {

    // Custom query to find soft-deleted class
    @Query("SELECT s FROM Class s WHERE s.isDeleted = true")
    List<Class> findAllDeletedClass();
}
