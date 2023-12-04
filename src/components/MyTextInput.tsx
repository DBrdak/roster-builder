import React from 'react';
import { TextField, FormControl } from '@mui/material';
import { useField } from 'formik';

interface Props {
    placeholder: string
    name: string
    label: string
    maxValue: number
    forbiddenValues: string[]
    color: 'primary' | 'secondary'
}

const MyTextInput: React.FC<Props> = ({ label, maxValue, color, forbiddenValues, ...props }) => {
    const [field, meta, helpers] = useField(props.name);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        forbiddenValues = forbiddenValues.filter(fnum => parseInt(fnum))

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

        // Filter numbers to not contain forbidden values
        if(value.endsWith(',')) {
            filteredNumbers = filteredNumbers.filter((num) => !Array.from(forbiddenValues).some((fnum) => fnum === num));
        }

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
                color={color}
                onChange={handleChange}
                label={label}
                variant="outlined"
                error={meta.touched && !!meta.error}
                style={{color: '#ffffff'}}
            />
        </FormControl>
    );
}

export default MyTextInput;
