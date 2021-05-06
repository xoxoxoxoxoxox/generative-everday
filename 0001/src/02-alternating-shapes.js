const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const defaultSeed = '';

random.setSeed(defaultSeed || random.getRandomSeed());
console.log('Random seed: %s', random.getSeed());

const settings = {
  name: '02-alternating-shapes',
  dimensions: [ 2048, 2048 ],
  suffix: random.getSeed()
};

const sketch = () => {
  const count = 9;
  const radius = random.rangeFloor(50, 100);

  const createGrid = () => {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        const position = [ u, v ];
        points.push({
          position
        });
      }
    }
    return points;
  };

  const points = createGrid();

  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    points.forEach((data, index) => {
      const {
        position
      } = data;

      const margin = width / count;
      const x = lerp(margin, width - margin, position[0]);
      const y = lerp(margin, height - margin, position[1]);

      const length = radius;

      (index % 2)
        ? drawCircle(context, x, y, radius)
        : drawCross(context, x, y, length);
    })
  };
};

function drawCircle(context, x, y, radius) {
  context.strokeStyle = 'white';
  context.lineWidth = 20;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.stroke();
}

function drawCross(context, x, y, length) {
  context.strokeStyle = 'white';
  context.lineWidth = 20;
  context.beginPath();
  context.moveTo(x - length, y - length);
  context.lineTo(x + length, y + length);
  context.moveTo(x - length, y + length);
  context.lineTo(x + length, y - length);
  context.stroke();
}

canvasSketch(sketch, settings);