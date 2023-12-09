import SpotSelection from "../components/SpotSelection";
import {DyspoGenerator} from "./DyspoGenerator";
import ManualBadge from "../components/ManualBadge";
import React, {useState} from "react";

export default function DesktopPage() {
    const [selectedSpot, setSelectedSpot] = useState('');

    return (
        <>
            <SpotSelection onClick={(spot) => setSelectedSpot(spot)} selectedSpot={selectedSpot}/>

            <div className={`content ${selectedSpot ? 'expanded' : ''}`}>
                <DyspoGenerator selectedSpot={selectedSpot}/>
            </div>

            <ManualBadge />
        </>
        )
}