package com.examination.online_examination_server.service;

import com.examination.online_examination_server.Utility.VarList;
import com.examination.online_examination_server.dto.TeacherDTO;
import com.examination.online_examination_server.entity.Subject;
import com.examination.online_examination_server.entity.Teacher;
import com.examination.online_examination_server.repository.ClassRepository;
import com.examination.online_examination_server.repository.SubjectRepository;
import com.examination.online_examination_server.repository.TeacherRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private ModelMapper modelMapper;

    // Save a new teacher
    public String SaveTeacher(TeacherDTO teacherDTO) {
        if (teacherRepository.existsById(teacherDTO.getId())) {
            return VarList.RES_DUPLICATE; // Return a duplicate response if teacher already exists
        } else {
            teacherRepository.save(modelMapper.map(teacherDTO, Teacher.class)); // Save the teacher entity
            return VarList.RES_SUCCESS;
        }
    }


    // Save teacher and handle classes and subjects
    public Teacher saveTeacher(TeacherDTO teacherDTO) {
        Teacher teacher = new Teacher();
        teacher.setTeacherName(teacherDTO.getTeacherName());
        teacher.setNic(teacherDTO.getNic());
        teacher.setEmail(teacherDTO.getEmail());
        teacher.setContactNo(teacherDTO.getContactNo());
        teacher.setAddress(teacherDTO.getAddress());
        teacher.setQualification(teacherDTO.getQualification());
        teacher.setAge(teacherDTO.getAge());
        teacher.setDob(teacherDTO.getDob());
        teacher.setGender(teacherDTO.getGender());

        // Handle many-to-many relationship for classes
        Set<Class> classSet = teacherDTO.getClasses().stream()
                .map(classId -> classRepository.findById(classId)
                        .orElseThrow(() -> new RuntimeException("Class not found: " + classId)))
                .collect(Collectors.toSet());
        teacher.setClasses(classSet);

        // Handle many-to-many relationship for subjects
        Set<Subject> subjectSet = teacherDTO.getSubjects().stream()
                .map(subjectName -> subjectRepository.findByName(subjectName)
                        .orElseThrow(() -> new RuntimeException("Subject not found: " + subjectName)))
                .collect(Collectors.toSet());
        teacher.setSubjects(subjectSet);

        // Save teacher to the database
        return teacherRepository.save(teacher);
    }



    // Retrieve all teachers
    public List<TeacherDTO> GetAllTeachers() {
        List<Teacher> teacherList = teacherRepository.findAll(); // Fetch all teachers
        return modelMapper.map(teacherList, new TypeToken<List<TeacherDTO>>(){}.getType()); // Convert to DTO
    }

    // Search for a specific teacher by id
    public TeacherDTO SearchTeacher(int id) {
        if (teacherRepository.existsById(id)) {
            Teacher teacher = teacherRepository.findById(id).orElse(null); // Fetch teacher by ID
            return modelMapper.map(teacher, TeacherDTO.class); // Map to DTO
        } else {
            return null; // Return null if teacher doesn't exist
        }
    }

    // Update an existing teacher
    public String UpdateTeacher(TeacherDTO teacherDTO) {
        if (teacherRepository.existsById(teacherDTO.getId())) {
            teacherRepository.save(modelMapper.map(teacherDTO, Teacher.class)); // Update teacher if it exists
            return VarList.RES_SUCCESS;
        } else {
            return VarList.RES_NO_DATE_FOUND; // Return a "no data found" response if teacher doesn't exist
        }
    }

    // Soft delete a teacher by NIC
    public String deleteTeacher(int id) {
        Optional<Teacher> teacherOptional = teacherRepository.findById(id);
        if (teacherOptional.isPresent()) {
            Teacher teacher = teacherOptional.get();
            if (!teacher.isDeleted()) {
                teacherRepository.deleteById(id); // Trigger the soft delete SQL
                return VarList.RES_SUCCESS; // Success code
            } else {
                return VarList.RES_ALREADY_DELETED; // Teacher is already deleted
            }
        } else {
            return VarList.RES_NO_DATE_FOUND; // Return a "no data found" response if teacher doesn't exist
        }
    }
}
