'use strict'

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }]
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gMemes = []
let gCurrMeme = 0
let gCurrLine = null


function getLine(memeIdx, x, y) {
    let line =
    {
        txt: 'Add Text Here',
        size: 20,
        font: 'serif',
        color: 'black',
        x: x, y: y,
        isWritingMode: false
    }


    gMemes[memeIdx].lines.push(line)
    gCurrLine = +(gMemes[memeIdx].lines.length - 1)
    // console.log(gMemes[memeIdx].lines)
    // console.log('service', gCurrLine)
}

function getMeme(imgIdx) {
    let meme = {
        selectedImgId: 5,
        selectedImgIdx: imgIdx,
        lines: []
    }
    gMemes.push(meme)
    console.log(gMemes)
}

function getMemes() {
    return gMemes
}

function setLineTxt(txt, memeIdx = 0, lineIdx = 0) {
    gMemes[memeIdx].lines[lineIdx].txt = txt
    console.log(gMemes[memeIdx].lines[lineIdx].txt)
    document.querySelector('.text-area').value = txt
    // console.log('setLine:', gMemes[memeIdx].lines[lineIdx].txt)
}


//when add-line is called
function toggleWritingMode(memeIdx = 0, lineIdx, isClicked) {
    if (isClicked) {
        gMemes[memeIdx].lines[lineIdx].isWritingMode = true
        // console.log(gMemes[memeIdx].lines[lineIdx].isWritingMode)
        if (!gIsFirstClick) {
            if (gMemes[gCurrMeme].lines.length === 2) {
                if (lineIdx === 1) {
                    console.log('reached the lineidx1')
                    // drawImg(gCurrImg)
                    createTextArea(gCurrMeme, lineIdx, gMemes[memeIdx].lines[lineIdx].txt)
                    // renderMemeLine(gMemes[gCurrMeme].lines[0].x, gMemes[gCurrMeme].lines[0].y, gMemes[gCurrMeme].lines[0].txt, 0)
                    if(gAddLineCount > 2)renderMemeLine(gMemes[gCurrMeme].lines[0].x, gMemes[gCurrMeme].lines[0].y, gMemes[gCurrMeme].lines[0].txt, 0)
                } else {
                    drawImg(gCurrImg)
                    createTextArea(gCurrMeme, gCurrLine, gMemes[gCurrMeme].lines[lineIdx].txt)
                    if(gAddLineCount > 2)renderMemeLine(gMemes[gCurrMeme].lines[1].x, gMemes[gCurrMeme].lines[1].y, getMemes()[getMemeIdx()].lines[getLineIdx()].txt, 1)
                    // renderMemeLine(gMemes[gCurrMeme].lines[1].x, gMemes[gCurrMeme].lines[1].y, getMemes()[getMemeIdx()].lines[getLineIdx()].txt, 1)
                }
            }
        } else {
            createTextArea(gCurrMeme, gCurrLine, gMemes[lineIdx].lines[lineIdx].txt)
            gIsFirstClick = false
            
        }
    } else{
        gMemes[memeIdx].lines[lineIdx].isWritingMode = false
        renderTextArea(lineIdx)
        gIsWriting = false
    }
}

function createTextArea(memeIdx = 0, lineIdx = 0, text, x = gMemes[gCurrMeme].lines[gCurrLine].x, y = gMemes[gCurrMeme].lines[gCurrLine].y) {
    let textArea = document.createElement('textarea')
    textArea.style.position = 'absolute'
    textArea.style.left = `${getElementPosition(gElCanvas).x + x}px`
    textArea.style.top = `${getElementPosition(gElCanvas).y + y}px`
    textArea.style.background = 'transparent'
    textArea.style.fontSize = `${gMemes[memeIdx].lines[lineIdx].size}px`
    textArea.style.font = gMemes[memeIdx].lines[lineIdx].font
    textArea.style.color = gMemes[memeIdx].lines[lineIdx].color
    textArea.classList.add('text-area')
    textArea.draggable = true
    textArea.value = text
    // console.log(text)
    document.body.appendChild(textArea)
}

function destroyTextArea() {
    document.querySelector('.text-area').remove()
}

function destroyLine() {
    drawImg(getImgIdx)
}

function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + window.scrollX
    const y = rect.top + window.scrollY
    return { x, y }
}

function getMemeIdx() {
    console.log(gMemes[gCurrMeme])
    return gCurrMeme

}

function getLineIdx() {
    return gCurrLine
}

function getLineCount(memeIdx) {
    const lineCount = gMemes[gCurrMeme].lines.length
    // console.log(lineCount)
    return lineCount
}

function isNull(value) {
    return value === null;
}

function renderTextArea(lineIdx) {
    gMemes[gCurrMeme].lines[lineIdx].isWritingMode = false

    if (gMemes[gCurrMeme].lines.length === 2) {
        console.log(lineIdx, 'index')
        renderMemeLine(gMemes[gCurrMeme].lines[0].x, gMemes[gCurrMeme].lines[0].y, gMemes[gCurrMeme].lines[0].txt, lineIdx)
        renderMemeLine(gMemes[gCurrMeme].lines[1].x, gMemes[gCurrMeme].lines[1].y, gMemes[gCurrMeme].lines[1].txt, lineIdx)
        destroyTextArea()
        gIsWriting = false
    } else {
        console.log('reachedTextRender')
        renderMemeLine(gMemes[gCurrMeme].lines[0].x, gMemes[gCurrMeme].lines[0].y, gMemes[gCurrMeme].lines[0].txt, lineIdx)
        destroyTextArea()
        gIsWriting = false
    }
}