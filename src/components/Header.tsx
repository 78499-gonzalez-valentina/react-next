"use client";
import React, { useState } from 'react';
import styles from '../app/header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';

interface Article {
  id: number;
  titulo: string;
  precio: number; // Agregamos precio
}
const Header: React.FC<{ favoriteCount?: number; carritoCount?: number; carritoList?: Article[]; favoritesList?: string[]; onRemoveCarrito?: (index:number) => void, onRemoveFavorite?: (index: number) => void }> = ({ favoriteCount, favoritesList, carritoCount, carritoList, onRemoveFavorite, onRemoveCarrito }) => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCarrito, setShowCarrito] = useState(false);

  const handleFavoritesClick = () => {
    setShowFavorites(!showFavorites);
  };

  const handleCarritoClick = () => {
   setShowCarrito(!showCarrito);
  };

  const handleRemoveFavorite = (index: number) => {
    if (onRemoveFavorite) {
      onRemoveFavorite(index);
    }
  };

  const handleRemoveCarrito = (index: number) => {
    if(onRemoveCarrito){
      onRemoveCarrito(index);
    }
  }

const total = carritoList ? parseFloat(carritoList.reduce((acc, item) => acc + (item.precio ?? 0), 0).toFixed(2)) : 0;

const shouldRenderCarritoCount = carritoCount !== undefined && carritoCount > 0;

  return (
    <header className={styles.header}>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>TechSpot</h1>
      </div>
     
      <div className={styles.leftSection}>
        <div>
          
          <button className={styles.favoriteButton} onClick={handleFavoritesClick}>
            <div className={styles.cartIconContainer}>
               <FontAwesomeIcon icon={faHeart} className={styles.icon} />
          {(favoriteCount ?? 0) > 0  && (
            <span className={styles.favoriteCount}>{favoriteCount}</span>
          )}
            </div>
         
          
          
        </button>
          
        </div>
         <div>
          <button className={styles.favoriteButton} onClick={handleCarritoClick}>
      <div className={styles.cartIconContainer}>
        <FontAwesomeIcon style={{ color: 'white', fontSize: '1.5rem', marginRight: '5px' }} icon={faShoppingCart} />
        {shouldRenderCarritoCount && (
  <span className={styles.carritoCount}>{carritoCount}</span>
)}
      </div>
</button>
          
         </div>
        
      </div>
 {showCarrito && carritoList && (
        <div className={styles.carritoList}>
          <h3>Carrito:</h3>
          <div className={styles.itemCarrito}>
                 <ul>
            {carritoList.length > 0 ? (
              carritoList.map((item, index) => (
                <li key={index} className={styles.favoriteItem}>
                  <div>
                    {item.titulo}
                  </div>
                  <div>
                    ${item.precio}
                  
                
                  <button className={styles.removeButton} onClick={() => handleRemoveCarrito(index)}>
                   <FontAwesomeIcon icon={faTimesCircle} className={styles.icon} />
                  </button>
                  </div>
                  
                  
                </li>
              ))
            ) : (
              <p>No hay artículos en el carrito.</p>
            )}
          </ul>
          </div>
         
          <p className={styles.total}>Total: ${total}</p>
        </div>
      )}

      {showFavorites && favoritesList && (
        <div className={styles.favoritesList}>
          <h3>Favoritos <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} /></h3>
          <div >
            <ul>
            {favoritesList.length > 0 ? (
              favoritesList.map((item, index) => (
                <li key={index} className={styles.favoriteItem}>
                  {item}
                  <button className={styles.removeButton} onClick={() => handleRemoveFavorite(index)}>
                    <FontAwesomeIcon icon={faTimesCircle}  />
                  </button>
                </li>
              ))
            ) : (
              <p>No hay artículos marcados como favoritos.</p>
            )}
          </ul>
          </div>
          
        </div>
      )}
    </header>
  );
};

export default Header;
