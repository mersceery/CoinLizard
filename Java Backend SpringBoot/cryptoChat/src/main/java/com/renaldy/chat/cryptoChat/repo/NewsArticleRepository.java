package com.renaldy.chat.cryptoChat.repo;

import com.renaldy.chat.cryptoChat.model.NewsArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsArticleRepository extends JpaRepository<NewsArticle, Long> {
}
