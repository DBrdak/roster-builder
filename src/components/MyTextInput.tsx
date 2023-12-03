import React from 'react';
import { TextField, FormControl, Tooltip, FilledInputProps, InputProps, OutlinedInputProps } from '@mui/material';
import { useField } from 'formik';

interface Props {
    placeholder: string
    name: string
    label: string
    maxValue: number
    forbiddenValues: string[]
}

const MyTextInput: React.FC<Props> = ({ label, maxValue, forbiddenValues, ...props }) => {
    const [field, meta, helpers] = useField(props.name);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Remove non-digit and non-comma characters
        value = value.replace(/[^0-9,]/g, '');

        // Separate into numbers
        const numbers = value.split(',');

        // Filter each number to keep only 2 digits
        let filteredNumbers = numbers.map((num) => num.slice(0, 2));

        // Filter each number to not exceed max day value in month
        if(filteredNumbers.some(num => parseInt(num) > maxValue))
            filteredNumbers = filteredNumbers.map(num => String(Math.min(maxValue, parseInt(num))))

        // Filter numbers to not contain duplicates
        filteredNumbers = Array.from(new Set(filteredNumbers));
        console.log(Array.from(forbiddenValues))
        // Filter numbers to not contain forbidden values
        filteredNumbers = filteredNumbers.map((num) => Array.from(forbiddenValues).some((fnum) => fnum === num) ? '' : num);

        // Join the filtered numbers back with commas
        value = filteredNumbers.join(',');

        // Remove leading comma
        if (value.startsWith(',')) {
            value = value.slice(1);
        }

        helpers.setValue(value.split(','));
    };

    return (
        <FormControl error={meta.touched && !!meta.error} fullWidth>
            <TextField
                {...field}
                {...props}
                onChange={handleChange}
                label={label}
                variant="outlined"
                error={meta.touched && !!meta.error}
            />
        </FormControl>
    );
}

export default MyTextInput;
