import { getStyleOptions } from './../utils'

export default {
  description: `日历`,
  editors: {
    '.ant-picker-cell .ant-picker-cell-inner': {
      title: '日历项',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['font', 'background', 'border']),
        }
      ]
    },
    '.ant-picker-cell-selected .ant-picker-cell-inner': {
      title: '选中日历项',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['font', 'background', 'border']),
        }
      ]
    },
    '.ant-picker-content thead th': {
      title: '日历头部',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['font', 'background', 'padding']),
        }
      ]
    },
    '.ant-picker-calendar-month-select .ant-select-selector': {
      title: '月份选择',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['background', 'padding']),
        }
      ]
    },
    '.ant-picker-calendar-year-select .ant-select-selector': {
      title: '年份选择',
      items: [
        {
          title: '样式',
          type: 'style',
          options: getStyleOptions(['background', 'padding']),
        }
      ]
    }
  },
  docs: require('./Calendar.md').default
}