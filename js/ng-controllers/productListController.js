myApp.controller('productListController', function ($scope, $rootScope, storeService) {

    $scope.productList = [];

    function getProductIndexInCartById(prodId) {
        for(var i=0; i< $rootScope.shoppingCart.productPositionList.length; i++){
            if ($rootScope.shoppingCart.productPositionList[i].product.productId === prodId){
                return i;
            }
        }
        return -1;
    }

    function parseProductList(prodList) {
        for (var i = 0; i < prodList.length; i++) {
            try {
                var addedItemIndex = getProductIndexInCartById(prodList[i].prodId);
                $scope.productList.push(
                    new storeService.Product(
                        prodList[i].prodId,
                        prodList[i].name,
                        prodList[i].price,
                        prodList[i].imglist,
                        prodList[i].description,
                        {
                            type: prodList[i].type,
                            countInCart: addedItemIndex < 0 ? 0 : $rootScope.shoppingCart.productPositionList[addedItemIndex].productCount
                        })
                );
            } catch (e) {
                console.error(e.message);
                console.error(e.stack);
            }
        }
    }

    $scope.addProductToCart = function(product){
        if(product.productId === undefined){
            alert('Ошибка добавления товара');
            return;
        }

        var addedItemIndex = getProductIndexInCartById(product.productId);

        if(addedItemIndex < 0){
            $rootScope.shoppingCart.addProductPosition(
                new storeService.ProductPosition(product, 1)
            );
            product.countInCart = 1;
        }else {
            $rootScope.shoppingCart.productPositionList[addedItemIndex].productCount += 1;
            product.countInCart = $rootScope.shoppingCart.productPositionList[addedItemIndex].productCount;
        }
        $rootScope.shoppingCart.refreshCart();
    }

    $scope.removeProductFromCart = function(product){
        if(product.productId === undefined){
            alert('Ошибка товара');
            return;
        }

        var addedItemIndex = getProductIndexInCartById(product.productId);

        if(addedItemIndex >= 0){
            if($rootScope.shoppingCart.productPositionList[addedItemIndex].productCount == 1){
                $rootScope.shoppingCart.removeProductPosition(addedItemIndex);
                product.countInCart = 0;
                $rootScope.shoppingCart.refreshCart();
                return;
            }
            $rootScope.shoppingCart.productPositionList[addedItemIndex].productCount -= 1;
            product.countInCart = $rootScope.shoppingCart.productPositionList[addedItemIndex].productCount;
            $rootScope.shoppingCart.refreshCart();
        }
    }

    $scope.loadProducts = function () {
        var prodlist = $rootScope.productListForTestOnly;

        parseProductList(prodlist);
    }

    $scope.loadProducts();
})