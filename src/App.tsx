import { times, random } from 'lodash';
import randomcolor from 'randomcolor';

import { Gallery } from '../lib'

import 'reset-css/reset.css'

const getNumber = () => Math.ceil(random(80, 200) / 10) * 10;

const images = times(25, (index: number) => {
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
  const options = {
    imageOffset: 10
  }

  return (
    <div style={{ margin: '2rem', border: '1px solid grey' }}>
      <Gallery images={images} options={options} />
    </div>
  )
};

export default App
