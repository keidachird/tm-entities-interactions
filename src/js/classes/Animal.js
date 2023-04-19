export default class Animal {
  previewImage = null

  constructor(data) {
    this.species = null
    ;({
      id: this.id,
      name: this.name,
      description: this.description,
      reference_image_id: this.referenceImageId,
    } = data)
  }
}
