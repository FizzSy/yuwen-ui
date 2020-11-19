const fs = require('fs');
const path = require('path');
const join = path.join;
const terserPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function getEntries(path) {
    let files = fs.readdirSync(resolve(path));
    const entries = files.reduce((ret, item) => {
        const itemPath = join(path, item)
        const isDir = fs.statSync(itemPath).isDirectory();
        if (isDir) {
            ret[item] = resolve(join(itemPath, 'index.js'))
        } else {
            const [name] = item.split('.')
            ret[name] = resolve(`${itemPath}`)
        }
        return ret
    }, {})
    return entries
}

function resolve(dir) {
    return path.resolve(__dirname, dir)
}

module.exports = {
    mode:'production',
	entry: {
        // 'yuwen-ui':resolve('./packages/index.js')
		...getEntries('./packages')
	},
	output: {
		path: resolve('./lib'),
        filename: "[name]/index.js",
        chunkFilename: "[id].js",
        libraryTarget:'umd',
        // publicPath:'/lib/',
        libraryExport: 'default',
        umdNamedDefine: true,
    },
    resolve:{
        extensions:['.js','.vue','.json'],
        modules:['node_modules']
    },
    // externals:['vue'],
    // performance:{
    //     hints:false
    // },
    // stats:'none',
    module:{
        rules: [
            // {
            //     test: /\.(js|babel|es6)$/,
            //     use: ["babel-loader"]
            // },
            {
                test: /\.vue$/,
                use: ["vue-loader"]
            },
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                use: ["style-loader","css-loader"]
            },
            {
                test: /\.scss/,
                // exclude: /node_modules/,
                use: [
                    {
                        loader : 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            },
            {
                test: /\.(eot|png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: "url-loader"
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: "url-loader"
                }]
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin()
    ],
    optimization:{
        minimizer:[
            new terserPlugin({
                cache:true,
                parallel:true
            })
        ]
    }
}