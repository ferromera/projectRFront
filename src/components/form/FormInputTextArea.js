
import React from "react";
import { FormInputTextBase } from "./FormInputTextBase";

export const FormInputTextArea = (props) => {
    const { ...allProps } = {
        ...props,
        fields: { multiline: true}
      };
    return (
        <FormInputTextBase {...allProps} />      
    );
};
