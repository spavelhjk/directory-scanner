import fs from 'fs';

export const isDir = (path: string): boolean | undefined => {
  try {
    return fs.lstatSync(path).isDirectory()
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export const readdir = (path: string): string[] | undefined => {
  try {
    return fs.readdirSync(path)
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export const readFile = (path: string): string | undefined => {
  try {
    return fs.readFileSync(path, 'utf8')
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export const isExist = (path: string): boolean => fs.existsSync(path)
