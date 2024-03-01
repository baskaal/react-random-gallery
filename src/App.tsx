import { times, random } from 'lodash';

import { Gallery } from '../lib'

import 'reset-css/reset.css'

const getNumber = () => Math.ceil(random(80, 250) / 10) * 10;
const images = times(20, () => ({ url: `https://placekitten.com/${getNumber()}/${getNumber()}` }));

const App = () => {
  return (
    <div>
      <Gallery images={images} />
    </div>
  )
};

export default App
