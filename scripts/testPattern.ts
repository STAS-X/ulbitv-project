export function isTestingFile(filename: string, mask: string) {
	let isTesting = false;
	if (mask) {
		const regPath = new RegExp(`${mask}`, 'g');
		isTesting = regPath.test(filename);
	}
	return isTesting;
}

const args = process.argv.slice(2);
console.log(process.argv, args);
if (args && args.length === 2) {
	const result = isTestingFile(args[0], args[1]);
	console.log(`Result of test is ${String(result)}`);
}
