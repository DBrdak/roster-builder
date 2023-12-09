import {Stack, useMediaQuery} from "@mui/material";
import React from "react";
import theme from "../theme";
import MobilePage from "./MobilePage";
import DesktopPage from "./DesktopPage";

export function MainPage() {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
                    <MobilePage/>
                    :
                    <DesktopPage />
                }
            </Stack>
        </div>
    );
}