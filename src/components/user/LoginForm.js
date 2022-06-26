import { Button, Paper, Typography } from "@mui/material";
import { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";
import UserContext from "../../store/UserContext";

import { FormInputText } from "../form/FormInputText";

function LoginForm(props) {
    const defaultValues = {
        username: "",
        password: "",
    };
    const methods = useForm({ defaultValues: defaultValues });
    const { handleSubmit, control, setError, formState: { errors } } = methods;
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const onLogin = (data, event) => {
        event.preventDefault();
        login(data).then(
            (data) => {
                userContext.setUser(data);
                navigate("/movies");
            },
            (error) => {
                const msg = error.response.status == 401 ? "Invalid username / password" : "An error ocurred."
                setError('username', { type: 'custom', message: '' })
                setError('password', { type: 'custom', message: '' })
                setErrorMessage(msg);
            }
        );
    };

    return (
        <Paper
            style={{
                display: "grid",
                margin: "auto",
                maxWidth: "300px",
                gridRowGap: "20px",
                padding: "20px",
            }}
        >
            <Typography style={{ color: "#d32f2f", textAlign: "center" }}>{errorMessage }</Typography>
            <FormInputText
                name="username"
                control={control}
                label="Username"
                rules={{
                    required: { value: true, message: "Username is required" },
                }}
            />
            <FormInputText
                name="password"
                control={control}
                label="Password"
                rules={{
                    required: { value: true, message: "Password is required" },
                }}
            />
            <Button
                sx={{ width: "fit-content", marginLeft: "auto" }}
                onClick={handleSubmit(onLogin)}
                variant={"contained"}
            >
                Login
            </Button>
        </Paper>
    );
}

export default LoginForm;
