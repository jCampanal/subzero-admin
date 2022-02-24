import React, { memo } from "react";
import { GoogleApiWrapper, Map } from "google-maps-react";
import { useTranslation } from "react-i18next";
import FuseLoading from "@fuse/core/FuseLoading";
import { MapAPIKey } from ".conf";

function DriversMonitor(props) {
  const { t } = useTranslation("drivers-monitor");
  return (
    <div className="px-12">
      <h1 className="mt-9">{t("DRIVERS_MONITOR")}</h1>
      <Map
        google={props.google}
        zoom={14}
        containerStyle={{
          position: "absolute",
          width: "auto",
          height: "auto",
          top: "50px",
          right: "10px",
          bottom: "10px",
          left: "10px",
        }}
        style={{ position: "relative", width: "100%", height: "100%" }}
        initialCenter={{
          lat: 25.761681,
          lng: -80.191788,
        }}
      />
    </div>
  );
}

export default memo(
  GoogleApiWrapper({
    apiKey: MapAPIKey,
    LoadingContainer: FuseLoading,
  })(DriversMonitor)
);
