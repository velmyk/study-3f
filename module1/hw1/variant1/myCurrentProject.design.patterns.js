/* <------ REVEALING MODULE    ------> */

/* UML -> ./umls/revealing-module.png */

function ProductScanService(CartService,
                          DialogService,
                          /* ... */
                          NoSaleService) {

  var service = {
      add: add,
      isAvailable: isAvailable
  };

  return service;

  function isAvailable() {
      return !TransactionStore.isFastFind();
  }

  function add(sku, price) {
      if (!sku || NoSaleService.isTransactionStarted()) {
          showError();
      }

      /* ... */
  }

  function showError() {
  	/* ... */
  }
}

/* In revealing module we can create addition methods inside the
 * function and export an object with only public methods.
 * In this case external modules can use only 'add' and 'isAvaliable' methods.
 * But 'showError' is used only by 'add' method and is privat for everything external
 */




/* <------ SINGLETON           ------> */

/* UML -> ./umls/singleton.png */

function IdentityStore(BindingStoreFactory,
                           UserPermissionService,
                           MANAGER_GROUP_ID) {

  var store = angular.extend(BindingStoreFactory.create(), {
      hasPermission: hasPermission,
      isPermissionDenied: isPermissionDenied,
      isLeftHand: isLeftHand,
      isManager: isManager
  });

  return store;

  function hasPermission(permissionId) {
    /* ... */
  }

  function isPermissionDenied(permissionId) {
    /* ... */
  }

  function isLeftHand() {
    /* ... */
  }

  function isManager() {
    /* ... */
  }
}

/* All services in AngularJS are singletones. In project we did not perform
 * singleton implemenation, but used an Angular's one. In this case we store
 * operator's object in the IdentityStore and can use this object during all
 * lifecycle of application.
 */




/* <------ FACADE              ------> */

/* UML -> ./umls/facade.png */

function CartService(ItemReturnsFilter,
                     LastAddedSkuFilter,

                     /* ... */

                     GIFT_CARD_SKU_TYPE) {
  var service = {
      all: all,

      /* ... */

      add: add,
  };

  return service;

  function add(barcode, price, ignoreProgramExpired) {
    /* 30 lines of code */
  }
}

/* Facade allows to incapsulate complicated logic in some method
 * and just use simple interface in other modules.
 * In AngularJS there is many fasades lice $http serice which 
 * incapsulate lines of native code and allows to use simple interface
 */




/* <------ OBSERVER            ------> */

/* UML -> ./umls/observer.png */

function Scanner(SCANNER_EVENT,
                 $rootScope) {

		/* ... */

  function raiseEvent(rawValue) {
    $rootScope.$broadcast(SCANNER_EVENT.SCAN, rawValue);
  }

    /* ... */
}

function ScannerInput($timeout, SCANNER_EVENT) {

	/* ... */

  function activate() {
    scope.$on(SCANNER_EVENT.SCAN, onScan);
  }

	/* ... */

}

function ProductSearchFilterController($scope,
                                       SCANNER_EVENT) {
	/* ... */

  function initialize() {
    $scope.$on(SCANNER_EVENT.SCAN, function(event, value) {
      ProductSearchFilterFormService.clear();
      vm.input.upc = value;
    });
  }

  /* ... */
}

/* In this case Scaner can broadcast scan event and several observers which are waiting
 * for notification from him will do some actions after notification.
 */




/* <------ MVVM            ------> */

/* UML -> ./umls/mvvm.png */

/* Applications, based on AngularJS has MVVM architecture. Thanks to 2 way data binding
 * we have ViewModel in face of angular controller which maces communication between
 * model(data, services) and view (template).
 */
