import { apiHandler } from "../../api/apiHandler";
export const loginService = apiHandler(async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@payflow.com" && password === "password123") {
        resolve({
          status: 201,
          data: {
            message: "Admin User",
            data: {
              id: 1,
              name: "Aniket Badakh",
              email: email,
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC",
              role: "admin"
            }
          }
        });
      } else if (email === "viewer@payflow.com" && password === "password123") {
        resolve({
          status: 201,
          data: {
            message: "Login successful",
            data: {
              id: 1,
              name: "Viewer User",
              email: email,
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC",
              role: "viewer"
            }
          }
        });
      }
      else {
        reject({
          response: {
            status: 401,
            data: {
              message: "Invalid email or password"
            }
          }
        });
      }
    }, 1500);
  });
});