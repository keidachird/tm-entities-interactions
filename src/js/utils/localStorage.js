export const setAnimalType = type => {
  localStorage.setItem('animalType', JSON.stringify(type))
}

export const getAnimalType = () => {
  const type = JSON.parse(localStorage.getItem('animalType'))
  if (!type) setAnimalType('cat')
  return type
}
