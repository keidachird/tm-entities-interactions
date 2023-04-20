import './scss/main.scss'

import { getAnimalType, setAnimalType } from './js/utils/localStorage'
import { getAnimals, getAnimal } from './js/service/service'

const [animalsEl, catBtn, dogBtn] = ['.animals', '.cat-btn', '.dog-btn'].map(
  selector => document.querySelector(selector)
)

// DOM manipulations
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

// Event handlers
const handleTypeChange = async type => {
  setAnimalType(type)
  const animals = await getAnimals(getAnimalType())
  renderAnimals(animals)
}

const handleAnimalClick = async (id, type) => {
  const selectedAnimal = await getAnimal(id, type)
  await selectedAnimal.loadPreviewImage()
  console.log(selectedAnimal)
}

class App {
  static async init() {
    catBtn.addEventListener('click', async () => await handleTypeChange('cat'))
    dogBtn.addEventListener('click', async () => await handleTypeChange('dog'))

    renderAnimals(await getAnimals())
  }
}

App.init()
