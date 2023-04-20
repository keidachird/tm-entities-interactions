import Animal from './Animal'

export default class Dog extends Animal {
  constructor(data) {
    super(data)
    this.species = 'dog'
    this.height = data.height.metric
    this.bredFor = data.bred_for
    this.breedGroup = data.breed_group
  }
}
