#!/usr/bin/env node
const zlib = require("zlib");
const path = require("path");
const stream = require("stream");
const mri = require("mri");
const {
	createReadStream,
	createWriteStream,
	mkdirSync,
	readFileSync,
} = require("fs");
const { promisify } = require("util");

const pipeline = promisify(stream.pipeline);

const exit = (msg, code = 1) => {
	console.error(msg);
	process.exit(code);
};

const mriOptions = {
	boolean: ["stdout", "stdin", "help", "version"],
	string: ["output", "level"],
	alias: {
		o: "output",
		l: "level",
		h: "help",
	},
	default: {
		output: process.cwd(),
		level: zlib.constants.BROTLI_DEFAULT_QUALITY,
	},
};
const argv = process.argv.slice(2);
const args = mri(argv, mriOptions);
const inputs = args._.map(inp => path.resolve(process.cwd(), inp));
const output = path.resolve(args.output);
args.level = parseInt(args.level) || mriOptions.default.level;

if (args.help || !argv.length) {
	printHelp();
	process.exit(0);
}
if (args.version) {
	const { version } = require("./package.json");
	console.log(version);
	process.exit(0);
}

const options = {
	params: {
		[zlib.constants.BROTLI_PARAM_QUALITY]: args.level,
	},
};

(async () => {
	if (args.stdin || !inputs || !inputs.length) {
		if (args.stdin && inputs.length) {
			exit("File inputs are ignored when --stdin is present.");
		}
		return await pipeline(
			process.stdin,
			zlib.createBrotliCompress(options),
			process.stdout,
		);
	}

	if (args.stdout) {
		if (inputs.length > 1) {
			exit("--stdout cannot be specified with more than one input.");
		}
		return await pipeline(
			args.stdin ? process.stdin : createReadStream(inputs[0]),
			zlib.createBrotliCompress(options),
			process.stdout,
		);
	}

	const dir = path.extname(output) ? path.dirname(output) : output;
	mkdirSync(dir, { recursive: true });
	await Promise.all(
		inputs.map(input =>
			pipeline(
				createReadStream(input),
				zlib.createBrotliCompress(options),
				createWriteStream(
					path.format({ dir, name: path.basename(input), ext: ".br" }),
				),
			),
		),
	);
})()
	.then(() => process.exit(0))
	.catch(error => exit(error));

function printHelp() {
	const msg = readFileSync(path.join(__dirname, "help.md"), "utf-8");
	console.log(msg.trim());
}
