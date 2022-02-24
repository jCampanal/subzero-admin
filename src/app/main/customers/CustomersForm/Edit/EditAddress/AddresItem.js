import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Button,
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import { Edit } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { formatAddress } from "app/lib/address";

const AddresItem = ({ address, listWhareHouses, onDelete, onEdit }) => {
  const { t } = useTranslation("customers-form");
  const textAdrres = formatAddress(
    address.city,
    address.state,
    address.street,
    address.zipCode
  );
  return (
    <AddresItemS>
      <p>{textAdrres}</p>
      <AddressOptionS>
        <FormControl className=" min-w-160">
          <InputLabel id="salesTaxId-select-label" className="pl-20 -mt-9">
            {t("WAREHOUSE")}
          </InputLabel>
          <Select
            labelId="warehouse-select-label"
            id="warehouse"
            required
            label={t("WHAREHOUSE")}
            inputProps={{ "aria-label": "Without label" }}
            variant="outlined"
            value={listWhareHouses[0]?.id}
          >
            {listWhareHouses.map((wharehouse) => {
              return (
                <MenuItem key={wharehouse.id} value={wharehouse.id}>
                  {wharehouse.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <OptionsS>
          <Button onClick={onEdit}>
            <Icon>
              <Edit />
            </Icon>
          </Button>
          <Button>
            <Icon>
              <Delete onClick={onDelete} />
            </Icon>
          </Button>
        </OptionsS>
      </AddressOptionS>
    </AddresItemS>
  );
};

export default AddresItem;
AddresItem.propTypes = {
  address: PropTypes.object.isRequired,
  listWhareHouses: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

const AddresItemS = styled.div`
  padding: 12px 0 12px 20px;
  border-color: rgba(0, 0, 0, 0.23);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const AddressOptionS = styled.div`
  display: flex;
`;
const OptionsS = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;
