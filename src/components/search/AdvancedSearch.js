import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getGenres } from "../../services/GenreService";
import { useForm } from "react-hook-form";
import { FormInputText } from "../form/FormInputText";
import { MultipleSelect } from "../form/MultipleSelect";
import FormSelect from "../form/Select";
import classes from "./AdvancedSearch.module.css";
import { useSearchParams } from "react-router-dom";

function AdvancedSearch({onSearch}) {
    const [advancedExpanded, setAdvancedExpanded] = useState(false);
    const defaultValues = {
        query: "",
        anyOrAllGenres: "all",
        genres: [],
    };
    const [searchParams, setSearchParams] = useSearchParams();
    const [allGenres, setAllGenres] = useState([]);
    const { handleSubmit, reset, control, setValue, watch } = useForm({
        defaultValues: defaultValues,
    });

    useEffect(() => {
        getGenres().then((res) => {
            setAllGenres(res.data);
        });
    }, []);

    useEffect(() => {
        if (searchParams.get("r") === "1") {
            reset();
        }
    }, [searchParams]);

    function onSubmit(data) {
        onSearch(data);
    }

    return (
        <Accordion 
            expanded={advancedExpanded}
            onChange={() => {
                setAdvancedExpanded(!advancedExpanded);
            }}
            sx={{
                width: "500px",
                marginLeft: "auto!important",
                marginRight: "auto!important",
                marginBottom: "20px!important",
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="advanced-search-content"
                id="advanced-search-header"
            
            >
                <Typography variant="h6" sx={{marginLeft:"15px" }}>Advanced search</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className={classes.advanced}>
                    <FormInputText
                        name="query"
                        control={control}
                        label="Title"
                    />
                    <div className={classes.genres}>
                        <FormSelect
                            name="anyOrAllGenres"
                            control={control}
                            label="Any / All"
                            options={[
                                { value: "all", name: "All" },
                                { value: "any", name: "Any" },
                            ]}
                        />
                        <MultipleSelect
                            name="genres"
                            control={control}
                            label="Genres"
                            options={allGenres}
                        />
                    </div>
                    <Button
                        sx={{ width: "fit-content", marginLeft: "auto" }}
                        onClick={handleSubmit(onSubmit)}
                        variant={"contained"}
                    >
                       Search
                    </Button>
                </div>
            </AccordionDetails>
        </Accordion>
    );
}

export default AdvancedSearch;
