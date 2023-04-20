import { getData } from '../service/service'

export default class Animal {
  species = null
  previewImage = null

  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.referenceImageId = data.reference_image_id
    this.weight = data.weight.metric
    this.lifeSpan = data.life_span
    this.temperament = data.temperament
  }

  async loadPreviewImage() {
    const apiUrl =
      this.species === 'cat' ? process.env.API_URL_CAT : process.env.API_URL_DOG

    const data = await getData(`${apiUrl}/images/${this.referenceImageId}`)
    this.previewImage = data?.url
  }
}
