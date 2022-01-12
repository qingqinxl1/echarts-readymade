import React from 'react';
import { ChartProps, LegendPosition } from '@echarts-readymade/core';

interface BarChartProps extends ChartProps {
    xAxisData?: any[];
    legendPosition?: LegendPosition;
}
declare const Bar: React.FC<BarChartProps>;

export { Bar, BarChartProps };
