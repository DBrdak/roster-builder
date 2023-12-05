import {Stack, Tooltip, Typography, useMediaQuery} from "@mui/material";
import {Content} from "./Content";
import SpotSelection from "./SpotSelection";
import React, {useState} from "react";
import theme from "../theme";
import {Help} from "@mui/icons-material";

export function MainPage() {
    const [selectedSpot, setSelectedSpot] = useState('');
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const manual =
        [`Instrukcja:` ,
        `1. Wybierz lokal dla którego chcesz wygenerować arkusz` ,
        `2. Wybierz miesiąc (automatycznie zostanie wybrany miesiąc następny)` ,
        `3. Zaznacz na widoku miesiąca dni w które będą eventy oraz dni w które nie pracujemy` ,
        `    a) Eventy zaznaczasz lewym przyciskiem myszy(LPM)` ,
        `    b) Dni zamknięcia zaznaczasz prawym przyciskiem myszy(PPM) lub ctrl+LPM` ,
        `4. Kliknij pobierz aby wygenerować arkusz`].join(`\n`)

    console.log(manual)

    return (
        <div style={{
            margin: 0,
            padding: 0,
            backgroundColor: '#121212',
            overflowX: 'hidden',
            overflowY: 'auto'
        }}>
            <Stack
                spacing={8}
                style={{
                minHeight: '100vh',
                minWidth: '100vw',
                display: 'flex',
                padding: isMobile ? "5px" : '50px',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
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

                        <Tooltip title={
                            <Typography color={'info'}>
                                1) Wybierz lokal dla którego chcesz wygenerować arkusz<br/>
                                2) Wybierz miesiąc (automatycznie zostanie wybrany miesiąc następny)<br/>
                                3) Zaznacz na widoku miesiąca dni w które będą eventy oraz dni w które nie pracujemy<br/>
                                3a) Eventy zaznaczasz lewym przyciskiem myszy(LPM)<br/>
                                3b) Dni zamknięcia zaznaczasz prawym przyciskiem myszy(PPM) lub CTRL+LPM<br/>
                                4) Kliknij pobierz aby wygenerować arkusz<br/>
                            </Typography>}
                        >
                            <Help color={'info'} fontSize={'large'} />
                        </Tooltip>
                    </>
                }
            </Stack>
        </div>
    );
}