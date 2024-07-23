"use client"

import { useDispatch } from "react-redux";
import { setIsRegister, setLoggedInUser } from "../../store/userSlice";
import { signInUser } from "../_services/auth";
import { supabase } from "../_services/supabase";
//import { signInUser } from "../services/auth";
//import supabase from "../services/supabase";

function Login() {
  const dispatch = useDispatch();
  async function handleLogin(email: string, password: string) {
    try {
      const authResponse = await signInUser(email, password);
      if (authResponse.error) {
        throw new Error(authResponse.error);
      }
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", authResponse.user_id);

      if (data) {
        dispatch(setLoggedInUser(data[0])); //user is a object
      } else {
        console.error(error);
        alert("Invalid credentials");
      }
    } catch (error: any) {
      const errorMessage = "Error logging in user: " + error.message;
      alert(errorMessage);
      console.error(errorMessage);
    }
  }

  return (
    
      <div className="login">
        <h2>Welcome to chatSPA</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const email = formData.get("email");
            const password = formData.get("password");
            if (typeof email === "string" && typeof password === "string")
              handleLogin(email, password);
          }}
        >
          <label>
            Email:
            <input type="text" name="email" required />
          </label>
          <label>
            Password:
            <input type="password" name="password" required />
          </label>

          <button type="submit">Login</button>
        </form>
        <br></br>
        <br></br>
        <br></br>
        <p>
          If you dont have an account , please :
          <button onClick={() => dispatch(setIsRegister(true))}>
            Register
          </button>
        </p>
      </div>
    
  );
}
export default Login;
