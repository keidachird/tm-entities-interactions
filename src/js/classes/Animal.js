export default class Animal {
  previewImage = null
  species = null

  constructor(data) {
    ;({
      id: this.id,
      name: this.name,
      description: this.description,
      reference_image_id: this.referenceImageId,
    } = data)
  }
}
