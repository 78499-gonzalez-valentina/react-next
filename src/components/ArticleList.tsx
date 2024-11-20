"use client";
import React, { useState } from 'react';
import { Article } from '../types';
import Image from 'next/image';
import styles from "../app/styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

interface ArticleListProps {
  articles: Article[];
  onArticleSelect: (article: Article) => void;
  toggleFavorite: (articleId: number) => void;
  favorites: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, onArticleSelect, toggleFavorite, favorites }) => {
  // Añadimos el estado de búsqueda
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<'relevancia' | 'precioAsc' | 'precioDesc'>('relevancia');

  // Filtrar artículos en base al término de búsqueda
  const filteredArticles = articles.filter(article =>
    article.titulo.toLowerCase().includes(search.toLowerCase())
  );

  const totalArticles = filteredArticles.length;

  // Ordenar los artículos según el criterio seleccionado
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'precioAsc') {
      return a.precio - b.precio;
    } else if (sortBy === 'precioDesc') {
      return b.precio - a.precio;
    } else {
      return b.rating - a.rating; // Ordenar por relevancia (rating)
    }
  });

  return (
    <div>
      <div className={styles.pageDescription}>
        <p>Bienvenido a TechSpot, tu tienda en línea para los mejores productos electrónicos. Encuentra los dispositivos más avanzados del mercado. ¡Explora y descubre lo último en tecnología!</p>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.cantidad}>
          <div>
            <h6 className={styles.titleInput}>Buscar</h6>
            <input
              className={styles.nameInput}
              type="text"
              placeholder="Ingrese un nombre"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <p className={styles.total}>{totalArticles} productos</p>
        </div>

        <div className={styles.sortContainer}>
          <label htmlFor="sortBy" className={styles.sortLabel}>Ordenar por</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'relevancia' | 'precioAsc' | 'precioDesc')}
            className={styles.sortSelect}
          >
            <option value="relevancia">Más relevantes</option>
            <option value="precioAsc">Menor precio</option>
            <option value="precioDesc">Mayor precio</option>
          </select>
        </div>
      </div>

      <div className={styles.articleGrid}>
        {filteredArticles.length === 0 ? (
          <div className={styles.noResults}>
            <h3>No se encontraron productos</h3>
            <p>No hay productos que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          sortedArticles.map((article) => (
            <div key={article.id} className={styles.articleItem}>
              <div className={styles.articleImage}>
                <Image
                  src={article.imagen}
                  alt={article.titulo}
                  width={200}
                  height={200}
                />
              </div>
              <div className={styles.nameArticle}>
                <h3 onClick={() => onArticleSelect(article)}>{article.titulo}</h3>
                <p>
                  {Array.from({ length: Math.round(article.rating) }, (_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} style={{ color: 'yellow' }} />
                  ))} {article.rating}
                </p>
              </div>
              <div className={styles.description}>
                <p>{article.descripcion}</p>
              </div>

              <div className={styles.price}>
                <p>${article.precio}</p>
                <button className={styles.favoriteButton} onClick={() => toggleFavorite(article.id)}>
                  <FontAwesomeIcon
                    icon={favorites.some(fav => fav.id === article.id) ? solidHeart : regularHeart}
                    style={{ color: 'red', fontSize: '1.5rem' }}
                  />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticleList;
