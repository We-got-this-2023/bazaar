import axios from "axios";

export async function onRegistration(registrationData: any) {
  return await axios.post(
    "http://localhost:3000/auth/register",
    registrationData
  );
}

export async function onLogin(loginData: any) {
  return await axios.post("http://localhost:3000/auth/login", loginData, {
    withCredentials: true,
  });
}

export async function userData(user: any) {
  return await axios.get(`http://localhost:3000/auth/${user}`, {
    withCredentials: true,
  });
}
