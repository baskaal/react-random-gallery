import { times, random } from 'lodash';
import randomcolor from 'randomcolor';

import { Gallery } from '../lib'

import 'reset-css/reset.css'

const getNumber = () => Math.ceil(random(80, 200) / 10) * 10;

const images = times(25, (index: number) => {
  const bg = randomcolor().replace('#', '');
  const w = getNumber();
  const h = getNumber();
  const getImgUrl = (retina = 0) =>  `https://placehold.co/${w}x${h}${retina ? `@${retina}x` : ''}/${bg}/ffffff.webp?font=roboto`;

  return {
    src: getImgUrl(),
    srcSet: [getImgUrl(), getImgUrl(2), getImgUrl(3)],
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
