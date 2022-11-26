import React from 'react';
import { Galleria } from 'primereact/galleria';
import imagesCover from '../../../asset/images/cover/images';

const Slider = () => {
  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 7,
    },
    {
      breakpoint: '768px',
      numVisible: 4,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  const itemTemplate = item => {
    return (
      <img
        src={item}
        onError={e =>
          (e.target.src =
            'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
        }
        alt={item.alt}
        style={{
          width: '100%',
          display: 'block',
        }}
      />
    );
  };

  const thumbnailTemplate = item => {
    return (
      <img
        src={item}
        onError={e =>
          (e.target.src =
            'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
        }
        alt={item.alt}
        style={{ display: 'block', borderRadius: '10px', padding: '0 4px' }}
      />
    );
  };
  return (
    <section className="w-screen">
      <div className="card" style={{ borderRadius: '10px' }}>
        <Galleria
          value={imagesCover}
          responsiveOptions={responsiveOptions}
          numVisible={7}
          item={itemTemplate}
          thumbnail={thumbnailTemplate}
          circular
          autoPlay
          transitionInterval={3000}
        />
      </div>
    </section>
  );
};

export default Slider;
