# directory-scanner
A package for scanning your working directory and providing convenient ways to get paths to files.

### Usage
Install `directory-scanner` as an `npm` package.
```bash
$ npm install --save-dev @spavelhjk/directory-scanner
```

### Libraries API.
```js
/*
 * Include and initialize the package.
*/
import DirectoryScanner from 'directory-scanner'

const scanner = new DirectoryScanner()

/*
 * Getter `getScan()` will return a scan of the directory. 
*/
let dirScan = scanner.getScan()

/*
 * Method `getPathToNode` takes one parameter, a file or directory name,
 * and returns the path to the files as an array.
 * If the name corresponds to several files, then it returns an array with paths.
 * If the name does not match any file in the directory, it will return an empty array.
*/
let pathToModules = scanner.getPathToNode('modules')
let pathToIndexJS = scanner.getPathToNode('index.js')
let nonExistentFile = scanner.getPathToNode('non_existent_file.js') // [] - will return an empty array

/*
 * Destroy the object.
*/
scanner.destructor()
```

### Ignore notes.
`.dirscannerignore` - specifies intentionally untracked files to ignore.
```
node_modules
utils/fs.js
```
