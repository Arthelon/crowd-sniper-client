import React from 'react';
import { XYPlot, HorizontalGridLines, LineSeries, YAxis, XAxis } from 'react-vis';
import * as _ from 'lodash';

class RiskGraph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!isNaN(nextProps.risk))
            this.setState({
                data: this.state.data.concat([{x: this.state.data.length + 1, y: nextProps.risk * 10}])
            })
    }

    render() {
        const { data } = this.state;
        return (
            <XYPlot
                width={1100}
                height={300}>
                <HorizontalGridLines />
                <LineSeries
                    color="green"
                    data={data}/>
                <XAxis title="Time (secs)" />
                <YAxis
                    title="Risk"
                    tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                />
            </XYPlot>
        );
    }
}
RiskGraph.propTypes = {
    risk: React.PropTypes.number
};

export default RiskGraph;
