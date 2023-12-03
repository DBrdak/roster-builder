import {Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography} from "@mui/material";
import {Form, Formik} from "formik";
import MyTextInput from "../components/MyTextInput";
import Month from "../models/month";
import InitFormValues from "../models/initFormValues";
import SpreadsheetFactory from "../models/spreadSheetFactory";

export function Content() {
    const initValues: InitFormValues = {
        spot: '',
        month: '',
        eventDays: [],
        closedDays: []
    }

    async function handleFormSubmit(values: InitFormValues) {
        const factory = new SpreadsheetFactory(
            values.spot,
            Month.fromValue(values.month),
            values.eventDays.map(day => parseInt(day)),
            values.closedDays.map(day => parseInt(day)))

        await factory.createAndDownloadSpreadsheet()
    }

    return (
        <Formik
            initialValues={initValues}
            onSubmit={async (values) => await handleFormSubmit(values)}
            validateOnMount={true}>
            {({handleSubmit, handleChange, isValid, values}) => (
                <Form style={{width: '100%'}} onSubmit={handleSubmit} autoComplete='off'>
                    <Stack direction={'column'} spacing={2}
                           style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <FormControl fullWidth>
                            <InputLabel>Lokal</InputLabel>
                            <Select
                                id={'spot'}
                                name={'spot'}
                                value={values.spot}
                                label="Lokal"
                                onChange={handleChange}
                            >
                                <MenuItem key={1} value={'D81'}>D81</MenuItem>
                                <MenuItem key={2} value={'MDM'}>MDM</MenuItem>
                            </Select>
                        </FormControl>
                        {values.spot.length > 0 &&
                            <FormControl fullWidth>
                                <InputLabel>Miesiąc</InputLabel>
                                <Select
                                    id={'month'}
                                    name={'month'}
                                    value={values.month}
                                    label="Miesiąc"
                                    onChange={handleChange}
                                >
                                    {Month.All.map(m =>
                                        <MenuItem key={m.id} value={m.value}>{m.value}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        }
                        {values.month &&
                            <>
                                <MyTextInput
                                    placeholder={'Eventy'}
                                    name={'eventDays'}
                                    label={'Eventy'}
                                    maxValue={Month.fromValue(values.month).days.size}
                                    forbiddenValues={values.closedDays}
                                />
                                <MyTextInput
                                    placeholder={'Dni zamknięte'}
                                    name={'closedDays'}
                                    label={'Dni zamknięte'}
                                    maxValue={Month.fromValue(values.month).days.size}
                                    forbiddenValues={values.eventDays}
                                />
                            </>
                        }
                        <Button
                            disabled={!isValid} type={'submit'} onClick={() => handleSubmit} variant={'contained'}>
                            <Typography>Pobierz</Typography>
                        </Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
}