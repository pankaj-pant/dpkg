import {parseFile} from './parseFile'

export const readFile = (input) => {
    let reader = new FileReader()

    reader.readAsText(input)
    reader.onload = () => {
        console.log(reader.result)
    }
    reader.onerror = () => {
        console.log(reader.error)
    }
    reader.onloadend = () => {
        const parsedResult = parseFile(reader.result)
    }
}