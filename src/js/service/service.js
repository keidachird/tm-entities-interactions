import axios from 'axios'

import Cat from '../classes/Cat'
import Dog from '../classes/Dog'
import { getAnimalType } from '../utils/localStorage'

const getApiUrl = () =>
  getAnimalType() === 'cat' ? process.env.API_URL_CAT : process.env.API_URL_DOG
const getApiKey = () =>
  getAnimalType() === 'cat' ? process.env.API_KEY_CAT : process.env.API_KEY_DOG

export const getData = async url => {
  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': getApiKey(),
  }

  try {
    const response = await axios.get(url, { headers })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getAnimals = async () => {
  const animalType = getAnimalType()
  const apiUrl = getApiUrl()

  try {
    const animalsJson = await getData(`${apiUrl}/breeds`)
    const animalsList = animalsJson.map(data =>
      animalType === 'cat' ? new Cat(data) : new Dog(data)
    )
    return animalsList
  } catch (error) {
    console.log(error)
  }
}

export const getAnimal = async (animalId, animalType) => {
  const apiUrl = getApiUrl()

  try {
    const animalJson = await getData(`${apiUrl}/breeds/${animalId}`)
    const animal =
      animalType === 'cat' ? new Cat(animalJson) : new Dog(animalJson)
    return animal
  } catch (error) {
    console.log(error)
  }
}
