const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const culori = require('culori');

const settings = {
  name: '01-blending-oklab',
  dimensions: [ 2048, 2048 ]
};

const sketch = ({ width, height }) => {
  const background = 'hsl(0, 0%, 06%)';
  const steps = 200;
  const margin = Math.ceil((width/steps)/2);

  const colorArray = ['red', 'green', 'blue', 'purple', 'red'];

  let looping = false;

  if (colorArray[0] === colorArray[colorArray.length - 1]) {
    looping = true;
  }

  const interpolationRGB = culori.interpolate(colorArray);
  const interpolationOklab = culori.interpolate(colorArray, 'oklab');
  const interpolationHsl = culori.interpolate(colorArray, 'hsl');
  const interpolationLch = culori.interpolate(colorArray, 'lch');
  const interpolationLchBasis = culori.interpolate(colorArray, 'lch', {
    h: culori.interpolatorSplineBasis
  });
  const interpolationLchNatural = culori.interpolate(colorArray, 'lch', {
    h: culori.interpolatorSplineNatural
  });
  const interpolationLchMonotone = culori.interpolate(colorArray, 'lch', {
    h: culori.interpolatorSplineMonotone
  });

  const createBands = () => {
    const bands = [];

    for (let i = 0; i < steps; i++) {
      const u = i / (steps - 1);
      const colors = [
        interpolationRGB(u),
        interpolationOklab(u),
        interpolationHsl(u),
        interpolationLch(u),
        interpolationLchBasis(u),
        interpolationLchNatural(u),
        interpolationLchMonotone(u)
      ];
      bands.push({
        u,
        colors
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
        colors
      } = data;

      let w, x
      if (!!looping) {
        w = width / (steps-1);
        x = lerp(margin, width + w - margin, u);
      } else {
        w = width / steps;
        x = lerp(margin, width - margin, u);
      }
;

      for (let c = 0; c < colors.length; c++) {
        context.fillStyle = culori.formatHex(colors[c]);
        context.fillRect(x - Math.ceil(w/2), Math.ceil(c * height/colors.length), Math.ceil(w), Math.ceil(height/colors.length) - 80);
      }  
    })
  };
};

canvasSketch(sketch, settings);
