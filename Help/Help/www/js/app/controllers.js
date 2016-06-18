"use strict";

var controllers = angular.module('helpApp.controllers', []);

controllers.controller('profSolicitacoesController', ['$scope', 'solicitacoes', function($scope, solicitacoes){
	$scope.solicitacoes = solicitacoes;
	console.log($scope.solicitacoes);
}]);

controllers.controller('profContaController', ['$scope', '$rootScope', function($scope, $rootScope){
	$scope.conta = $rootScope.getUser();
	$scope.conta.senha = "";
	$scope.conta.confirmacao = "";
	console.log($scope.conta);

	$scope.desativarConta = function () {
		swal({
				title: "Desativar Conta",
				text: "Você tem certeza?",
				type: "warning",
				cancelButtonText: "Não",
				confirmButtonText: "Sim",
				showCancelButton: true
			});
	}
}]);

controllers.controller('profSolicitacaoController', ['$scope', 'solicitacao', 'helpServices', '$location', function($scope, solicitacao, helpServices, $location){
	$scope.solicitacao = solicitacao;
	console.log($scope.solicitacao);

	$scope.cancelar = function (obj) {
		$(".loading").show();
		var ret = helpServices.cancelarSolicitacao(obj);
		if (ret) {
			$(".loading").hide();
			swal({
				title: "Sucesso!",
				text: "Solicitação cancelada.",
				type: "success",
				showConfirmButton: false,
				timer: 3000
			});
			$location.path("/prof/solicitacoes");
		} else {
			$(".loading").hide();
			swal({
				title: "Erro!",
				text: "Ocorreu um problema. Tente novamente mais tarde.",
				type: "error",
				showConfirmButton: true
			});
		}
	}
}]);

controllers.controller('novaSolicitacaoController', ['$scope', 'helpServices', '$location', '$rootScope', function($scope, helpServices, $location, $rootScope){
	var reload = function () {
		$scope.new = {
			sala: {
				numero: '',
				motivo: {
					VGA: false,
					Som: false,
					Controle: false,
					Energia: false,
					Internet: false,
					Mouse: false,
					Notebook: false,
					Projetor: false
				},
				nivel_urgencia: 1,
				obs: {
					comentario: ""
				}
			},
			lab: {
				numero: '',
				motivo: {
					Som: false,
					Energia: false,
					Internet: false,
					Perifericos: false,
					Projetor: false
				},
				nivel_urgencia: 1,
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
			$scope.new.sala.usuario_id = $rootScope.user.id;
			$scope.new.sala.status = 1;
			$scope.new.sala.local = "Sala";
			var motivos = [];
			for (var prop in $scope.new.sala.motivo) {
				if (!$scope.new.sala.motivo[prop]) {
					delete $scope.new.sala.motivo[prop];
				} else {
					motivos.push(prop.toString());
				}
			}
			delete $scope.new.sala.motivo;
			$scope.new.sala.motivo = motivos;
			helpServices.salvarSolicitacao($scope.new.sala);
		} else {
			$scope.new.lab.usuario_id = $rootScope.user.id;
			$scope.new.lab.status = 1;
			$scope.new.lab.local = "Laboratório";
			var motivos = [];
			for (var prop in $scope.new.lab.motivo) {
				if (!$scope.new.lab.motivo[prop]) {
					delete $scope.new.lab.motivo[prop];
				} else {
					motivos.push(prop.toString());
				}
			}
			delete $scope.new.lab.motivo;
			$scope.new.lab.motivo = motivos;
			helpServices.salvarSolicitacao($scope.new.lab);
		}
		$(".loading").hide();
		swal({
			title: "Sucesso!",
			text: "Sua solicitação foi enviada.",
			type: "success",
			showConfirmButton: false,
			timer: 2000
		});
		reload();
		$location.path ("/");
	};
}]);
