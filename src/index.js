import './scss/main.scss'

import { getAnimalType, setAnimalType } from './js/utils/localStorage'
import { getAnimals, getAnimal } from './js/service/service'

const [animalsEl, catBtn, dogBtn, backgroundEl] = [
  '.animals',
  '.btn--cat',
  '.btn--dog',
  '.background',
].map(selector => document.querySelector(selector))

// DOM manipulations
const createHtmlNode = (tag, className, textContent = '') => {
  const node = document.createElement(`${tag}`)
  node.classList = className
  node.textContent = textContent
  return node
}

const renderAnimals = animals => {
  const animalEls = animals.reduce((arr, animal) => {
    const animalEl = createHtmlNode('button', 'btn animal', animal.name)
    animalEl.addEventListener('click', () =>
      handleAnimalClick(animal.id, animal.species)
    )
    return [...arr, animalEl]
  }, [])
  animalsEl.innerHTML = ''
  animalsEl.append(...animalEls)

  const animalType = getAnimalType()

  // Manipulate CSS styles
  // TODO: make a separate function
  if (animalType === 'cat') {
    catBtn.classList.add('btn--active')
    dogBtn.classList.remove('btn--active')
  } else {
    dogBtn.classList.add('btn--active')
    catBtn.classList.remove('btn--active')
  }

  if (backgroundEl.classList.value === 'background') {
    backgroundEl.classList.add(`background--${getAnimalType()}`)
  } else {
    backgroundEl.classList.toggle('background--cat')
    backgroundEl.classList.toggle('background--dog')
  }
}

// Event handlers
const handleTypeChange = async type => {
  if (type === getAnimalType()) return

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
