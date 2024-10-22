var app = angular.module("myApp", ["ngRoute"]);
app.controller("IndexController", function ($scope, $http, $location) {
  const API_BASE_URL_Milktaste = "http://localhost:3000/api/Milktaste";
  const API_BASE_URL_Targetuser = "http://localhost:3000/api/Targetuser";
  const API_BASE_URL_Milktype = "http://localhost:3000/api/Milktype";
  const API_BASE_URL_Product = "http://localhost:3000/api/Product";
  const API_BASE_URL_Milkdetail = "http://localhost:3000/api/Milkdetail";
  $scope.getMilktaste = function () {
    $http({
      method: "GET",
      url: `${API_BASE_URL_Milktaste}/lst`,
    }).then(
      function (response) {
        $scope.milktastes = response.data;
        console.log(response);
      },
      function (error) {
        $scope.showNotification("Không thể tải danh sách vị sữa", "error");
        handleError(error);
      }
    );
  };
  $scope.getTargetuser = function () {
    $http({
      method: "GET",
      url: `${API_BASE_URL_Targetuser}/lst`,
    }).then(
      function (response) {
        $scope.targetusers = response.data;
        console.log(response);
      },
      function (error) {
        $scope.showNotification("Không thể tải danh sách vị sữa", "error");
        handleError(error);
      }
    );
  };
  $scope.getMilktype = function () {
    $http({
      method: "GET",
      url: `${API_BASE_URL_Milktype}/lst`,
    }).then(
      function (response) {
        $scope.milktypes = response.data;
        console.log(response);
      },
      function (error) {
        $scope.showNotification("Không thể tải danh sách vị sữa", "error");
        handleError(error);
      }
    );
  };
  $scope.getProduct = function () {
    $http({
      method: "GET",
      url: `${API_BASE_URL_Product}/lst`,
    }).then(
      function (response) {
        $scope.products = response.data;
        console.log(response);
      },
      function (error) {
        $scope.showNotification("Không thể tải danh sách vị sữa", "error");
        handleError(error);
      }
    );
  };

  $scope.getProductDetails = function () {
    // Lấy id từ $routeParams nếu đã cấu hình route với tham số id
    const id = $routeParams.id;
    if (!id) {
      $scope.showNotification("Không tìm thấy ID sản phẩm", "error");
      return;
    }

    // Gọi API với id lấy được
    $http({
      method: "GET",
      url: `${API_BASE_URL_Milkdetail}/${id}`,
    }).then(
      function (response) {
        console.log(response);
        $scope.productDetails = response.data;
      },
      function (error) {
        $scope.showNotification("Không thể tải chi tiết sản phẩm", "error");
        handleError(error);
      }
    );
  };

  $scope.getMilktaste();
  $scope.getTargetuser();
  $scope.getMilktype();
  $scope.getProduct();
});
