import Animal from './Animal'

export default class Cat extends Animal {
  constructor(data) {
    super(data)
    this.species = 'cat'
  }
}
