export const parseArgs = () => {
	const args = process.argv.slice(2);

	const dict = {};
	for (let i = 0; i < args.length; i = i + 2) {
		const key = args[i].slice(2);
		dict[key] = '';
		if (i + 1 < args.length) {
			dict[key] = args[i + 1];
		}
	}
	
	const outputData = [];
	for (let key in dict) {
		outputData.push(key + ' is ' + dict[key]);
	}

	console.log(outputData.join(', '));
};

// for test "npm run cli:args -- --param1 val1 --param2 val2"
parseArgs();