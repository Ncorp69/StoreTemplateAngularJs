angular.module('storeModule',[])
    .factory('storeService', function () {

        function Product (prodId, prodName, price, imglist, description, customParam){
            try{
                if(prodId === undefined){
                    throw new Error('prodId обязательный параметр для создания объекта Product');
                }
                if(prodName === undefined){
                    throw new Error('prodName обязательный параметр для создания объекта Product');
                }
                if(typeof price !== 'number'){
                    throw new Error('price обязательный, численный параметр для создания объекта Product');
                }
                if(imglist !== undefined && !(imglist instanceof Array)){
                    throw new Error('imglist должен быть массивом');
                }
                this.productId= prodId;
                this.productName= prodName;
                this.price= price;
                this.imglist= imglist;
                this.description= description;
                if(customParam!==undefined){
                    for(var key in customParam){
                        this[key] = customParam[key];
                    }
                }
            } catch(e){
                console.error(e.message);
                console.error(e.stack);
            }
        };


        function ProductPosition (product, count) {
            try{
                if(!(product instanceof Product)){
                    throw new Error('параметр product не является объектом Product');
                }
                if(typeof count !== 'number'){
                    throw new Error('count обязательный, численный параметр для создания объекта ProductPosition');
                }
                this.product = product;
                this.productCount = count;
            } catch(e){
                console.error(e.message);
                console.error(e.stack);
            }
        }

        ProductPosition.prototype.getPositionPrice = function () {
            return this.product.price * this.productCount;
        }


        function ShoppingCart(loadDataFn) {
            this.productPositionList = [];
            this.allPositionsPrice = 0;
            this.loadDataFn = loadDataFn;
        }

        ShoppingCart.prototype.countAllPositionsPrice = function () {
            var priceSumm = 0;
            for(var i=0; i < this.productPositionList.length; i++){
                priceSumm += this.productPositionList[i].getPositionPrice();
            }
            return priceSumm;
        }

        ShoppingCart.prototype.saveShoppingCart = function () {
            console.log('saveShoppingCart');
            this.allPositionsPrice = this.countAllPositionsPrice();

            var listForSave = [];
            for(var i = 0; i < this.productPositionList.length; i++){
                listForSave.push({
                    prodId : this.productPositionList[i].product.productId,
                    count: this.productPositionList[i].productCount
                });
            }

            localStorage.setItem('CartState', JSON.stringify(listForSave));
        }

        ShoppingCart.prototype.loadShoppingCart = function () {
            console.log('loadShoppingCart');

            if(this.loadDataFn === undefined || typeof this.loadDataFn !== 'function'){
                return;
            }

            this.loadDataFn(JSON.parse(localStorage.getItem('CartState')));

            this.allPositionsPrice = this.countAllPositionsPrice();
        }

        ShoppingCart.prototype.addProductPosition= function (productPosition) {
            console.log('addProductPosition');

            try{
                if(!(productPosition instanceof ProductPosition)){
                    throw new Error('параметр productPosition не является объектом ProductPosition');
                }
                this.productPositionList.push(productPosition);
                this.refreshCart();
            } catch(e){
                console.error(e.message);
                console.error(e.stack);
            }
        }

        ShoppingCart.prototype.removeProductPosition= function (index) {
            console.log('removeProductPosition');

            try{
                if(index<0 || index >= this.productPositionList.length){
                    throw new Error();
                }
                this.productPositionList.splice(index, 1);
                this.refreshCart();
            }catch(e){
                console.error(e.message);
                console.error(e.stack);
            }
        }

        ShoppingCart.prototype.refreshCart= function () {
            console.log('refreshCart');
            this.productCount = this.countAllPositionsPrice();
            this.saveShoppingCart();
        }

        return {
            Product: Product,
            ProductPosition: ProductPosition,
            ShoppingCart: ShoppingCart
        };
    });

