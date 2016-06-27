"use strict";

var app = angular.module("helpApp", [
	"ngRoute",
	"helpApp.controllers",
	"helpApp.services",
	"datatables",
  "datatables.bootstrap",
	"ng-sweet-alert"
]);

app.config(["$routeProvider", function ($routeProvider) {

    //moment.locale("pt-br");
    //moment.tz.add("America/Sao_Paulo|LMT BRT BRST|36.s 30 20|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-2glwR.w HdKR.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 pTd0 PX0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10 Lz0 1C10 On0 1zd0 Rb0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0");

	$routeProvider.when("/", {
		templateUrl: "Views/Home/views/solicitacoes.html",
		controller: "solicitacoesController",
		title: "Solicitações"
	}).when("/solicitacoes", {
	    templateUrl: "Views/Home/views/solicitacoes.html",
		controller: "solicitacoesController",
		title: "Solicitações"
	}).when("/solicitacao/:id", {
	    templateUrl: "Views/Home/views/solicitacao.html",
		controller: "solicitacaoController",
		title: "Solicitação",
		resolve: {
			id: function ($route) {
				return $route.current.params.id;
			}
		}
	}).when("/contas", {
	    templateUrl: "Views/Home/views/contas.html",
		controller: "contasController",
		title: "Contas",
   		resolve: {
			contas: function (helpServices) {
				return helpServices.getUsers();
			}
		}
	}).when("/conta/:id", {
	    templateUrl: "Views/Home/views/conta.html",
		controller: "contaController",
		title: "Conta",
    		resolve: {
			conta: function (helpServices, $route) {
				return helpServices.getUser($route.current.params.id);
			}
		}
	}).when("/cadastro", {
	    templateUrl: "Views/Home/views/cadastro.html",
		controller: "cadastroController",
		title: "Novo Usuário"
	}).when("/pendentes", {
	    templateUrl: "Views/Home/views/pendentes.html",
		controller: "pendentesController",
		title: "Cadastros Pendentes",
		resolve: {
			pendentes: function (helpServices) {
				return helpServices.getPendentes();
			}
		}
	})
}]);

app.run(["$rootScope", "$location", "$timeout", function ($rootScope, $location, $timeout) {
	$rootScope.header = "Help!";
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      $rootScope.header = current.$$route.title;
   });

	$rootScope.isActive = function (route, equals) {
        return equals ? $location.path() == route : $location.path().indexOf(route) === 0;
    };

	$rootScope.user = {
		id: 2,
		nome: "Admin",
		tipo: 3,
		email: "admin@una.br"
	};

	$rootScope.getUser = function () {
		return $rootScope.user;
	}

	$rootScope.getUserName = function (id) {
		return $rootScope.user.nome;
	};

	$rootScope.getStatus = function(id) {
		switch (id) {
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
		return moment(date * 1000).format("DD/MM/YYYY");
	};

	var history = [];

	/*$rootScope.$on('$routeChangeStart', function () {
	    $timeout(function () {
	        $(".loading").show();
	    }, 300);
	});

    $rootScope.$on('$routeChangeSuccess', function() {
        $timeout(function () {
            $(".loading").hide();
        }, 300);
    });*/
}]);
