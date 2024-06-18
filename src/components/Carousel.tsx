import React, { useState } from 'react';

import classes from '../styles/Carousel.module.css';
import { ArrowLongLeftBtn, ArrowLongRightBtn } from './ui';

interface Props {
  sliderContent: any[];
  autoPlay?: boolean;
  showButtons?: boolean;
  interval?: number;
}

const Carousel = ( props: Props ) => {
  const { sliderContent, autoPlay = false, showButtons = true, interval = 1000 } = props;

  const [selectedIndex, setSelectedIndex] = useState( 0 );
  const [selectedContent, setSelectedContent] = useState( sliderContent[0] );
  
  const [loaded, setLoaded] = useState( false );

  const selectNewImage = ( index: number, sliderContent: any[], next = true ) => {
    setLoaded( false );
    setTimeout( () => {
      const condition = next ? selectedIndex < sliderContent.length - 1 : selectedIndex > 0;
      const nextIndex = next
        ? condition ? selectedIndex + 1 : 0
        : condition ? selectedIndex - 1 : sliderContent.length - 1;
      setSelectedContent( sliderContent[nextIndex] );
      setSelectedIndex( nextIndex );
    }, interval );
  };

  const previous = () => {
    selectNewImage( selectedIndex, sliderContent, false );
  };

  const next = () => {
    selectNewImage( selectedIndex, sliderContent );
  };

  // Define the component rendering logic
  const CarouselContent = (
    <section className={`${ classes.slider_container }`}>
      <img
        className={`${ classes.image } ${ loaded ? `${ classes.loaded }` : '' }`}
        src={`src/assets/images/${ selectedContent.image }`}
        alt={`${ selectedContent }`}
        onLoad={() => setLoaded( true )}
      />
      <article 
        className={`${ classes.slider_info } ${ loaded ? `${ classes.loaded }` : '' }`}
      >
        <h1>{selectedContent.title}</h1>
        <p>{selectedContent.description}</p>
      </article>
      <article className={classes.slider_btns}>
        <button 
          className={classes.back_btn}
          onClick={() => previous()}
        >
          <ArrowLongLeftBtn className={classes.left_arrow} />
        </button>
        <button 
          className={classes.next_btn}
          onClick={() => next()}
        >
          <ArrowLongRightBtn className={classes.right_arrow} />
        </button>
      </article>
    </section>
  );

  // Return the component and functions as an object
  return {
    CarouselContent,
    previous,
    next,
  };
};

export default Carousel;