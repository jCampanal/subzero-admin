import React, {memo} from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {GoogleApiWrapper, Map} from 'google-maps-react';
import {MapAPIKey} from '../../../../.conf';

function DriversMonitor(props) {
    return (
        <div>
            <p className="h1">
                <LocationOnIcon className="text-5xl mr-14" />
                Drivers Monitor
            </p>
            <div className="flex mt-16 gap-5">
                <Map
                    google={props.google}
                    zoom={14}
                    style={{width: '100%', height: '100%'}}
                    initialCenter={{
                        lat: 25.761681,
                        lng: -80.191788,
                    }}
                />
            </div>
        </div>
    );
}

export default memo(
    GoogleApiWrapper({
        apiKey: MapAPIKey,
    })(DriversMonitor)
);
