import React from 'react';
import { FEED_TYPES } from '../../../../constants';
import { GMAP_API_KEY } from '../../constants';
import FeedMap from './FeedMap'
import { Spinner } from '@blueprintjs/core';

class FeedDetails extends React.Component {

    render() {
        const {name, coordinates} = this.props;
        const coords = coordinates ? coordinates.coordinates : [];

        return (
            <div
                style={{
                    minHeight: '400px',
                    width: '35%'
                }}
                className="pt-card"
            >
                <h3>{name}</h3>
                <FeedMap
                    containerElement={
                      <div style={{ height: `100%` }} />
                    }
                                    mapElement={
                      <div style={{ height: `100%` }} />
                    }
                    lat={coords[0]}
                    lng={coords[1]}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${GMAP_API_KEY}`}
                    loadingElement={<Spinner/>}
                />
            </div>
        );
    }
}
FeedDetails.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    type: React.PropTypes.oneOf(FEED_TYPES),
    coordinates: React.PropTypes.array,
    risk: React.PropTypes.number,
};

export default FeedDetails;
