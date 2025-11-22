export const saveToken = (token) => localStorage.setItem("hrms_token", token);
export const getToken = () => localStorage.getItem("hrms_token");
export const clearToken = () => localStorage.removeItem("hrms_token");
export const isAuthenticated = () => Boolean(getToken());
