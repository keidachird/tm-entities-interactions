export default class AnimalLocalStorage {
  static setAnimalType(type) {
    localStorage.setItem('animalType', JSON.stringify(type))
  }

  static getAnimalType() {
    const type = JSON.parse(localStorage.getItem('animalType') || '"cat"')
    this.setAnimalType(type)
    return type
  }
}
