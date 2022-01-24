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

const ListShipmets = () => {
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
          <Grid item md={4} sm={6} xs={12}>
            <ShimpmentCard />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <ShimpmentCard />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <ShimpmentCard />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <ShimpmentCard />
          </Grid>
        </Grid>
      </ListShipmetsS>
    </ListShipmetsWrapperS>
  );
};

export default ListShipmets;
