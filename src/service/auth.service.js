import axios from 'axios';

const baseUrl = process.env.VUE_APP_BACKEND;
const SIGN_IN = "login";
const SIGN_UP = "signup";

class AuthService {
  login(user) {
    return axios
      .post(`${baseUrl}/${SIGN_IN}`, {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(`${baseUrl}/${SIGN_UP}`, {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();