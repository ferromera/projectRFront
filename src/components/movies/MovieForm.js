import { useRef, useState } from "react";

import Card from "../ui/Card";
import classes from "./NewMovieForm.module.css";

function MovieForm(props) {
    const [title, setTitle] = useState(props.movie.title ? props.movie.title : "");
    const [year, setYear] = useState(props.movie.year ? props.movie.year : "");
    const [description, setDescription] = useState(props.movie.description  ? props.movie.description : "");

    const [selectedFile, setSelectedFile] = useState();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    function changeTitle(e) {
        setTitle(e.target.value);
    }
    function changeDescription(e) {
        setDescription(e.target.value);
    }
    function changeYear(e) {
        setYear(e.target.value);
    }

    function submitHandler(event) {
        event.preventDefault();

        const enteredTitle = title;
        const enteredDescription = description;

        const movieData = {
            id: props.movie.id,
            title: enteredTitle,
            year: year,
            file: selectedFile,
            description: enteredDescription,
        };
        props.onSubmitMovie(movieData);
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        required
                        id="title"
                        value={title}
                        onChange={changeTitle}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="year">Year</label>
                    <input
                        type="text"
                        required
                        id="year"
                        value={year}
                        onChange={changeYear}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="file"
                        onChange={changeHandler}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        required rows="5"
                        value={description}
                        onChange={changeDescription}
                    ></textarea>
                </div>
                <div className={classes.actions}>
                    <button>Add</button>
                </div>
            </form>
        </Card>
    );
}

export default MovieForm;
