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
@Table(name = "Class")
@SQLDelete(sql = "UPDATE Class SET is_deleted = true, deleted_at = NOW() WHERE id = ?")
@Where(clause = "is_deleted = false")
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String className;
    private String description;

    @ManyToMany(mappedBy = "classes")
    private Set<Teacher> teachers = new HashSet<>();

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt; // This field will store the deletion timestamp if soft deleted

    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted = false; // Soft delete flag

    @ManyToMany(mappedBy = "classes", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Teacher> teacherss = new HashSet<>();
}
