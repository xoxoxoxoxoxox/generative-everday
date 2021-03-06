const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  const count = 18;

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

      context.fillStyle = 'white';
      context.beginPath();
      context.arc(x, y, 30, 0, Math.PI * 2, false);
      context.fill();
    })
  };
};

canvasSketch(sketch, settings);