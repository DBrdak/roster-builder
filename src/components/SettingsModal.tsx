import {Button, ButtonGroup} from "@mui/material";
import React, {useState} from "react";
import SettingsForm from "./SettingsForm";

export function SettingsModal() {
    const [selectedSpot, setSelectedSpot] = useState<'D81' | 'MDM' | null>(null)

    return (
        <>
            <ButtonGroup fullWidth>
                <Button fullWidth color={'primary'}
                        onClick={() => setSelectedSpot('D81')}
                        variant={selectedSpot === 'D81' ? 'contained': 'outlined'}
                >
                    D81
                </Button>
                <Button fullWidth color={'secondary'}
                        onClick={() => setSelectedSpot('MDM')}
                        variant={selectedSpot === 'MDM' ? 'contained': 'outlined'}
                >
                    MDM
                </Button>
            </ButtonGroup>
            <div className={`content ${selectedSpot ? 'expanded' : ''}`}>
                {selectedSpot &&
                    <SettingsForm selectedSpot={selectedSpot}/>
                }
            </div>
        </>
    );
}