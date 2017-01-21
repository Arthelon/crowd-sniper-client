import React from 'react';
import { FEED_TYPES } from '../../../../constants';
import { GMAP_API_KEY } from '../../constants';
import FeedMap from './FeedMap'
import { Spinner, Tag } from '@blueprintjs/core';

class FeedDetails extends React.Component {

    render() {
        const {name, coordinates, population, type} = this.props;
        const coords = coordinates ? coordinates.coordinates : [];

        return (
            <div
                style={{
                    minHeight: '500px',
                    width: '35%',
                    position: 'relative'
                }}
                className="pt-card"
            >
                <h3>
                    {name}
                    <Tag
                        style={{ marginLeft: '0.5em', marginBottom: '0.2em' }}
                        className="pt-large"
                    >
                        {type}
                    </Tag>
                </h3>
                <ul>
                    <li><span className="pt-icon-people"/> <b>Scale: </b>{population}</li>
                    {!!coords.length && <li><span className="pt-icon-map"/> <b>Location: </b> {coords[0]}, {coords[1]}</li>}
                </ul>
                <FeedMap
                    containerElement={
                      <div style={{ height: `83%` }} />
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
    population: React.PropTypes.number,
};
FeedDetails.defaultProps = {
    population: 0.5
}

export default FeedDetails;
