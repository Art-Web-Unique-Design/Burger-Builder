import React from 'react';

import classes from './Order.css';

import Button from '../UI/Button/Button';

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    };

    const ingredientOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>{ig.name} ({ig.amount})</span>
    });

    return (
        <div className={classes.Order}>
            <div>
                <p>Igredients: {ingredientOutput}</p>
                <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
                <Button
                    btnClasses={classes.ViewBtn}
                    btnType="Success"
                    disabled={false}
                    clicked={() => props.viewMoreBtnClicked(props.orderId)}>
                    View More
                </Button>
            </div>
            <span className={classes.CloseBtn} onClick={() => props.delBtnClicked(props.orderId, props.token)}></span>
        </div>
    );

};

export default order;