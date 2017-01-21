import React from 'react';
import { FEED_TYPES } from '../../../../constants';
import { Gmaps } from 'react-gmaps';
import { GMAP_API_KEY } from '../../constants';

class FeedDetails extends React.Component {

    render() {
        const {name, coordinates} = this.props;
        console.log(this.props)
        const coords = coordinates ? coordinates.coordinates : [];

        return (
            <div
                style={{
                    minHeight: '400px'
                }}
                className="pt-card"
            >
                <h3>{name}</h3>
                <Gmaps
                    lat={coords[0]}
                    lng={coords[1]}
                    height="400px"
                    width="600px"
                    params={{key: GMAP_API_KEY}}
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
