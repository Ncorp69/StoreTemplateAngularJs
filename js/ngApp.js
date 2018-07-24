var myApp = angular.module('store-template', ['ngRoute','storeModule'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: 'pages/productListPage.html'})
            .when('/productList', {templateUrl: 'pages/productListPage.html'})
            .when('/basket', {templateUrl: 'pages/shoppingCartPage.html'})
            .otherwise({redirectTo: '/productList'})
    })
    .run(function ($rootScope, storeService) {

        $rootScope.productListForTestOnly  = [
            {
                prodId: '1',
                name: 'Гироскутер 1',
                price: 69,
                type:"type1",
                imglist: [
                    'https://avatars.mds.yandex.net/get-mpic/96484/img_id1615702573266943723/9hq'
                ]
            },
            {
                prodId: '2',
                name: 'Гироскутер 2',
                price: 138,
                type:"type1",
                imglist: [
                    'https://avatars.mds.yandex.net/get-mpic/96484/img_id4966531718657954439/9hq'
                ],
                description:
                'Some description for product.\nDescription is optional attribute of product.\n' +
                'Some description for product. Description is optional attribute of product. \n' +
                'Some description for product.\nDescription is optional attribute of product.\n' +
                'Some description for product.\nDescription is optional attribute of product.\n'
            },
            {
                prodId: '3',
                name: 'Гироскутер 3',
                price: 174,
                type:"type2",
                imglist: [
                    'https://avatars.mds.yandex.net/get-mpic/195452/img_id1270426711870782493/9hq'
                ],
                description: 'Some description for product.\nDescription is optional attribute of product.'
            },
             {
                prodId: '4',
                name: 'Гироскутер 4',
                price: 282,
                type:"type3",
                imglist: [
                    'https://avatars.mds.yandex.net/get-mpic/96484/img_id1615702573266943723/9hq'
                ]
            },
            {
                prodId: '5',
                name: 'Гироскутер 5',
                price: 692,
                type:"type1",
                imglist: [
                    'https://avatars.mds.yandex.net/get-mpic/96484/img_id4966531718657954439/9hq'
                ],
                description:
                'Some description for product.\nDescription is optional attribute of product.\n' +
                'Some description for product. Description is optional attribute of product. \n' +
                'Some description for product.\nDescription is optional attribute of product.\n' +
                'Some description for product.\nDescription is optional attribute of product.\n'
            },
            {
                prodId: '6',
                name: 'Гироскутер 6',
                price: 561,
                type:"type2",
                imglist: [
                    'https://avatars.mds.yandex.net/get-mpic/195452/img_id1270426711870782493/9hq'
                ],
                description: 'Some description for product.\nDescription is optional attribute of product.'
            },
        ];

        function loadElemById(prodId) {
            for(var i = 0; i < $rootScope.productListForTestOnly.length; i++){
                if($rootScope.productListForTestOnly[i].prodId === prodId){
                    return $rootScope.productListForTestOnly[i];
                }
            }
        }

        $rootScope.loadProductsForCart = function(savedProdList){
            for(var i = 0; i < savedProdList.length; i++){
                var elemToAdd = loadElemById(savedProdList[i].prodId);
                if(elemToAdd === undefined){
                    console.error('ошибка загрузки сохраненного продукта, возможно его больше нет в продаже');
                    continue;
                }

                $rootScope.shoppingCart.addProductPosition(
                    new storeService.ProductPosition(
                        new storeService.Product(
                            elemToAdd.prodId,
                            elemToAdd.name,
                            elemToAdd.price,
                            elemToAdd.imglist,
                            elemToAdd.description,
                            {
                                type: elemToAdd.type,
                                countInCart: savedProdList[i].count
                            }), 
                        savedProdList[i].count)
                );
            }
        }

        $rootScope.shoppingCart = new storeService.ShoppingCart($rootScope.loadProductsForCart);
        $rootScope.shoppingCart.loadShoppingCart();
    });