import Button from './Button.md'
import Grid from './Grid.md'
import Row from './Row.md'
import Col from './Col.md'

export default function getKnowledge(packageName: string, com: string) {
  if (packageName === 'antd') {
    const upperCom = com.toUpperCase()

    if (upperCom === 'BUTTON') {
      return Button
    }

    if (upperCom === 'GRID') {
      return Grid
    }

    if (upperCom === 'ROW') {
      return Row
    }

    if (upperCom === 'COL') {
      return Col
    }
  }
}