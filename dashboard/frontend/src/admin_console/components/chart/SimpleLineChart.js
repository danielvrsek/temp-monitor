import PropTypes from 'prop-types';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const SimpleLineChart = (props) => {
  let lines = [];
  props.lines.forEach((line) => {
    lines.push(
      <Line
        key={line.dataKey}
        type={line.type}
        dataKey={line.dataKey}
        stroke={line.stroke}
        dot={false}
        activeDot={{ r: 8 }}
      />
    );
  });

  return (
    <ResponsiveContainer width="100%" height="80%">
      <LineChart
        width={props.width}
        height={props.height}
        data={props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        key="1"
      >
        {!props.disableGrid ? <CartesianGrid strokeDasharray="3 3" /> : null}
        <XAxis dataKey="name" minTickGap={20}/>
        <YAxis />
        {!props.disableTooltip ? <Tooltip /> : null}
        {!props.disableLegend ? <Legend /> : null}
        {lines}
      </LineChart>
    </ResponsiveContainer>
  );
};

SimpleLineChart.propTypes = {
  data: PropTypes.array,
  lines: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      dataKey: PropTypes.string,
      stroke: PropTypes.string,
    })
  ),
  type: PropTypes.string,
  labelKey: PropTypes.string,
  disableGrid: PropTypes.bool,
  disableLegend: PropTypes.bool,
  disableTooltip: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};

SimpleLineChart.defaultProps = {
  data: [],
  lines: [],
  type: '',
  labelKey: '',
  disableGrid: false,
  disableLegend: false,
  disableTooltip: false,
};

export default SimpleLineChart;
