import React from 'react';

 export const ProductCard = ({ productImage, name, category, instruction, price }) => {
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f8f8',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '484px',
      marginTop:"100px"
    },
    cardContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
    },
    card: {
      backgroundColor: '#fff',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'transform 0.3s ease',
      width: '300px',
      textAlign: 'center',
    },
    cardHover: {
      transform: 'translateY(-10px)',
    },
    img: {
      width: '100%',
      height: 'auto',
    },
    cardBody: {
      padding: '20px',
    },
    cardTitle: {
      fontSize: '1.5em',
      margin: '10px 0',
      color: '#333',
    },
    cardCategory: {
      fontSize: '0.9em',
      color: '#777',
      marginBottom: '10px',
    },
    cardInstruction: {
      fontSize: '1em',
      color: '#555',
      marginBottom: '20px',
    },
    cardPrice: {
      fontSize: '1.2em',
      color: '#28a745',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.cardContainer}>
        <div
          style={styles.card}
          onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-10px)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <img src={productImage.url} alt="Product" style={styles.img} />
          <div style={styles.cardBody}>
            <div style={styles.cardTitle}>{name}</div>
            <div style={styles.cardCategory}>{category}</div>
            <div style={styles.cardInstruction}>{instruction}</div>
            <div style={styles.cardPrice}>{price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};


