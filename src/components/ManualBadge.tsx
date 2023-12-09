import {Badge, Tooltip, Typography} from "@mui/material";
import {Help} from "@mui/icons-material";
import React from "react";

export default function ManualBadge() {
    return (
        <Badge style={{position: 'absolute', bottom: '15px', right: '15px'}}>
            <Tooltip placement={'left'} title={
                <Typography color={'info'}>
                    1) Wybierz lokal dla którego chcesz wygenerować arkusz<br/>
                    2) Wybierz miesiąc (automatycznie zostanie wybrany miesiąc następny)<br/>
                    3) Zaznacz na widoku miesiąca dni w które będą eventy oraz dni w które nie pracujemy<br/>
                    3a) Eventy zaznaczasz lewym przyciskiem myszy(LPM)<br/>
                    3b) Dni zamknięcia zaznaczasz prawym przyciskiem myszy(PPM) lub CTRL+LPM<br/>
                    4) Kliknij pobierz aby wygenerować arkusz<br/>
                    5) Skopiuj arkusz do Google Sheets <br/>
                    Gotowe! 🥳
                </Typography>}
            >
                <Help color={'info'} style={{fontSize: '60px'}}/>
            </Tooltip>
        </Badge>
    )
}