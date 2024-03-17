import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateForm({ article, onUpdate }) {
  const [updatedArticle, setUpdatedArticle] = useState({ title: '', content: '', imgUrl: '' });
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleUpdateInputChange = e => {
    const { name, value } = e.target;
    setUpdatedArticle(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onUpdate(article.id, updatedArticle);
    setShowUpdateForm(false);
  };

  const handleCloseClick = () => {
    setShowUpdateForm(false);
  };

  return (
    <div>
      {showUpdateForm ? (
        <form onSubmit={handleUpdateSubmit}>
          <input type="text" name="title" value={updatedArticle.title} placeholder="New Title" onChange={handleUpdateInputChange} required />
          <textarea name="content" value={updatedArticle.content} placeholder="New Content" onChange={handleUpdateInputChange} required />
          <input type="text" name="imgUrl" value={updatedArticle.imgUrl} placeholder="New Image URL" onChange={handleUpdateInputChange} required />
          <button type="submit">Update</button>
          <button type="button" onClick={handleCloseClick}>Close</button>
        </form>
      ) : (
        <button onClick={handleUpdateClick}>Update</button>
      )}
    </div>
  );
}

function NewsArticles() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({ title: '', content: '', imgUrl: '' });

  useEffect(() => {
    fetchNewsArticles();
  }, []);

  const fetchNewsArticles = () => {
    axios.get('http://localhost:8080/api/news')
      .then(response => {
        setNewsArticles(response.data);
      })
      .catch(error => {
        console.error('Error fetching news articles:', error);
      });
  };

  const createNewsArticle = () => {
    axios.post('http://localhost:8080/api/news', newArticle)
      .then(response => {
        fetchNewsArticles();
        setNewArticle({ title: '', content: '', imgUrl: '' });
      })
      .catch(error => {
        console.error('Error creating news article:', error);
      });
  };

  const updateNewsArticle = (id, updatedArticle) => {
    axios.put(`http://localhost:8080/api/news/${id}`, updatedArticle)
      .then(response => {
        fetchNewsArticles();
      })
      .catch(error => {
        console.error('Error updating news article:', error);
      });
  };

  const deleteNewsArticle = id => {
    axios.delete(`http://localhost:8080/api/news/${id}`)
      .then(response => {
        fetchNewsArticles();
      })
      .catch(error => {
        console.error('Error deleting news article:', error);
      });
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewArticle(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>News Articles</h1>
      <form onSubmit={e => {
        e.preventDefault();
        createNewsArticle();
      }}>
        <input type="text" name="title" value={newArticle.title} placeholder="Title" onChange={handleInputChange} required />
        <textarea name="content" value={newArticle.content} placeholder="Content" onChange={handleInputChange} required />
        <input type="text" name="imgUrl" value={newArticle.imgUrl} placeholder="Image URL" onChange={handleInputChange} required />
        <button type="submit">Add Article</button>
      </form>
      <ul>
        {newsArticles.map(article => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <img src={article.imgUrl} alt="Article Image" style={{ maxWidth: '200px' }} />
            <UpdateForm article={article} onUpdate={updateNewsArticle} />
            <button onClick={() => deleteNewsArticle(article.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsArticles;
