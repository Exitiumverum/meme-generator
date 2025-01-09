'use strict'

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }]
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gMemes = []


function getMeme(imgIdx) {
    let meme = {
        selectedImgId: 5,
        selectedImgIdx: imgIdx,
        lines: [
            {
                txt: 'Add Text Here',
                size: '20px',
                font: 'Ariel',
                color: 'red',
                x: 30, y:30,
                isWritingMode: false
            }
        ]
    }
    gMemes.push(meme)
    console.log(gMemes)
}

function getMemes() {
    return gMemes
}

function setLineTxt(txt, memeIdx = 0, lineIdx = 0) {
    gMemes[memeIdx].lines[lineIdx].txt = txt
    document.querySelector('.text-area').value = txt
    console.log('setLine:', gMemes[memeIdx].lines[lineIdx].txt)
}

function toggleWritingMode(memeIdx, lineIdx, isClicked) {
    if (isClicked) {
        gMemes[memeIdx].lines[lineIdx].isWritingMode = true
        // console.log(gMemes[memeIdx].lines[lineIdx].isWritingMode)
        if (!gIsFirstClick){ 
            drawImg(getImgIdx())
        }
        createTextArea(0, 0, gMemes[memeIdx].lines[lineIdx].txt)
        if (gIsFirstClick) gIsFirstClick = false
    }
    else {
        gMemes[memeIdx].lines[lineIdx].isWritingMode = false
        console.log(gMemes[memeIdx].lines[lineIdx].isWritingMode)
        renderMemeLine(gMemes[memeIdx].lines[lineIdx].x, gMemes[memeIdx].lines[lineIdx].y, gMemes[memeIdx].lines[lineIdx].txt)
        destroyTextArea()
        gIsWriting = false
    }
}

function createTextArea(memeIdx = 0, lineIdx = 0, text) {
    let textArea = document.createElement('textarea') 
    textArea.style.position = 'absolute' 
    textArea.style.left = `${gMemes[memeIdx].lines[lineIdx].x}px` 
    textArea.style.top = `${gMemes[memeIdx].lines[lineIdx].y}px`
    textArea.style.background = 'transparent'
    textArea.style.fontSize = gMemes[0].lines[0].size
    textArea.style.font = gMemes[0].lines[0].font
    textArea.classList.add('text-area')
    textArea.value = text 
    // console.log(text)
    document.body.appendChild(textArea)
}

function destroyTextArea() {
    document.querySelector('.text-area').remove()
}