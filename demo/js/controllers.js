angular.module('zasta.controllers', [])

.controller('DashCtrl', function($scope, $timeout, Accounts) {
  $scope.accounts = Accounts.all();
  $scope.refresh = function() {
    $scope.refreshing = true;
    $timeout(function() {
      $scope.refreshing = false;
    }, 5000);
  };
})
.controller('AccountsCtrl', function($scope, Accounts) {
  $scope.accounts = Accounts.getByType('Bank');
  $scope.delete = function(bankIndex) {
    $scope.accounts = Accounts.remove(bankIndex);
  }
})
.controller('AccountAddCtrl', function($scope, Accounts, $location) {
  $scope.bank = {};
  $scope.addBank = function() {
    Accounts.add($scope.bank);
    $location.path('/tab/accounts');
  }
})
.controller('SavingsCtrl', function($scope, Accounts) {
  $scope.goals = [
    {title: 'Urlaub', img: 'http://thedailygoodiebag.com/uploads/2013/03/free-vacation.jpg', amount: 10250},
    {title: 'Neues Auto', img: 'http://images.thecarconnection.com/med/2014-tesla-model-s_100436548_m.jpg', amount: 65740},
    {title: 'Laptop', img: 'http://richarddingwall.name/wp-content/uploads/2010/05/Macbook-pro.jpg', amount: 1199, achieved: true}
  ];

  var totalBalance = 0;
  Accounts.getByType('Account').forEach(function(item) { totalBalance += item.balance; });

  $scope.totalBalance = totalBalance;
})
.controller('SettingsCtrl', function($scope, Accounts) {
  $scope.warningThreshold      = 100;
  $scope.notificationThreshold = 100;
  
  $scope.accountSettings = Accounts.getByType('Account');
  $scope.save = function() {
    Accounts.update($scope.accountSettings);
  }
});