"use client";
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleList from '../components/ArticleList';
import ArticleDetails from '../components/ArticleDetail';
import { Article } from '../types';
import { articlesData } from '../data/articles';

interface ArticleInCarrito extends Article {
  cantidad: number;
}
const HomePage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [favorites, setFavorites] = useState<Article[]>([]);
  const [carrito, setCarrito] = useState<ArticleInCarrito[]>([]);
  

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
    const existingArticleIndex = prevCarrito.findIndex(article => article.id === articleId);

    if (existingArticleIndex !== -1) {
      // Si el artículo ya está en el carrito, eliminarlo
      return prevCarrito.filter(article => article.id !== articleId);
    } else {
      // Si el artículo no está en el carrito, agregarlo con cantidad inicial de 1
      const newArticle = articlesData.find(article => article.id === articleId);
      return newArticle ? [...prevCarrito, { ...newArticle, cantidad: 1 }] : prevCarrito;
    }
  });
};

 const handleChangeQuantity = (articleId: number, newQuantity: number) => {
    setCarrito(prevCarrito => {
      if (newQuantity <= 0) {
        return prevCarrito.filter(article => article.id !== articleId);
      }

      // Actualiza la cantidad del artículo
      return prevCarrito.map(article =>
        article.id === articleId ? { ...article, cantidad: newQuantity } : article
      );
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
         toggleCarrito={toggleCarrito}      
        favoriteCount={favorites.length}
        favoritesList={favorites.map(article => article.titulo)}
        carritoCount={carrito.length}
        carritoList={carrito}
        onRemoveFavorite={handleRemoveFavorite}
        onRemoveCarrito={handleRemoveCarrito}
         handleChangeQuantity={handleChangeQuantity}
      />
      
      <main  style={{
    minHeight: 'calc(90vh - 150px)', 
    padding: '20px', 
  }}
      >
        {selectedArticle ? ( //si hay articulo seleccionado renderiza el detalle de ese articulo
          <ArticleDetails
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
            toggleFavorite={toggleFavorite}
            toggleCarrito={toggleCarrito}
            favorites={favorites}
            carrito={carrito}
          />
        ) : ( // sino muestra toda la lista
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
