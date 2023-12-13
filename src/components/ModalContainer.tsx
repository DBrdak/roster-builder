import { observer } from 'mobx-react-lite';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {useStore} from "../stores/store";

function ModalContainer() {
  const { modalStore } = useStore();

  return (
    <Modal
      open={modalStore.modal.open}
      onClose={modalStore.closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
        <Box 
          sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%',
            transform: 'translate(-50%, -50%)', 
            minWidth: '25%' ,
            bgcolor: 'background.paper', 
            border: '1px solid #000', 
            boxShadow: 24, 
            p: 4 
          }}
        >
          {modalStore.modal.body}
        </Box>
    </Modal>
  );
}

export default observer(ModalContainer);