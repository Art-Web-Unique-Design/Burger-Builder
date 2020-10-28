import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Order from '../../components/Order/Order';
import OrderDetails from '../../components/Order/OrderDetails/OrderDetails';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orderId: ''
    }

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    viewMoreBtnClickedHandler = (id) => {
        this.setState({ ...this.state, orderId: id });
        this.props.history.push(this.props.match.path + '/order/' + id);
    }

    viewingBackHanlder = () => {
        this.props.history.push('/orders/');
    }

    deleteOrderBtnClicked = (id) => {
        this.props.history.push('/orders/');
        this.props.onDeleteOrder(id, this.props.token);
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    delBtnClicked={this.props.onDeleteOrder}
                    viewMoreBtnClicked={this.viewMoreBtnClickedHandler}
                    orderId={order.id}
                    token={this.props.token}
                />
            ));
        };

        if (!(this.props.location.pathname === this.props.match.url)) {
            orders = <Route
                path={this.props.match.path + '/order/' + this.state.orderId}
                render={() => <OrderDetails
                    goBackBtnClicked={this.viewingBackHanlder}
                    orderData={this.props.orders}
                    orderId={this.state.orderId}
                    delBtnClicked={this.deleteOrderBtnClicked} />} />;
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        deleteError: state.order.orderDelError,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
        onDeleteOrder: (id, token) => dispatch(actions.deleteOrder(id, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));