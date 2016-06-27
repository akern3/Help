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
    }, 20000)
}]);

controllers.controller('contasController', ['$scope', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$timeout', '$http', function($scope, DTOptionsBuilder, DTColumnDefBuilder, $timeout, $http){
	$scope.load = function () {
	    $(".loading").show();
	    $http.get("http://helpserver20160512124409.azurewebsites.net/api/account/buscarusuarios").then(function (payload) {
	        $scope.contas = payload.data;
            console.log($scope.contas);
	        $(".loading").hide();
	    });
	}

	$scope.load();

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

controllers.controller('contaController', ['$scope', 'id', '$location', '$http', function($scope, id, $location, $http){
    console.log(id);
    $scope.load = function () {
        $(".loading").show();
        $http.get("http://helpserver20160512124409.azurewebsites.net/api/account/buscarusuarios").then(function (payload) {
            var contas = payload.data;
            contas.forEach(function (element) {
                if (element.id == id) {
                    console.log(element);
                    $scope.conta = element;
                    $scope.conta.senha = "";
                    $scope.conta.confirmacao = "";
                    console.log($scope.conta);
                }
            });
            $(".loading").hide();
            if ($scope.conta) {
                $("#data").show();
                $("#empty").hide();
            } else {
                $("#data").hide();
                $("#empty").show();
            }
        });
    }

    $scope.load();

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

controllers.controller('solicitacaoController', ['$scope', 'id', '$location', '$http', function ($scope, id, $location, $http) {
    $scope.load = function () {
        $("#data").hide();
        $("#empty").hide();
        $(".loading").show();
        $http.get("http://helpserver20160512124409.azurewebsites.net/api/solicitacao/" + id).then(function (payload) {
            $scope.solicitacao = payload.data;
            $(".loading").hide();
            if ($scope.solicitacao.length) {
                $("#data").show();
                $("#empty").hide();
            } else {
                $("#data").hide();
                $("#empty").show();
            }
        });
    };

    $scope.load();
}]);

controllers.controller('cadastroController', ['$scope', '$location', '$http', '$timeout', function($scope, $location, $http, $timeout){
	$scope.user = {
		roles:["Professor"],
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
		            text: "Usuário cadastrado.",
		            type: "success",
		            showConfirmButton: false,
		            timer: 2000
		        });
		        $timeout(function () {
		            $location.path("/contas");
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

controllers.controller('pendentesController', ['$scope', '$http', function ($scope, $http) {
    $scope.pendentes = [];
    $scope.load = function () {
        $("#data").hide();
        $("#empty").hide();
        $(".loading").show();
        $http.get("http://helpserver20160512124409.azurewebsites.net/api/account/buscarusuarios").then(function (payload) {
            var contas = payload.data;
            contas.forEach(function (element) {
                if (!element.acessoAprovado) {
                    $scope.pendentes.push(element);
                }
            });
            console.log($scope.pendentes);
        });
        $(".loading").hide();
        if ($scope.pendentes.length) {
            $("#data").show();
            $("#empty").hide();
        } else {
            $("#data").hide();
            $("#empty").show();
        }
    }
	
    $scope.load();
}]);
