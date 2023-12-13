import SpotSelection from "../components/SpotSelection";
import DyspoGenerator from "./DyspoGenerator";
import ManualBadge from "../components/ManualBadge";
import React from "react";
import {useStore} from "../stores/store";
import {observer} from "mobx-react-lite";

export default observer( function DesktopPage() {
    const {commonStore} = useStore()
    const {selectedSpot} = commonStore

    return (
        <>
            <SpotSelection />

            <div className={`content ${selectedSpot ? 'expanded' : ''}`}>
                <DyspoGenerator />
            </div>

            <ManualBadge />
        </>
        )
})