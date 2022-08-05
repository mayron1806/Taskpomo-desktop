const fs = window.require("fs");
const filesDirectory = process.cwd() + "/assets/background/";
export const saveFiles = (files : File[]) => {
    files.forEach(file => {
        fs.copyFileSync(file.path, filesDirectory + file.name);
    })
}
export const getFiles = (): string[] => {
    const files : string[] = fs.readdirSync(filesDirectory);
    return files.map(file => {
        return filesDirectory + file;
    })
}