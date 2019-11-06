import pkg from "./package.json";
import json from "rollup-plugin-json";
import typescript from "typescript";
import typescriptRollup from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss-modules";
import { eslint } from "rollup-plugin-eslint";
import del from "del";
import serve from "rollup-plugin-serve";
import staticSite from "rollup-plugin-static-site";
import livereload from "rollup-plugin-livereload";
import autoprefixer from "autoprefixer";
import { uglify } from "rollup-plugin-uglify";
import cssnano from "cssnano";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

const cleanUp = (options = {}) => {
	const {
		hook = "buildStart",
		targets = ["./dist/**"],
		verbose = false,
		...rest
	} = options;

	return {
		name: "delete",
		[hook]: () =>
			del(targets, rest).then(paths => {
				if (verbose || rest.dryRun) {
					const message = rest.dryRun
						? `Expected files and folders to be deleted: ${paths.length}`
						: `Deleted files and folders: ${paths.length}`;

					console.log("clearing the build folder");
				}
			})
	};
};
export default {
	watch: {
		include: ["/src/exmaple/**", "/src/build/**"],
		exclude: "node_modules/**"
	},
	input: "src/example/index.ts",
	output: [
		{
			file: pkg.main,
			format: "umd",
			sourcemap: true,
			name: "demo"
		}
	],
	plugins: [
		cleanUp({ verbose: true }),
		json,
		eslint({
			include: ["src/example/**.{ts|tsx}"],
			exclude: ["src/**/*.css"]
		}),
		resolve(),
		commonjs(),
		postcss({
			getJSON: (cssFileName, json, outputFileName) => {
				var path = require("path");
				var cssName = path.basename(cssFileName, ".css");
				var jsonFileName = path.resolve("./dist/" + cssName + ".json");
				fs.writeFileSync(jsonFileName, JSON.stringify(json));
			},
			extract: true,
			plugins: [
				autoprefixer()
			],
			writeDefinitions: true,
			modules: true
		}),
		typescriptRollup({
			typescript,
			clean: true,
			verbosity: 0,
			check: true
		}),
		babel({
			exclude: "node_modules/**",
			include: "/example/**"
		}),
		staticSite({
			dir: "example",
			moreStyles: ["/build/index.css"],
			template: {
				path: "static/index.html"
			}
		}),
		serve({
			open: true,
			openPage: "/example/",
			verbose: true,
			// contentBase: ['build', 'example'],
			contentBase: ["."],
			host: "localhost",
			port: 9000
		}),
		livereload()
	]
};
