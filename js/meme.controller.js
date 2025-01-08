'use strict'

const gElCanvas = document.querySelector('.meme-canvas')
const gCtx = gElCanvas.getContext('2d')
let gIsWriting = false



// check if the text area is clicked
document.documentElement.addEventListener("click", (event) => {
    const elLineText = document.querySelector('.line-text')
    const isClickInside = elLineText.contains(event.target)
    // console.log(event)
    
    if (!isClickInside) {
        console.log('Clicked outside the line-text element')
        toggleWritingMode(0, 0, false)
    } else {
        toggleWritingMode(0, 0, true)
        // console.log(event.type)
    }
})

document.querySelector('.line-text').addEventListener('keyup', () => [
    setLineTxt(document.querySelector('.line-text').value)
])

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

    toggleWritingMode(0, 0)

    console.log('hy')
    console.log(elInput.value)
}

function handleCanvasClick(){
    document.querySelector('.meme-canvas')
}



