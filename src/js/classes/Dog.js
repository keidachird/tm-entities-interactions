import Animal from './Animal'

export default class Dog extends Animal {
  constructor(data) {
    super(data)
    this.species = 'dog'
  }
}
