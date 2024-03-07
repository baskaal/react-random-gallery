import { times, random, last } from 'lodash';
import randomcolor from 'randomcolor';

import { Gallery } from '../lib'

import 'reset-css/reset.css'

const getNumber = () => {
  const rangePerBreakpoint: [number, [number, number]][] = [
    [0, [40, 160]],
    [768, [60, 200]],
    [1024, [80, 240]],
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
  const options = {
    imageOffset: 10,
    galleryHeight: 'calc(100vh - 4rem)',
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
