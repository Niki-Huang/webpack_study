const os = require("os");
const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

// 获取cpu核数
const threads = os.cpus().length;

module.exports = {
  //入口
  entry: path.join(__dirname, "../src/main.js"),
  //加载器
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"],
          },
          {
            test: /\.s[ac]ss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
          {
            test: /\.styl$/,
            use: ["style-loader", "css-loader", "stylus-loader"],
          },
          {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: "asset",
            parser: {dataUrlCondition: {maxSize: 50 * 1024}}, //解析
            generator: {filename: "static/imgs/[hash:8][ext][query]"},
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
            generator: {
              filename: "static/media/[hash:8][ext][query]",
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/, // 排除node_modules代码不编译
            use: [
              {
                loader: "thread-loader", // 开启多进程
                options: {
                  workers: threads, // 全部核心拿来工作
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                  cacheCompression: false, // 缓存文件不要压缩
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                },
              },
            ],
          },
        ],
      },
    ],
  },
  //插件
  plugins: [
    new ESLintPlugin({
      context: path.join(__dirname, "../src"), //要对这个文件夹下的文件进行检查
      exclude: "node_modules", // 默认值，打包编译的时候不要扫描
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"),
      // 开启多线程
      threads,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/index.html"), //模板
    }),
  ],
  optimization: {
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 以下是默认值
      // minSize: 20000, // 分割代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // 配置组的规则
      cacheGroups: {
        // 其他的组配置
        // 默认的组配置，它定义了当模块没有匹配到其他组时的默认行为
        default: {
          // test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
          minSize: 0, // 意味着即使文件很小，也会尝试进行代码分割
          minChunks: 2, // 设置了至少被引用两次才会进行代码分割
          priority: -20, // 这是优先级，表示当一个模块符合多个组的条件时，应该优先使用哪个组
          reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
        },
      },
    },
  },
  // 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3002", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 开启HMR功能
  },
  // 模式
  mode: "development",
  devtool: "cheap-module-source-map",
};
