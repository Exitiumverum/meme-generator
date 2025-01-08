'use strict'

var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat']}]
var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}
let gMemes = []


function getMeme(){
    let meme = {
        selectedImgId: 5,
        selectedImgIdx: 0,
        lines: [
            {
                txt: 'Hy',
                size: 20,
                color: 'red',
                isWritingMode: false
            }
        ]
    }
    gMemes.push(meme)
    console.log(gMemes)
}

function getMemes(){
    return gMemes
}

function setLineTxt(txt, memeIdx = 0, lineIdx = 0){
    gMemes[memeIdx].lines[lineIdx].txt = txt
    document.querySelector('.text-area').value = txt
    console.log('setLine:',gMemes[memeIdx].lines[lineIdx].txt)
}

function toggleWritingMode(memeIdx, lineIdx, isClicked){
    if(isClicked){
    gMemes[memeIdx].lines[lineIdx].isWritingMode = true
    console.log(gMemes[memeIdx].lines[lineIdx].isWritingMode)
    createTextArea()
    }
    else{
        gMemes[memeIdx].lines[lineIdx].isWritingMode = false
        console.log(gMemes[memeIdx].lines[lineIdx].isWritingMode)
    }
}

function createTextArea(x = 10 ,y= 30, text = 'Add Text Here'){
    let textArea = document.createElement('textarea') // Create a new textarea element
    textArea.style.position = 'absolute' // Set position to absolute
    textArea.style.left = `${x}px` // Set the x position
    textArea.style.top = `${y}px` // Set the y position
    textArea.style.background = 'transparent'
    textArea.classList.add('text-area')
    textArea.value = text // Set the initial text
    document.body.appendChild(textArea)
}