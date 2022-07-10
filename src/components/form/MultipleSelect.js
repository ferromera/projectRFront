import {
    Box,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    useTheme,
} from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";

export const MultipleSelect = ({ name, control, label, rules, options }) => {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const { field, fieldState } = useController({
        name,
        control
    });
    const theme = useTheme();
    function getStyles(option, options, theme) {
        return {
            fontWeight:
                options.indexOf(option) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    function handleDelete(value) {
        const newValues = field.value.filter(function (v) {
            return v != value;
        })
        field.onChange(newValues)

    }
    
    return (
        <div>
            <FormControl sx={{ width: "100%" }}>
                <InputLabel size="small" id={name + "-input"}>
                    {label}
                </InputLabel>
                <Select
                    labelId={name + "-input"}
                    id={name}
                    size="small"
                    label={label}
                    multiple
                    value={field.value}
                    onChange={(e) => {
                        field.onChange(e)
                    }}
                    input={
                        <OutlinedInput size="small" id={name+"-outlined"} label={label} />
                    }
                    renderValue={(selected) => (
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                            }}
                        >
                            {selected.map((value) => (
                                <Chip
                                    size="small"
                                    key={value}
                                    label={value}
                                    clickable
                                    deleteIcon={
                                        <CancelIcon
                                            onMouseDown={(event) =>
                                                event.stopPropagation()
                                            }
                                        />
                                    }
                                    onDelete={(e) => handleDelete(value)}
                                />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {options.map((option) => (
                        <MenuItem
                            key={option.id}
                            value={option.name}
                            style={getStyles(option, options, theme)}
                        >
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};
