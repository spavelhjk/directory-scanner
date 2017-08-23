const {
    isDir
  , readdir
  , readFile
} = require('./utils/fs')

class FSMLParser {
	constructor() {
		this._pathToRootDir = this._findRootDirectory('./')
		this._makeListOfIgnoredFiles()
		this._scanDirectory()
	}

	destructor() {
		this._dirScan = {}
	}

	get dirScan() {
		return this._dirScan
	}

	scan() {
		this._scanDirectory()
	}

	pathToNode(name) {
		const result = []

		const goRoundScanObject = (obj, path) => {
			for (let key in obj) {
				if (key === name) {
					result.push(path + key)
				}

				if (typeof obj[key] === 'object') {
					goRoundScanObject(obj[key], `${path+key}/`)
				}
			}
		}

		goRoundScanObject(this.dirScan, './')

		return result
	}



	_findRootDirectory(path) {
		let dir = readdir(path)
		if (dir.includes('package.json')) 
			return path

		this._findRootDirectory(path + '../')
	}

	_scanDirectory() {
		const pathRegExp = new RegExp(/^\.\//)

		const goRoundDir = (path, obj) => {
			let dir = readdir(path)

			dir.forEach(node => {
				if (this._excludeFiles.includes(
						(path + node).replace(pathRegExp, '')
					)) {
					// Exclude ignore files
					return
				}

				if (isDir(path+node)) {
					obj[node] = goRoundDir(`${path+node}/`, {})
				} else {
					obj[node] = node
				}
			})

			return obj
		}

		this._dirScan = goRoundDir(this._pathToRootDir, {})
	}

	_makeListOfIgnoredFiles() {
		const spacesRegExp = new RegExp(/[\n\s]/g)
		const list = ['.fsmlignore']

		try {
			const fsmlIgnoreContent = readFile('.fsmlignore')
			const fsmlIgnoreArray = fsmlIgnoreContent.split(spacesRegExp)

			this._excludeFiles = list.concat(fsmlIgnoreArray)
		} catch (e) {
			this._excludeFiles = list
		}
	}
}

module.exports = FSMLParser
