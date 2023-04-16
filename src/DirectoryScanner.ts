import { isDir, readdir, readFile, isExist } from './utils/fs'

interface Scan {
  [key: string]: Scan | string
}

class DirectoryScanner {
  private pathToRootDirectory: string
  private scan: Scan
  private ignoredFiles: string[]

  constructor() {
    this.pathToRootDirectory = this.getPathToRootDirectory('./')
    this.ignoredFiles = this.getListOfIgnoredFiles()
    this.scan = this.getDirectoryScan()
  }

  destructor(): void {
    this.scan = {}
  }

  scanDirectory(): void {
    this.scan = this.getDirectoryScan()
  }

  getDirScan(): Scan {
    return this.scan
  }

  getPathToNode(name: string): string[] {
    const result: string[] = []

    const findPathsByName = (node: Scan, path: string): void => {
      for (const key in node) {
        if (key === name)
          result.push(path + key)

        if (typeof node[key] === 'object')
          findPathsByName(node[key] as Scan, `${path + key}/`)
      }
    }

    findPathsByName(this.scan, './')

    return result
  }

  private getPathToRootDirectory(path: string): string {
    const dir = readdir(path)

    if (dir && dir.includes('package.json'))
      return path

    return this.getPathToRootDirectory(path + '../')
  }

  private getDirectoryScan(): Scan {
    const pathRegExp = new RegExp(/^\.\//)

    const traverseAndScanDirectory = (path: string, scan: Scan): Scan => {
      const dir = readdir(path)

      if (!dir)
        return scan

      dir.forEach((node) => {
        const fullPath = (path + node).replace(pathRegExp, '')

        if (this.ignoredFiles.includes(fullPath)) return

        const isDirectory = isDir(path + node)

        scan[node] = isDirectory
          ? traverseAndScanDirectory(`${path + node}/`, {})
          : node
      })

      return scan
    }

    return traverseAndScanDirectory(this.pathToRootDirectory, {})
  }

  private getListOfIgnoredFiles(): string[] {
    const spacesRegExp = new RegExp(/[\n\s]/g)
    const list = ['.dirscannerignore']
    const ignoreFilePath = '.dirscannerignore' 

    if (!isExist(ignoreFilePath)) return list

    const ignoreFileContent = readFile(ignoreFilePath)

    if (ignoreFileContent) {
      const ignoreFiles = ignoreFileContent.split(spacesRegExp)
      return list.concat(ignoreFiles)
    }

    return list
  }
}

export default DirectoryScanner
