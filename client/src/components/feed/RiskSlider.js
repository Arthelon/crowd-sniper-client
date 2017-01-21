import React from 'react';
import { Slider } from '@blueprintjs/core';

class RiskSlider extends React.Component {

    render() {
        const {risk} = this.props;

        return (
            <Slider
                disabled
                stepSize={0.2}
                labelStepSize={1}
                min={0}
                max={10}
                value={risk * 10}
            />
        )
    }
}
RiskSlider.propTypes = {
    risk: React.PropTypes.number
};

export default RiskSlider;