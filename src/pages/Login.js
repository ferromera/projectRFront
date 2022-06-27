import { Link } from "@mui/material";
import LoginForm from "../components/user/LoginForm";

function Login() {
    return (
        <section>
            <LoginForm />
            <Link
                sx={{
                    textAlign: "center",
                    display: "block",
                    marginTop: "20px",
                }}
                href="#/signup"
                underline="hover"
            >
                Sign up
            </Link>
        </section>
    );
}

export default Login;
