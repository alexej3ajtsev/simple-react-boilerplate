import React from 'react'
import './Summary.sass'

const Summary = ({loan, payment, percents}) => {
    return(
        <div className="loan-summary">
            <h3 className="loan-summary__header">Ваш займ составит <span>{loan} <small>₽</small></span> </h3>
            <div className="loan-summary__subheader">
                Ежемесячный платеж <span>{` ${payment} ₽ (${percents}% / м.)`}</span>
            </div>
        </div>
    )
}

export default Summary