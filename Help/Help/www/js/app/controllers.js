"use strict";

var controllers = angular.module('helpApp.controllers', []);

controllers.controller('loginController', ['$location', '$rootScope', function($location, $rootScope){
	if ($rootScope.user) {
		$location.path("/prof/solicitacoes");
	}
}]);

controllers.controller('logoutController', ['$location', '$rootScope', function($location, $rootScope){
	$rootScope.user = null;
	$location.path("/login");
}]);

controllers.controller('profSolicitacoesController', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location){
	if (!$rootScope.user) {
		$location.path("/login");
	} else {
		$scope.defaultStatus = 1;
	  $scope.load = function () {
	        $scope.solicitacoes = [];
	        $("#dataSol").hide();
	        $("#emptySol").hide();
	        $(".loading").show();
	        $http.get("http://helpserver20160512124409.azurewebsites.net/api/solicitacao").then(function (payload) {
	            var sols = payload.data;
	            if (sols.length) {
								sols.forEach(function (element) {
										if (($scope.defaultStatus == 0 || $scope.defaultStatus == element.status) && element.IdSolicitante == $rootScope.user.id) {
												$scope.solicitacoes.push(element);
										}
								});

	              if ($scope.solicitacoes.length) {
	                    $(".loading").hide();
	                    $("#dataSol").show();
	                    $("#emptySol").hide();
	              } else {
	                    $(".loading").hide();
	                    $("#dataSol").hide();
	                    $("#emptySol").show();
	                }
	            } else {
	                $(".loading").hide();
	                $("#dataSol").hide();
	                $("#emptySol").show();
	            }
	        });
	    };

	    $scope.load();

	    $scope.statusFilter = function (id) {
	        $scope.defaultStatus = id;
	        $scope.load();
	    };
	}

}]);

controllers.controller('profContaController', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
	if (!$rootScope.user) {
		$location.path("/login");
	} else {
		$scope.conta = $rootScope.user;
		$scope.conta.Password = "";
		$scope.conta.ConfirmPassword = "";

		$scope.desativarConta = function () {
			swal({
					title: "Desativar Conta",
					text: "Você tem certeza?",
					type: "warning",
					cancelButtonText: "Não",
					confirmButtonText: "Sim",
					showCancelButton: true
				});
		};

		$scope.salvar = function () {
			$(".loading").show();
			if ($scope.conta.Password === $scope.conta.ConfirmPassword) {
				$rootScope.editarUsuario($scope.conta);
				$(".loading").hide();
				swal({
					title: "Sucesso!",
					text: "Dados alterados.",
					type: "success",
					showConfirmButton: false,
					timer: 2000
				});
				$location.path("/prof/solicitacoes");
			} else {
				$(".loading").hide();
				swal({
					title: "Erro!",
					text: "As senhas informadas não são iguais.",
					type: "error"
				});
			}
		};
	}
}]);

controllers.controller('profSolicitacaoController', ['$scope', 'id', '$http', '$location', '$rootScope', function($scope, id, $http, $location, $rootScope){
	if (!$rootScope.user) {
		$location.path("/login");
	} else {
		$scope.load = function () {
        $("#dataS").hide();
        $("#emptyS").hide();
        $(".loading").show();
        $http.get("http://helpserver20160512124409.azurewebsites.net/api/solicitacao/" + id).then(function (payload) {
            $scope.solicitacao = payload.data;
            $(".loading").hide();
            if ($scope.solicitacao) {
                $("#dataS").show();
                $("#emptyS").hide();
            } else {
                $("#data").hide();
                $("#emptyS").show();
            }
        });
    };

    $scope.load();

		$scope.cancelar = function () {
			$(".loading").show();
			$scope.solicitacao.status = 4;
			$http.put("http://helpserver20160512124409.azurewebsites.net/api/solicitacao/" + $scope.solicitacao.Id).success(function() {
				$(".loading").hide();
				swal({
					title: "Sucesso!",
					text: "Solicitação cancelada.",
					type: "success",
					showConfirmButton: false,
					timer: 2000
				});
				$location.path("/prof/solicitacoes");
			}).error(function() {
				$(".loading").hide();
				swal({
					title: "Erro!",
					text: "Ocorreu um problema. Tente novamente mais tarde.",
					type: "error",
					showConfirmButton: true
				});
			});
		}

		$scope.excluir = function () {
			$(".loading").show();
			$http.delete("http://helpserver20160512124409.azurewebsites.net/api/solicitacao/" + $scope.solicitacao.Id).success(function() {
				$(".loading").hide();
				swal({
					title: "Sucesso!",
					text: "Solicitação excluída.",
					type: "success",
					showConfirmButton: false,
					timer: 2000
				});
				$location.path("/prof/solicitacoes");
			}).error(function() {
				$(".loading").hide();
				swal({
					title: "Erro!",
					text: "Ocorreu um problema. Tente novamente mais tarde.",
					type: "error",
					showConfirmButton: true
				});
			});
		}
	}
}]);

controllers.controller('novaSolicitacaoController', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){
	if (!$rootScope.user) {
		$location.path("/login");
	} else {
		var reload = function () {
			$scope.new = {
				sala: {
					sala: '',
					problemas: {
						VGA: false,
						Som: false,
						Controle: false,
						Energia: false,
						Internet: false,
						Mouse: false,
						Notebook: false,
						Projetor: false
					},
					criticidade: 1,
					obs: {
						comentario: ""
					}
				},
				lab: {
					sala: '',
					problemas: {
						Som: false,
						Energia: false,
						Internet: false,
						Perifericos: false,
						Projetor: false
					},
					criticidade: 1,
					obs: {
						comentario: ""
					}
				}
			};
		};

		reload();

		$scope.showTab = "sala";

		$scope.salvar = function () {
			$(".loading").show();
			if ($scope.showTab == "sala") {
				$scope.new.sala.IdSolicitante = $rootScope.user.id;
				$scope.new.sala.status = 1;
				$scope.new.sala.setor = 1;
				var problemas = [];
				for (var prop in $scope.new.sala.problemas) {
					if (!$scope.new.sala.problemas[prop]) {
						delete $scope.new.sala.problemas[prop];
					} else {
						problemas.push(prop.toString());
					}
				}
				delete $scope.new.sala.problemas;
				$scope.new.sala.problemas = problemas;
				$http.post("http://helpserver20160512124409.azurewebsites.net/api/solicitacao", $scope.new.sala).success(function() {
					$(".loading").hide();
					swal({
						title: "Sucesso!",
						text: "Sua solicitação foi enviada.",
						type: "success",
						showConfirmButton: false,
						timer: 2000
					});
					$location.path("/prof/solicitacoes");
				}).error(function() {
					$(".loading").hide();
					swal({
						title: "Erro!",
						text: "Ocorreu um problema. Tente novamente mais tarde.",
						type: "error",
						showConfirmButton: true
					});
				});
			} else {
				$scope.new.lab.IdSolicitante = $rootScope.user.id;
				$scope.new.lab.status = 1;
				$scope.new.lab.setor = 2;
				var problemas = [];
				for (var prop in $scope.new.lab.problemas) {
					if (!$scope.new.lab.problemas[prop]) {
						delete $scope.new.lab.problemas[prop];
					} else {
						problemas.push(prop.toString());
					}
				}
				delete $scope.new.lab.problemas;
				$scope.new.lab.problemas = problemas;
				$http.post("http://helpserver20160512124409.azurewebsites.net/api/solicitacao", $scope.new.lab).success(function() {
					$(".loading").hide();
					swal({
						title: "Sucesso!",
						text: "Sua solicitação foi enviada.",
						type: "success",
						showConfirmButton: false,
						timer: 2000
					});
					$location.path("/prof/solicitacoes");
				}).error(function() {
					$(".loading").hide();
					swal({
						title: "Erro!",
						text: "Ocorreu um problema. Tente novamente mais tarde.",
						type: "error",
						showConfirmButton: true
					});
				});
			}
		};
	}
}]);

controllers.controller('cadastroController', ['$scope', '$location', '$http', '$timeout', '$rootScope', function($scope, $location, $http, $timeout, $rootScope){
	$scope.user = {
		roles:"Professor",
		nome: "",
		Email: "",
		matricula: "",
		Password: "",
		ConfirmPassword: ""
	};

	$scope.salvar = function () {
		$(".loading").show();
		if ($scope.user.Password === $scope.user.ConfirmPassword) {
		    $http.post("http://helpserver20160512124409.azurewebsites.net/api/account/register", $scope.user).success(function () {
		        $(".loading").hide();
		        swal({
		            title: "Sucesso!",
		            text: "Solicitação de cadastro enviada. Aguarde a aprovação do Administrador.",
		            type: "success",
		            showConfirmButton: false,
		            timer: 3000
		        });
		        $timeout(function () {
		            $location.path("/login");
		        }, 2500);
		    }).error(function () {
		        $(".loading").hide();
		        swal({
		            title: "Erro!",
		            text: "Não foi possível cadastrar o usuário. Tente novamente mais tarde.",
		            type: "error"
		        });
		    });
		} else {
			$(".loading").hide();
			swal({
				title: "Erro!",
				text: "As senhas informadas não são iguais.",
				type: "error"
			});
		}
	};
}]);
