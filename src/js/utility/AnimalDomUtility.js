import AnimalLocalStorage from './AnimalLocalStorage'

export default class AnimalDomUtility {
  constructor(service) {
    this.service = service
    ;[
      this.animalsEl,
      this.catBtn,
      this.dogBtn,
      this.backgroundEl,
      this.modalEl,
      this.overlayEl,
    ] = [
      '.animals',
      '.btn--cat',
      '.btn--dog',
      '.background',
      '.modal',
      '.overlay',
    ].map(selector => document.querySelector(selector))

    this.catBtn.addEventListener('click', () => this.handleTypeChange('cat'))
    this.dogBtn.addEventListener('click', () => this.handleTypeChange('dog'))
    this.overlayEl.addEventListener('click', this.handleCloseModal)
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.handleCloseModal()
    })
  }

  createHtmlNode(tag, className, textContent = '') {
    const node = document.createElement(`${tag}`)
    node.classList = className
    node.textContent = textContent
    return node
  }

  renderAnimals(animals) {
    const animalEls = animals.reduce((arr, animal) => {
      const animalEl = this.createHtmlNode(
        'button',
        'btn animals__item',
        animal.name
      )
      animalEl.addEventListener('click', () =>
        this.handleAnimalClick(animal.id, animal.species)
      )
      return [...arr, animalEl]
    }, [])
    this.animalsEl.innerHTML = ''
    this.animalsEl.append(...animalEls)

    const animalType = AnimalLocalStorage.getAnimalType()

    // Manipulate CSS styles
    if (animalType === 'cat') {
      this.catBtn.classList.add('btn--active')
      this.dogBtn.classList.remove('btn--active')
    } else {
      this.dogBtn.classList.add('btn--active')
      this.catBtn.classList.remove('btn--active')
    }

    if (this.backgroundEl.classList.value === 'background') {
      this.backgroundEl.classList.add(
        `background--${AnimalLocalStorage.getAnimalType()}`
      )
    } else {
      this.backgroundEl.classList.toggle('background--cat')
      this.backgroundEl.classList.toggle('background--dog')
    }
  }

  renderPrimaryInfo(animal) {
    const primaryElements = []

    const name = this.createHtmlNode('p', 'animal__name', animal.name)
    const temperament = this.createHtmlNode(
      'p',
      'animal__temperament',
      animal.temperament
    )
    const lifeSpan = this.createHtmlNode(
      'p',
      'animal__life-span',
      `Life span: ${animal.lifeSpan}`
    )
    const weight = this.createHtmlNode(
      'p',
      'animal__weight',
      `Weight: ${animal.weight} kg`
    )
    primaryElements.push(name, temperament, lifeSpan, weight)

    document.querySelector('.animal__info-primary').append(...primaryElements)
  }

  renderSecondaryInfo(animal) {
    const secondaryElements = []

    switch (animal.species) {
      case 'cat':
        const description = this.createHtmlNode(
          'p',
          'animal__description',
          animal.description
        )
        const origin = this.createHtmlNode(
          'p',
          'animal__origin',
          `Origin: ${animal.origin}`
        )
        secondaryElements.push(description, origin)
        break

      case 'dog':
        const height = this.createHtmlNode(
          'p',
          'animal__height',
          `Height: ${animal.height} cm`
        )
        const breedGroup = this.createHtmlNode(
          'p',
          'animal__breed-group',
          `Breed group: ${animal.breedGroup}`
        )
        const bredFor = this.createHtmlNode(
          'p',
          'animal__bred-for',
          `Bred for: ${animal.bredFor}`
        )
        secondaryElements.push(height, breedGroup, bredFor)
        break

      default:
    }
    document
      .querySelector('.animal__info-secondary')
      .append(...secondaryElements)
  }

  async renderAnimal(animal) {
    this.modalEl.innerHTML = ''
    const closeBtn = this.createHtmlNode(
      'button',
      'btn modal__btn-close',
      '\u2715'
    )
    closeBtn.addEventListener('click', this.handleCloseModal)

    this.modalEl.appendChild(closeBtn)

    const img = this.createHtmlNode('img', 'animal__img')
    const infoPrimary = this.createHtmlNode('div', 'animal__info-primary')
    const infoSecondary = this.createHtmlNode('div', 'animal__info-secondary')

    img.src = animal.image ?? 'https://placehold.co/500'
    img.alt = `${animal.name} image`

    this.modalEl.append(img, infoPrimary, infoSecondary)
    this.renderPrimaryInfo(animal)
    this.renderSecondaryInfo(animal)
  }

  async handleTypeChange(type) {
    if (type === AnimalLocalStorage.getAnimalType()) return

    AnimalLocalStorage.setAnimalType(type)
    const animals = await this.service.getAnimals(type)
    this.renderAnimals(animals)
  }

  async handleAnimalClick(id, type) {
    const selectedAnimal = await this.service.getAnimal(id, type)
    await selectedAnimal.loadPreviewImage(this.service)

    await this.renderAnimal(selectedAnimal)

    this.overlayEl.classList.remove('hidden')
    this.modalEl.classList.remove('hidden')
  }

  handleCloseModal = () => {
    this.overlayEl.classList.add('hidden')
    this.modalEl.classList.add('hidden')
  }
}
