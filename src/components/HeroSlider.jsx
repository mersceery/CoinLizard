import React from 'react'
import { Carousel } from 'react-bootstrap'
function HeroSlider() {
  return (
    <>
    <div style={{ maxWidth: '100%', margin: '0 auto' }}>
     <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://wallpapercave.com/wp/wp12440310.jpg"
          alt="First slide"
          style={{ maxHeight: '400px', objectFit: 'cover' }}

        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images3.alphacoders.com/132/1327483.png"
          alt="Second slide"
          style={{ maxHeight: '400px', objectFit: 'cover' }}

        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://w.forfun.com/fetch/28/28f3ac9beec1aa299e7107766070543c.jpeg"
          alt="Third slide"
          style={{ maxHeight: '400px', objectFit: 'cover' }}

        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    </>
  )
}

export default HeroSlider