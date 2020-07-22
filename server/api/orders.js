const ordersRouter = require('express').Router();
const { createOrder, getUserOrdersByUserId, updateUserOrderByOrderId, getUserOrdersByUsername, createOrderItem, deleteItemByOrderId, deleteOrderByOrderId, getActiveOrderForUser } = require('../db');
const { requireUser } = require('./utils');
const { compareSync } = require('bcrypt');

ordersRouter.use((req, res, next) => {
    console.log('A request is being made to /orders');
    next();
});

ordersRouter.get('/cart', requireUser, async (req, res, next) => {
    const user = req.user;
    const { userId } = req.body;
    // console.log('Entered GET /cart with userid:', userId);

    if (user && user.user_id === userId) {
        try {
            const orders = await getActiveOrderForUser(userId);

            if (orders) {
                res.send({
                    message: 'Successfully retrieved orders',
                    status: true,
                    orders
                });
            } else {
                next({
                    error: 'FailedToRetrieveOrdersByUserNameError',
                    message: `Unable to retrieve orders by username:${userName}`
                });
            }
        } catch ({ error, message }) {
            next({ error, message })
        };

    }
});
ordersRouter.post('/', async (req, res, next) => {

    try {
        let order_id;
        const { price, merchId, quantity, orderId } = req.body;
        const orderData = { userId: 1, status: true };

        console.log('Creating new order!');

        if (!orderId) {
            const order = await createOrder(orderData);
            order_id = order.orderId;
            console.log('Order: ', order);

            console.log('About to enter orderItem')
            console.log(quantity)
            console.log(merchId)
            console.log(price)
        };

        const orderItem = await createOrderItem(order_id, {
            merchId,
            quantity,
            price
        });

        console.log('Order item: ', orderItem)

        if (orderItem) {
            res.send({
                message: 'successfully created new order',
                status: true,
                // order,
                orderItem
            });
        } else {
            next({
                error: 'FailedToCreateOrderError',
                message: 'Unable to create new order'
            });
        }
    } catch ({ error, message }) {
        next({ error, message });
    }
});

ordersRouter.post('/:orderId', async (req, res, next) => {
    const { orderId } = req.params;
    const { merchId, quantity, price } = req.body;
    const orderItemData = { merchId, quantity, price }
    console.log('welcome to POST /orderId!', orderItemData);
    try {
        const orderItem = await createOrderItem(orderId, orderItemData);
        console.log('Success!');
        if (orderItem) {
            res.send({
                message: 'Successfully retrieved orderItems',
                status: true,
                orderItem
            });
        } else {
            next({
                error: 'FailedToRetrieveOrdersItems',
                message: `Unable to retrieve orderItems`
            });
        }
    } catch ({ error, message }) {
        next({ error, message })
    }
});

ordersRouter.get('/:userId', requireUser, async (req, res, next) => {
    const { userId } = req.params;
    user = req.user;

    if (user && user.user_id === Number(userId)) {
        try {
            const orders = await getUserOrdersByUserId(userId);

            if (orders) {
                res.send({
                    message: 'Successfully retrieved orders',
                    status: true,
                    orders
                });
            } else {
                next({
                    error: 'FailedToRetrieveOrdersByUserIdError',
                    message: `Unable to retrieve orders by id:${userId}`
                });
            }
        } catch ({ error, message }) {
            next({ error, message })
        }
    }
});

// ordersRouter.post('/', async (req, res, next) => {
//     try {
//         const { userId, status, price, merchId, quantity } = req.body;
//         const orderData = { userId, status, price };
//         let orderId = req.body.orderId;

//         const order = await createOrder(orderData);
//         orderId = order.orderId;
//         console.log("This is the order:", order);
//         console.log("orderId", orderId);
//         console.log('Not in if statement!')
//         const orderItemData = { merchId, quantity, price }
//         const orderItem = await createOrderItem(orderId, orderItemData)
//         console.log("order item:", orderItem);

//         console.log("order", order);

//         if (orderItem) {
//             res.send({
//                 message: 'successfully created new order',
//                 status: true,
//                 orderItem
//             });
//         } else {
//             next({
//                 error: 'FailedToCreateOrderError',
//                 message: 'Unable to create new order'
//             });
//         }
//     } catch ({ error, message }) {
//         next({ error, message });
//     }
// });

// ordersRouter.patch('/:orderId', requireUser, async (req, res, next) => {
//     const { orderId } = req.params;
//     const { userId, orderItemId, status, price, } = req.body;
//     const updateFields = {};

//     if (userId) {
//         updateFields.userId = userId;
//     }

//     if (status) {
//         updateFields.status = status;
//     }

//     if (price) {
//         updateFields.price = price;
//     }

//     try {
//         const updatedOrder = await updateUserOrderByOrderId(orderId, updateFields);

//         if (updatedOrder) {
//             res.send({
//                 message: 'Successfully updated order',
//                 status: true,
//                 payment: updatedOrder
//             });
//         } else {
//             next({
//                 error: 'FailedToUpdateOrderError',
//                 message: 'Unable to update order'
//             });
//         }
//     } catch ({ name, message }) {
//         next({ name, message });
//     }
// });
// ordersRouter.delete('/cart/:itemId', async (req, res, next) => {

//     const { orderId, item_id } = req.body;
//     console.log('From DELETE /cart/itemId OrderId:', orderId, ' item_id:', item_id);
//     try {
//         const deletedItem = await deleteItemByOrderId(item_id, orderId);

//         if (deletedItem) {
//             res.send({
//                 message: `Successfully removed ${deletedItem.name} from order`,
//                 status: true,
//                 data: deletedItem
//             });
//         } else {
//             next({
//                 message: 'Unable to remove item from cart',
//                 error: 'FailedToRemoveItemFromOrderError'
//             });
//         }
//     } catch ({ message, error }) {
//         next({ message, error });
//     }
// })


ordersRouter.delete('/:orderId', requireUser, async (req, res, next) => {
    console.log('Entered DELETE /orderID to DELETE ENTIRE ORDER')
    const { orderId } = req.params;
    user = req.user;

    if (user && user.user_id === userId) {
        try {
            const cart = await deleteOrderByOrderId(orderId);

            if (cart) {
                res.send({
                    message: 'successfully deleted order',
                    data: cart,
                    status: true
                })
            } else {
                next({
                    message: 'Unable to remove all items from cart.',
                    error: 'FailedToDeleteOrderError'
                })
            }
        } catch ({ message, error }) {
            next({ message, error })
        }
    }
})


module.exports = ordersRouter;