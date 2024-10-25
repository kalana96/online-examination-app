import axios from "axios";

class StudentService {
  static BASE_URL = "http://localhost:1010";

  // Add Student
  static async addStudent(data, token) {
    try {
      const response = await axios.post(
        `${StudentService.BASE_URL}/admin/api/v2/student/saveStudent`,data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  // Update Student
  static async updateStudent(data, token) {
    try {
      const response = await axios.put(
        `${StudentService.BASE_URL}/admin/api/v2/student/updateStudent`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  // Delete Student by ID
  static async deleteStudent(id, token) {
    try {
      const response = await axios.delete(
        `${StudentService.BASE_URL}/admin/api/v2/student/deleteStudent/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  // Get All Students
  static async getAllStudents(token) {
    try {
      const response = await axios.get(
        `${StudentService.BASE_URL}/admin/api/v2/student/getAllStudents`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  // Get Students by ID
  static async getStudentById(id, token){
    try{
        const response = await axios.get(`${StudentService.BASE_URL}/admin/api/v2/student/searchStudent/${id}`, 
        {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data;
    }catch(err){
        throw err;
    }
}
  
}

export default StudentService;
