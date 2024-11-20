"use client";
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleList from '../components/ArticleList';
import ArticleDetails from '../components/ArticleDetail';
import { Article } from '../types';
import { articlesData } from '../data/articles';

const HomePage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [favorites, setFavorites] = useState<Article[]>([]);

  const toggleFavorite = (articleId: number) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(article => article.id === articleId);
      if (isFavorite) {
        return prevFavorites.filter(article => article.id !== articleId);
      } else {
        const newFavorite = articlesData.find(article => article.id === articleId);
        return newFavorite ? [...prevFavorites, newFavorite] : prevFavorites;
      }
    });
  };

  const handleRemoveFavorite = (index: number) => {
    setFavorites(prevFavorites => prevFavorites.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Header
      
        favoriteCount={favorites.length}
        favoritesList={favorites.map(article => article.titulo)}
        onRemoveFavorite={handleRemoveFavorite}
      />
      
      <main>
        {selectedArticle ? (
          <ArticleDetails
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
          />
        ) : (
          <ArticleList
            articles={articlesData}
            onArticleSelect={(article) => setSelectedArticle(article)}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};
export default HomePage;
