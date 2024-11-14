import React, { useState } from 'react';

const ImageCarousel = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  return (
    <div style={{ position: 'relative', maxWidth: '100px' }}>

      <div
        style={{
          position: 'relative',
          width: '200px',
          height: '200px',
          overflow: 'hidden',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        <div
          style={{
            display: 'flex',
            transition: 'transform 0.3s ease',
            transform: `translateX(-${currentIndex * 200}px)`,
          }}
        >
          {imageUrls.map((url, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                width: '200px',
                height: '200px',
                flex: '0 0 200px',
                background: `url(${url}) center/cover`,
                // margin: '0 5px',
              }}
            />
          ))}
        </div>

        {/* Botones de next y previus */}
        {/* {isHovered && (
          <>
            <div style={{
              position: 'absolute',
              left: '0px',
              top: '50%',
              transform: 'translate(0%, -50%)',
              borderRadius: '100px',
              cursor: 'pointer',
              backgroundColor: 'white',
              width: '20px',
              userSelect: 'none',
            }}
              onClick={handlePrevSlide}>&lt;

            </div>
            <div style={{
              position: 'absolute',
              right: '0px',
              top: '50%',
              transform: 'translate(0%, -50%)',
              borderRadius: '100px',
              cursor: 'pointer',
              backgroundColor: 'white',
              width: '20px',
              userSelect: 'none',

            }}
              onClick={handleNextSlide}>&gt;
            </div>
          </>
        )} */}

        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: '25%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />

        <div style={{

          userSelect: 'none',
          position: 'absolute',
          left: '0px',
          top: '50%',
          transform: 'translate(0%, -50%)',
          borderRadius: '100px',
          cursor: 'pointer',
          backgroundColor: 'white',
          width: '1.5rem',
          height: '1.5rem',
          margin: '0.5rem',
          transition: 'opacity 0.3s ease',
          opacity: isHovered ? 1 : 0,
          boxShadow: 'rgba(0, 0, 0, 0.5) 0px 1px 4px 0px',
        }}
          onClick={handlePrevSlide}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
        </div>
        <div style={{

          userSelect: 'none',
          position: 'absolute',
          right: '0px',
          top: '50%',
          transform: 'translate(0%, -50%)',
          borderRadius: '100px',
          cursor: 'pointer',
          backgroundColor: 'white',
          width: '1.5rem',
          height: '1.5rem',
          margin: '0.5rem',
          transition: 'opacity 0.3s ease',
          opacity: isHovered ? 1 : 0,
          boxShadow: 'rgba(0, 0, 0, 0.5) 0px 1px 4px 0px',
        }}
          onClick={handleNextSlide}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"></path></svg>

        </div>

        {/* Orbes */}
        <div style={{ position: 'absolute', left: '0px', bottom: '0%', display: 'flex', justifyContent: 'center', marginBottom: '0.5rem', width: '100%', alignItems: 'flex-end', transition: 'opacity 0.3s ease', opacity: isHovered ? 1 : 0 }}>
          {imageUrls.map((_, index) => (
            <div
              key={index}
              style={{
                width: '10px',
                height: '10px',
                // borderRadius: '50%',
                background: index === currentIndex ? '#fff' : '#a6a6a6',
                opacity: index === currentIndex ? '100%' : '100%',
                margin: '0px 5px',
                borderRadius: '5px',
                cursor: 'pointer',

              }}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>



    </div>
  );
};

export default ImageCarousel;
