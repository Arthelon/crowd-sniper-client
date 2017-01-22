import React from 'react';
import { ProgressBar, Intent } from '@blueprintjs/core';

class RiskSlider extends React.Component {

    render() {
        const {risk} = this.props;
        let intent
        if (risk > 0.7) intent = Intent.DANGER
        else if (risk > 0.4) intent = Intent.WARNING

        return (
            <ProgressBar
                className='pt-no-stripes pt-no-animation'
                value={risk}
                intent={intent}
            />
        )
    }
}
RiskSlider.propTypes = {
    risk: React.PropTypes.number
};

export default RiskSlider;
