import logo from './logo.svg'
import './App.css'
import styled from 'styled-components'
import 'antd/dist/antd.css'
import { Divider, Typography } from 'antd'
const { Title } = Typography
import { Line } from './components/Line'


type ResultDataType<T> = T[]

const Wrapper = styled.div`
  padding: 20px;
`

function App() {
  return (
    <Wrapper>
      <header className="App-header">
        <Title>echarts-readymade</Title>
        <Divider />
        <Line />
      </header>
    </Wrapper>
  )
}

export default App
