# Wordle

Welcome to my Wordle clone. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and inspired by a past interview of mine.

This is a single-page application based off [Wordle](https://www.nytimes.com/games/wordle/index.html), but using a custom word list containing words that are 2 to 5 unique characters long. All other rules are the same.

The rules of wordle are as follows (from [Wikipedia](https://en.wikipedia.org/wiki/Wordle#Gameplay)):

> ... a random word is chosen which players aim to guess within six tries.
> After every guess, each letter is marked as either green, yellow or gray:
> green indicates that letter is correct and in the correct position,
> yellow means it is in the answer but not in the right position,
> while gray indicates it is not in the answer at all.

### Basic Requirements

- random word choice from the list on every game start
- a way to specify an answer by line number in `wordlist.txt`
  - e.g. specifying `80` in the answer specifier field should set the answer to `equip`
- a way to reset the game - clear the current guesses and pick a new random answer.
- a list of 6 guess slots with the correct number of characters for the answer word
  - guessed words should have colors that reflected how it matched to the answer, as per above
- an on-screen keyboard that the user can input guesses onto by clicking the keys
- have the on-screen keyboard reflect the state of the clues (keys turn grey, yellow, and green)
- have the on-screen keyboard accept keyboard events in addition to manual mouse clicking

### Stretch Features

- a hard-mode toggle
  - Hard mode requires players to include letters marked as green and yellow in subsequent guesses
- Game rules (i.e. "How to Play") overlay
- Game metrics (the histogram of number of guesses)
- Dark mode / high contrast mode
- Feedback, report a bug, etc.
- Animations

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
