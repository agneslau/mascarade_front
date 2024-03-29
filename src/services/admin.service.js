import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/v1/users';

class AdminService {
  getUsers() {
    return axios.get(API_URL, { headers: authHeader() });
  }
}

export default new AdminService();