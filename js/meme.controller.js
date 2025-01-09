'use strict'

const gElCanvas = document.querySelector('.meme-canvas')
const gCtx = gElCanvas.getContext('2d')
let gIsWriting = false
let gIsFirstClick = true

const elHtml = document.documentElement

function onInit() {
    console.log('Hello World')

}

// check if the text area is clicked
elHtml.addEventListener("click", (event) => {
    const elLineText = document.querySelector('.line-text')
    const isClickInside = elLineText.contains(event.target)
    // const keyPress = elHtml.addEvbvventListener('keyup')
    // console.log(event)
    console.log(isClickInside, gIsFirstClick)

    if (!isClickInside && !gIsFirstClick) {
        console.log('Clicked outside the line-text element')
        toggleWritingMode(0, 0, false)
    } else if (isClickInside) {
        if (!gIsWriting) {
            toggleWritingMode(0, 0, true)
            gIsWriting = true
        }
        // console.log(event.type)
    }
})

document.querySelector('.line-text').addEventListener('keyup', (event) => {
    // if(event.key === 'Enter' && !gIsFirstClick) {
    //     toggleWritingMode(0, 0, false)
    //     document.querySelector('.line-text').blur()
    // }
    setLineTxt(document.querySelector('.line-text').value)
    console.log(document.querySelector('.line-text').value)
})

document.querySelector('.search-bar').addEventListener('focus', function() {
    this.value = ''
})
document.querySelector('.search-bar').addEventListener('blur', function() {
    this.value = 'Search'
})


function renderMeme(imgIdx, lineText = 'Add Text Here') {
    drawImg(imgIdx)
    renderMemeLine(50, 40, getMemes()[0].lines[0].txt)
}

function renderMemeLine(x, y, lineText) {
    gCtx.textBaseline = 'top'
    gCtx.textAlign = 'left'
    gCtx.font = `${getMemes()[0].lines[0].size} ${getMemes()[0].lines[0].font}`
    console.log(getMemes()[0].lines[0].size)
    gCtx.fillText(lineText, x, y)
}

function drawImg(imgIdx = 1) {
    const elImg = new Image()
    elImg.src = `/img/meme-imgs(square)/${imgIdx}.jpg`
    elImg.onload = function () {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function handleInputEvent(elInput) {
    setLineTxt(elInput.value, 0, 0)

    renderMemeLine(getMemes[0].lines[0].x, getMemes[0].lines[0].x, elInput.value)

    toggleWritingMode(0, 0)

    // console.log('hy')
    // console.log(elInput.value)
}

function handleCanvasClick() {
    document.querySelector('.meme-canvas')
}



