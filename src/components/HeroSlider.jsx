import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

function HeroSlider() {
  const [topArticles, setTopArticles] = useState([]);

  useEffect(() => {
    fetchTopArticles();
  }, []);

  const fetchTopArticles = () => {
    axios.get('http://localhost:8080/api/news')
      .then(response => {
        const sortedArticles = response.data.slice().sort((a, b) => b.likes - a.likes);
        setTopArticles(sortedArticles.slice(0, 3));
      })
      .catch(error => {
        console.error('Error fetching top articles:', error);
      });
  };

  return (
    <div style={{ maxWidth: '100%', margin: '0 auto' }}>
      <Carousel data-bs-theme="dark">
        {topArticles.map(article => (
          <Carousel.Item key={article.id}>
            <img
              className="d-block w-100"
              src={article.imgUrl}
              alt={article.title}
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h5>{article.title}</h5>
              <p>{article.content}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default HeroSlider;
