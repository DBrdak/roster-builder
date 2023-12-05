import {Container, Typography, useMediaQuery} from "@mui/material";
import {Content} from "./Content";
import SpotSelection from "./SpotSelection";
import {useState} from "react";
import theme from "../theme";

export function MainPage() {
    const [selectedSpot, setSelectedSpot] = useState('');
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div style={{ margin: 0, padding: 0, backgroundColor: '#121212' }}>
            <Container style={{
            minHeight: '100vh',
            minWidth: '100vw',
            display: 'flex',
            padding: '50px',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 60
            }}>
                {isMobile ?
                    <>
                        <Typography style={{ color: '#ffffff', fontSize: '50px', textAlign: 'center' }}>
                            {`Niestety na telefonie to nie zadziała`}
                            <br />
                            😢
                        </Typography>
                        <Typography style={{ color: '#ffffff', fontSize: '15px', textAlign: 'center' }}>
                            {`ale może kiedyś...`}
                        </Typography>
                        <Typography style={{ color: '#ffffff', fontSize: '10px', textAlign: 'center' }}>
                            {`jak mi się zachce to zrobie ok?`}
                        </Typography>
                        <Typography style={{ color: '#ffffff', fontSize: '5px', textAlign: 'center' }}>
                            {`albo i nie`}
                        </Typography>
                    </>
                    :
                    <>
                        <SpotSelection onClick={(spot) => setSelectedSpot(spot)} selectedSpot={selectedSpot}/>
                        <div className={`content ${selectedSpot ? 'expanded' : ''}`}>
                            <Content selectedSpot={selectedSpot}/>
                        </div>
                    </>
                }
            </Container>
        </div>
    );
}