angular.module("input-text-mask", [])
.directive('inputTextOnly', ['$timeout', 'TextMaskService', function($timeout, TextMaskService) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {


            var execute = function () {
                scope.$apply(function () {

                    ctrl.$setViewValue(TextMaskService.fromStringToTextOnly(ctrl.$modelValue));
                    ctrl.$render();
                });
            };
            element.bind('keyup', function (event) {

                if(event.key === ' ' && attrs.space){
                    return;
                }else{
                    execute();
                }

            });

            $timeout(function () {
                execute();
            }, 500);
        }
    };
}])
.factory("TextMaskService", [ "$filter", function ($filter) {
    var _invalidsCharacteres = /[!?.;:,&@#$%*=0-9\"\'\/.><\\|\(\)\]\[\{\}\-_+]+/;

    var _fromStringToTextOnly = function (string) {
        return _fromStringOnly(string);
    };

    var _fromStringOnly = function (string) {
        if (!string) return '';
        return string.replace(_invalidsCharacteres, '');
    }

    return {
        fromStringToTextOnly: _fromStringToTextOnly
    };
}]);