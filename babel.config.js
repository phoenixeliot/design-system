module.exports = function (api) {
  api.cache(true)

  const presets = [['@babel/env', { modules: false }]]
  const plugins = [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, // This is required so that the less files from antd are included
      },
      'antd',
    ],
    [
      'import',
      {
        libraryName: 'marklogic-ui-library',
        libraryDirectory: 'src',
      },
      '@marklogic/design-system',
    ],
  ]
  const env = {
    test: {
      plugins: [
        ['@babel/plugin-transform-react-jsx'],
        ['@babel/plugin-transform-modules-umd'],
        // ['@babel/plugin-transform-modules-commonjs'],
        // ['@babel/plugin-transform-modules-systemjs'],
        // ['@babel/plugin-transform-modules-umd'],
      ],
      presets: [
        ['@babel/env', { modules: true }],
        '@babel/preset-react',
      ],
    },
  }

  return {
    presets,
    plugins,
    env,
  }
}
