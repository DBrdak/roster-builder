import {Container} from "@mui/material";
import {Content} from "./Content";
import SpotSelection from "./SpotSelection";
import {useState} from "react";

export function MainPage() {
    const [selectedSpot, setSelectedSpot] = useState('');

    return (
        <div style={{ margin: 0, padding: 0, overflow: 'hidden', backgroundColor: '#121212' }}>
            <Container style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 100 }}>
                <SpotSelection onClick={(spot) => setSelectedSpot(spot)} selectedSpot={selectedSpot} />
                <div className={`content ${selectedSpot ? 'expanded' : ''}`}>
                    <Content selectedSpot={selectedSpot} />
                </div>
            </Container>
        </div>
    );
}