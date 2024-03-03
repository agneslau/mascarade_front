import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/v1/users';

class UserService {

  getUsers() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  addUser(user) {
    return axios.post(API_URL, user, { headers: authHeader() });
  }

  deleteUser(id) {
    return axios.delete(API_URL + '/' + id, { headers: authHeader() });
  }

  isNameTaken(name){
  const result = axios.get(API_URL + '/name/' + name, { headers: authHeader() });
  console.log(result)
  return result;
  }

  isEmailTaken(email) {
    return axios.get(API_URL + '/email/' + email, { headers: authHeader() });
  }
}

export default new UserService();