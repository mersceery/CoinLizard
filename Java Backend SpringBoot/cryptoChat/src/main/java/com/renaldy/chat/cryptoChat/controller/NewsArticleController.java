package com.renaldy.chat.cryptoChat.controller;

import com.renaldy.chat.cryptoChat.model.NewsArticle;
import com.renaldy.chat.cryptoChat.repo.NewsArticleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "*")
public class NewsArticleController {

    @Autowired
    private NewsArticleRepository newsArticleRepository;

    // Get all news articles
    @GetMapping
    public ResponseEntity<List<NewsArticle>> getAllNewsArticles() {
        List<NewsArticle> articles = newsArticleRepository.findAll();
        return ResponseEntity.ok(articles);
    }

    // Get news article by ID
    @GetMapping("/{id}")
    public ResponseEntity<NewsArticle> getNewsArticleById(@PathVariable Long id) {
        Optional<NewsArticle> article = newsArticleRepository.findById(id);
        return article.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new news article
    @PostMapping
    public ResponseEntity<NewsArticle> createNewsArticle(@RequestBody NewsArticle article) {
        NewsArticle savedArticle = newsArticleRepository.save(article);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedArticle);
    }

    // Update an existing news article
    @PutMapping("/{id}")
    public ResponseEntity<NewsArticle> updateNewsArticle(@PathVariable Long id, @RequestBody NewsArticle updatedArticle) {
        Optional<NewsArticle> existingArticleOptional = newsArticleRepository.findById(id);
        if (existingArticleOptional.isPresent()) {
            NewsArticle existingArticle = existingArticleOptional.get();
            existingArticle.setTitle(updatedArticle.getTitle());
            existingArticle.setContent(updatedArticle.getContent());
            existingArticle.setImgUrl(updatedArticle.getImgUrl());
            NewsArticle updated = newsArticleRepository.save(existingArticle);
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a news article
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNewsArticle(@PathVariable Long id) {
        if (newsArticleRepository.existsById(id)) {
            newsArticleRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<NewsArticle> likeArticle(@PathVariable Long id) {
        Optional<NewsArticle> optionalArticle = newsArticleRepository.findById(id);
        if (optionalArticle.isPresent()) {
            NewsArticle article = optionalArticle.get();
            article.setLikes(article.getLikes() + 1);
            NewsArticle updatedArticle = newsArticleRepository.save(article);
            return ResponseEntity.ok(updatedArticle);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}/unlike")
    public ResponseEntity<NewsArticle> unlikeArticle(@PathVariable Long id) {
        Optional<NewsArticle> optionalArticle = newsArticleRepository.findById(id);
        if (optionalArticle.isPresent()) {
            NewsArticle article = optionalArticle.get();
            if (article.getLikes() > 0) {
                article.setLikes(article.getLikes() - 1);
                NewsArticle updatedArticle = newsArticleRepository.save(article);
                return ResponseEntity.ok(updatedArticle);
            } else {
                return ResponseEntity.notFound().build(); // Return 404 Not Found
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}


