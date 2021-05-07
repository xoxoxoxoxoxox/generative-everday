const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const pack = require('pack-spheres');

const defaultSeed = '';

random.setSeed(defaultSeed || random.getRandomSeed());
console.log('Random seed: %s', random.getSeed());

const settings = {
  name: '02-circle-packing',
  dimensions: [ 2048, 2048 ],
  suffix: random.getSeed()
};

const sketch = ({ width, height }) => {
  const size = Math.min(width, height);

  const margin = width * 0.1;
  const scale = 0.5 * size - margin;

  const shapes = pack({
    dimensions: 2,
    padding: 0.0025
  });


  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Centered origin point
    context.translate(width / 2, height / 2);
    // Scale from -1..1 to -scale..scale
    context.scale(scale, scale);

    shapes.forEach(shape => {
      context.beginPath();
      context.arc(
        shape.position[0],
        shape.position[1],
        shape.radius,
        0,
        Math.PI * 2
      );
      context.fillStyle = "black";
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);