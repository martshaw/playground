const webpack = require('webpack');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const sourcePath = path.join(__dirname, './src');
const staticsPath = path.join(__dirname, './build');

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
];
if (isProd) {
    plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
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
    context: `  ${__dirname}/src`,
    entry: {
        app: 'app.js',
    },
    output: {
        path: `${__dirname}/dist/assets`,
        filename: '[name].bundle.js',
        publicPath: '/assets'
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
            test: /\.(js|jsx)$/,
            use: [{
                loader: require.resolve('babel-loader'),
                options: {
                    presets: [
                        require.resolve('babel-preset-es2015', { modules: false }),
                        require.resolve('babel-preset-es2015-native-modules'),
                        require.resolve('babel-preset-react'),
                        require.resolve('babel-preset-stage-2'),
                    ]
                }
            }],
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                { loader: 'css-loader', options: { modules: true } },
                'postcss-loader'
            ],
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
        port: 3000,
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