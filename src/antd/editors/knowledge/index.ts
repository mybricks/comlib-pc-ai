import Button from './Button.md'
import Grid from './Grid.md'
import Row from './Row.md'
import Col from './Col.md'
import Form from './Form.md'
import Table from './Table.md'
import Input from './Input.md'
import InputNumer from './InputNumer.md'
import Select from './Select.md'

const Knowledges = {
  BUTTON: Button,
  GRID: Grid,
  ROW: Row,
  COL: Col,
  FORM: Form,
  TABLE: Table,
  INPUT: Input,
  INPUTNUMBER: InputNumer,
  SELECT: Select,
}


export default function getKnowledge(packageName: string, com: string) {
  if (packageName === 'antd') {
    const upperCom = com.toUpperCase()
    return Knowledges[upperCom] ?? ''
  }
}