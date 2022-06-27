import { InputLabel, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const FormInputTextBase = ({ name, control, label, rules, fields }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) => (
                <div>
                
                    <TextField
                        helperText={error ? error.message : ""}
                        size="small"
                        error={!!error}
                        onChange={onChange}
                        value={value}
                        fullWidth
                        label={label}
                        variant="outlined"
                        {... fields}
                    />
                </div>
            )}
        />
    );
};
