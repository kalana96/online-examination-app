package com.examination.online_examination_server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "teacher") // Specifies the name of the table in the database
@SQLDelete(sql = "UPDATE teacher SET is_deleted = true, deleted_at = NOW() WHERE id = ?")
@Where(clause = "is_deleted = false")
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String teacherName;

    @Column(nullable = false, unique = true)
    private String nic;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String contactNo;
    private String address;
    private String qualification;
    private Integer age;
    private LocalDate dob;
    private String gender;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "teacher_subjects",
            joinColumns = @JoinColumn(name = "teacher_id"),
            inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    private Set<Subject> subjects = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "teacher_classes",
            joinColumns = @JoinColumn(name = "teacher_id"),
            inverseJoinColumns = @JoinColumn(name = "class_id")
    )
    private Set<Class> classes = new HashSet<>();

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt; // This field will store the deletion timestamp if soft deleted

    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted = false; // Soft delete flag
}