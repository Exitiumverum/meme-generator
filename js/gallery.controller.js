'use strict'

let gCurrImg

document.documentElement.addEventListener('load', renderSqImgs())


document.querySelectorAll('.main-gallery .img').forEach(img => {
    img.addEventListener('click', () => {
        gCurrImg = img.dataset.i
        console.log('img pressed', gCurrImg)
        getMeme(+gCurrImg)
        renderMemeEditor(+gCurrImg)
    })
})

function renderMemeEditor(elImg){
    document.querySelector('.meme-editor').style.display = 'flex'


    renderMeme(elImg)

}

function getImgIdx(){
    console.log(gCurrImg)
    return +gCurrImg
}


function renderSqImgs() {
    const folderPath = 'img/meme-imgs(square)/'
    const imageCount = 10

    for (let i = 1; i <= imageCount; i++) {
        const imgElement = document.createElement('img')
        imgElement.src = `${folderPath}${i}.jpg`
        imgElement.dataset.i = i
        imgElement.classList.add('img')
        document.querySelector('.main-gallery').appendChild(imgElement)
    }
}