import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/NewsArticles.css'; // Import your CSS file
import useLocalStorage from 'use-local-storage';
import ChatTab from '../components/ChatTab';
import Header from "../components/Header";
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
  const [sortByLikes, setSortByLikes] = useState(null); // null for default, true for most likes, false for least likes
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDark", false); // Add dark mode state

     // Toggle dark mode function
     const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };
  useEffect(() => {
    fetchNewsArticles();
  }, []);

  const fetchNewsArticles = () => {
    axios.get('http://localhost:8080/api/news')
      .then(response => {
        const sortedArticles = sortByLikes === null ? response.data : sortArticles(response.data);
        setNewsArticles(sortedArticles);
      })
      .catch(error => {
        console.error('Error fetching news articles:', error);
      });
  };

  const sortArticles = (articles) => {
    return articles.slice().sort((a, b) => {
      if (sortByLikes) {
        return b.likes - a.likes;
      } else {
        return a.likes - b.likes;
      }
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

  const handleLikeClick = (id) => {
    axios.post(`http://localhost:8080/api/news/${id}/like`)
      .then(response => {
        fetchNewsArticles(); // Fetch articles after like is clicked to ensure sorting
      })
      .catch(error => {
        console.error('Error liking news article:', error);
      });
  };

  const handleUnlikeClick = (id) => {
    axios.delete(`http://localhost:8080/api/news/${id}/unlike`)
      .then(response => {
        fetchNewsArticles(); // Fetch articles after unlike is clicked to ensure sorting
      })
      .catch(error => {
        console.error('Error unliking news article:', error);
      });
  };

  const handleSortByLikes = (sortByMost) => {
    setSortByLikes(sortByMost);
    fetchNewsArticles(); // Fetch articles immediately after sorting button is clicked
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
    <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
    <ChatTab />
    <div className="news-container">
      <h1 class="title">Latest Crypto News</h1>
      <div className="sort-buttons">
        <button onClick={() => handleSortByLikes(true)}>Sort by Most Likes</button>
        <button onClick={() => handleSortByLikes(false)}>Sort by Least Likes</button>
        <button onClick={() => handleSortByLikes(null)}>Reset Sorting</button>
      </div>
      <form onSubmit={e => {
        e.preventDefault();
        createNewsArticle();
      }}>
        <input type="text" name="title" value={newArticle.title} placeholder="Title" onChange={handleInputChange} required />
        <textarea name="content" value={newArticle.content} placeholder="Content" onChange={handleInputChange} required />
        <input type="text" name="imgUrl" value={newArticle.imgUrl} placeholder="Image URL" onChange={handleInputChange} required />
        <button type="submit">Add Article</button>
      </form>
      <div className="article-grid">
        {newsArticles.map(article => (
          <div key={article.id} className="article">
            <img src={article.imgUrl} alt="Article Image" className="article-image" />
            <div className="article-content">
              <h2>{article.title}</h2>
              <p>{article.content}</p>
              <div className="article-actions">
                <UpdateForm article={article} onUpdate={updateNewsArticle} />
                <button onClick={() => deleteNewsArticle(article.id)}>Delete</button>
                <button onClick={() => handleLikeClick(article.id)}>Like</button>
                <button onClick={() => handleUnlikeClick(article.id)}>Unlike</button>
                <span>Likes: {article.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}


export default NewsArticles;
