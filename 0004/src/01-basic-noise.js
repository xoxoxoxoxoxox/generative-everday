const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const defaultSeed = '';

random.setSeed(defaultSeed || random.getRandomSeed());
console.log('Random seed: %s', random.getSeed());

const settings = {
  name: '01-basic-noise',
  dimensions: [ 2048, 2048 ],
  suffix: random.getSeed()
};

const sketch = ({ width, height }) => {
  const margin = 400;
 
  const sliceCount = 8000;
  const slices = Array.from(new Array(sliceCount)).map((_, i, list) => {
    const t = list.length <= 1 ? 0 : i / (list.length - 1);

    const noiseAngle = t * Math.PI * 2;
    const nx = Math.cos(noiseAngle);
    const ny = Math.sin(noiseAngle);
    const nf = 0.05 + random.range(0, 0.5);
    const amplitude = 1000;
    const noise = random.noise2D(nx * nf, ny * nf);
    const noise01 = noise * 0.5 + 0.5;

    const tOffset = random.gaussian(0, 0.05);

    const cx = width / 2 - 50;
    const x = cx + noise * amplitude;
    return {
      alpha: random.range(0.5, 1) * (1 - noise01),
      color: 'white',
      lineWidth: random.range(0.005, 0.015) * 50,
      length: random.gaussian() * noise01 * 500,
      angle: random.gaussian(0, 1),
      x,
      y: lerp(margin, height - margin, t + tOffset)
    };
  });

  return ({ context, width, height }) => {
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = 'lighter';

    slices.forEach(slice => {
      context.save();
      context.beginPath();
      context.translate(slice.x, slice.y);
      context.rotate(slice.angle);
      context.lineTo(slice.length / 2, 0);
      context.lineTo(-slice.length / 2, 0);
      context.lineWidth = slice.lineWidth;
      context.strokeStyle = slice.color;
      context.globalAlpha = slice.alpha;
      context.stroke();
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);