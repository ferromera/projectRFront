import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './NewMovieForm.module.css';

function NewMovieForm(props) {
    const titleInputRef = useRef();
    const imageInputRef = useRef();
    const descriptionInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredImage = imageInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

        const movieData = {
            title: enteredTitle,
            image: enteredImage,
            description: enteredDescription,
        };

        props.onAddMovieData(movieData)
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='title'>Title</label>
                    <input type='text' required id='title' ref={titleInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='image'>Image</label>
                    <input type='url' required id='image' ref={imageInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        id='description'
                        required
                        rows='5'
                        ref={descriptionInputRef}
                    ></textarea>
                </div>
                <div className={classes.actions}>
                    <button>Add</button>
                </div>
            </form>
        </Card>
    );
}

export default NewMovieForm;