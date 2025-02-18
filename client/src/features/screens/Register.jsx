import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleRegister } from "@/shared/auth/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    handleRegister({ email, password });
    navigate("/login");
  };

  return (
    <div
      id="auth-screen-wrapper"
      className="flex flex-col items-center justify-center w-screen h-screen"
    >
      <form
        className="flex flex-col gap-4 justify-around min-w-[400px] h-[300px] p-4 rounded shadow-sm"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <Input type="email" placeholder="Email" name="email" />
        <Input type="password" placeholder="Password" name="password" />
        <div
          id="action-buttons"
          className="flex justify-around items-center gap-4"
        >
          <Button type="submit">Register</Button>
          <Button>
            <a href="/login">Login</a>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Register;
