
const getFileExtenstion = (filename: string) => {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
}

export default getFileExtenstion
