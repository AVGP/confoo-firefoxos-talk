angular.module('zasta', ['ionic', 'zasta.controllers', 'zasta.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })
    .state('tab.accounts', {
      url: '/accounts',
      views: {
        'tab-accounts': {
          templateUrl: 'templates/tab-accounts.html',
          controller: 'AccountsCtrl'
        }
      }
    })
    .state('tab.account-new', {
      url: '/accounts/new',
      views: {
        'tab-accounts': {
          templateUrl: 'templates/tab-account-new.html',
          controller: 'AccountAddCtrl'
        }
      }
    })
    .state('tab.pay', {
      url: '/pay',
      views: {
        'tab-pay': {
          templateUrl: 'templates/tab-pay.html',
          controller: 'SavingsCtrl'
        }
      }
    })
    .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: 'templates/tab-settings.html',
          controller: 'SettingsCtrl'
        }
      }
    })
    .state('tab.settings-autorefresh', {
      url: '/settings/autorefresh',
      views: {
        'tab-settings': {
          templateUrl: 'templates/settings/autorefresh.html',
          controller: 'SettingsCtrl'
        }
      }
    })
    .state('tab.settings-notifications', {
      url: '/settings/notifications',
      views: {
        'tab-settings': {
          templateUrl: 'templates/settings/notifications.html',
          controller: 'SettingsCtrl'
        }
      }
    })
    .state('tab.settings-warnings', {
      url: '/settings/warnings',
      views: {
        'tab-settings': {
          templateUrl: 'templates/settings/warnings.html',
          controller: 'SettingsCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/tab/dash');

});
