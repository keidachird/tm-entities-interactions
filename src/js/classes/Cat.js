import Animal from './Animal'

export default class Cat extends Animal {
  constructor(data) {
    super(data)
    this.species = 'cat'
    this.origin = data.origin
    this.description = data.description
  }
}
