myApp.directive('clickCopyDir',function ($interval) {
    return{
        restrict:'EAC',
        scope:{},
        link: function (scope, elem, attrs) {
            elem.before(
                angular.element('<div>')
                    .css('display', 'none')
                    .addClass('alert-copy')
                    .addClass('alert')
                    .addClass('alert-success')
                    .append('<strong>Скопированно в буфер</strong>'));

            elem.on('click', function () {
                try{
                    elem.select();
                    var successfull = document.execCommand('copy');
                    var msg = successfull ? 'copy success' : 'copy error';
                    console.log(msg);
                    elem.prev().css('display', 'inline-block');

                    $interval(function () {
                        elem.prev().css('display', 'none');
                    }, 800, 1);
                } catch (e){
                    console.error(e.message);
                }
            })
        }
    }
});