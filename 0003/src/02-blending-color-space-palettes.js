const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const culori = require('culori');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes/1000.json');

const defaultSeed = '';

random.setSeed(defaultSeed || random.getRandomSeed());
console.log('Random seed: %s', random.getSeed());

let palette = random.pick(palettes);
palette = random.shuffle(palette);
palette = palette.slice(0, random.rangeFloor(3, palette.length + 1));
console.log('Palette: %s', JSON.stringify(palette));

const settings = {
  name: '02-blending-color-space-palettes',
  dimensions: [ 2048, 2048 ],
  suffix: random.getSeed()
};

const sketch = async ({ width, height }) => {
  const background = 'hsl(0, 0%, 06%)';
  const steps = width;
  const margin = Math.ceil((width/steps)/2);

  const colorArray = palette;

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
        {
          name: 'a) linear RGB color space',
          value: interpolationRGB(u)
        },
        {
          name: 'b) OKLAB color space',
          value: interpolationOklab(u)
        },
        {
          name: 'c) HSL color space',
          value: interpolationHsl(u)
        },        
        {
          name: 'd) CIELCh color space',
          value: interpolationLch(u)
        },        
        {
          name: 'e) CIELCh color space with basis spline',
          value: interpolationLchBasis(u)
        },         
        {
          name: 'f) CIELCh color space with natural spline',
          value: interpolationLchNatural(u)
        }, 
        {
          name: 'g) CIELCh color space with monotone spline',
          value: interpolationLchMonotone(u)
        }
      ];
      bands.push({
        u,
        colors
      })
    }

    return bands;
  }

  const bands = createBands();

  // We can use Browser's "FontFace" API to load fonts from JavaScript
  // This will ensure the font is renderable before first drawing to Canvas
  const fontUrl = 'assets/fonts/SourceCodePro-Regular.ttf';
  const font = new window.FontFace(
    'SourceCodePro',
    `url(${fontUrl})`
  );

  // We use async/await ES6 syntax to wait for the font to load
  await font.load();

  // Add the loaded font to the document
  document.fonts.add(font);

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

      for (let c = 0; c < colors.length; c++) {
        context.fillStyle = culori.formatHex(colors[c].value);
        context.fillRect(x - Math.ceil(w/2), Math.ceil(c * height/colors.length), Math.ceil(w), Math.ceil(height/colors.length) - 80);

        // Add text
        context.fillStyle = 'white';
        context.font = `40px "SourceCodePro"`;
        context.textAlign = 'left';
        context.textBaseline = 'top';
        context.fillText(colors[c].name, 20 , Math.ceil((c + 1) * height/colors.length) - 58);
      }  
    })
  };
};

canvasSketch(sketch, settings);
