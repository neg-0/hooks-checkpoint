import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
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
    p: 4
};


export default function ProductPhotoModal({ open, image }) {

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