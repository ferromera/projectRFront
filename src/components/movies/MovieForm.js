import {
    Button,
    Paper
} from "@mui/material";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { getGenres } from "../../services/GenreService";
import FileInput from "../form/FileInput";
import { FormInputText } from "../form/FormInputText";
import { FormInputTextArea } from "../form/FormInputTextArea";
import { MultipleSelect } from "../form/MultipleSelect";

function MovieForm(props) {

    const defaultValues = {
        title: props.movie.title ? props.movie.title : "",
        originalTitle: props.movie.originalTitle ? props.movie.originalTitle : "",
        year: props.movie.year ? props.movie.year : "",
        description: props.movie.description ? props.movie.description : "",
        genres: props.movie.genres ?
            props.movie.genres.map((g) => { return g.name }) : []  
    };
    const [genres, setGenres] = useState([]);
    const [allGenres, setAllGenres] = useState([]);
    const { handleSubmit, reset, control, setValue, watch } = useForm({
        defaultValues: defaultValues,
    });
    
    const onSubmit = (data, event) => {
        event.preventDefault();
        const movieData = {
            id: props.movie.id,
            title: data.title,
            originalTitle: data.originalTitle,
            year: data.year,
            image: data.image ? data.image[0] : undefined,
            description: data.description,
            genres: JSON.stringify(data.genres)
        };
        
        props.onSubmitMovie(movieData);
    };
    useEffect(() => {
        getGenres().then((res) => {
            setAllGenres(res.data);
        });
    }, []);

    function genreChangeHandler(event) {
        const {
            target: { value },
        } = event;
        setGenres(typeof value === "string" ? value.split(",") : value);
    }

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
                name="originalTitle"
                control={control}
                label="Original Title"
                rules={{
                    required: { value: true, message: "Original Title is required" },
                }}
            />
            <FormInputText
                name="year"
                control={control}
                label="Year"
                rules={{
                    required: { value: true, message: "Year is required" },
                    pattern: {
                        value: /^[0-9]{4}$/,
                        message: "Valid format: YYYY",
                    },
                }}
            />
            <FormInputTextArea
                name="description"
                control={control}
                label="Description"
                rules={{
                    required: {
                        value: true,
                        message: "Description is required",
                    },
                }}
            />
            <MultipleSelect
                name="genres"
                control={control}
                label="Genres"
                options={allGenres}
            />
            <FileInput
                name="image"
                control={control}
                type=".jpg,.jpeg"
                maxSize="102400"
            />
            <Button
                sx={{ width: "fit-content", marginLeft: "auto" }}
                onClick={handleSubmit(onSubmit)}
                variant={"contained"}
            >
                {props.movie.id ? "Edit" : "Add"}
            </Button>
        </Paper>
    );
}

export default MovieForm;
