# GoFundMe Demo App

### Setup
Install dependencies, then run the app locally:

```bash
yarn install
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Integration Tests
While the app is running on localhost:3000, you can run Cypress integration tests, by opening a new terminal into the root directory of this project and running:

```bash
yarn cypress
```
### Features
This app consists of two pages: PageA and PageB.

**PageA** allows the user to enter lines of text into an input (max 200 chars) and save to a list. The average word count for all lines of text in the list will display and dynamically update.

**PageB** allows the user to search for people in the StarWars universe by name. A minimum of 2 chars are required in the search bar before results will appear. Clicking on a result will show the species of the selected person in a modal.