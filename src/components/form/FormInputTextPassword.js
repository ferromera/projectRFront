
import React from "react";
import { FormInputTextBase } from "./FormInputTextBase";

export const FormInputTextPassword = (props) => {
    const { ...allProps } = {
        ...props,
        fields: { type: "password"}
      };
    return (
        <FormInputTextBase {...allProps} />      
    );
};
