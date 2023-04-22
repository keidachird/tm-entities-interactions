import './scss/main.scss'

import AnimalService from './js/service/AnimalService'
import AnimalDomUtility from './js/utility/AnimalDomUtility'

class App {
  static async init() {
    const domUtility = new AnimalDomUtility(new AnimalService())
    domUtility.renderAnimals(await domUtility.service.getAnimals())
  }
}

App.init()
