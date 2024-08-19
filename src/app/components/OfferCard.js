import React from 'react';
import styles from './OfferCard.module.css';

const OfferCard = ({offer, onEdit}) => {
    return (
        <div className={styles.card} onClick={() => onEdit(offer)}>
            <img src={offer?.imageUrl} alt="Offer" className={styles.image}/>
            <div className={styles.content}>
                <div>
                    <h3 className={styles.title}>{offer.name}</h3>
                    <p className={styles.description}><strong>Rules:</strong> {offer.description}</p>
                </div>
                <div className={styles.info}>
                    <span> <span className={styles.users}>Users:</span> {offer.users}</span>
                    <span> <span className={styles.users}>Purchases:</span> {offer.purchases}</span>
                    <span> <span className={styles.users}>Amount:</span> ${offer.amount}</span>
                    <span> <span className={styles.users}>user cut:</span> %{offer.userPercent}</span>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;
