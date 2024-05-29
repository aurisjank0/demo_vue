import axios from 'axios';

const baseUrl = process.env.VUE_APP_BACKEND_AUTH;
const SIGN_IN = "login";
const SIGN_UP = "signup";

class AuthService {
    login(user) {
        return axios
            .post(`${baseUrl}/${SIGN_IN}`, {
                email: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.token) {
                    console.log(response.data)
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