const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const Random = require('canvas-sketch-util/random');

const defaultSeed = '';

Random.setSeed(defaultSeed || Random.getRandomSeed());
console.log('Random seed: %s', Random.getSeed());

const settings = {
  name: '02-random-grid',
  dimensions: [ 2048, 2048 ],
  suffix: Random.getSeed()
};

const sketch = () => {
  // items in the grid
  const count = Random.rangeFloor(10, 25);

  console.log(count);

  //  creates a u,v grid
  const createGrid = () => {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        points.push([ u, v ]);
      }
    }
    return points;
  };

  const points = createGrid();

  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    points.forEach(([u, v]) => {

      const margin = width / count;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      const radius = Random.pick([10,20,30,40,50]);

      context.fillStyle = 'white';
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2, false);
      context.fill();
    })
  };
};

canvasSketch(sketch, settings);