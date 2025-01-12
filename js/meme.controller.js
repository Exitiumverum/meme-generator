'use strict'

const gElCanvas = document.querySelector('.meme-canvas')
const gCtx = gElCanvas.getContext('2d')
let gIsWriting = false
let gIsFirstClick = true
let isDragging = false
let offsetX, offsetY
let gAddLineCount = 0


const elHtml = document.documentElement
const textarea = document.querySelector('.text-area')



// let download = document.getElementById('downloadBtn')
// download.addEventListener('click', downloadImage)

// check if the text area is clicked
elHtml.addEventListener("click", (event) => {
    const elLineText = document.querySelector('.line-text')
    const elTextArea = document.querySelector('.text-area')
    const elFontIncrease = document.querySelector('.font-increase')
    const elFontDecrease = document.querySelector('.font-decrease')
    const elAddLine = document.querySelector('.add-line')
    const elChangeLine = document.querySelector('.change-line')
    const elMenuOpener = document.querySelector('.menu-opener')
    // const isClickInside = elLineText.contains(event.target)
    let IsClickOnLine
    let isClickOnFontIncrease
    let isClickOnFontDecrease
    let isClickOnAddLine

    if(document.querySelector('.main-nav').classList.contains('menu-clicked')){
        console.log('clicked on close menu')
        document.querySelector('.main-nav').classList.remove('menu-clicked')
        return console.log('byrbr')
    }

    if(elMenuOpener.contains(event.target)){
        document.querySelector('.main-nav').classList.add('menu-clicked')
    }

    if (elAddLine.contains(event.target)) {
        console.log('clicked on add line')
        isClickOnAddLine = true
        // console.log(isClickOnAddLine)
        console.log(gCurrLine)
        if(gIsWriting) return
        if (isNull(gCurrLine) || gMemes[gCurrMeme].lines.length < 2) {
            if (isNull(gCurrLine)) {
                console.log('first if', gCurrMeme)
                getLine(gCurrMeme, 40, 40)
                onCreateLine()
            }
            else if (gCurrLine === 0) {
                console.log('second if')
                getLine(gCurrMeme, 40, 400)
                // gMemes[gCurrMeme].lines[gCurrLine].gIsWriting = true
                // renderTextArea()
                onCreateLine()
                // renderMemeLine(gMemes[gCurrMeme].lines[0].x, gMemes[gCurrMeme].lines[0].y, gMemes[gCurrMeme].lines[0].txt)
                // for(let i = 0; i < gMemes[gCurrMeme].lines.length; i++){
                //     renderMemeLine(gMemes[gCurrMeme].lines[i].x, gMemes[gCurrMeme].lines[i].y, gMemes[gCurrMeme].lines[i].txt)
                // }
            } 
        }
        else console.log('max lines reached!')
        gAddLineCount++
        return 
    }

    if (elChangeLine.contains(event.target)) {
        if (gCurrLine === 0) {
            gCurrLine = 1
            elLineText.value = gMemes[gCurrMeme].lines[gCurrLine].txt
            console.log(gCurrLine)
        } else if (gCurrLine === 1) {
            gCurrLine = 0
            elLineText.value = gMemes[gCurrMeme].lines[gCurrLine].txt
            console.log(gCurrLine)
        } else return
    }

    else isClickOnAddLine = false

    if (elFontIncrease.contains(event.target)) isClickOnFontIncrease = true
    else isClickOnFontIncrease = false

    if (elFontDecrease.contains(event.target)) isClickOnFontDecrease = true
    else isClickOnFontDecrease = false

    if (elLineText.contains(event.target)) IsClickOnLine = true
    else if (!elTextArea) return
    else if (elTextArea.contains(event.target)) IsClickOnLine = true
    else IsClickOnLine = false

    console.log(event.target)
    // const keyPress = elHtml.addEvbvventListener('keyup')
    // console.log(event)
    // console.log(isClickInside, gIsFirstClick)



    if (!IsClickOnLine && !gIsFirstClick && !isClickOnFontIncrease && !isClickOnFontDecrease && !isClickOnAddLine) {

        console.log('Clicked outside the line-text element', gCurrLine)
        toggleWritingMode(0, gCurrLine, false)
    } else if (IsClickOnLine) {
        onEditLine()
        // if (!gIsWriting) {
        //     getLine(getMemeIdx())
        //     toggleWritingMode(0, 0, true)
        //     gIsWriting = true
        // }
        // console.log(event.type)
    } else if (isClickOnFontIncrease) {
        destroyTextArea()
        gMemes[gCurrMeme].lines[gCurrLine].size += 2
        drawImg(getImgIdx())
        createTextArea(0, 0, gMemes[gCurrMeme].lines[gCurrLine].txt)
    } else if (isClickOnFontDecrease) {
        console.log('Hey Decreased')
        destroyTextArea()
        gMemes[getMemeIdx()].lines[getLineIdx()].size -= 2
        drawImg(getImgIdx())
        createTextArea(0, 0, gMemes[getMemeIdx()].lines[getLineIdx()].txt)
    }
    // if (event.key = 'delete') {
    //     console.log(event, 'delete was pressed')
    //     drawImg(getImgIdx())
    // }
})

document.querySelector('.line-text').addEventListener('keyup', (event) => {
    // if(event.key === 'Enter' && !gIsFirstClick) {
    //     toggleWritingMode(0, 0, false)
    //     document.querySelector('.line-text').blur()
    // }
    setLineTxt(document.querySelector('.line-text').value, gCurrMeme, gCurrLine)
    console.log('clicked', document.querySelector('.line-text').value)
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

function onCreateLine() {
    console.log(gIsWriting)
        console.log(gCurrLine, gCurrMeme)
    if (!gIsWriting) {
        // getLine(gCurrMeme)
        toggleWritingMode(gCurrMeme, gCurrLine, true)
        gIsWriting = true
    }
}

function onEditLine() {
    if (!gIsWriting) {
        toggleWritingMode(0, 0, true)
        gIsWriting = true
    }
}

function renderMeme(imgIdx,i, lineText = 'Add Text Here') {
    drawImg(imgIdx)
    if (getLineCount() > 0) {
        
            renderMemeLine(gMemes[gCurrMeme].lines[i].x, gMemes[gCurrMeme].lines[i].y, gMemes[gCurrMeme].lines[gCurrLine].txt)
        
    }
}

function renderMemeLine(x, y, lineText, lineIdx) {
    gCtx.textBaseline = 'top'
    gCtx.textAlign = 'left'
    gCtx.fillStyle = gMemes[0].lines[0].color
    gCtx.font = `${gMemes[gCurrMeme].lines[lineIdx].size}px ${gMemes[gCurrMeme].lines[lineIdx].font}`
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



