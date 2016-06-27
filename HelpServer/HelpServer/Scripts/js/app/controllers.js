"use strict";

var controllers = angular.module('helpApp.controllers', []);

controllers.controller('solicitacoesController', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
    
    $scope.load = function () {
        $(".loading").show();
        $http.get("http://helpserver20160512124409.azurewebsites.net/api/solicitacao").then(function (payload) {
            $scope.solicitacoes = payload.data;
            console.log($scope.solicitacoes);
            $(".loading").hide();
        });
    };

    $scope.load();

    $interval(function () {
        $scope.load();
    }, 30000)
}]);

controllers.controller('contasController', ['$scope', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'helpServices', '$timeout', function($scope, DTOptionsBuilder, DTColumnDefBuilder, helpServices, $timeout){
	$scope.contas = helpServices.getUsers();
	console.log($scope.contas);

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

	$scope.dtOptions = DTOptionsBuilder.newOptions()
        .withBootstrap()
        .withLanguage({
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "_START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        })
        .withOption("scrollX", "100%")
        .withOption("order", [[1, "asc"]])
        .withOption("colVis", {
            "fnStateChange": function () {
                $scope.dtInstance.dataTable.fnAdjustColumnSizing(true);
            }
        });

    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5)
    ];

    $scope.tableTrue = function () {
        $timeout(function () {
            if ($scope.dtInstance) {
                $scope.dtInstance.dataTable.fnAdjustColumnSizing(false);
            }

            setTimeout(function () {
                $(window).resize();
            }, 50);
        });
    };

    $scope.tableTrue();

    $scope.dtInstanceCallback = function (dtInstance) {
        $scope.dtInstance = dtInstance;
    };
}]);

controllers.controller('contaController', ['$scope', 'conta', '$location', 'helpServices', function($scope, conta, $location, helpServices){
	$scope.conta = conta;
	$scope.conta.senha = "";
	$scope.conta.confirmacao = "";
	console.log($scope.conta);

	$scope.excluirConta = function () {
		swal({
				title: "Excluir Conta",
				text: "Você tem certeza? Essa operação é irreversível",
				type: "warning",
				cancelButtonText: "Não",
				confirmButtonText: "Sim",
				showCancelButton: true
			});
	}

	$scope.salvar = function () {
		$(".loading").show();
		if ($scope.conta.senha === $scope.conta.confirmacao) {
			helpServices.editarusuario($scope.conta);
			$(".loading").hide();
			swal({
				title: "Sucesso!",
				text: "Usuário cadastrado.",
				type: "success",
				showConfirmButton: false,
				timer: 2000
			});
			$location.path ("/contas");
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

controllers.controller('solicitacaoController', ['$scope', 'solicitacao', 'helpServices', '$location', function($scope, solicitacao, helpServices, $location){
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
			$location.path("/solicitacoes");
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

controllers.controller('cadastroController', ['$scope', 'helpServices', '$location', function($scope, helpServices, $location){
	$scope.user = {
		tipo: 1,
		nome: "",
		email: "",
		matricula: "",
		senha: "",
		confirmacao: ""
	};
	
	$scope.salvar = function () {
		$(".loading").show();
		if ($scope.user.senha === $scope.user.confirmacao) {
			helpServices.novoUsuario($scope.user);
			$(".loading").hide();
			swal({
				title: "Sucesso!",
				text: "Usuário cadastrado.",
				type: "success",
				showConfirmButton: false,
				timer: 2000
			});
			$location.path ("/contas");
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

controllers.controller('pendentesController', ['$scope', 'pendentes', 'helpServices', function($scope, pendentes, helpServices){
	$scope.pendentes = pendentes;
	console.log($scope.pendentes);
}]);
