const path = require('path');

module.exports = {
	mode: "production",
	entry: './src/index.js',
	resolve: {
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
	},
	module: {
		rules: [
			{
				test: /\.(vert|frag)$/i,
				exclude: /node_modules/,
				use: ['raw-loader']
			},
		],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	watch: true,
	watchOptions: {
        poll: true
    }
};