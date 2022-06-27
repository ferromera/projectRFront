import { Button, Paper, Typography } from "@mui/material";
import { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/AuthService";
import UserContext from "../../store/UserContext";

import { FormInputText } from "../form/FormInputText";
import { FormInputTextPassword } from "../form/FormInputTextPassword";

function SignUpForm(props) {
    const defaultValues = {
        username: "",
        password: "",
    };
    const methods = useForm({ defaultValues: defaultValues });
    const { handleSubmit, control, setError, formState: { errors } } = methods;
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    const onSignUp = (data, event) => {
        event.preventDefault();
        signup(data).then(
            (data) => {
                userContext.setUser(data);
                navigate("/");
            },
            (error) => {
                const msg = error.response.data?.status;
                setErrorMessage(msg ? msg : "An error ocurred");
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
                    minLength: { value: 3, message: "Username must have at least 3 characters." },
                    maxLength: { value: 20, message: "Username must have at most 20 characters." },
                }}
            />
            <FormInputText
                name="email"
                control={control}
                label="Email"
                rules={{
                    required: { value: true, message: "Username is required" },
                    pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Invalid email." },
                }}
            />
            <FormInputTextPassword
                name="password"
                control={control}
                label="Password"
                rules={{
                    required: { value: true, message: "Password is required" },
                    minLength: { value: 6, message: "Password must have at least 6 characters." },
                    maxLength: { value: 20, message: "Password must have at most 20 characters." },
                }}
            />
            <Button
                sx={{ width: "fit-content", marginLeft: "auto" }}
                onClick={handleSubmit(onSignUp)}
                variant={"contained"}
            >
                Sign up
            </Button>
        </Paper>
    );
}

export default SignUpForm;
