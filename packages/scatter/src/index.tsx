import React, { useContext } from 'react'
import { multiply, round, divide } from 'mathjs/number'
import { cloneDeep } from 'lodash'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import type { ChartProps, LegendPosition, Field } from '@echarts-readymade/core'
import { mergeOption, buildChartOption, COLOR_LIST } from '../../../packages/core/src'
import { ChartContext } from '../../../packages/core/src/ChartProvider'
import { ScatterChart } from 'echarts/charts'
import {
  GridSimpleComponent,
  GridComponent,
  SingleAxisComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  AxisPointerComponent,
  BrushComponent,
  TitleComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  LegendComponent,
  LegendScrollComponent,
  LegendPlainComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  AriaComponent,
  TransformComponent,
  DatasetComponent
} from 'echarts/components'

import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'

echarts.use([
  ScatterChart,
  CanvasRenderer,
  SVGRenderer,
  GridSimpleComponent,
  GridComponent,
  SingleAxisComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  AxisPointerComponent,
  BrushComponent,
  TitleComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  LegendComponent,
  LegendScrollComponent,
  LegendPlainComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  AriaComponent,
  TransformComponent,
  DatasetComponent
])

export interface ScatterChartProps extends ChartProps {
  /**
   * 图例位置
   */
  legendPosition?: LegendPosition
}

export const Scatter: React.FC<ScatterChartProps> = (props) => {
  const {
    data,
    echartsOptions,
    echartsOptionsBase: chartOption,
    userOptions
  } = useContext(ChartContext)
  const { option, ...resetOptions } = echartsOptions || {}
  const { dimension, compareDimension, valueList, echartsSeries, ...restSettings } = props

  const _dimension = dimension && dimension.slice(0, 1)
  const _valueList = valueList && valueList.slice(0, 3)
  const _chartOption = Object.assign({}, chartOption || {}, {})

  if (!_dimension || !_valueList || _dimension.length < 1 || _valueList.length < 2) {
    return null
  }

  if (_chartOption) {
    const processedData = data?.map((d) => {
      const values: any[] = new Array(_valueList.length).fill(0)

      _valueList.map((v, i) => {
        if (d[v.fieldKey] != null) {
          values[i] = d[v.fieldKey]
          if (v.isPercent) {
            values[i] = multiply(d[v.fieldKey], 100)
          }
          values[i] = round(values[i], v.decimalLength || 0)
        }
      })

      return [...values, d[_dimension[0].fieldKey]]
    })

    const minSymbolSize = 50
    const maxSymbolSize = 100
    const getSymbolSize = (list: any[]) => {
      const symbolList = list
        .map((item) => item[2])
        .sort((value1: number, value2: number) => {
          return value1 - value2
        })
      const min = symbolList[0]
      const max = symbolList[symbolList.length - 1]
      const scale = divide(max - min, maxSymbolSize - minSymbolSize) || 1

      list.forEach((item, index) => {
        item[4] = round(divide(item[2] - min, scale) + minSymbolSize, 2)
        item[5] = COLOR_LIST[index % COLOR_LIST.length]
      })
      return list
    }

    chartOption5.animation = false
    chartOption5.grid.x = 70
    chartOption5.grid.x2 = 130
    chartOption5.grid.top = 50
    chartOption5.grid.bottom = 130
    chartOption5.title.text = ''
    chartOption5.xAxis.name = valueList5[0].fieldName
    chartOption5.xAxis.nameLocation = 'center'
    chartOption5.xAxis.nameTextStyle = {
      color: '#666'
    }
    chartOption5.xAxis.nameGap = 40
    chartOption5.xAxis.type = 'value'
    chartOption5.xAxis.show = true
    chartOption5.xAxis.axisLabel.formatter = (value: any) => {
      return `${value}${valueList5[0].isPercent ? (valueList5[0].hideUnit ? '' : '%') : ''}`
    }

    chartOption5.yAxis[0].show = true

    chartOption5.yAxis[0].name = valueList5[1].fieldName
    // chartOption5.yAxis[0].nameRotate = -90;
    chartOption5.yAxis[0].nameGap = 60
    chartOption5.yAxis[0].nameLocation = 'center'
    chartOption5.yAxis[0].nameTextStyle = {
      color: '#666'
    }
    chartOption5.yAxis[0].axisLabel.formatter = (value: any) => {
      return `${value}${valueList5[1].isPercent ? (valueList5[1].hideUnit ? '' : '%') : ''}`
    }

    chartOption5.xAxis.boundaryGap = ['1%', '1%']
    chartOption5.xAxis.axisLine.show = false
    chartOption5.xAxis.axisTick.show = false
    chartOption5.xAxis.offset = 20
    chartOption5.yAxis[0].axisLine.show = false
    chartOption5.yAxis[0].axisTick.show = false
    chartOption5.yAxis[0].boundaryGap = ['1%', '1%']
    chartOption5.yAxis[0].offset = 20

    chartOption5.tooltip = {
      show: true,
      trigger: 'item',
      backgroundColor: 'rgba(255,255,255,0.9)',
      extraCssText:
        'box-shadow:  0px 0px 4px 0px rgba(0,0,0,0.25); border-radius: 2px; padding:10px 14px',
      formatter: (item: any) => {
        return `<div style="color: #c8c8c8;">
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${
                  item.color
                }"></span>
                <span>${wordWrapByLength(item.name, 30, null, '<br/>')}:</span>
                <div><span style="color: #595959;">${
                  valueList5[0].fieldName
                }</span>:<span style="color: #262626;">${item.value[0]}${
          valueList5[0].isPercent ? (valueList5[0].hideUnit ? '' : '%') : ''
        }</span></div>
                <div><span style="color: #595959;">${
                  valueList5[1].fieldName
                }</span>:<span style="color: #262626;">${item.value[1]}${
          valueList5[1].isPercent ? (valueList5[1].hideUnit ? '' : '%') : ''
        }</span></div>
            </div>`
      }
    }
    chartOption5.series = [
      {
        type: 'scatter',
        symbolSize: (data: any[]) => {
          return data[4]
        },
        itemStyle: {
          normal: {
            color: (seriesIndex: any) => {
              return seriesIndex.value[5]
            }
          }
        },
        data: getSymbolSize(processedData || []).map((item) => {
          return {
            name: `${item[3]}`,
            value: item,
            label: {
              show: true,
              position: 'inside',
              color: '#000',
              formatter: (params) => {
                const {
                  data: { name }
                } = params
                return wordWrapByLength(name, 5, 17)
              },
              fontSize: 12,
              rich: {
                text: {
                  color: '#000'
                }
              }
            }
          }
        })
      }
    ]

    let xMin = processedData && processedData[0] && processedData[0][0],
      xMax = processedData && processedData[0] && processedData[0][0],
      yMin = processedData && processedData[0] && processedData[0][1],
      yMax = processedData && processedData[0] && processedData[0][1]

    processedData?.forEach((item) => {
      xMin = Math.min(item[0], xMin)
      xMax = Math.max(item[0], xMax)
      yMin = Math.min(item[1], yMin)
      yMax = Math.max(item[1], yMax)
    })

    const _dataZoom: any = [
      // {
      //   type: 'inside',
      //   show: true,
      //   xAxisIndex: [0],
      //   bottom: 30,
      //   start: 0,
      //   end: 100,
      //   labelFormatter: '',
      // },
      // {
      //   type: 'inside',
      //   show: true,
      //   yAxisIndex: [0],
      //   right: 0,
      //   start: 0,
      //   end: 100,
      //   labelFormatter: '',
      // },
    ]

    if (dataZoomX) {
      _dataZoom.push({
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        bottom: 30,
        start: dataZoomX.start,
        end: dataZoomX.end,
        throttle: 150
      })
    } else {
      _dataZoom.push({
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        bottom: 30,
        startValue: xMin || 0,
        endValue: (xMax && add(xMax, abs(fix(multiply(xMax, 0.1))))) || 100,
        throttle: 150
      })
    }

    if (dataZoomY) {
      _dataZoom.push({
        type: 'slider',
        show: true,
        yAxisIndex: [0],
        right: 30,
        start: dataZoomY.start,
        end: dataZoomY.end
      })
    } else {
      _dataZoom.push({
        type: 'slider',
        show: true,
        yAxisIndex: [0],
        right: 30,
        startValue: yMin || 0,
        endValue: yMax || 100,
        labelFormatter: '{value}%'
      })
    }
    chartOption5.dataZoom = _dataZoom

    // 为了使dataZoom中x轴的endValue生效，这里要设置下x轴的max
    chartOption5.xAxis.max = (xMax && add(xMax, abs(fix(multiply(xMax, 0.1))))) || 100
    chartOption5.xAxis.axisLabel.formatter = (value: any) => {
      if (xMax <= 100 && value > 100) {
        return ''
      }
      return `${value}${valueList5[0].isPercent ? (valueList5[0].hideUnit ? '' : '%') : ''}`
    }
  }

  const builtOption = buildChartOption(_chartOption, restSettings, 'scatter')
  const options = mergeOption(builtOption, userOptions)

  return (
    <>
      <ReactEChartsCore
        echarts={echarts}
        option={{ ...cloneDeep(options) }}
        notMerge={true}
        opts={{ renderer: 'svg' }}
        style={{ height: '100%', width: '100%' }}
        {...resetOptions}
      />
    </>
  )
}
