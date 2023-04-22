# Entities Interactions

This project demonstrates interactions with entities. It was made as a homework for [Techmagic Academy](https://www.techmagic.co/techmagic-academy).

---

## PART 1 OF JS HOMEWORK IS [HERE](https://github.com/keidachird/tm-basic-queue)

---

## Overview

This project retrieves information about cat and dog breeds from an open API ([Cats](https://thecatapi.com/) and [Dogs](https://thedogapi.com/)) and displays them in a user-friendly format. It allows users to browse different breeds, and by clicking on a breed, to see more detailed information.

## Demo

You can see a live demo of this project [here](https://keidachird.github.io/tm-entities-interactions/).

## Project details

- The whole application uses OOP approach.
- The program has three entities: `Animal`, `Cat` and `Dog`. Both `Cat` and `Dog` extends `Animal`.
- Every type of API request is implemented in _asynchronous_ method in the `AnimalService` class.
- The `AnimalDomUtility` class provides methods for DOM manipulation throughout the application usage.
- The state of the animal type is saved through page reloads.
- The UI is adaptive for all screen sizes.

## Installation

- Clone this repository with `git clone https://github.com/keidachird/tm-entities-interactions.git`.
- Open the cloned folder with `cd tm-entities-interactions`.
- Run `npm i` to install all dependencies.
- In the project root folder create `.env` file with the following content:

  ```
  API_URL_CAT = https://api.thecatapi.com/v1
  API_URL_DOG = https://api.thedogapi.com/v1

  ```

- Run `npm run dev` to launch a server. It will open a browser, and you can use the application.

## Usage

After page loads, you will see two buttons for cats and dogs. By clicking on them, you can retrieve a list of breeds for either cats or dogs. By default, the cat breeds will be loaded, but the state of animal type will be saved through page reloads. When you click on a breed, a modal window will appear with information about the breed and its picture. You can close the modal by clicking on the close button, outside the modal window or by pressing `Escape` key.

## Examples

Here are some examples of the application UI and its usage.

- **Cat breeds page**:

![Cat breeds page](https://i.ibb.co/ySvBbTg/tm-entities-interactions-screenshot-cats.png)

- **Dog breeds page**:

![Dog breeds page](https://i.ibb.co/Gds9Y7j/tm-entities-interactions-screenshot-dogs.png)

- **Cat details**:

![Cat details](https://i.ibb.co/Ry8wCxq/tm-entities-interactions-screenshot-cat-details.png)

- **Dog details**:

![Dog details](https://i.ibb.co/JnNMhH0/tm-entities-interactions-screenshot-dog-details.png)

- **On mobile device portrait mode**:

![On mobile device portrait mode](https://i.ibb.co/hY8v01P/tm-entities-interactions-screenshot-mobile-portrait.png)

- **On mobile device landscape mode**:

![On mobile device landscape mode](https://i.ibb.co/dGp7Mnj/tm-entities-interactions-screenshot-mobile-landscape.png)

```

```
