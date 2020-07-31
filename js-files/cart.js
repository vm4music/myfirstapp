module.exports = function Cart(oldCart){
    this.items =  oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(re, product_id){

        var cartItem = this.items[product_id];
        if (!cartItem) {
            cartItem = this.items[product_id] = {item: re, qty: 0, price: 0};
        }
        // var cartItem = this.items[product_id];
        console.log(JSON.stringify(cartItem));
        cartItem.qty++;
        cartItem.price = cartItem.item.product_price * cartItem.qty;
        this.totalQty++;
        this.totalPrice += cartItem.item.product_price;
    };

    this.remove = function(id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].product_price;
        delete this.items[id];
    };

    this.generateArray = function(){
        var arr = [];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };
};
