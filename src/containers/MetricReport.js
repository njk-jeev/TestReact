import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import ChartReport from '../components/ChartReport';

class MetricReport extends Component {
  componentDidMount() {
    this.props.onLoad();
    this.timerID = setInterval(
      () => this.fetchMetricData(),
      4000
    );
  }
  componetWillUnMount() {
    clearInterval(this.timerID);
  }
  fetchMetricData = () => {
    this.props.onLoad();
  }
  render() {
    const {
      loading,
      data
    } = this.props;
    if (loading) return <LinearProgress />;
    return (
      <React.Fragment>
        <ChartReport
          data={data}
        />
      </React.Fragment>
    );
  }
}

const mapState = (state, ownProps) => {
  const {
    loading,
    data
  } = state.metric;
  return {
    loading,
    data
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.FETCH_METRIC_DATA
    })
});

export default connect(
  mapState,
  mapDispatch
)(MetricReport);
