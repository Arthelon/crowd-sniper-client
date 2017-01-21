import React from 'react';
import { Map, CircleMarker, TileLayer } from 'react-leaflet';
import { RISK_THRESHOLD } from '../constants';

const getFillColor = (risk) => {
    if (risk >= RISK_THRESHOLD) {
        return 'red';
    } else if (risk >= 0.4) {
        return 'orange'
    }
    return 'green';
};

const getRadius = (population) => {
    const radius = (population || 500) / 100;
    if (radius > 1000) {
        return 500;
    } else if (radius < 100) {
        return 80;
    }
    return radius;
};

class OverMap extends React.Component {

    render() {
        const { feeds } = this.props;
        console.log(feeds);

        return (
            <Map
                style={{ position: 'absolute', top: 50, bottom: 0, left: 0, right: 0, zIndex: 1}}
                center={[22.2764425,114.1736903]}
                zoom={17}
            >
                <TileLayer
                    url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxZoom={18}
                    minZoom={5}
                />
                {feeds.map((feed) => {
                    const coords = feed.coordinates.coordinates;
                    const color = getFillColor(feed.risk);
                    return (
                        <CircleMarker
                            key={feed.id}
                            center={[coords[1], coords[0]]}
                            color={color}
                            fillColor={color}
                            radius={getRadius(feed.population)}
                        />
                    );
                })}
            </Map>

        )
    }
}
OverMap.propTypes = {
    feeds: React.PropTypes.array,
    position: React.PropTypes.array,
};

export default OverMap;
