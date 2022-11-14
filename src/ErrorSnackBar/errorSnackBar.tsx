import React from 'react';
import Button from "@mui/material/Button";
import {Snackbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {setErrorAC} from "../state/app-reducer";


function CloseIcon(props: { fontSize: string }) {
    return null;
}

export default function SimpleSnackbar() {
    /*const [open, setOpen] = React.useState(true);*/
const dispatch = useDispatch()
    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }


 dispatch(setErrorAC(null))
    };

const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const isOpen = error !==null
    return (
        <div>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={isOpen}
                autoHideDuration={2000}
                onClose={handleClose}
                message={error}
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleClose}>
                            UNDO
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}