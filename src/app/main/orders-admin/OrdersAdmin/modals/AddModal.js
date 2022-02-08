import { Dialog } from "@material-ui/core";

import React from "react";
import PropType from "prop-types";
import styled from "styled-components";
import OrdersAddForm from "../../OrdersAdminForm/OrdersAddForm";

import FuseTheme from "@fuse/core/FuseTheme";

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
          <OrdersAddForm />
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
