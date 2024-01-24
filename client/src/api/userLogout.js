export const userLogout = async () => {
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const path = "/oauth2/logout";

  try {
    const response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });
    if (!response.ok)
      throw new Error(`Request failed with status ${response.status}`);
    return true;
  } catch (e) {
    console.error("userLogout Error: ", e.message);
    return false;
  }
};
