"use client";
import React, { useState } from 'react';
import styles from '../app/header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC<{ favoriteCount?: number; favoritesList?: string[]; onRemoveFavorite?: (index: number) => void }> = ({ favoriteCount, favoritesList, onRemoveFavorite }) => {
  const [showFavorites, setShowFavorites] = useState(false);

  const handleFavoritesClick = () => {
    setShowFavorites(!showFavorites);
  };

  const handleRemoveFavorite = (index: number) => {
    if (onRemoveFavorite) {
      onRemoveFavorite(index);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>TechSpot</h1>
      </div>
      <div className={styles.leftSection}>
        <button className={styles.favoriteButton} onClick={handleFavoritesClick}>
          <FontAwesomeIcon icon={faHeart} className={styles.icon} />
          <span className={styles.favoriteCount}>{favoriteCount}</span>
        </button>
      </div>

      {showFavorites && favoritesList && (
        <div className={styles.favoritesList}>
          <h3>Favoritos:</h3>
          <ul>
            {favoritesList.length > 0 ? (
              favoritesList.map((item, index) => (
                <li key={index} className={styles.favoriteItem}>
                  {item}
                  <button className={styles.removeButton} onClick={() => handleRemoveFavorite(index)}>
                    ✖
                  </button>
                </li>
              ))
            ) : (
              <p>No hay artículos marcados como favoritos.</p>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
