import Card from "@material-ui/core/Card";
import Tooltip from "@material-ui/core/Tooltip";
import { Place } from "@material-ui/icons";
import GoogleMap from "google-map-react";
import PropTypes from "prop-types";
function Marker({ text, isCompany }) {
  return (
    <div className="relative">
      <span style={{ position: "absolute", top: "-36px", left: "-18px" }}>
        <Tooltip title={text} placement="top">
          {isCompany ? (
            <Place className="text-red-700 text-36" />
          ) : (
            <Place className="text-blue-700 text-36" />
          )}
        </Tooltip>
      </span>
    </div>
  );
}

function Widget6({ dataArray }) {
  const companyLocation = {
    label: "Subzero",
    lat: 25.81981249229314,
    lng: -80.31649160126311,
  };
  const options = {
    id: "widget6",
    markers: [
      {
        lat: 52,
        lng: -73,
        label: "120",
      },
      {
        lat: 37,
        lng: -104,
        label: "498",
      },
      {
        lat: 21,
        lng: -7,
        label: "443",
      },
      {
        lat: 55,
        lng: 75,
        label: "332",
      },
      {
        lat: 51,
        lng: 7,
        label: "50",
      },
      {
        lat: 31,
        lng: 12,
        label: "221",
      },
      {
        lat: 45,
        lng: 44,
        label: "455",
      },
      {
        lat: -26,
        lng: 134,
        label: "231",
      },
      {
        lat: -9,
        lng: -60,
        label: "67",
      },
      {
        lat: 33,
        lng: 104,
        label: "665",
      },
    ],
    styles: [
      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#444444",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [
          {
            color: "#f2f2f2",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "all",
        stylers: [
          {
            saturation: -100,
          },
          {
            lightness: 45,
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
          {
            visibility: "simplified",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          {
            color: "#039be5",
          },
          {
            visibility: "on",
          },
        ],
      },
    ],
  };

  return (
    <Card className="w-full h-512 rounded-20 shadow">
      <GoogleMap
        bootstrapURLKeys={{
          key: process.env.REACT_APP_MAP_KEY,
        }}
        defaultZoom={7}
        defaultCenter={[companyLocation.lat, companyLocation.lng]}
        options={{
          styles: options.styles,
        }}
      >
        <Marker
          text={companyLocation.label}
          lat={companyLocation.lat}
          lng={companyLocation.lng}
          isCompany
        />
        {options.markers.map((marker) => (
          <Marker
            key={marker.label}
            text={marker.label}
            lat={marker.lat}
            lng={marker.lng}
          />
        ))}
      </GoogleMap>
    </Card>
  );
}

export default Widget6;

Widget6.propTypes = {
  dataArray: PropTypes.object.isRequired,
};
Marker.propTypes = {
  text: PropTypes.string.isRequired,
  isCompany: PropTypes.bool,
};
