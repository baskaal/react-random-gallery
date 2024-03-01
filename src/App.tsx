import { times, random } from 'lodash';
import randomcolor from 'randomcolor';

import { Gallery } from '../lib'

import 'reset-css/reset.css'

const getNumber = () => Math.ceil(random(80, 250) / 10) * 10;

const images = times(20, (index: number) => {
  const bg = randomcolor().replace('#', '');
  const w = getNumber();
  const h = getNumber();
  const getUrl = (size = 1) => `https://placehold.co/${w * size}x${h * size}/${bg}/ffffff?font=roboto`;

  const small = getUrl();
  const medium = getUrl(2);
  const large = getUrl(3);

  return {
    src: small,
    srcSet: [small, medium, large],
    formats: [
      { srcSet: [medium, large], size: '40em' },
      { srcSet: [large], size: '75em' },
    ],
    alt: `Example image ${index}`
  };
});

const App = () => {
  return (
    <div>
      <Gallery images={images} />
    </div>
  )
};

export default App
