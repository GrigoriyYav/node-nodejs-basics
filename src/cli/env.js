export const parseEnv = () => {
	const outputData = [];

	for (let key in process.env) {
		if (key.startsWith('RSS_')) {
			outputData.push(key + '=' + process.env[key]);
		}
	}

	console.log(outputData.join('; '));
};

// for test

//for Windows PowerShell:
//$env:RSS_1="Hello"; $env:RSS_2="World"; npm run cli:env

//# for bash
//RSS_1=Hello RSS_2=World npm run cli:env
parseEnv();