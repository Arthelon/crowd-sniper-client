import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";

class FeedMap extends React.Component {

    render() {
        const { lat, lng } = this.props;
        return (
            <GoogleMap
                defaultZoom={13}
                defaultCenter={{ lat, lng }}
            >

            </GoogleMap>
        )
    }
}
FeedMap.propTypes = {
    lat: React.PropTypes.number,
    lng: React.PropTypes.number,
}
FeedMap.defaultProps = {
    lat: 0,
    lng: 0,
};

export default withScriptjs(withGoogleMap(FeedMap));
