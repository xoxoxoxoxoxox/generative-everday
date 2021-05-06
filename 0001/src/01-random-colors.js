const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes/1000.json');

const defaultSeed = '';

random.setSeed(defaultSeed || random.getRandomSeed());
console.log('Random seed: %s', random.getSeed());

let palette = random.pick(palettes);
palette = random.shuffle(palette);
palette = palette.slice(0, random.rangeFloor(3, palette.length + 1));
console.log('Palette: %s', JSON.stringify(palette));

const background = palette.shift();

const settings = {
  name: '01-random-colors',
  dimensions: [ 2048, 2048 ],
  suffix: random.getSeed()
};

const sketch = async () => {
  const count = 20;

  const createGrid = () => {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        const position = [ u, v ];
        points.push({
          color: random.pick(palette),
          radius: Math.abs(50 * random.gaussian()),
          position
        });
      }
    }
    return points;
  };

  let points = createGrid().filter(() => random.chance(0.5));

  return ({ context, width, height }) => {
    const margin = width * 0.175;

    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const {
        position,
        radius,
        color
      } = data;
      const x = lerp(margin, width - margin, position[0]);
      const y = lerp(margin, height - margin, position[1]);

      context.fillStyle = color;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2, false);
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);