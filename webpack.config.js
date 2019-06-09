module.exports = {
    entry: "./src/server/server.ts",
    output: {
      filename: "bundle.js",
      path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      mainFields: ['browser', 'main', 'module'],
      extensions: [".ts", ".tsx", ".js", ".json"]
    },

    target: 'node',

    node: {
      fs: 'empty'
    },

    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

        // all .graphql files
        { test: /\.graphql?$/, loader: 'webpack-graphql-loader' }
      ]
    },

    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
    }
};
