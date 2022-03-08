import React, { Fragment } from "react";
import {
  BarDriversPrincipalS,
  BarDriversSecndari1S,
  LabelS,
} from "./SelectDriversBar.style";
import DriversElements from "./DriversElements/DriversElements";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { useSelector } from "react-redux";
import { getDriversCarded } from "app/store/driverMonitor/driverMonitor";
import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
const SelectDriversBar = (props) => {
  const ShowCarded = useSelector(getDriversCarded);
  console.log(ShowCarded);

  return (
    <Fragment>
      <BarDriversPrincipalS>
        <LabelS>
          <AirportShuttleIcon className="mr-5" fontSize="large" />
          <h1>Drivers:</h1>
        </LabelS>
        <FuseScrollbars className="flex-grow overflow-y-auto ">
          <BarDriversSecndari1S>
            <DriversElements Drivers={props.Drivers} />
          </BarDriversSecndari1S>
        </FuseScrollbars>
      </BarDriversPrincipalS>
    </Fragment>
  );
};

export default SelectDriversBar;
