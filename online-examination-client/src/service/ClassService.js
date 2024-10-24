import axios from "axios";

class ClassService{
    static BASE_URL = "http://localhost:1010"

    static async addClass(classData, token) {
        try {
          const response = await axios.post(`${ClassService.BASE_URL}/admin/api/v2/class/saveClass`, classData, {
            headers: { Authorization: `Bearer ${token}` }
          });
          return response.data;
        } catch (err) {
          throw err;
        }
      }


      static async updateClass(classData, token){
        try{
            const response = await axios.put(`${ClassService.BASE_URL}/admin/api/v2/class/updateClass`, classData,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


      static async deleteClass(id, token){
        try{
            const response = await axios.delete(`${ClassService.BASE_URL}/admin/api/v2/class/deleteClass/${id}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async getAllClass(token){
        try{
            const response = await axios.get(`${ClassService.BASE_URL}/admin/api/v2/class/getAllClass`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }
    


    static async getYourProfile(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/adminuser/get-profile`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getUserById(userId, token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-users/${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


 

    /**AUTHENTICATION CHECKER */
    // static logout(){
    //     localStorage.removeItem('token')
    //     localStorage.removeItem('role')
    // }

    // static isAuthenticated(){
    //     const token = localStorage.getItem('token')
    //     return !!token
    // }

    // static isAdmin(){
    //     const role = localStorage.getItem('role')
    //     return role === 'ADMIN'
    // }

    // static isStudent(){
    //     const role = localStorage.getItem('role')
    //     return role === 'STUDENT'
    // }

    // static isTeacher(){
    //     const role = localStorage.getItem('role')
    //     return role === 'TEACHER'
    // }

    // static adminOnly(){
    //     return this.isAuthenticated() && this.isAdmin();
    // }

}

export default ClassService;