import parseJWT from "./parseJWT";

export default function attemptTokenLogin() {
  const localStorageToken = localStorage.getItem("token");
  if (localStorageToken) {
    const user = parseJWT(localStorageToken);
    if (user) return user;
    localStorage.removeItem("token");
    return null;
  }
}
