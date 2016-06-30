"use strict";

var controllers = angular.module('helpApp.controllers', []);

controllers.controller('solicitacoesController', ['$scope', 'solicitacoes', '$rootScope', function($scope, $rootScope, solicitacoes){
	$rootScope.header = "Solicitações";
	$scope.solicitacoes = solicitacoes;
	console.log($scope.solicitacoes);
}]);

controllers.controller('contaController', ['$scope', '$rootScope', function($scope, $rootScope){
	$rootScope.header = "Gerenciar Conta";
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

controllers.controller('solicitacaoController', ['$scope', 'solicitacao', 'helpServices', '$rootScope', '$location', function($scope, solicitacao, helpServices, $rootScope, $location){
	$rootScope.header = "Solicitação";
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
