import axios from 'axios'

import Cat from '../classes/Cat'
import Dog from '../classes/Dog'
import AnimalLocalStorage from '../utility/AnimalLocalStorage'

export default class AnimalService {
  headers = {
    'Content-Type': 'application/json',
    'x-api-key': this.getApiKey(),
  }

  async getData(url) {
    try {
      const response = await axios.get(url, { headers: this.headers })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async getAnimals() {
    const animalType = AnimalLocalStorage.getAnimalType()
    const apiUrl = this.getApiUrl()

    try {
      const animalsJson = await this.getData(`${apiUrl}/breeds`)
      const animalsList = animalsJson.map(data =>
        animalType === 'cat' ? new Cat(data) : new Dog(data)
      )
      return animalsList
    } catch (error) {
      console.log(error)
    }
  }

  async getAnimal(animalId, animalType) {
    const apiUrl = this.getApiUrl()

    try {
      const animalJson = await this.getData(`${apiUrl}/breeds/${animalId}`)
      const animal =
        animalType === 'cat' ? new Cat(animalJson) : new Dog(animalJson)
      return animal
    } catch (error) {
      console.log(error)
    }
  }

  async getAnimalPreviewImage(referenceImageId) {
    const apiUrl = this.getApiUrl()
    if (!referenceImageId) return

    try {
      const { url } = await this.getData(`${apiUrl}/images/${referenceImageId}`)
      return url
    } catch (error) {
      console.log(error)
    }
  }

  getApiUrl() {
    return AnimalLocalStorage.getAnimalType() === 'cat'
      ? process.env.API_URL_CAT
      : process.env.API_URL_DOG
  }

  getApiKey() {
    return AnimalLocalStorage.getAnimalType() === 'cat'
      ? process.env.API_KEY_CAT
      : process.env.API_KEY_DOG
  }
}
