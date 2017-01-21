import React from 'react';

import FeedItem from './FeedItem';

class FeedList extends React.Component {

    renderFeeds() {
        const { feeds } = this.props;

        return (
            <div>
                {feeds.map((feed) =>
                    <FeedItem
                        key={feed.id}
                        {...feed}
                    />
                )}
            </div>
        )
    }

    renderEmpty() {
        const { risk } = this.props;

        return (
            <div className="pt-non-ideal-state">
                <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
                    <span className="pt-icon pt-icon-mobile-video"/>
                </div>
                <h4 className="pt-non-ideal-state-title">No {risk && 'risk '}feeds found</h4>
                <div className="pt-non-ideal-state-description">
                    Create a new file to populate the folder.
                </div>
            </div>
        );
    }

    render() {
        const { risk, feeds } = this.props;

        return (
            <div style={{
                padding: '2em 3em',
                width: '50%'
            }}>
                <div
                    style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <div
                        style={{
                            marginBottom: '1em'
                        }}
                    >
                        {risk ?
                            <h2>Active Feeds</h2> :
                            <h2>Feeds</h2>
                        }
                    </div>
                    {feeds.length && <h4 style={{ position: 'absolute', right: '1.5em', bottom: 0}}>Risk</h4>}
                </div>
                {!feeds.length ?
                    this.renderEmpty()
                    :
                    this.renderFeeds()
                }
            </div>
        )
    }
}
FeedList.propTypes = {
    risk: React.PropTypes.bool,
    feeds: React.PropTypes.array.isRequired,
};

export default FeedList;
