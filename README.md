# Generative Everday

An ongoing project to try to create new generative art experiment(s) each day.

### Resources

[`canvas-sketch`](https://github.com/mattdesl/canvas-sketch) framework by [Matt DesLauriers](https://mattdesl.com/)

### Contents

- [0000](#0000)

## 0000

#### Basic Grid

- [multi-dimensional array of UV coordinates](https://github.com/mattdesl/workshop-generative-art/blob/master/docs/cheat-sheet.md#grids--uv-coordinates)
- mapped to pixel values with [linear interpolation](https://github.com/mattdesl/workshop-generative-art/blob/master/docs/cheat-sheet.md#padding-with-margins-using-linear-interpolation).

#### Random Grid

- using [Random with a Seeds](https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/random.md) technique to allow reproduceable randomness

```js
// You can force a specific seed by replacing this with a string value
const defaultSeed = "";
// Set a random seed so we can reproduce this print later
random.setSeed(defaultSeed || random.getRandomSeed());
// Print to console so we can see which seed is being used and copy it if desired
console.log("Random Seed:", random.getSeed());
```

<a href="https://github.com/xoxoxoxoxoxox/generative-everday/blob/master/0000/src/01-basic-grid.js"><img src="0000/renders/01-basic-grid.png" width="50%" /></a>
<a href="https://github.com/xoxoxoxoxoxox/generative-everday/blob/master/0000/src/02-random-grid.js"><img src="0000/renders/02-random-grid-63543.png" width="50%" /></a>