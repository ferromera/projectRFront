import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

export const FormSelect = ({ name, control, label, options }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <div>
                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel size="small" id={name + "-input"}>{label}</InputLabel>
                        <Select
                            id={name}
                            labelId={name + "-input"}
                            size="small"
                            onChange={onChange}
                            value={value}
                            fullWidth
                            label={label}
                            
                        >
                            {options.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            )}
        />
    );
};
export default FormSelect;
