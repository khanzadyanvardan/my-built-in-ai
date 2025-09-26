import fs from 'fs/promises'
import path from 'path'

const command = process.argv[2]

if(command === 'create'){
    await create()
}else if(command === 'organize'){
    await organize()
}

async function create(){
    await fs.mkdir('test', {recursive: true});
    console.log("Folder created");
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
    const testFolder = await fs.readdir('./test');
    const folders = new Set(testFolder.map(file => path.extname(file).slice(1)))
    for(let i of folders){
        await fs.mkdir(`./result/${i}`, {recursive: true});
    }
    for(let i of testFolder){
        await fs.rename(`./test/${i}`, `./result/${path.extname(i).slice(1)}/${i}`)
    }
    console.log('organized');
}