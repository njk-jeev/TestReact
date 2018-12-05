import React from "react";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import {
  LineChart, Line, Legend, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
  card: {
    margin: "5% 25%"
  }
};

const getDateTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.getHours() + ':' + date.getMinutes();
}

const tooltipFormatter = (value) => {
  return Math.round(value);
}

const labelFormatter = (value) => {
  return new Date(value).toLocaleString();
}

const ChartReport = props => {
  const { classes, data } = props;
  return (
    <Card className={classes.card}>
      <CardHeader title="Graph Visualization" />
      <CardContent>
        <LineChart width={600} height={250} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickCount={5}
            minTickGap={80}
            tickFormatter={getDateTime}
          />
          <YAxis
            allowDecimals={false}
            domain={['auto', 'auto']}
          />
          <Tooltip
            formatter={tooltipFormatter}
            labelFormatter={labelFormatter}
          />
          <Legend />
          <Line dot={false} type="monotone" dataKey="metric" stroke="#82ca9d" />
        </LineChart>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(ChartReport);
