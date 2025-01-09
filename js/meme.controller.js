'use strict'

const gElCanvas = document.querySelector('.meme-canvas')
const gCtx = gElCanvas.getContext('2d')
let gIsWriting = false
let gIsFirstClick = true
let isDragging = false
let offsetX, offsetY

const elHtml = document.documentElement
const textarea = document.querySelector('.text-area')



// let download = document.getElementById('downloadBtn')
// download.addEventListener('click', downloadImage)

// check if the text area is clicked
elHtml.addEventListener("click", (event) => {
    const elLineText = document.querySelector('.line-text')
    const elTextArea = document.querySelector('.text-area')
    // const isClickInside = elLineText.contains(event.target)
    let isClickInside
    if (elLineText.contains(event.target)) isClickInside = true
    else if (!elTextArea) return
    else if (elTextArea.contains(event.target)) isClickInside = true
    else isClickInside = false

    console.log(event.target)
    // const keyPress = elHtml.addEvbvventListener('keyup')
    // console.log(event)
    // console.log(isClickInside, gIsFirstClick)

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
    if (event.key = 'delete') {
        console.log(event, 'delete was pressed')
        // drawImg(getImgIdx())
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

document.querySelector('.search-bar').addEventListener('focus', function () {
    this.value = ''
})
document.querySelector('.search-bar').addEventListener('blur', function () {
    this.value = 'Search'
})

document.querySelector('.color-picker').addEventListener('input', function (event) {
    const selectedColor = event.target.value
    gMemes[0].lines[0].color = selectedColor
    console.log(gMemes[0].lines[0].color)
    console.log('Selected color:', selectedColor)
})

document.querySelector('.font-increase').addEventListener('click', function (event, memeIdx = 0, lineIdx = 0) {
    gMemes[0].lines[0].size += 1
    drawImg(gCurrImg)
    console.log(gMemes[0].lines[0].size)
    renderMemeLine(gMemes[memeIdx].lines[lineIdx].x, gMemes[memeIdx].lines[lineIdx].y, gMemes[memeIdx].lines[lineIdx].txt)
})


function renderMeme(imgIdx, lineText = 'Add Text Here') {
    drawImg(imgIdx)
    renderMemeLine(50, 40, getMemes()[0].lines[0].txt)
}

function renderMemeLine(x, y, lineText) {
    gCtx.textBaseline = 'top'
    gCtx.textAlign = 'left'
    gCtx.fillStyle = gMemes[0].lines[0].color
    gCtx.font = `${gMemes[0].lines[0].size}px ${getMemes()[0].lines[0].font}`
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

function downloadMeme() {
    var dataUrl = gElCanvas.toDataURL("image/png")
    var a = document.createElement('a')

    a.href = dataUrl
    a.download = 'meme.jpeg'
    a.click()
}



