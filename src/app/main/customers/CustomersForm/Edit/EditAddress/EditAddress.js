import { Button, Divider } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import AddresItem from "./AddresItem";
import PropTypes from "prop-types";
import FormAddressModal from "./FormAddressModal";
import { formatAddress } from "app/lib/address";

const AddressFake = [
  {
    id: "asd",
    zipCode: 1200,
    city: "La Habana",
    state: "Florida",
    street: "Manjata",
    wharehouse: "Mia warehouse",
  },
  {
    id: "asdasd",
    zipCode: 16500,
    city: "Luna",
    state: "Martin",
    street: "Paseo",
    wharehouse: "70ma",
  },
];

const EditAddress = ({ warehouses }) => {
  const [address, setAddress] = useState();
  const [isModal, setIsModal] = useState(true);

  const handleAddModal = () => {
    setAddress(null);
    setIsModal(true);
  };
  const handleEditModal = (address) => {
    setAddress(address);
    setIsModal(true);
  };
  return (
    <EditAddressS>
      <h3>Addres</h3>
      <Divider />
      {AddressFake.map((address) => {
        return (
          <AddresItem
            key={address.id}
            address={address}
            listWhareHouses={warehouses}
            onEdit={() => handleEditModal(address)}
            onDelete={() => {
              const addreesF = formatAddress(
                address.city,
                address.state,
                address.street,
                address.zipCode
              );
              alert(`Delete item ${addreesF}`);
            }}
          />
        );
      })}
      <div className="flex justify-end">
        <Button color="secondary" variant="contained" onClick={handleAddModal}>
          Add address
        </Button>
      </div>

      <FormAddressModal
        data={address}
        setIsModal={setIsModal}
        isModal={isModal}
      />
    </EditAddressS>
  );
};

export default EditAddress;

EditAddress.propTypes = {
  warehouses: PropTypes.array.isRequired,
};

const EditAddressS = styled.div``;
