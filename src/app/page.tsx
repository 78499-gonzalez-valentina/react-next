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
  const [carrito, setCarrito] = useState<Article[]>([]);

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

   const toggleCarrito = (articleId: number) => {
    setCarrito(prevCarrito => {
      const isCarrito = prevCarrito.some(article => article.id === articleId);
      if (isCarrito) {
        return prevCarrito.filter(article => article.id !== articleId);
      } else {
        const newCarrito = articlesData.find(article => article.id === articleId);
        return newCarrito ? [...prevCarrito, newCarrito] : prevCarrito;
      }
    });
  };

  const handleRemoveFavorite = (index: number) => {
    setFavorites(prevFavorites => prevFavorites.filter((_, i) => i !== index));
  };

  const handleRemoveCarrito = (index: number) => {
    setCarrito(prevCarrito => prevCarrito.filter((_, i) => i!== index));
  };

  return (
    <div>
      <Header
      
        favoriteCount={favorites.length}
        favoritesList={favorites.map(article => article.titulo)}
        carritoCount={carrito.length}
        carritoList={carrito}
        onRemoveFavorite={handleRemoveFavorite}
        onRemoveCarrito={handleRemoveCarrito}
      />
      
      <main  style={{
    minHeight: 'calc(90vh - 150px)', // 100vh menos la altura del header y footer
    padding: '20px', // Puedes agregar padding según tus preferencias
  }}
      >
        {selectedArticle ? (
          <ArticleDetails
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
            toggleFavorite={toggleFavorite}
            toggleCarrito={toggleCarrito}
            favorites={favorites}
            carrito={carrito}
          />
        ) : (
          <ArticleList
            articles={articlesData}
            onArticleSelect={(article) => setSelectedArticle(article)}
            toggleFavorite={toggleFavorite}
            toggleCarrito={toggleCarrito}
            favorites={favorites}
            carrito={carrito}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};
export default HomePage;
