(function () {
    'use strict';

    angular.module('mTakaAPP.pages', [
        'ui.router',
        'mTakaAPP.pages.services',
        'mTakaAPP.pages.config',
        'mTakaAPP.pages.main',
        'mTakaAPP.pages.authSignIn',
        'mTakaAPP.pages.CusCategory',
        'mTakaAPP.pages.CusType',
        'mTakaAPP.pages.AccCategory',
        'mTakaAPP.pages.AccType',
        'mTakaAPP.pages.DefineService',
        'mTakaAPP.pages.ManagerCategory',
        'mTakaAPP.pages.ManagerType',
        'mTakaAPP.pages.CustomerAccProfile',
        'mTakaAPP.pages.StatusWiseService',
        'mTakaAPP.pages.ErrorLog',
        'mTakaAPP.pages.ChannelAccProfile',
        'mTakaAPP.pages.ManagerAccProfile',
        'mTakaAPP.pages.AccInfo',
        'mTakaAPP.pages.AccStatusSetup',
        'mTakaAPP.pages.AccLimit',
        'mTakaAPP.pages.AreaInfo',
        'mTakaAPP.pages.CityInfo',
        'mTakaAPP.pages.CountryInfo',
        'mTakaAPP.pages.CurrencyInfo',
        'mTakaAPP.pages.DistrictInfo',
        'mTakaAPP.pages.DivisionInfo',
        'mTakaAPP.pages.PSInfo',
        'mTakaAPP.pages.UpazilaInfo',
        'mTakaAPP.pages.BranchInfo',
        'mTakaAPP.pages.FundIn',
        'mTakaAPP.pages.FundOut',
        'mTakaAPP.pages.PostOffice',
        'mTakaAPP.pages.UnionInfo',
        'mTakaAPP.pages.BankInfo',
        'mTakaAPP.pages.CashIn',
        'mTakaAPP.pages.CashOut',
        'mTakaAPP.pages.Report',
        'mTakaAPP.pages.ActivityLog',
        'mTakaAPP.pages.CusTypeWiseService',
        'mTakaAPP.pages.TransactionRules',
        'mTakaAPP.pages.NftAuthorization',
        'mTakaAPP.pages.FtAuthorization',
        'mTakaAPP.pages.Ledger',
        'mTakaAPP.pages.UtilityServiceBillSetup',
        'mTakaAPP.pages.UtilityServiceBillReceive',
        'mTakaAPP.pages.CommonService',
        'mTakaAPP.pages.UtilityServiceBillReporting',
        'mTakaAPP.pages.TransactionTemplate',
        'mTakaAPP.pages.ReportConfigMaster',
        'mTakaAPP.pages.ReportConfigParam',
        'mTakaAPP.pages.PasswordChange',
        'mTakaAPP.pages.EOD',
        'mTakaAPP.pages.IndPerformanceMonitoring',
        'mTakaAPP.pages.GLChart',
        'mTakaAPP.pages.Organogram',
        'mTakaAPP.pages.ChargeRule',
        'mTakaAPP.pages.AccTypeWiseTarget',
        'mTakaAPP.pages.PerformanceMonitoring',
        'mTakaAPP.pages.TopPerformer',
        'mTakaAPP.pages.FundTransfer',
        'mTakaAPP.pages.PromoCodeConfig',
        'mTakaAPP.pages.UserProfile',
        'mTakaAPP.pages.SpecialOffer',
        'mTakaAPP.pages.Dashboard',
        'mTakaAPP.pages.CommissionSetup',
        'mTakaAPP.pages.FileUpload'
        //,
        //'mTakaAPP.pages.TopPerformerMonitoring'        
    ]).config(routeConfig);

    /** @ngInject */


    // Add Normal Menu Item 

    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
             $urlRouterProvider.otherwise('/authSignIn');

                //baSidebarServiceProvider.addStaticItem(
                //    {
                //        title: 'Dashboard',
                //        stateRef: 'main',
                //        icon: 'ion-android-home',
                //        blank: false,
                //        order: 0
                //    }
                //);

        //baSidebarServiceProvider.addStaticItem(
        //    {
        //        title: 'Account Category',
        //        stateRef: 'AccountCategory',
        //        icon: 'ion-document',
        //        blank: false
        //    },
        //    {
        //        title: 'Account Type',
        //        stateRef: 'AccountType',
        //        icon: 'ion-document',
        //        blank: false
        //    },
        //    {
        //        title: 'Customer Group',
        //        stateRef: 'CustomerGroup',
        //        icon: 'ion-document',
        //        blank: false
        //    },
        //    {
        //        title: 'Customer Type',
        //        stateRef: 'CusType',
        //        icon: 'ion-document',
        //        blank: false
        //    },
        //    {
        //        title: 'DefineService',
        //        stateRef: 'Define Service',
        //        icon: 'ion-document',
        //        blank: false
        //    },
        //    {
        //        title: 'Manager Group',
        //        stateRef: 'ManagerGroup',
        //        icon: 'ion-document',
        //        blank: false
        //    },
        //    {
        //        title: 'Manager Type',
        //        stateRef: 'ManagerType',
        //        icon: 'ion-document',
        //        blank: false
        //    },
        //    {
        //        title: 'KYC',
        //        stateRef: 'KnowYourCustomer',
        //        icon: 'ion-document',
        //        blank: false
        //    },
        //    {
        //        title: 'Channel Profile',
        //        stateRef: 'ChannelAccProfile',
        //        icon: 'ion-document',
        //        blank: false
        //    },
        //       {
        //           title: 'SWSMap',
        //           stateRef: 'StatusWiseService',
        //           icon: 'ion-document',
        //           blank: false
        //       },
        //    {
        //        title: 'Error Log',
        //        stateRef: 'ErrorLog',
        //        icon: 'ion-document',
        //        blank: false
        //    },
        //    {
        //        title: 'Menu Level 1',
        //        icon: 'ion-ios-more',
        //        subMenu: [
        //            {
        //                title: 'Menu Level 1.1',
        //                fixedHref: '404.html',
        //                icon: 'ion-document',
        //                blank: false,
        //                disabled: true
        //            }, {
        //                title: 'Menu Level 1.2',
        //                subMenu: [
        //                    {
        //                        title: 'Menu Level 1.2.1',
        //                        fixedHref: '404.html',
        //                        icon: 'ion-document',
        //                        blank: false,
        //                        disabled: true
        //                    }
        //                ]
        //            }
        //        ]
        //    }

        //);

    }
})();