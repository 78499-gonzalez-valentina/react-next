"use client";
import React, { useState } from 'react';
import { Article } from '../types';
import Image from 'next/image';
import styles from "../app/styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart as solidHeart, faStar, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'




interface ArticleListProps {
  articles: Article[];
  onArticleSelect: (article: Article) => void;
  toggleFavorite: (articleId: number) => void;
  toggleCarrito: (articleId: number) => void;
  favorites: Article[];
  carrito: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, onArticleSelect, toggleFavorite, favorites, toggleCarrito, carrito}) => {

  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<'relevancia' | 'precioAsc' | 'precioDesc'>('relevancia');

    const removeAccents = (str: string): string => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

 const filteredArticles = articles.filter(article =>
    removeAccents(article.titulo).toLowerCase().includes(removeAccents(search).toLowerCase())
  );

  const totalArticles = filteredArticles.length;

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'precioAsc') {
      return a.precio - b.precio;
    } else if (sortBy === 'precioDesc') {
      return b.precio - a.precio;
    } else {
      return b.rating - a.rating; 
    }
  });

  return (
    <div>
      <div className={styles.pageDescription}>
        <p>Bienvenido a TechSpot, tu destino en línea para los productos electrónicos más innovadores y de alta calidad. Nos enorgullece ofrecerte una selección de los dispositivos más avanzados del mercado, cuidadosamente elegidos para satisfacer tus necesidades tecnológicas.</p>
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
          <p className={styles.total}>
  {totalArticles} {totalArticles === 1 ? 'producto' : 'productos'}
</p>
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
          <div className={styles.noResultsContainer}>
            <div className={styles.noResults}>
            <Image
    src="/img/rb_18236.png" // Ruta de la imagen en la carpeta `public`
    alt="No se encontraron productos"
    width={200}
    height={200}
    quality={90} // Mejora la calidad
    layout="responsive" // Ajusta la imagen al contenedor
    className={styles.articleImage}
  />
            <h3>No se encontraron productos</h3>
            <p>No hay productos que coincidan con tu búsqueda. Intenta ajustar tus filtros o verifica que el nombre que estás buscando sea correcto.</p>
          </div>
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
          quality={90} // Mejora la calidad
          layout="responsive" // Ajusta la imagen al contenedor
          className={styles.articleImage}
           onClick={() => onArticleSelect(article)}
/>
              </div>
              <div className={styles.nameArticle}>
                <h3 onClick={() => onArticleSelect(article)}>{article.titulo}</h3>
    

      <p className={styles.ratingOneStar}>
        <FontAwesomeIcon icon={faStar} style={{ color: '#FFB84D' }} />
        {` ${article.rating.toFixed(1)}`}
      </p>
              </div>
              <div className={styles.description}>
                <p>{article.descripcion}</p>
              </div>

              <div className={styles.price}>
                <p>${article.precio}</p>

                <div>
                  <div className={styles.tooltipContainer}>
                    <button className={styles.favoriteButton} onClick={() => toggleFavorite(article.id)}>
                  <FontAwesomeIcon
                    icon={favorites.some(fav => fav.id === article.id) ? solidHeart : regularHeart}
                    style={{ color: 'red', fontSize: '1.5rem' }}
                  />
                  <span className={styles.tooltipText}>
      {favorites.some(item => item.id === article.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    </span>
                </button>
                  </div>
                     
               
                <div className={styles.tooltipContainer}>
  <button
    className={styles.favoriteButton}
    onClick={() => toggleCarrito(article.id)}
  >
    <FontAwesomeIcon
      icon={carrito.some(item => item.id === article.id) ? faShoppingCart : faCartPlus}
      style={{ color: carrito.some(item => item.id === article.id) ? 'green' : 'gray', fontSize: '1.5rem', marginLeft: '5px' }}
    />
    <span className={styles.tooltipText}>
      {carrito.some(item => item.id === article.id) ? 'Quitar del carrito' : 'Agregar al carrito'}
    </span>
  </button>
</div>
                 
                </div>
              
               
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticleList;
