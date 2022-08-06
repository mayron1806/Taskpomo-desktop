import Background from "../types/Background";

const fs = window.require("fs");
const filesDirectory = process.cwd() + "/backgrounds/";

const createBackgroundFolder = () => {
    if(!fs.existsSync(filesDirectory)){
        fs.mkdirSync(filesDirectory);
    }
}
export const saveFiles = async (files : File[]) => {
    createBackgroundFolder();
    new Promise((resolve, reject)=>{
        try{
            files.forEach(file => {
                fs.copyFileSync(file.path, filesDirectory + file.name);
                resolve(filesDirectory + file.name);
            })
        }
        catch(error){
            reject(error);
        }
    });
}
export const getFilesName = (): string[] => {
    createBackgroundFolder();

    const files : string[] = fs.readdirSync(filesDirectory);
    return files.map(file => {
        return file;
    })
}
export const getBackgrounds = () => {
    createBackgroundFolder();

    const fileNames : string[] = fs.readdirSync(filesDirectory);
    const paths = fileNames.map(file => filesDirectory + file);
    const types = fileNames.map(file => {
        const fileExt = file.split(".")[1];
        
        if(fileExt === "mp4" || fileExt === "wav") return "video";
        return "image";
    })

    const length = fileNames.length;
    let backgrounds = [];
    for(let i = 0; i < length; i++){
        const background: Background = {
            name: fileNames[i],
            type: types[i],
            path: paths[i]
        }
        backgrounds.push(background);
    }
    return backgrounds;
}