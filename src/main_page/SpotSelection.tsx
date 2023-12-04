import {Button, Stack, useMediaQuery} from "@mui/material";
import theme from "../theme";

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

    const tileSize = () => {
        switch (selectedSpot) {
            case ("MDM"):
                return {
                    mdm: ['40vw', '400px', '36px', '1'],
                    d81: ['30vw', '300px', '28px', '0.2']
                }
            case ("D81"):
                return {
                    mdm: ['30vw', '300px', '28px', '0.2'],
                    d81: ['40vw', '400px', '36px', '1']
                }
            default:
                return {
                    mdm: ['40vw', '400px', '36px', '1'],
                    d81: ['40vw', '400px', '36px', '1']
                }
        }
    }

    return (
        <Stack spacing={5} direction={stackDir} width={'100%'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Button
                variant={'contained'}
                color='primary'
                style={{
                    width: tileSize().d81[0],
                    height: tileSize().d81[0],
                    maxWidth: tileSize().d81[1],
                    maxHeight: tileSize().d81[1],
                    fontSize: tileSize().d81[2],
                    opacity: tileSize().d81[3]
                }}
                onClick={() => handleTileClick('D81')}
            >
                D81
            </Button>
            <Button
                variant={'contained'}
                color='secondary'
                style={{
                    width: tileSize().mdm[0],
                    height: tileSize().mdm[0],
                    maxWidth: tileSize().mdm[1],
                    maxHeight: tileSize().mdm[1],
                    fontSize: tileSize().mdm[2],
                    opacity: tileSize().mdm[3]
                }}
                onClick={() => handleTileClick('MDM')}
            >
                MDM
            </Button>
        </Stack>
    );
};

export default SpotSelection;