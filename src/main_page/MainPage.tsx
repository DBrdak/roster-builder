import {Container} from "@mui/material";
import {Content} from "./Content";

export function MainPage() {
    return (
        <Container style={{width: '100vw', height: '100%', padding: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Content />
        </Container>
    );
}