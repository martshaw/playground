const webpack = require('webpack');
const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const sourcePath = path.join(__dirname, './src');
const staticsPath = path.join(__dirname, './build');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor.bundle.js'
    }),
    new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin('[name].bundle.css'),
];
if (isProd) {
    plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                // Javascript lint
                eslint: {
                    configFile: '.eslintrc',
                    failOnWarning: false,
                    failOnError: false
                },
                postcss: ['autoprefixer', 'import']
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false
            },
        })
    );
} else {
    plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}
module.exports = {
    devtool: isProd ? 'source-map' : 'eval',
    context: sourcePath,
    entry: {
        app: './app.js',
        vendor: ['react']
    },
    output: {
        path: staticsPath,
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.html$/,
            exclude: /node_modules/,
            use: 'file-loader',
            query: {
                name: '[name].[ext]'
            }
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                { loader: ExtractTextPlugin.extract({
                    loader: 'css-loader?importLoaders=1!postcss-loader'
                }) },
                { loader: 'postcss-loader' },
            ]
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
                'babel-loader'
            ]
        }],
    },
    resolve: {
        extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            sourcePath
        ]
    },
    plugins,
    devServer: {
        contentBase: `${__dirname}/src`,
        historyApiFallback: true,
        port: 3501,
        compress: isProd,
        inline: !isProd,
        hot: !isProd,
        stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: false,
            timings: true,
            version: false,
            warnings: true,
            colors: {
                green: '\u001b[32m',
            }
        },
    }
};