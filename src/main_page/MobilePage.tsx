import { Typography } from "@mui/material";

export default function MobilePage() {
    return (
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
    )
}