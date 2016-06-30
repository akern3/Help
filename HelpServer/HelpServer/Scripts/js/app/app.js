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
		title: "Contas"
	}).when("/conta/:id", {
	    templateUrl: "Views/Home/views/conta.html",
		controller: "contaController",
		title: "Conta",
    		resolve: {
			    id: function ($route) {
				    return $route.current.params.id;
			}
		}
	}).when("/cadastro", {
	    templateUrl: "Views/Home/views/cadastro.html",
		controller: "cadastroController",
		title: "Novo Usuário"
	}).when("/pendentes", {
	    templateUrl: "Views/Home/views/pendentes.html",
		controller: "pendentesController",
		title: "Cadastros Pendentes"
	}).otherwise({ redirectTo: '/' });
}]);

app.run(["$rootScope", "$location", "$timeout", "$http", function ($rootScope, $location, $timeout, $http) {
	$rootScope.header = "Help!";
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      $rootScope.header = current.$$route.title;
	});

	$rootScope.countSolicitacoes = 0;
    $rootScope.countPendentes = 0;

	$rootScope.isActive = function (route, equals) {
        return equals ? $location.path() == route : $location.path().indexOf(route) === 0;
    };

	$rootScope.user = {
		id: 100,
		nome: "Admin",
        ativo: true,
        Password: "admin",
		roles: ["Administrador"],
		email: "admin@una.br",
		userName: "admin@una.br",
        matricula: 202020
	};

	$rootScope.tecnico = {
	    id: 150,
	    nome: "Tecnico 1",
	    ativo: true,
	    Password: "tec",
	    roles: ["Técnico"],
	    email: "tecnico1@una.br",
	    userName: "tecnico1@una.br",
	    matricula: 121212
	}

	$rootScope.tecnico2 = {
	    id: 150,
	    nome: "Tecnico 2",
	    ativo: true,
	    Password: "tec",
	    roles: ["Técnico"],
	    email: "tecnico2@una.br",
	    userName: "tecnico2@una.br",
	    matricula: 131313
	}

	$rootScope.equipe = [$rootScope.user, $rootScope.tecnico, $rootScope.tecnico2];

	$rootScope.getUsers = function () {
	    $rootScope.users = [];
	    $http.get("http://helpserver20160512124409.azurewebsites.net/api/account/buscarusuarios").then(function (payload) {
	        $rootScope.users = payload.data;
	        if ($rootScope.users.length) {
	            $rootScope.users.forEach(function (user) {
	                if (!user.roles.length) {
	                    user.roles = ["Professor"];
	                }
	            });
	        };
	        $rootScope.users.push($rootScope.user);
	        $rootScope.users.push($rootScope.tecnico);
	        $rootScope.users.push($rootScope.tecnico2);
	    });
	};

	$rootScope.getUsers();

	$rootScope.getUser = function () {
		return $rootScope.user;
	}

	$rootScope.getUserName = function (id) {
	    var name = null;
	    if ($rootScope.users.length) {
	        $rootScope.users.forEach(function (u) {
	            if (u.id == id) {
	                name = u.nome;
	            }
	        });
	        if (name) {
	            return name;
	        } else {
	            return "Não disponível";
	        }
	    } else {
	        return "Não disponível";
	    }
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
}]);
