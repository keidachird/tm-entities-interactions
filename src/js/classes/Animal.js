export default class Animal {
  species = null
  image = null

  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.referenceImageId = data.reference_image_id
    this.weight = data.weight.metric
    this.lifeSpan = data.life_span
    this.temperament = data.temperament
  }

  async loadPreviewImage(service) {
    this.image = await service.getAnimalPreviewImage(this.referenceImageId)
  }
}
