package com.examination.online_examination_server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "Subject")
@SQLDelete(sql = "UPDATE Subject SET is_deleted = true, deleted_at = NOW() WHERE id = ?")
@Where(clause = "is_deleted = false")
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String subjectName;
    private String description;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt; // This field will store the deletion timestamp if soft deleted

    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted = false; // Soft delete flag

    @ManyToMany(mappedBy = "subjects", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Teacher> teachers = new HashSet<>();

    // Getters and setters
}
