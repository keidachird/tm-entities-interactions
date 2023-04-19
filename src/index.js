import './scss/main.scss'

import Cat from './js/classes/Cat'
import { getData } from './js/service/service'

const API_URL = process.env.API_URL

const createHtmlNode = (tag, className, textContent = '') => {
  const node = document.createElement(`${tag}`)
  node.classList.add(`${className}`)
  node.textContent = textContent
  return node
}

class App {
  static async init() {
    const animalsEl = document.querySelector('.animals')

    const catsJson = await getData(API_URL + '/breeds')
    const catsList = catsJson.map(data => new Cat(data))
    console.log(catsList)

    catsList.forEach(cat => {
      const animalCard = createHtmlNode('div', 'animal', cat.name)

      animalsEl.appendChild(animalCard)
    })

    console.log(animalsEl)
    // TODO implement animal preview image
    // const catImgPromises = await catsList.map(cat => {
    //   if (cat.referenceImageId) {
    //     const img = getData(API_URL + `/images/${cat.referenceImageId}`)
    //     return img
    //   }
    //   return {}
    // })
    // const catImgs = (await Promise.all(catImgPromises)).map(
    //   promise => promise.url
    // )
    // console.log(catImgs)
  }
}

App.init()
