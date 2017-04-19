/**
 * Created by kmarkovych on 07-Mar-17.
 */
module.exports = {
    entry: './src/copy-page',
    devtool: 'source-map',
    output: {
        library: 'copy-page',
        filename: 'lib/index.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    watch: false,

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            }
        ]
    }
};