function Login() {
    
  
    return (
      <div className="login">
        <h2>Welcome to chatSPA</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const email = formData.get("email");
            const password = formData.get("password");
            // if (typeof email === "string" && typeof password === "string")
            //   handleLogin(email, password);
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
        
      </div>
    );
  }
  export default Login;
  