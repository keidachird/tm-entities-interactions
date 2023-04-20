import './scss/main.scss'

import Dog from './js/classes/Dog'
import Cat from './js/classes/Cat'

import { getAnimalType, setAnimalType } from './js/utils/localStorage'
import { getData } from './js/service/service'

const [animalsEl, catBtn, dogBtn] = ['.animals', '.cat-btn', '.dog-btn'].map(
  selector => document.querySelector(selector)
)

const API_URL_CAT = process.env.API_URL_CAT
const API_KEY_CAT = process.env.API_KEY_CAT
const API_URL_DOG = process.env.API_URL_DOG
const API_KEY_DOG = process.env.API_KEY_DOG

const getAnimals = async animalType => {
  const apiUrl = animalType === 'cat' ? API_URL_CAT : API_URL_DOG
  const animalsJson = await getData(`${apiUrl}/breeds`)
  const animalsList = animalsJson.map(data =>
    animalType === 'cat' ? new Cat(data) : new Dog(data)
  )
  return animalsList
}

const getAnimal = async (animalId, animalType) => {
  const apiUrl = animalType === 'cat' ? API_URL_CAT : API_URL_DOG
  const animalJson = await getData(`${apiUrl}/breeds/${animalId}`, API_KEY_CAT)
  const animal =
    animalType === 'cat' ? new Cat(animalJson) : new Dog(animalJson)
  return animal
}

const createHtmlNode = (tag, className, textContent = '') => {
  const node = document.createElement(`${tag}`)
  node.classList.add(`${className}`)
  node.textContent = textContent
  return node
}

const renderAnimals = animals => {
  const animalEls = animals.reduce((arr, animal) => {
    const animalEl = createHtmlNode('button', 'animal', animal.name)
    animalEl.addEventListener('click', () =>
      handleAnimalClick(animal.id, animal.species)
    )
    return [...arr, animalEl]
  }, [])
  animalsEl.innerHTML = ''
  animalsEl.append(...animalEls)
}

const handleTypeChange = async type => {
  setAnimalType(type)
  const animals = await getAnimals(getAnimalType())
  console.log(animals)
  renderAnimals(animals)
}

const handleAnimalClick = async (id, type) => {
  const selectedAnimal = await getAnimal(id, type)
  console.log(selectedAnimal)
}

class App {
  static async init() {
    catBtn.addEventListener('click', async () => await handleTypeChange('cat'))
    dogBtn.addEventListener('click', async () => await handleTypeChange('dog'))

    const animalType = await getAnimalType()
    const onLoadAnimals = await getAnimals(animalType)
    renderAnimals(onLoadAnimals)

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
