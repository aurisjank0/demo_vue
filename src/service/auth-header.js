export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    console.log(user.token);
    return { Authorization: "Bearer " + user.token }; // for Spring Boot back-end
  } else {
    return {};
  }
}