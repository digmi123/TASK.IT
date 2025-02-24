import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleLogin } from "@/shared/auth/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Mail from "@/assets/gmail.svg?react";

function Login() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    handleLogin({ email, password }, () => navigate("/"));
  };

  const navigateTest = (url) => {
    window.location.href = url;
  };
  const auth = async () => {
    const response = await axios.post("/api/auth/googleAuth");
    console.log({ response });
    navigateTest(response.data.url);
  };

  return (
    <div
      id="auth-screen-wrapper"
      className="flex flex-col items-center justify-center w-screen h-screen gap-4"
    >
      <form
        className="flex flex-col gap-4 justify-around min-w-[400px] h-[300px] p-4 rounded shadow-sm"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold">Enter Login Information</h1>
        <Input type="email" placeholder="Email" name="email" />
        <Input type="password" placeholder="Password" name="password" />
        <div
          id="action-buttons"
          className="flex justify-around items-center gap-4"
        >
          <Button type="submit">Login</Button>
          <Button>
            <a href="./register">Register</a>
          </Button>
        </div>

        <Button
          variant="ghost"
          className="border-2 rounded shadow-sm"
          onClick={auth}
        >
          <Mail /> Sign in with Gmail
        </Button>
      </form>
    </div>
  );
}

export default Login;
