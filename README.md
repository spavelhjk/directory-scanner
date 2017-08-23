# fsml
######
A package for scanning your working directory and convenient ways to get paths to files.

### Usage
Install `fsml` as `npm` package.
```bash
$ npm install --save-dev fsml
```

Libraries API.
```js
/*
 * Include and initialize the package.
*/
const fsml = require('fsml')
const parser = new fsml()

/*
 * Getter `dirScan` will return scan of the directory. 
*/
let dirScan = parser.dirScan 

/*
 * Method `pathToNode` the method takes one parameter, file name or directory,
 * and returns the path to the files as an array.
 * If the name corresponds to several files, then it returns an array with paths.
 * If the name does not match any file in the directory, it will return an empty array.
*/
let pathToModules = parser.pathToNode('modules')
let pathToIndexJS = parser.pathToNode('index.js')

/*
 * Destroy the object.
*/
parser.destructor()
```
