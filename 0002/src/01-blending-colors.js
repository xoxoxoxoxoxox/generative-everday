const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes/1000.json');
const interpolate = require('color-interpolate');

const defaultSeed = '';

random.setSeed(defaultSeed || random.getRandomSeed());
console.log('Random seed: %s', random.getSeed());

let palette = random.pick(palettes);
palette = random.shuffle(palette);
palette = palette.slice(0, random.rangeFloor(3, palette.length + 1));
console.log('Palette: %s', JSON.stringify(palette));

const settings = {
  name: '01-blending-colors',
  dimensions: [ 2048, 2048 ],
  suffix: random.getSeed()
};

const sketch = ({ width, height }) => {
  const steps = 20;
  const margin = Math.ceil((width/steps)/2);
  const colormap = interpolate(palette);
  const background = 'hsl(0, 0%, 6%)';

  const createBands = () => {
    const bands = [];

    for (let i = 0; i < steps; i++) {
      const u = i / (steps - 1);
      const color = colormap(u);
      bands.push({
        u,
        color
      })
    }

    return bands;
  }

  const bands = createBands();

  return ({ context, width, height }) => {
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    bands.forEach(data => {
      const {
        u,
        color
      } = data;

      const w = width / steps;
      const h = height;

      const x = lerp(margin, width - margin, u);

      context.fillStyle = color;
      context.fillRect(x - Math.ceil(w/2), 0, Math.ceil(w), height);
    })
  };
};

canvasSketch(sketch, settings);
