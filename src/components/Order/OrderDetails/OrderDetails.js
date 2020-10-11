import React from 'react';
import { Redirect } from 'react-router-dom';

import classes from './OrderDetails.css';

import Button from '../../UI/Button/Button';
import Burger from '../../Burger/Burger';

const checkDataEmpty = (data) => (data ? data : 'Empty Data ');

const orderDetails = (props) => {
    console.log(props);
    const order = props.orderData.find((item) => item.id === props.orderId);
    if (!order) {
        return <Redirect to='/orders' />;
    } else {
        console.log(order.ingredients);
        return (
            <div className={classes.OrderDetails}>
                <Button
                    btnType="Success"
                    disabled={false}
                    clicked={props.goBackBtnClicked}
                    btnClasses={[classes.Btn, classes.GoBackBtn]}>
                    &#8592; GO BACK
            </Button>
                <div className={classes.OrderData}>
                    <h2 className={classes.Header}>Client Data</h2>
                    <ul>
                        <li><span>Country:</span> {checkDataEmpty(order.orderData.country)}</li>
                        <li><span>Name:</span> {checkDataEmpty(order.orderData.name)}</li>
                        <li><span>Street:</span> {checkDataEmpty(order.orderData.street)}</li>
                        <li><span>zipCode:</span> {checkDataEmpty(order.orderData.zipCode)}</li>
                        <li><span>DeliveryMethod:</span> {checkDataEmpty(order.orderData.deliveryMethod)}</li>
                        <li><span>Email:</span> {checkDataEmpty(order.orderData.email)}</li>
                    </ul>
                    <Button
                        btnType="Danger"
                        disabled={false}
                        btnClasses={classes.Btn}
                        clicked={() => props.delBtnClicked(props.orderId)}>
                        Delete Order
                </Button>
                </div>
                <div className={classes.BurgerInf}>
                    <Burger ingredients={order.ingredients} />
                    <h2 className={classes.Header}>Ingredients Ordered</h2>
                    <div className={classes.BurgerIngr}>
                        <ul>
                            <li><span>Bacon: </span>{order.ingredients.bacon}</li>
                            <li><span>Cheese: </span>{order.ingredients.cheese}</li>
                            <li><span>Meat: </span>{order.ingredients.meat}</li>
                            <li><span>Salad: </span>{order.ingredients.salad}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default orderDetails;