import babel from "rollup-plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify";

export default {
	"entry": "./_js/index.js",
	"dest": "./js/index.js",
	"format": "es",
	plugins: [
		babel({
			presets: [
				[
					"es2015", {
						modules: false
					}
				]
			],
			plugins: [
				"external-helpers", ["transform-react-jsx", {
					"pragma": "createElement"
				}]
			],
			babelrc: false
		}),
		nodeResolve({
			jsnext: true
		}),
		uglify()
	],
	context: "this"
};
