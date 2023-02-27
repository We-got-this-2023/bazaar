export default function parseJWT(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    const { exp, ...rest } = JSON.parse(jsonPayload);
    if (exp < Date.now() / 1000) throw new Error("Token expired");
    return rest;
  } catch (err) {
    return null;
  }
}
