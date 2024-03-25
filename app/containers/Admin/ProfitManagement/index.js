import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  TooltipComponent,
  TitleComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { Divider, Select } from 'antd';
import { useInjectSaga } from '../../../utils/injectSaga';
import reducer from './reducerProfitManagement';
import * as actions from './actions';
import saga from './sagaProfiManagement';
import { useInjectReducer } from '../../../utils/injectReducer';
import { REDUX_KEY } from '../../../utils/constants';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
]);

const key = REDUX_KEY.profitManagement;

// eslint-disable-next-line react/prop-types
const ProfitManagement = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();
  const [title, setTitle] = useState('month');
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  useEffect(() => {
    dispatch(
      actions.takeDataMonth(null, res => {
        // eslint-disable-next-line camelcase
        const { revenue_by_month, profit_by_month } = res.data;
        const data = Object.keys(res.data.revenue_by_month);
        const data1 = data.map(month => revenue_by_month[month]);
        const data2 = data.map(month => profit_by_month[month]);
        setMonths(data);
        setRevenueData(data1);
        setProfitData(data2);
      }),
    );
  }, []);
  const handleChange = value => {
    if (value !== 'month') {
      dispatch(
        actions.takeDataYear(null, res => {
          setTitle(value);
          // eslint-disable-next-line camelcase
          const data = Object.keys(res.data);
          const data1 = Object.values(res.data).map(year => year.total_revenue);
          const data2 = Object.values(res.data).map(year => year.total_profit);
          setYears(data);
          setRevenueData(data1);
          setProfitData(data2);
        }),
      );
    } else {
      dispatch(
        actions.takeDataMonth(null, res => {
          setTitle(value);
          // eslint-disable-next-line camelcase
          const { revenue_by_month, profit_by_month } = res.data;
          const data = Object.keys(res.data.revenue_by_month);
          const data1 = data.map(month => revenue_by_month[month]);
          const data2 = data.map(month => profit_by_month[month]);
          setMonths(data);
          setRevenueData(data1);
          setProfitData(data2);
        }),
      );
    }
  };
  const getMonth = () => ({
    title: {
      text: 'DOANH THU VÀ LỢI NHUẬN',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Doanh thu', 'Lợi nhuận'],
    },
    xAxis: {
      data: months,
    },
    textStyle: {
      fontSize: '16px',
      fontFamily: 'sans-serif',
    },
    yAxis: {},
    series: [
      {
        name: 'Doanh thu',
        type: 'bar',
        data: revenueData,
      },
      {
        name: 'Lợi nhuận',
        type: 'bar',
        data: profitData,
      },
    ],
  });
  const getYear = () => ({
    title: {
      text: 'DOANH THU VÀ LỢI NHUẬN',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Doanh thu', 'Lợi nhuận'],
    },
    xAxis: {
      data: years,
    },
    textStyle: {
      fontSize: '16px',
      fontFamily: 'sans-serif',
    },
    yAxis: {},
    series: [
      {
        name: 'Doanh thu',
        type: 'bar',
        data: revenueData,
      },
      {
        name: 'Lợi nhuận',
        type: 'bar',
        data: profitData,
      },
    ],
  });
  return (
    <>
      <Select
        defaultValue="month"
        style={{
          width: 120,
        }}
        onChange={handleChange}
        options={[
          {
            value: 'month',
            label: 'Tháng(Năm hiện tại)',
          },
          {
            value: 'year',
            label: 'Năm',
          },
        ]}
      />
      <Divider />
      <ReactEChartsCore
        echarts={echarts}
        option={title === 'month' ? getMonth() : getYear()}
        notMerge
        lazyUpdate
        style={{ height: '580px' }}
      />
    </>
  );
};
export default ProfitManagement;
