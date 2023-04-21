import './scss/main.scss'

import { getAnimalType, setAnimalType } from './js/utils/localStorage'
import { getAnimals, getAnimal } from './js/service/service'

const [animalsEl, catBtn, dogBtn, backgroundEl, modalEl, overlayEl] = [
  '.animals',
  '.btn--cat',
  '.btn--dog',
  '.background',
  '.modal',
  '.overlay',
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
    const animalEl = createHtmlNode('button', 'btn animals__item', animal.name)
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

const renderPrimaryInfo = animal => {
  const primaryElements = []

  const name = createHtmlNode('p', 'animal__name', animal.name)
  const temperament = createHtmlNode(
    'p',
    'animal__temperament',
    animal.temperament
  )
  const lifeSpan = createHtmlNode(
    'p',
    'animal__life-span',
    `Life span: ${animal.lifeSpan}`
  )
  const weight = createHtmlNode(
    'p',
    'animal__weight',
    `Weight: ${animal.weight} kg`
  )
  primaryElements.push(name, temperament, lifeSpan, weight)

  document.querySelector('.animal__info-primary').append(...primaryElements)
}

const renderSecondaryInfo = animal => {
  const secondaryElements = []

  switch (animal.species) {
    case 'cat':
      const description = createHtmlNode(
        'p',
        'animal__description',
        animal.description
      )
      const origin = createHtmlNode(
        'p',
        'animal__origin',
        `Origin: ${animal.origin}`
      )
      secondaryElements.push(description, origin)
      break

    case 'dog':
      const height = createHtmlNode(
        'p',
        'animal__height',
        `Height: ${animal.height} cm`
      )
      const breedGroup = createHtmlNode(
        'p',
        'animal__breed-group',
        `Breed group: ${animal.breedGroup}`
      )
      const bredFor = createHtmlNode(
        'p',
        'animal__bred-for',
        `Bred for: ${animal.bredFor}`
      )
      secondaryElements.push(height, breedGroup, bredFor)
      break

    default:
  }
  document.querySelector('.animal__info-secondary').append(...secondaryElements)
}

const renderAnimal = animal => {
  modalEl.innerHTML = ''

  const img = createHtmlNode('img', 'animal__img')
  const infoPrimary = createHtmlNode('div', 'animal__info-primary')
  const infoSecondary = createHtmlNode('div', 'animal__info-secondary')

  img.src = animal.previewImage
  img.alt = `${animal.name} image`

  modalEl.append(img, infoPrimary, infoSecondary)
  renderPrimaryInfo(animal)
  renderSecondaryInfo(animal)
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

  renderAnimal(selectedAnimal)

  overlayEl.classList.remove('hidden')
  modalEl.classList.remove('hidden')
  console.log(selectedAnimal)
}

class App {
  static async init() {
    catBtn.addEventListener('click', () => handleTypeChange('cat'))
    dogBtn.addEventListener('click', () => handleTypeChange('dog'))

    overlayEl.addEventListener('click', () => {
      overlayEl.classList.add('hidden')
      modalEl.classList.add('hidden')
    })

    renderAnimals(await getAnimals())
  }
}

App.init()
