# JavaScript/Front-end Developer - Exercise 1

This is my fisrt homework for [Digital Natives](https://www.digitalnatives.hu).

[Click here to see it in action!](https://gergooo.github.io/digitalnatives-assessment/)

For my second homework, go to the [node-todo](https://github.com/gergooo/digitalnatives-assessment/tree/node-todo) branch.

## Original instructions

> ### Instructions
>
> - Fork this project.
> - Write tests.
> - Don't use external libraries for the conversion.
> - Commit the important milestones and not just the final result.
>
> ### Exercise description
>
> Create an application that contains a web form, which has a numeric input field and a submit button.
>
> When the user gives an arabic number, the system shows the english phrase of that number.
>
> For example:
>
> <pre>
> 7    == seven
> 42   == forty-two
> 2001 == two thousand and one
> 1999 == nineteen hundred and ninety-nine
> 17999 == seventeen thousand nine hundred and ninety-nine
> </pre>
>
> That's all.

## Implementation

For this project I chose VanillaJS over React because of two reasons:

1. The UI/UX is very simple.
2. Mocha is much faster than Jest (default for React apps), i.e. 15 ms vs 3-4 seconds. Much better experience for TDD.

After putting together the environment (Mocha as testing framework, Chai as assert library, eslint for linting), I've implemented the number-to-words algorithm `getNumberPhrase(num)` using _Test-Driven Development_.

### Algorithm

The converter algorithm is an iteration: it converts the number by thousands groups, starting with the smallest one, concatenating the results together.

E.g. for `4,512,063`:

1. input is `4,512,063` -> smallest group is `063` -> group with name: `sixty-three` -> remainder: `4,512`,
2. input is `4,512` -> smallest group is `512` -> group with name: `five hundred and twelve thousand` -> remainder: `4`,
3. input is `4` -> smallest group is `4` -> group with name: `four million` -> remainder: `null` -> end of iteration.

Before starting the algorithm, two special cases are handled:

- zero,
- numbers above `1000` and below `2000`, e.g. `1999` is `nineteen hundred and ninety-nine`

### UI

The whole app consists of one `html` file and two `js` files: one is the algorithm itself, another is the `index.js` which is the interface between the `html` and the algorithm: it validates the user input, forwards it to the algorithm and displays the results.

For styling, I wanted something simple and fun, so centered everything and used a color palette from [ColourLovers](https://www.colourlovers.com/palette/1047246/Playroom), and added some CSS transitions triggered by JavaScript to improve user experience.

### E2E test

Finally, I wrote end-to-end tests using `selenium` webdriver with `geckodriver` for Firefox, to cover the main user journey and the error handling.
