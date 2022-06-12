import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

type Props = {
    control: Control<FieldValues, any>;
    name: string;
} & TextFieldProps;

const FormInputText: React.FC<Props> = (props) => {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field: { onChange, value } }) => <TextField value={value} onChange={onChange} {...props} />}
        />
    );
};

export default FormInputText;
