import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import type INodePolyfillPlugin from 'node-polyfill-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const NodePolyfillPlugin: typeof INodePolyfillPlugin = require('node-polyfill-webpack-plugin');

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure'
  })
];
