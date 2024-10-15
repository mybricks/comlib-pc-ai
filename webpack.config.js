module.exports = {
  externals: [
    {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
        root: 'React'
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
        root: 'ReactDOM'
      },
      moment: 'moment',
      antd: 'antd',
      '@ant-design/icons': 'icons',
      '@ant-design/charts': 'Charts',
      'echarts': 'echarts'
    }
  ]
}