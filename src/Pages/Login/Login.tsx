import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/authContext";
import type { LoginData } from "../../types";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginData, setloginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState<LoginData>({
    username: "",
    password: "",
  });

  const validateLogin = () => {
    const newErrors = {
      username: "",
      password: "",
    };

    if (
      loginData.username.trim().length < 4 ||
      loginData.username.trim().length > 30
    ) {
      newErrors.username = "Username must be between 4 and 30 characters.";
    }

    if (
      loginData.password.trim().length < 4 ||
      loginData.password.trim().length > 30
    ) {
      newErrors.password = "Password must be between 4 and 30 characters.";
    }

    setLoginErrors(newErrors);

    return !newErrors.username && !newErrors.password;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setloginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setLoginErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleLogin = () => {
    if (validateLogin()) {
      login();
        
      navigate("/table");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.cellContainer}>
          <label htmlFor="username">Username: </label>
          <input
            className={styles.input}
            type="text"
            name="username"
            id="username"
            value={loginData.username}
            placeholder="username"
            onChange={handleChange}
          />
        </div>
        {loginErrors.username && (
          <p className={styles.errorMessage}>{loginErrors.username}</p>
        )}
        <div className={styles.cellContainer}>
          <label htmlFor="password">Password: </label>
          <input
            className={styles.input}
            type="password"
            name="password"
            id="password"
            value={loginData.password}
            placeholder="password"
            onChange={handleChange}
          />
        </div>
        {loginErrors.password && (
          <p className={styles.errorMessage}>{loginErrors.password}</p>
        )}
        <button
          type="button"
          onClick={handleLogin}
          disabled={loginErrors.username || loginErrors.password ? true : false}
        >
          LogIn
        </button>
      </form>
    </div>
  );
};

export default Login;
