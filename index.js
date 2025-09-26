import fs from 'fs/promises'

const command = process.argv[2]

if(command === 'create'){
    await create()
}else if(command === 'organize'){
    await organize()
}

async function create(){
    await fs.mkdir('test', {recursive: true});
    console.log("folder created");
    await createFiles();

}

async function createFiles(){
    const filesTypes = ['.jpg', '.pdf', '.mp3', '.txt'];
    for(let i=1; i <= 150; i++){
        let type = filesTypes[Math.floor(Math.random() * filesTypes.length)]
        let fileName = `test/${i}${type}`;
        await fs.writeFile(fileName, '')
    }
    console.log('Files crated')
}

async function organize(){
    const testFolder = await fs.readdir('./test')
    await fs.mkdir('result', {recursive: true});
    for(let i=0; i < testFolder.length; i++){
        await fs.mkdir(`./result/${testFolder[i].split(".")[1]}`, {recursive: true});
    }
    await typing()
}

async function typing(){
    const resultFolder = await fs.readdir('./result')
    const files = await fs.readdir('./test')
    for(let i=0; i < files.length; i++){
        for(let j=0; j < resultFolder.length; j++){
            if(files[i].split('.')[1] === resultFolder[j]){
                await renameFile(`./test/${files[i]}`, `./result/${resultFolder[j]}/${files[i]}`)
            }
        }
    }
    console.log('organized');
}

async function renameFile(oldPath, newPath) {
    await fs.rename(oldPath, newPath)
}