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
		targets = ["build/**"],
		verbose = false,
		...rest
	} = options;

	return {
		name: "delete",
		[hook]: () =>
			del(targets, rest).then(paths => {
				if (verbose || rest.dryRun) {
					// const message = rest.dryRun
					// 	? `Expected files and folders to be deleted: ${paths.length}`
					// 	: `Deleted files and folders: ${paths.length}`;

					console.log("clearing the build folder");
				}
			})
	};
};

const callSubModule = (options = {}) => {
    return {
        name: "generateBundle",
        generateBundle: () => {
            return new Promise((resolve, reject) => {
				//
			})
        }
    };
};

export default {
	watch:
		process.env.NODE_ENV !== "production"
			? {
					include: "src/**",
					exclude: "node_modules/**"
				}
			: undefined,
	input: "src/index.ts",
	output: [
		{
			file: pkg.main,
			format: "umd",
			sourcemap: process.env.NODE_ENV !== "production",
			name: "demo",
			globals: {
				react: "React",
				"react-dom": "ReactDOM"
			}
		}
	],
	external: [
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {})
	],
	plugins: [
		callSubModule(),
		cleanUp({ verbose: true }),
		json,
		eslint({
			include: ["src/**"],
			exclude: ["src/**/*.css"],
			throwOnError: process.env.NODE_ENV === "production"
		}),
		resolve(),
		commonjs(),
		postcss({
			getJSON: (cssFileName, json, outputFileName) => {
				var path = require("path");
				var cssName = path.basename(cssFileName, ".css");
				var jsonFileName = path.resolve("./build/" + cssName + ".json");
				fs.writeFileSync(jsonFileName, JSON.stringify(json));
			},
			extract: true,
			plugins: [
				autoprefixer(),
				process.env.NODE_ENV === "production" ? cssnano() : () => {}
			],
			writeDefinitions: true,
			modules: true
		}),
		typescriptRollup({
			typescript,
			clean: true,
			verbosity: 0,
			abortOnError: process.env.NODE_ENV === "production",
			check: true
		}),
		babel({
			exclude: "node_modules/**",
			include: "src/**"
		}),
		...(process.env.NODE_ENV === "production"
			? [uglify()]
			: [])
	]
};
