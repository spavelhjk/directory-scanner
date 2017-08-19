const fs = require('fs')

function isDir(path) {
	try {
		return fs.lstatSync(path).isDirectory()
	} catch (e) {
		console.error(e)
	}
}

function readdir(path) {
	try {
		return fs.readdirSync(path)
	} catch (e) {
		console.error(e)
	}
}

function readFile(path) {
	return fs.readFileSync(path, 'utf8')
}

module.exports = {
	isDir
  , readdir
  ,	readFile
}
