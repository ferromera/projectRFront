import { Button, FormLabel, Input } from "@mui/material";
import { useState } from "react";
import { useController } from "react-hook-form";

const FileInput = ({ control, name, type, maxSize }) => {
    const { field, fieldState } = useController({
        name,
        control,
        rules: { validate: isNotMaxSize },
    });
    const [value, setValue] = useState("");
    const [fileName, setFileName] = useState("");
    const [isMaxSize, setIsMaxSize] = useState(false);
    function isNotMaxSize() {
        return !isMaxSize;
    }
    return (
        <label style={{ width: "fit-content" }}>
            <FormLabel sx={{ marginRight: "10px" }}>Image:</FormLabel>
            <Input
                type="file"
                id={name}
                label={name}
                inputProps={{ accept: type }}
                sx={{ display: "none" }}
                value={value}
                onChange={(e) => {
                    if (maxSize && e.target.files[0]) {
                        if (e.target.files[0].size > maxSize) {
                            setIsMaxSize(true);
                        } else {
                            setIsMaxSize(false);
                        }
                        let split = e.target.value.split("\\");
                        setFileName(split[split.length - 1]);
                    }
                    setValue(e.target.value);
                    field.onChange(e.target.files);
                }}
            />
            <Button
                size="small"
                sx={{ width: "fit-content", marginRight: "20px" }}
                variant="contained"
                component="span"
            >
                Upload
            </Button>
            <span>{fileName}</span>
            <span style={{ color: "#d32f2f", marginLeft: " 10px" }}>
                {isMaxSize
                    ? "Max size is " + parseInt(maxSize / 1024) + "KB"
                    : ""}
            </span>
        </label>
    );
};

export default FileInput;
