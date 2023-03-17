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
