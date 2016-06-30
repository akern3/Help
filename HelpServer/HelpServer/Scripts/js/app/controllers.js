"use strict";

var controllers = angular.module('helpApp.controllers', []);

controllers.controller('solicitacoesController', ['$scope', '$http', '$interval', '$rootScope', function ($scope, $http, $interval, $rootScope) {
    $scope.defaultStatus = 1;
    $scope.load = function () {
        $rootScope.countSolicitacoes = 0;
        $scope.solicitacoes = [];
        $("#dataSol").hide();
        $("#emptySol").hide();
        $(".loading").show();
        $http.get("http://helpserver20160512124409.azurewebsites.net/api/solicitacao").then(function (payload) {
            var sols = payload.data;
            if (sols.length) {
                if ($scope.defaultStatus == 0) {
                    $scope.solicitacoes = sols;
                    $scope.solicitacoes.forEach(function (s) {
                        if (s.status == 1) {
                            $rootScope.countSolicitacoes++;
                        }
                    });
                } else {
                    sols.forEach(function (element) {
                        if ($scope.defaultStatus == element.status) {
                            $scope.solicitacoes.push(element);
                            if ($scope.defaultStatus == 1) {
                                $rootScope.countSolicitacoes++;
                            }
                        }
                    });
                }

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

    $interval(function () {
        $rootScope.countSolicitacoes = 0;
        $scope.load();
    }, 60000)
}]);

controllers.controller('contasController', ['$scope', '$rootScope', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$timeout', '$http', function($scope, $rootScope, DTOptionsBuilder, DTColumnDefBuilder, $timeout, $http){
	$scope.load = function () {
	    $(".loading").show();
	    $http.get("http://helpserver20160512124409.azurewebsites.net/api/account/buscarusuarios").then(function (payload) {
	        $rootScope.users = payload.data;
	        if ($rootScope.users.length) {
	            $rootScope.users.forEach(function (user) {
	                if (!user.roles.length) {
	                    user.roles = ["Professor"];
	                }
	            });
	        };
	        $(".loading").hide();
	    });
	}

	$scope.load();

	$scope.alterarStatus = function (u) {
	    if (u.ativo) {
	        var slug = "Desativar";
	    } else {
	        var slug = "Ativar";
	    }
		swal({
				title: slug + " Conta",
				text: "Você tem certeza?",
				type: "warning",
				cancelButtonText: "Não",
				confirmButtonText: "Sim",
				showCancelButton: true,
		        closeOnConfirm: false
	        }, function() {
	            $rootScope.users.forEach(function (user) {
	                if (user.id == u.id) {
	                    user.ativo = !user.ativo;
	                }
	            });
	            swal({
	                title: "Sucesso!",
	                text: "Status alterado",
	                type: "success",
	                showConfirmButton: false,
	                timer: 2000
	            });
			});
	}

	$scope.excluir = function (u) {
	    swal({
	        title: "Excluir Conta",
	        text: "Você tem certeza? Esta operação é irreversível.",
	        type: "warning",
	        cancelButtonText: "Não",
	        confirmButtonText: "Sim",
	        showCancelButton: true,
	        closeOnConfirm: false
	    }, function () {
	        $rootScope.users.forEach(function (user, i) {
	            if (user.id == u.id) {
	                delete $rootScope.users[i];
	            }
	        });
	        swal({
	            title: "Sucesso!",
	            text: "Usuário removido.",
	            type: "success",
	            showConfirmButton: false,
	            timer: 2000
	        });
	    });
	};

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
    $scope.load = function () {
        $("#dataC").hide();
        $("#emptyC").hide();
        $(".loading").show();
        $http.get("http://helpserver20160512124409.azurewebsites.net/api/account/buscarusuarios").then(function (payload) {
            var contas = payload.data;
            contas.forEach(function (element) {
                if (element.id == id) {
                    $scope.conta = element;
                    $scope.conta.Password = "";
                    $scope.conta.ConfirmPassword = "";
                }
            });
            $(".loading").hide();
            if ($scope.conta) {
                $("#dataC").show();
                $("#emptyC").hide();
            } else {
                $("#dataC").hide();
                $("#emptyC").show();
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
		if ($scope.conta.Password === $scope.conta.ConfirmPassword) {
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

controllers.controller('solicitacaoController', ['$scope', 'id', '$location', '$http', '$rootScope', function ($scope, id, $location, $http, $rootScope) {
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

    $scope.delegate = $rootScope.user.id;
    $scope.done = true;

    $scope.atender = function (id) {
        $(".loading").show();
        $scope.solicitacao.IdResponsavel = id;
        $scope.solicitacao.status = 2;
        $http.put("http://helpserver20160512124409.azurewebsites.net/api/solicitacao/" + $scope.solicitacao.Id, $scope.solicitacao).success(function () {
            $(".loading").hide();
            swal({
                title: "Sucesso!",
                text: "Solicitação em análise.",
                type: "success",
                showConfirmButton: false,
                timer: 2000
            });
            $location.path("/solicitacoes");
        }).error(function () {
            $scope.solicitacao.status = 1;
            $(".loading").hide();
            swal({
                title: "Erro!",
                text: "Ocorreu um problema. Tente novamente mais tarde.",
                type: "error"
            });
        });
    }

    $scope.cancelar = function () {
        $(".loading").show();
        var previouStatus = $scope.solicitacao.status;
        $scope.solicitacao.status = 4;
        $http.put("http://helpserver20160512124409.azurewebsites.net/api/solicitacao/" + $scope.solicitacao.Id, $scope.solicitacao).success(function () {
            $(".loading").hide();
            swal({
                title: "Sucesso!",
                text: "Solicitação cancelada.",
                type: "success",
                showConfirmButton: false,
                timer: 2000
            });
            $location.path("/solicitacoes");
        }).error(function () {
            $scope.solicitacao.status = previousStatus;
            $(".loading").hide();
            swal({
                title: "Erro!",
                text: "Ocorreu um problema. Tente novamente mais tarde.",
                type: "error"
            });
        });
    }

    $scope.encerrar = function () {
        $(".loading").show();
        var previouStatus = $scope.solicitacao.status;
        if ($scope.done) {
            var newStatus = 3;
        } else {
            var newStatus = 1;
        }
        $scope.solicitacao.status = newStatus;
        $http.put("http://helpserver20160512124409.azurewebsites.net/api/solicitacao/" + $scope.solicitacao.Id, $scope.solicitacao).success(function () {
            $(".loading").hide();
            swal({
                title: "Sucesso!",
                text: "Solicitação encerrada.",
                type: "success",
                showConfirmButton: false,
                timer: 2000
            });
            $location.path("/solicitacoes");
        }).error(function () {
            $scope.solicitacao.status = previousStatus;
            $(".loading").hide();
            swal({
                title: "Erro!",
                text: "Ocorreu um problema. Tente novamente mais tarde.",
                type: "error"
            });
        });
    }

    $scope.excluir = function () {
        $(".loading").show();
        $http.delete("http://helpserver20160512124409.azurewebsites.net/api/solicitacao/" + $scope.solicitacao.Id).success(function () {
            $(".loading").hide();
            swal({
                title: "Sucesso!",
                text: "Solicitação excluída.",
                type: "success",
                showConfirmButton: false,
                timer: 2000
            });
            $location.path("/solicitacoes");
        }).error(function () {
            $(".loading").hide();
            swal({
                title: "Erro!",
                text: "Ocorreu um problema. Tente novamente mais tarde.",
                type: "error"
            });
        });
    }
}]);

controllers.controller('cadastroController', ['$scope', '$location', '$http', '$timeout', '$rootScope', function($scope, $location, $http, $timeout, $rootScope){
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
		            $rootScope.getUsers();
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

controllers.controller('pendentesController', ['$scope', '$http', '$timeout', '$interval', '$rootScope', function ($scope, $http, $timeout, $interval, $rootScope) {
    $scope.load = function () {
        $scope.pendentes = [];
        $rootScope.countPendentes = 0;
        $("#dataPend").hide();
        $("#emptyPend").hide();
        $(".loading").show();
        $http.get("http://helpserver20160512124409.azurewebsites.net/api/account/buscarusuarios").then(function (payload) {
            var contas = payload.data;
            contas.forEach(function (element) {
                if (!element.acessoAprovado) {
                    $scope.pendentes.push(element);
                }
            });
            $(".loading").hide();
            if ($scope.pendentes.length) {
                $rootScope.countPendentes = $scope.pendentes.length;
                $("#dataPend").show();
                $("#emptyPend").hide();
            } else {
                $("#dataPend").hide();
                $("#emptyPend").show();
            }
        });
    }
	
    $scope.load();

    $scope.aprovarCadastro = function (id) {
        if (id) {
            $(".loading").show();
            $http.patch("http://helpserver20160512124409.azurewebsites.net/api/Account/AprovarUsuario?id=" + id + "&aprovado=" + true).success(function () {
                $(".loading").hide();
                swal({
                    title: "Sucesso!",
                    text: "Cadastro aprovado.",
                    type: "success",
                    showConfirmButton: false,
                    timer: 1200
                });
                $timeout(function () {
                    $scope.load();
                }, 1500);
            }).error(function () {
                $(".loading").hide();
                swal({
                    title: "Erro!",
                    text: "Não foi possível aprovar o cadastro. Tente novamente mais tarde.",
                    type: "error"
                });
            });
        }
    }

    $interval(function () {
        $rootScope.countPendentes = 0;
        $scope.load();
    }, 100000)
}]);
