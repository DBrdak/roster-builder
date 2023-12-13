import {Button, Stack} from "@mui/material";
import {SpotButtonStyles, SpotButtonStylesBuilder} from "../models/primitives/spotButtonStyles";
import {useStore} from "../stores/store";
import {observer} from "mobx-react-lite";

const SpotSelection = () => {
    const {commonStore} = useStore()
    const {selectedSpot} = commonStore

    const handleTileClick = (spot: string) => {
        commonStore.setSelectedSpot(spot)
    };

    const buttonStyles = (): SpotButtonStyles => {
        switch (selectedSpot) {
            case ("MDM"):
                return SpotButtonStylesBuilder.mdmSelected()
            case ("D81"):
                return SpotButtonStylesBuilder.d81Selected()
            default:
                return SpotButtonStylesBuilder.neitherSelected()
        }
    }

    return (
        <Stack spacing={5} direction={'row'} width={'100%'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Button
                variant={buttonStyles().mdm.variant}
                color='secondary'
                style={{
                    width: buttonStyles().mdm.size,
                    height: buttonStyles().mdm.size,
                    maxWidth: buttonStyles().mdm.maxSize,
                    maxHeight: buttonStyles().mdm.maxSize,
                    fontSize: buttonStyles().mdm.fontSize,
                    opacity: buttonStyles().mdm.opacity,
                    borderWidth: '3px'
                }}
                onClick={() => handleTileClick('MDM')}
            >
                MDM
            </Button>
            <Button
                variant={buttonStyles().d81.variant}
                color='primary'
                style={{
                    width: buttonStyles().d81.size,
                    height: buttonStyles().d81.size,
                    maxWidth: buttonStyles().d81.maxSize,
                    maxHeight: buttonStyles().d81.maxSize,
                    fontSize: buttonStyles().d81.fontSize,
                    opacity: buttonStyles().d81.opacity,
                    borderWidth: '3px'
                }}
                onClick={() => handleTileClick('D81')}
            >
                D81
            </Button>
        </Stack>
    );
};

export default observer (SpotSelection);