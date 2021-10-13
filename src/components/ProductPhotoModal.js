import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useContext, useEffect } from 'react';
import { ActionAPIContext } from '../App';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 0
};


export default function ProductPhotoModal({ open, image, details }) {

    const actionAPI = useContext(ActionAPIContext)
    const handleClose = (e) => { actionAPI.hideModal(e) }

    useEffect(() => console.log(image), [image])

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <AppBar position="absolute" sx={{ backgroundColor: alpha("#000", 0.5) }}>
                        <Toolbar>

                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 10,
                                    color: "white"
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textShadow: "0px 0px 8px #000" }}>
                                {details?.name} - ${details?.default_price}
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <img src={image} style={{
                        minHeight: window.innerHeight / 4,
                        minWidth: window.innerWidth / 4,
                        maxHeight: window.innerHeight * 0.75
                    }} />
                </Box>
            </Modal>
        </div>
    );
}