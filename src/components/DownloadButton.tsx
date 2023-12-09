import {Button, CircularProgress, Typography} from "@mui/material";
import {Download, DownloadDone} from "@mui/icons-material";
import {useEffect, useState} from "react";
import sleep from "../models/functions/sleep";

interface Props {
    color: 'primary' | 'secondary'
    disabled: boolean
    handleClick: () => void
    reset: () => void
}

export default function DownloadButton({color, disabled, handleClick, reset}: Props) {
    const [isClicked, setIsClicked] = useState<boolean>(false)
    const [isDownloaded, setIsDownloaded] = useState<boolean>(false)

    const handleDownload = async () => {
        setIsClicked(true)
        await sleep(1000)
        setIsClicked(false)
        setIsDownloaded(true)
    }

    useEffect(() => {
        setIsDownloaded(false)
    }, [reset])

    return (
        <Button
            size={'large'}
            style={{width: '200px', height: '50px'}}
            color={color}
            disabled={disabled}
            type={'submit'} onClick={async () => await handleDownload()}
            variant={'outlined'}
        >
            {isClicked ?
                <CircularProgress size={32} color={color} />
                :
                isDownloaded ?
                    <>
                        <DownloadDone style={{fontSize: '32px'}} />
                    </>
                    :
                    <>
                        <Download />
                        <Typography>Pobierz</Typography>
                    </>
            }
        </Button>
    )
}