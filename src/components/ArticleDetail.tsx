"use client";
import React from 'react';
import { Article } from '../types';
import Image from 'next/image';
import styles from "../app/styles.module.css";
import { faHeart as solidHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ArticleDetailsProps {
  article: Article;
  onBack: () => void;
  toggleFavorite: (articleId: number) => void;
   toggleCarrito: (articleId: number) => void;
  favorites: Article[];
  carrito: Article[];
}

 const mensaje = () =>{
  alert("No esta la funcionalidad de compra disponible")
}

const agregado = "Agregaste al carrito! "
const agregar = "Agregar al carrito"

const ArticleDetails: React.FC<ArticleDetailsProps> = ({ article, onBack, toggleFavorite, favorites, toggleCarrito, carrito }) => {
  const isFavorite = favorites.some(fav => fav.id === article.id);
  const isCarrito = carrito.some(carr => carr.id === article.id);

  return (
    <div>
      <button className={styles.btnVolver} onClick={onBack}>Volver al Listado</button>
      <div className={styles.detailArticle}>
        <div key={article.id} className={styles.articleDetaill}>
           <Image
          src={article.imagen}
          alt={article.titulo}
          width={200}
          height={200}
          quality={90} 
          layout="responsive" 
           objectFit="cover"
          className={styles.articleImageDetail}
/>
          <p className={styles.descriptionDetail}>{article.descripcion}</p>
        </div>
         
        <div className={styles.espacio}>
          <div className={styles.nameDetail}>
              <h2 className={styles.titleNameDetail}>{article.titulo}</h2>
              <button className={styles.favoriteButton} onClick={() => toggleFavorite(article.id)}>
            <FontAwesomeIcon
              icon={isFavorite ? solidHeart : regularHeart}
              style={{ color: 'red', fontSize: '1.5rem' }}
            />
          </button>
          </div>
          
          
          <p>
            {Array.from({ length: Math.round(article.rating) }, (_, index) => (
              <FontAwesomeIcon key={index} icon={faStar} style={{ color: '#FFB84D' }} /> 
            ))} {article.rating}
          </p>   
          <p> Calificación {article.rating} de {article.opiniones} opiniones </p>
          <p className={styles.price}>Precio: ${article.precio}</p>
          <p>Categoría: {article.categoria}</p>
          <p>Medios de pago {article.pago}</p>
          <p>Tenés {article.garantía} meses de garantía desde que lo recibís.</p>
          <button className={styles.btnComprar} onClick={mensaje}>Comprar ahora</button>
          <button className={styles.btnCarrito} onClick={() => toggleCarrito(article.id)}>{isCarrito ? agregado: agregar}</button>
          
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
