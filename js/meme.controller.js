'use strict'

const gElCanvas = document.querySelector('.meme-canvas')
const gCtx = gElCanvas.getContext('2d')
let gIsWriting = false

function onInit() {
    getMeme()
    console.log('Hello World')
    renderMeme()

}

function renderMeme(lineText = 'Add Text Here') {
    drawImg()
    renderMemeLine(50, 40, getMemes()[0].lines[0].txt)
}

function renderMemeLine(x, y, lineText) {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    // drawImg()
    gCtx.fillText(lineText, x, y)
}

function drawImg(memeIdx = 0) {
    const elImg = new Image()
    elImg.src = `/img/meme-imgs(square)/${getMemes()[memeIdx].selectedImgId}.jpg`
    elImg.onload = function () {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function handleInputEvent(elInput) {
    setLineTxt(elInput.value, 0, 0)
    renderMemeLine(50, 40, elInput.value)

    console.log('hy')
    console.log(elInput.value)
}

function handleCanvasClick(){
    document.querySelector('.meme-canvas')
}




function drawText() {
    let lineText = document.querySelector('.line-text')

    lineText.addEventListener(onkeydown, onkeyup, onclick, handleInputClick(lineText))

}