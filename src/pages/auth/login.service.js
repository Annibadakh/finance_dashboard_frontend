import { apiHandler } from "../../api/apiHandler";
export const loginService = apiHandler(async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "aniket@gmail.com" && password === "password123") {
        resolve({
          status: 201,
          data: {
            message: "Login successful",
            data: {
              id: 1,
              name: "Aniket Badakh",
              email: email,
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC",
              role: "admin"
            }
          }
        });
      } else {
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