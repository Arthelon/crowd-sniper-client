import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";

class FeedMap extends React.Component {

    render() {
        const { lat, lng } = this.props;
        return (
            <GoogleMap
                style={{
                    top: 0,
                    bottom: 0
                }}
                defaultZoom={15}
                defaultCenter={{ lat, lng }}
            >
                <Marker
                    position={{ lat, lng }}
                />
            </GoogleMap>
        )
    }
}
FeedMap.propTypes = {
    lat: React.PropTypes.number,
    lng: React.PropTypes.number,
};

export default withScriptjs(withGoogleMap(FeedMap));
