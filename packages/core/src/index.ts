import { ChartProvider, ChartContext } from './ChartProvider'

export type Field = {
  fieldKey: string
  fieldName: string
  yAxixIndex?: number
  isPercent?: boolean
  decimalLength?: number
}

export type ChartProps = {
  dimension: Field[]
  valueList: Field[]
}

export { ChartProvider, ChartContext }
export default { ChartProvider, ChartContext }
