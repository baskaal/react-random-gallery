import { times, random, last } from 'lodash';
import randomcolor from 'randomcolor';

import { Gallery, TOptions } from '../lib';

const getNumber = () => {
  const rangePerBreakpoint: [number, [number, number]][] = [
    [0, [20, 100]],
    [320, [40, 140]],
    [768, [60, 180]],
    [1024, [80, 220]],
  ];

  const range = last(rangePerBreakpoint.filter(([bp]) => window.innerWidth >= bp))!;

  return Math.ceil(random(range[1][0], range[1][1]) / 10) * 10;
}

const images = times(25, (index: number) => {
  const bg = randomcolor().replace('#', '');
  const w = getNumber();
  const h = getNumber();
  const getImgUrl = (retina = 0) =>  `https://placehold.co/${w}x${h}${retina ? `@${retina}x` : ''}/${bg}/fff.webp?font=roboto`;

  return {
    src: getImgUrl(),
    srcSet: [getImgUrl(), getImgUrl(2), getImgUrl(3)],
    alt: `Example image ${index}`
  };
});

const App = () => {
  const options: TOptions = {
    gallery: {
      height: 'calc(100vh - 4rem)'
    },
    images: {
      offset: -10,
      rotation: 10,
    },
    animation: {
      duration: '.5s',
    }
  }

  return (
    <div style={{ margin: '2rem', border: '1px solid grey' }}>
      <Gallery images={images} options={options} />
    </div>
  )
};

export default App
