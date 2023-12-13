import {Form, Formik} from "formik";
import {Stack, Switch, Typography} from "@mui/material";
import {observer} from "mobx-react-lite";
import {useStore} from "../stores/store";
import {Shift} from "../models/spreadsheetSettings";

export default observer(function SettingsForm(props: { selectedSpot: "D81" | "MDM" }) {
    const {commonStore} = useStore()

    const initValues = {
        shifts: commonStore.settings.getShifts(props.selectedSpot!)!,
        isEventOnLastShift: commonStore.settings.getIsEventOnLastDay(props.selectedSpot!)!
    }


    async function handleFormSubmit(values: {shifts: Shift[], isEventOnLastShift: boolean}) {
        console.log(values)
        return Promise.resolve(undefined);
    }

    const color = props.selectedSpot === 'D81' ? 'primary' :
        props.selectedSpot === 'MDM' ? 'secondary' :
            'default'

    return (
        <Formik
            initialValues={initValues}
            onSubmit={async (values) => await handleFormSubmit(values)}
            validateOnMount={true}>
            {({handleSubmit, values, setValues}) => (
                <Form style={{width: '100%'}} onSubmit={handleSubmit} autoComplete='off'>
                    <Stack direction={'column'} spacing={5}
                           style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Stack direction={'row'} spacing={3} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                            <Typography>Wyświetlanie eventów dla ostatniej zmiany</Typography>
                            <Switch checked={values.isEventOnLastShift} color={color}
                                    onClick={() => setValues({...values, isEventOnLastShift: !values.isEventOnLastShift})} />
                        </Stack>
                    </Stack>
                </Form>
            )}
        </Formik>
    )
})