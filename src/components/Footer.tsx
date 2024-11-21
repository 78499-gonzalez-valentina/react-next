"use client";
import React from 'react';
import styles from '../app/footer.module.css';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>Creado por Valentina Gonzalez</p>
      <a
      href="https://www.linkedin.com/in/valentina-gonzalez24/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <button style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '10px 10px', 
        marginLeft:'5px',
        marginTop: '4px',
        backgroundColor: 'transparent', 
        color: 'white', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer'
      }}>
        <FontAwesomeIcon icon={faLinkedin} size="2x"  />
       
      </button>
    </a>
    </footer>
  );
};

export default Footer;