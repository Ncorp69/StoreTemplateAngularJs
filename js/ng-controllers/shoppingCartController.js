myApp.controller('shoppingCartController', function ($scope, $rootScope, storeService){

	$scope.addItemToPosition = function (productPosition) {
		productPosition.productCount += 1;
		$rootScope.shoppingCart.refreshCart();
	}

	$scope.removeItemFromPosition = function (productPosition, index) {
		if(productPosition.productCount == 1){
			$scope.removePosition(index);
			return;
		}
		productPosition.productCount -= 1;
		$rootScope.shoppingCart.refreshCart();
	}

	$scope.removePosition = function (index) {
		$rootScope.shoppingCart.removeProductPosition(index);
		$rootScope.shoppingCart.refreshCart();
	}
});