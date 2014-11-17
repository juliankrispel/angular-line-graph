angular.module('plot')
.directive('lineGraph', ['visUtil', function(visUtil){
    return {
        restrict: 'E',
        replace: true,
        scope: { 
            height: '=',
            width: '=',
            data: '=', 
            color: '@?',
            minX: '=?',
            maxX: '=?',
            minY: '=?',
            maxY: '=?'
        },
        template:
            '<path ' +
            'ng-attr-d="{{graphPath}}" ' +
            'fill="transparent" ' +
            'ng-attr-stroke="{{color}}"/>',
        controller: function($scope){
            var xData = _.pluck($scope.data, 'x');
            var yData = _.pluck($scope.data, 'y');

            var minX = $scope.minX === undefined ?  _.min(xData) : $scope.minX;
            var maxX = $scope.maxX === undefined ?  _.max(xData) : $scope.maxX;
            var minY = $scope.minY === undefined ?  _.min(yData) : $scope.minY;
            var maxY = $scope.maxY === undefined ?  _.max(yData) : $scope.maxY;

            var xScale = visUtil.createScale(minX, maxX, 0, $scope.width);
            var yScale = visUtil.createScale(minY, maxY, 0, $scope.height);

            console.log(minX, maxX, minY, maxY, $scope.width, $scope.height);
            $scope.graphPath = visUtil.convertDataToSvgPath($scope.data, $scope.width, $scope.height, xScale, yScale);
        },
        link: function(){
        }
    };
}]);
