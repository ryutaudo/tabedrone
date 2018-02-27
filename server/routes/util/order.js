const db = require('../../db/index');
const Geocode = require('./geocode');


class Order {
  // 1. loading customer id from geocode
  async getCustomerId(customerId) {
    const getCustomerInfo = await db.customer.get({ id: customerId });
    // console.log('getCustomerInfo======= ', customerId, getCustomerInfo);
    return getCustomerInfo;
  }
  // 2. loading all supermarkets from db
  async getSupermarkets() {
    const superMarketList = await db.supermarket.list();
    //console.log('getSupermarkets', superMarketList);
    return superMarketList;
  }
  // 3. finding nearest supermarket id closest to customer
  async getSupermarketCloseToCustomer(customerId) {
    // console.log()
    const customerInfo = await this.getCustomerId(customerId);
    const customerInfoGeoCode = {
      latidude: customerInfo.latitude,
      longitude: customerInfo.longitude,
    };

    // console.log('getCustomerID: ', customerId, customerInfo);
    const supermarketsList = await this.getSupermarkets();

    let foundedSupermarket;
    let foundedDistance;
    // console.log('getSupermarketCloseToCustomer: ', supermarketsList);

    for (let i = 0; i < supermarketsList.length; i += 1) {
      const supermarket = supermarketsList[i];
      const supermarketGeoCode = {
        latidude: supermarket.latitude,
        longitude: supermarket.longitude,
      };
      const distance = Geocode.getDistance(customerInfoGeoCode, supermarketGeoCode);
      if (distance < foundedDistance || foundedDistance === undefined) {
        foundedDistance = distance;
        foundedSupermarket = supermarket;
      }
    }
    // console.log("founded supermarket gives------ ", foundedSupermarket);
    return foundedSupermarket;
  }
  // 4. saving the cart products
  async storeCart(cart) {
    return await db.order_products.create(cart);
  }
  /**
   * @param object order {customerId: 1, status:"OPEN", carts:[{productId:1, amount:1, orderId:1}]}
   */
  async store(order) {
    const supermarket = await this.getSupermarketCloseToCustomer(order.customerId);
    // console.log('store order is 2222222: ', order.customerId, supermarket.id);


    const orderId = await db.order.create({
      customer_id: order.customerId,
      status: order.status,
      supermarket_id: supermarket.id,
    });

    // console.log('dbOrder is 0000000: ', orderId, order.cart);


    const orderProducts = await order.cart.map(async product => ({
      product_id: await this.getProductId(product.name),
      amount: +product.amount,
      name: product.name,
      order_id: orderId,
    }));
    await this.storeCart(orderProducts);

    await this.increaseAmountFridgeInventory(order.customerId, orderProducts);
    // 6. new created orderid
    // console.log('dbOrder.idddddd: ', orderId);
    return orderId;
  }

  async getProductId(name) {
    const productList = await db.product.list();
     return +productList.filter(product => name === product.name)[0].id;
  }
  // 5. increase of amount in fridge_inventory
  async increaseAmountFridgeInventory(customerId, productList) {
    return await db.fridge_inventory.getNewOrder(customerId, productList);
  }
}

module.exports = Order;
