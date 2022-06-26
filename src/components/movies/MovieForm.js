import { Button, Paper, Typography } from "@mui/material";
import { useRef, useState } from "react";

import { useForm } from "react-hook-form";
import FileInput from "../form/FileInput";
import { FormInputText } from "../form/FormInputText";
import { FormInputTextArea } from "../form/FormInputTextArea";

import Card from "../ui/Card";
import classes from "./NewMovieForm.module.css";

function MovieForm(props) {
    const defaultValues = {
        title: props.movie.title ? props.movie.title : "",
        year: props.movie.year ? props.movie.year : "",
        description: props.movie.description ? props.movie.description : "",
    };
    const methods = useForm({ defaultValues: defaultValues });
    const { handleSubmit, reset, control, setValue, watch } = methods;
    const onSubmit = (data, event) => {
        event.preventDefault();
         const movieData = {
             id: props.movie.id,
             title: data.title,
             year: data.year,
             image: data.image ? data.image[0] : undefined,
             description: data.description,
         };
         props.onSubmitMovie(movieData);
    };

    return (
        <Paper
            style={{
                display: "grid",
                gridRowGap: "20px",
                padding: "20px",
            }}
        >
            <FormInputText
                name="title"
                control={control}
                label="Title"
                rules={{
                    required: { value: true, message: "Title is required" },
                }}
            />
            <FormInputText
                name="year"
                control={control}
                label="Year"
                rules={{
                    required: { value: true, message: "Year is required" },
                    pattern: { value: /^[0-9]{4}$/, message: "Valid format: YYYY" }
                
                }}
            />
            <FormInputTextArea
                name="description"
                control={control}
                label="Description"
                rules={{
                    required: { value: true, message: "Description is required" },
                }}
            />
            <FileInput name="image" control={control} type=".jpg,.jpeg" maxSize="102400" />
            <Button sx={{width:"fit-content", marginLeft:"auto"}} onClick={handleSubmit(onSubmit)} variant={"contained"}>
                {props.movie.id ? "Edit" : "Add"}
            </Button>
        </Paper>
    );
}

export default MovieForm;
