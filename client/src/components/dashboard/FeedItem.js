import React from 'react';
import { Tag, Intent } from '@blueprintjs/core';
import { FEED_TYPES } from '../../../../constants';

const roundTwo = (num) => Math.round(num * 100) / 100

class FeedItem extends React.Component {

    handleClicked = () => {
      this.context.router.push(`/feeds/${this.props.id}`)
    };

    render() {
        const {name, type, risk, coordinates} = this.props;
        const coords = coordinates && coordinates.coordinates;

        return (
            <div className="pt-card">
                <div
                    style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <h5>
                        <a onClick={this.handleClicked}>{name}</a>
                    </h5>
                    <Tag
                        style={{ marginLeft: '1em', marginBottom: '0.6em' }}
                        className="pt-minimal"
                    >
                        {type}
                    </Tag>
                    <div style={{ right: 0, position: 'absolute', display: 'flex', flexDirection: 'row'}}>
                        {coords &&
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}
                            >
                                <span className="pt-icon-geolocation"/>
                                <p style={{ marginLeft: '0.3em' }}>{`${roundTwo(coords[0])},${roundTwo(coords[1])}`}</p>
                            </div>
                        }
                        <b
                            style={{ marginLeft: '1em' }}
                        >
                            {risk ? risk : 'Unknown'}
                            </b>
                    </div>
                </div>
            </div>
        );
    }
}
FeedItem.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    type: React.PropTypes.oneOf(FEED_TYPES),
    coordinates: React.PropTypes.array,
    risk: React.PropTypes.number,
};
FeedItem.contextTypes = {
    router: React.PropTypes.object
};

export default FeedItem;