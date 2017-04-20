/**
 * Created by kmarkovych on 07-Mar-17.
 */
module.exports = {
    entry: './src/copyPage',
    devtool: 'inline-source-map',
    output: {
        // library: 'copyPage',
        filename: 'lib/index.js'
    },

    watch: false,

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    sourceMap: 'inline'
                }
            }
        ]
    }
};