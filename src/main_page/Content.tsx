import {Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography} from "@mui/material";
import {Form, Formik} from "formik";
import MyTextInput from "../components/MyTextInput";
import Month from "../models/month";
import InitFormValues from "../models/initFormValues";
import SpreadsheetFactory from "../models/spreadSheetFactory";
import * as Yup from 'yup';

interface ContentProps {
    selectedSpot: string
}

export function Content({selectedSpot}: ContentProps) {
    const initValues: InitFormValues = {
        month: Month.nextMonth().value,
        eventDays: [],
        closedDays: []
    }

    const validationSchema = Yup.object().shape({
        closedDays: Yup.array()
            .test('Dni zamknięcia i dni eventowe muszą być zbiorami rozłącznymi', 'Dni zamknięcia i dni eventowe muszą być zbiorami rozłącznymi', function (closedDays) {
                const eventDays: [] = this.resolve(Yup.ref('eventDays'));
                return !eventDays.some((value) => closedDays?.includes(value));
            }),
        eventDays: Yup.array()
            .test('Dni zamknięcia i dni eventowe muszą być zbiorami rozłącznymi', 'Dni zamknięcia i dni eventowe muszą być zbiorami rozłącznymi', function (eventDays) {
                const closedDays: [] = this.resolve(Yup.ref('closedDays'));
                return !closedDays.some((value) => eventDays?.includes(value));
            }),
    });

    async function handleFormSubmit(values: InitFormValues) {
        const factory = new SpreadsheetFactory(
            selectedSpot,
            Month.fromValue(values.month),
            values.eventDays.map(day => parseInt(day)),
            values.closedDays.map(day => parseInt(day)))

        await factory.createAndDownloadSpreadsheet()
    }

    const color = selectedSpot === 'D81' ? 'primary' : 'secondary'
    const hexcolor = selectedSpot === 'D81' ?'rgba(255,200,9,0.5)' : 'rgba(241,159,196,0.5)'

    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={initValues}
            onSubmit={async (values) => await handleFormSubmit(values)}
            validateOnMount={true}>
            {({handleSubmit, handleChange, isValid, values}) => (
                <Form style={{width: '100%'}} onSubmit={handleSubmit} autoComplete='off'>
                    <Stack direction={'column'} spacing={2}
                           style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {selectedSpot.length > 0 &&
                            <FormControl fullWidth color={color}>
                                <InputLabel>Miesiąc</InputLabel>
                                <Select
                                    color={color}
                                    id={'month'}
                                    name={'month'}
                                    value={values.month}
                                    label="Miesiąc"
                                    onChange={handleChange}
                                >
                                    {Month.All.map(m =>
                                        <MenuItem key={m.id} value={m.value} style={{backgroundColor: m.value === values.month ? hexcolor : 'inherit' }}>{m.value}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        }
                        {values.month && selectedSpot &&
                            <>
                                <MyTextInput
                                    placeholder={'Eventy'}
                                    name={'eventDays'}
                                    label={'Eventy'}
                                    maxValue={Month.fromValue(values.month).days.size}
                                    forbiddenValues={values.closedDays}
                                    color={color}
                                />
                                <MyTextInput
                                    placeholder={'Dni zamknięte'}
                                    name={'closedDays'}
                                    label={'Dni zamknięte'}
                                    maxValue={Month.fromValue(values.month).days.size}
                                    forbiddenValues={values.eventDays}
                                    color={color}
                                />
                                <Button color={color} disabled={!(selectedSpot && values.month && isValid)} type={'submit'} onClick={() => handleSubmit} variant={'contained'}>
                                    <Typography>Pobierz</Typography>
                                </Button>
                            </>
                        }
                    </Stack>
                </Form>
            )}
        </Formik>
    );
}