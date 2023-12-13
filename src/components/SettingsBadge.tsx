import {Badge, IconButton} from "@mui/material";
import {Settings} from "@mui/icons-material";
import React from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../stores/store";
import {SettingsModal} from "./SettingsModal";

export default observer (function SettingsBadge() {
    const {modalStore} = useStore()

    return (
        <Badge style={{position: 'absolute', bottom: '15px', left: '15px'}}>
            <IconButton onClick={() => modalStore.openModal(<SettingsModal />)}>
                <Settings color={'info'} style={{fontSize: '60px'}}/>
            </IconButton>
        </Badge>
    )
})