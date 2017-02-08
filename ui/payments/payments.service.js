define(['service/api'], function () {

    angular.module('PS.payments.service', ['PS.service.api', 'PS.settings.service'])
        .factory('Payment', function (Api) {
            return Api.resource('/payments/:paymentId', null, {
                'update': { method:'PUT' }
            });
        })
        .factory('PaymentMeta', function (Api) {
            return Api.resource('/payments/meta');
        })
        .factory('Payum', function (Settings) {
            return new Payum(Settings.api);
        })
        .factory('PaymentService', function (Payment, Payum, $q) {
            return {
                payments: [],

                add: function (payment) {
                    this.payments.push(payment);
                },
                remove: function (payment) {
                    var self = this;

                    return $q(function (resolve, reject) {

                        Payment.delete({paymentId: payment.id}, function () {
                            self.payments.splice(self.payments.indexOf(payment), 1);
                            resolve(payment);
                        }, reject);
                    });

                },
                removeAll: function () {
                    this.payments.splice(0, this.payments.length);
                },

                getById: function (paymentId) {
                    return $q(function (resolve, reject) {
                        Payment.get({paymentId: paymentId}, function (payment) {
                            resolve(payment.payment);
                        }, reject)
                    });
                },
                sync: function (payment) {
                    var self = this;
                    return this.getById(payment.id).then(function (newPayment) {
                        self.replace(payment, newPayment)
                    });
                },
                replace: function (payment, newPayment) {
                    var idx = this.payments.indexOf(payment);
                    this.payments[idx] = newPayment;
                },
                save: function (payment) {

                    var self = this;

                    return $q(function (resolve, reject) {

                        if(payment.id){
                            //update
                            Payment.update({paymentId: payment.id}, payment, function (payment) {
                                resolve(payment.payment);
                            }, reject)
                        }
                        else
                        {
                            //create
                            Payment.save(payment, function (payment) {
                                resolve(payment.payment);
                            }, reject)
                        }

                    });
                },
                getPayments: function () {

                    var self = this;

                    Payment.get(function (resp) {
                        self.removeAll();
                        _.each(resp.payments, function (payment) {
                            self.add(payment);
                        });
                    });

                    return this.payments;
                },
                createToken: function(token) {
                    return $q(function (resolve, reject) {
                        Payum.token.create(token, function(token) {
                            resolve(token);
                        });
                    });
                },
                executeToken: function(token) {
                    Payum.execute(token.targetUrl, '#payum-container');
                }
            }
        })
    ;

});

