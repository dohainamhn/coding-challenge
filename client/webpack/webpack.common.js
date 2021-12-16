const path = require('path');
const rootDir = path.resolve(process.cwd());
const srcPath = path.resolve(rootDir, 'src');

module.exports = {
  entry: {
    app: `${srcPath}/index.tsx`,
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'babel-loader',
        include: srcPath,
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: ['node_modules', srcPath],
    extensions: ['.tsx', '.ts', '.js'],
  },
};
