import { Dialog, IconButton } from "@material-ui/core";

import React from "react";
import PropType from "prop-types";
import styled from "styled-components";
import OrdersAddForm from "../../OrdersAdminForm/OrdersAddForm";

import FuseTheme from "@fuse/core/FuseTheme";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import CloseIcon from "@material-ui/icons/Close";
const AddModal = ({ isModal, setIsModal }) => {
  return (
    <FuseTheme>
      <ModalS>
        <Dialog
          open={isModal}
          onClose={() => setIsModal(false)}
          fullWidth
          maxWidth="md"
          className="dialog"
        >
          <FuseScrollbars className="flex-grow overflow-x-auto">
            <div className="flex justify-end pr-10">
              <IconButton onClick={() => setIsModal(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <OrdersAddForm />
          </FuseScrollbars>
        </Dialog>
      </ModalS>
    </FuseTheme>
  );
};

export default AddModal;

const ModalS = styled.div`
  font-size: 25px;
`;

AddModal.propTypes = {
  isModal: PropType.bool.isRequired,
  setIsModal: PropType.func.isRequired,
};
