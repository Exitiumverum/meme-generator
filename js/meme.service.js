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
                color: 'red'
            }
        ]
    }
    gMemes.push(meme)
    console.log(gMemes)
}

function getMemes(){
    return gMemes
}

function setLineTxt(txt, memeIdx, lineIdx){
    gMemes[memeIdx].lines[lineIdx].txt = txt
    console.log('setLine:',gMemes[memeIdx].lines[lineIdx].txt)
}