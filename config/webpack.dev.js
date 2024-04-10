const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { VueLoaderPlugin } = require('vue-loader');

const os = require('os');
const threads = os.cpus().length;

function getStyleLoader(loader) {
	return [
		MiniCssExtractPlugin.loader,
		'css-loader',
		{
			loader: 'postcss-loader',
			options: {
				postcssOptions: {
					plugins: [
						[
							"postcss-preset-env",
							{
								browsers: 'last 2 versions'
							}
						]
					]
				}
			}
		},
		loader
	].filter(Boolean)
}

module.exports = {
	// 入口
	// entry: './src/main.ts',
	// 多入口打包
	entry: {
		main: './src/main.ts',
		app: './src/app.ts'
	},
	// 出口
	output: {
		// path: path.resolve(__dirname, 'dist'),
		path: undefined,
		// filename：入口文件的输出目录，多入口打包需要把输出文件名写成[name]，属于webpack的命名规则
		filename: 'static/js/[name].js',
		chunkFilename: 'static/js/[name].chunk.js',
		assetModuleFilename: 'static/images/[hash:10][ext][query]',
		// clean: true // 自动清空上一次的dist目录
		environment: {
			arrowFunction: false,
			const: false
		}
	},
	resolve: {
		extensions: ['.ts', '.js', '.vue'], // 解析时的文件扩展名
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	// 加载器
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: 'vue-loader'
			},
			{
				// 匹配到一个loader，不会再向下匹配了，提升性能
				oneOf: [
					{
						test: /\.ts$/,
						use: 'ts-loader',
						exclude: /node_modules/
					},
					{
						test: /\.js$/,
						include: path.resolve(__dirname, '../src'),
						use: [
							{
								loader: 'thread-loader', // 开启多线程（使用[多线程]处理js文件，es6转es5）
								options: {
									workers: threads // 线程数量
								}
							},
							{
								loader: "babel-loader",
								options: {
									cacheDirectory: true,  // 开启babel缓存
									cacheCompression: false,  // 关闭缓存文件压缩
									plugins: ['@babel/plugin-transform-runtime']  // 减少代码体积
								}
							}
						]
					},
					{
						test: /\.css$/i,
						use: getStyleLoader()
					},
					{
						test: /\.less$/i, // i：不区分大小写
						use: getStyleLoader('less-loader')
					},
					{
						test: /\.(png|jpe?g|webp|gif|svg)$/, // 正则开头结尾用/ /    \转译.    $结尾
						type: 'asset',
						parser: {
							dataUrlCondition: {
								maxSize: 10 * 1024
							}
						},
						// 图片资源输出到哪里
						// generator: {
						// 	filename: 'static/images/[hash:10][ext][query]' // ext：原文件的扩展名 query：原文件名的参数
						// }
					}
				]
			}
		]
	},
	// 插件（数组，如果写成对象，会报错）
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../public/index.html')
		}),
		new ESLintPlugin({
			context: path.resolve(__dirname, '../src'),
			exclude: 'node_modules',
			cache: true,
			cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache'),
			threads: threads // 开启多线程 和 线程数量  （使用[多线程]检查eslint）
		}),
		// css文件不通过动态创建style标签的方式引入，而是通过link标签引入，避免闪屏
		new MiniCssExtractPlugin({
			filename: 'static/css/[name].css',
			chunkFilename: 'static/css/[name].chunk.css'
		})
	],
	optimization: {
		minimize: true,
		runtimeChunk: true,
		splitChunks: {
			chunks: "all",
			// 修改配置
			cacheGroups: {
				// 组，哪些模块要打包到一个组
				// defaultVendors: { // 组名
				//   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
				//   priority: -10, // 权重（越大越高）
				//   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
				// },
				default: {
					// 其他没有写的配置会使用上面的默认值
					minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		},
		runtimeChunk: {
			name: (entrypoint => `runtime~${entrypoint.name}.js`)
		}
	},
	devServer: {
		host: 'localhost',
		port: '9527',
		open: true, // 自动打开浏览器
		hot: true // 开启HMR功能，只在开发模式使用
	},
	// 模式
	mode: 'development',
	devtool: 'cheap-module-source-map'
}
