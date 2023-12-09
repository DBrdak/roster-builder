import {Button, Stack, useMediaQuery} from "@mui/material";
import theme from "../theme";
import {SpotButtonStyles, SpotButtonStylesBuilder} from "../models/primitives/spotButtonStyles";

interface Props {
    selectedSpot: string
    onClick: (spot: string) => void
}

const SpotSelection = ({onClick, selectedSpot}: Props) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleTileClick = (spot: string) => {
        onClick(spot)
    };

    const stackDir = isMobile ? 'column' : 'row'

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
        <Stack spacing={5} direction={stackDir} width={'100%'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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

export default SpotSelection;