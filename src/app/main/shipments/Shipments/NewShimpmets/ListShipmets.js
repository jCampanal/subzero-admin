import { Divider, Grid } from "@material-ui/core";
import React from "react";
import ShimpmentCard from "./Commons/ShimpmentCard/ShimpmentCard";
import {
  ListShipmetsS,
  ListShipmetsWrapperS,
  TitleS,
  IconTitleS,
  TextTitle,
} from "./ListShipmets.style";
import PropTypes from "prop-types";

const ListShipmets = ({ drivers }) => {
  return (
    <ListShipmetsWrapperS>
      <ListShipmetsS>
        <TitleS>
          <TextTitle>
            {" "}
            <IconTitleS>
              <i className="fa fa-truck-loading"></i>
            </IconTitleS>
            Shipments
          </TextTitle>
        </TitleS>
        <Divider />
        <Grid container spacing={4} className="mt-7">
          {drivers.map((driver) => {
            return <ShimpmentCard key={driver.id} driver={driver} />;
          })}
        </Grid>
      </ListShipmetsS>
    </ListShipmetsWrapperS>
  );
};

export default ListShipmets;

ListShipmets.propTypes = {
  drivers: PropTypes.array.isRequired,
};
