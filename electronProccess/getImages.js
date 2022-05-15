const puppeteer = require('puppeteer');
const {download} = require('electron-dl');
const {BrowserWindow, dialog} = require('electron');

const getImages = async(url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try{
        await page.goto(url, {waitUntil: 'networkidle2'});
    }catch(err){
        console.log(err.message);
        return;
    }
    
    const issueSrcs = await page.evaluate(() => {
        const srcs = Array.from(
          document.querySelectorAll("img")
        ).map((image) => image.getAttribute("src"));
        return srcs;
    });
    console.log(issueSrcs);
  

     await browser.close();

     return issueSrcs;
}

const downloadImages = async(url, path) => {
    const win = BrowserWindow.getFocusedWindow();
    console.log(path);
    if(path){
        console.log(await download(win, url, {directory: path[0]}));
    }else{
        console.log(await download(win, url));
    }
}

const getPath = async(url) => {
    let dataSaver;
    var path = await dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then((path) => dataSaver = path);

    if(dataSaver.canceled){
        return false;
    }

    return dataSaver.filePaths;
}

module.exports = {getImages, downloadImages, getPath};