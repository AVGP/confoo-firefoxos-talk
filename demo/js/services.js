angular.module('zasta.services', [])
.factory('Settings', function() {
  var notificationThreshold = 100,
      warningThreshold      = 100;

  var self = {
    load: function() {
      return {
        notificationThreshold: notificationThreshold,
        warningThreshold:      warningThreshold
      };
    },
    save: function(settings) {
      //
    }
  };

  return self;
})
.factory('Accounts', function() {
  var accounts = [
    { type: "Bank", name: 'Sparkasse Berlin', blz: '10050000', user: "abc123", pin: "1234", bankIndex: 0 },
    { type: "Account", konto: '1234567890', name: 'Giro aktiv'   , balance: 1234.56, notify: true,  bank: 0 },
    { type: "Account", konto: '9888459898', name: 'Tagesgeld'    , balance: 7654.32, notify: false, bank: 0 },
    { type: "Bank", name: 'Volksbank Hamburg' , blz: '12345678', user: "def456", pin: "9876", bankIndex: 1 },
    { type: "Account", konto: '0987654321', name: 'KomplettKonto', balance:  123.45, notify: true,  bank: 1 },
    { type: "Account", konto: '1122334455', name: 'FlexGeld',      balance:  -12.34, notify: false, bank: 1 },
    { type: "Account", konto: '0000001111', name: "GewinnSparen" , balance:   98.76, notify: false, bank: 1 }
  ];

  var self = {};

    self.all = function() { return accounts; };

    self.getByType = function(type) {
      return accounts.filter(function(acc) { return acc.type == type; });
    };

    self.add = function(bank) {
      var bankIndex = self.getByType('Bank').length;
      bank.type = 'Bank';
      bank.name = 'Bank';
      bank.bankIndex = bankIndex;
      
      accounts.push(bank);
      accounts.push({ type: 'Account', name: 'Konto', balance: 123.45, bank: bankIndex });
    };

    self.remove = function(bankIndex) {
      var len = accounts.length;
      while(len--) {
        if(accounts[len].bankIndex == bankIndex || accounts[len].bank == bankIndex) {
          accounts.splice(len, 1);
        }
      }
      return self.getByType('Bank');
    };

    self.update = function(changedAccounts) {
      if(accounts.length === 0) return;

      var len  = accounts.length - 1,
          cLen = changedAccounts.length;
      do {
        for(var c=0; c < cLen; c++) {
          if(accounts[len].konto == changedAccounts[c].konto) {
            // Only copy the properties that are present in changedAccounts, do not lose properties!
            for(prop in changedAccounts[c]) {
              if(!changedAccounts[c].hasOwnProperty(prop)) continue;
              accounts[len][prop] = changedAccounts[c][prop];
            }
            break;
          }
        }
      } while(len--);
    };

  return self;
});
