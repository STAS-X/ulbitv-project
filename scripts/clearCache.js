const fs = require('fs');

// note `fm.rm` and `fm.rmSync` can delete files and directories
// retry options not required - might be needed if an EBUSY, EMFILE, ENFILE, ENOTEMPTY, or EPERM error is encountered
// the `force` option When true, exceptions will be ignored if path does not exist.
// the `recursive` If true, perform a recursive directory removal. In recursive mode, operations are retried on failure.

// async version - prefered - you may need to await the file deletion - works like `rm -rf`
//fs.promises.rm(`<FILE|DIR_PATH>`, { maxRetries: 5, retryDelay: 2000, recursive: true, force: true });
const folderPath = process.argv.slice(2)?.[0];
// sync version - works like `rm -rf`
if (folderPath && fs.existsSync(folderPath)) {
	try {
		fs.rmSync(folderPath, { maxRetries: 5, retryDelay: 2000, recursive: true, force: true });
		console.log(`Папка ${folderPath} успешно удалена`);
	} catch (e) {
		if (!(e instanceof Error)) {
			e = new Error(e);
		}
		console.log(`При удалении папки произошла ошибка: ${e instanceof Error ? e.message : 'unknown'}`);
	}
} else console.log(`Папка ${folderPath} не существует`);
