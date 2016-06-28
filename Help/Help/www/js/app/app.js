"use strict";

var app = angular.module("helpApp", [
	"ngRoute",
	"helpApp.controllers",
	"helpApp.services",
	"ng-sweet-alert"
]);

app.config(["$routeProvider", function ($routeProvider) {

    //moment.locale("pt-br");
    //moment.tz.add("America/Sao_Paulo|LMT BRT BRST|36.s 30 20|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-2glwR.w HdKR.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 pTd0 PX0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10 Lz0 1C10 On0 1zd0 Rb0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0");

	$routeProvider.when("/", {
		templateUrl: "login.html",
		controller: "loginController",
		title: "Login"
	}).when("/login", {
		templateUrl: "login.html",
		controller: "loginController",
		title: "Login"
	}).when("/logout", {
		templateUrl: "login.html",
		controller: "logoutController",
		title: "Login"
	}).when("/cadastro", {
		templateUrl: "views/prof/cadastro.html",
		controller: "cadastroController",
		title: "Novo Cadastro"
	}).when("/prof/solicitacoes", {
		templateUrl: "views/prof/solicitacoes.html",
		controller: "profSolicitacoesController",
		title: "Solicitações",
		resolve: {
			solicitacoes: function (helpServices) {
				return helpServices.getSolicitacoes();
			}
		}
	}).when("/prof/menu", {
		templateUrl: "views/prof/menu.html"
	}).when("/prof/solicitacao/:id", {
		templateUrl: "views/prof/solicitacao.html",
		controller: "profSolicitacaoController",
		title: "Solicitação",
		resolve: {
			id: function ($route) {
				return $route.current.params.id;
			}
		}
	}).when("/prof/new", {
		templateUrl: "views/prof/new.html",
		controller: "novaSolicitacaoController",
		title: "Nova Solicitação"
	}).when("/prof/conta", {
		templateUrl: "views/prof/conta.html",
		controller: "profContaController",
		title: "Minha conta"
	}).when("/prof/sobre", {
	    templateUrl: "views/prof/sobre.html",
	    title: "Sobre"
	})
}]);

app.run(["$rootScope", "$location", "$http", function ($rootScope, $location, $http) {
	$rootScope.user = null;
	$rootScope.users = [
		{
			id: 1,
			nome: "João Paulo",
			userName: "joao@prof.una.br",
			role: "Professor",
			matricula: "324570",
			password: "101010"
		},
		{
			id: 2,
			nome: "Ingrid",
			userName: "ingrid@prof.una.br",
			role: "Professor",
			matricula: "321456",
			password: "101010"
		},
		{
			id: 3,
			nome: "Mayara",
			userName: "mayara@prof.una.br",
			role: "Professor",
			matricula: "314590",
			password: "101010"
		},
		{
			id: 4,
			nome: "Guilherme",
			userName: "guilherme@prof.una.br",
			role: "Professor",
			matricula: "31417041",
			password: "101010"
		}
	];

	$rootScope.login = function(obj) {
		$(".loading").show();
		if ($rootScope.user) {
			$(".loading").hide();
			$location.path("/prof/solicitacoes");
		} else {
				if (obj.userName !== '' && obj.password !== '') {
					$rootScope.users.forEach(function(u) {
						if (u.userName == obj.userName && u.password == obj.password) {
							$rootScope.user = u;
						}
					})
					if ($rootScope.user) {
						$(".loading").hide();
						$location.path("/prof/solicitacoes");
					} else {
						$(".loading").hide();
						swal({
							title: "Erro!",
							text: "E-mail ou senha incorretos.",
							type: "error",
							showConfirmButton: true
						});
					}
				} else {
					$(".loading").hide();
					swal({
						title: "Erro!",
						text: "Os campos são obrigatórios.",
						type: "error",
						showConfirmButton: true
					});
				}
			}
	}

	$rootScope.slogan = "Sua solução em poucos cliques.";

	$rootScope.getUser = function () {
		return $rootScope.user;
	}

	$rootScope.getUserName = function (id) {
		return $rootScope.user.nome;
	};

	$rootScope.editarUsuario = function (obj) {
		$rootScope.users.forEach(function(u) {
			if (u.id == obj.id) {
				u = obj;
			}
		});
	};

	$rootScope.getStatus = function(id) {
		switch (id) {
			case 0:
			return "Todos";
			break;

			case 1:
			return "Em aberto";
			break;

			case 2:
			return "Em análise";
			break;

			case 3:
			return "Encerrada";
			break;

			case 4:
			return "Cancelada";
			break;

			default:
			return "";
			break;
		}
	};

	$rootScope.getStatusColor = function(id) {
		switch (id) {
			case 1:
			return "#98FB98";
			break;

			case 2:
			return "#FFFF66";
			break;

			case 3:
			return "#ADD8E6";
			break;

			case 4:
			return "#FF6F6F";
			break;

			default:
			return "";
			break;
		}
	};

	$rootScope.getTipo = function (tipo) {
		switch (tipo) {
			case 1:
			return "Professor";
			break;

			case 2:
			return "Técnico";
			break;

			case 3:
			return "Administrador";
			break;

			default:
			return "";
			break;
		}
	}

	$rootScope.getNivelUrgencia = function (nivel) {
		switch (nivel) {
			case 1:
			return "Baixo";
			break;

			case 2:
			return "Médio";
			break;

			case 3:
			return "Alto";
			break;

			default:
			return "";
			break;
		}
	}

	$rootScope.formatDate = function (date) {
		return moment(date).format("DD/MM/YYYY - HH:mm");
	};

	var history = [];

    $rootScope.$on('$routeChangeSuccess', function() {
        history.push($location.$$path);
    });

    $rootScope.back = function () {
        var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
        $location.path(prevUrl);
    };
}]);
