"use strict";

var services = angular.module('helpApp.services', []);

services.factory('helpServices', function($rootScope, $http) {
	var solicitacoes = [
	{
		id: 1,
		usuario_id:  1,
		local: "Sala",
		numero: 335,
		motivo: [
			"VGA", "Som", "Energia"
		],
		data: 1457751600,
		nivel_urgencia: 1,
		status: 1,
		obs: [{
			id: 3,
			comentario: "Projetor com mau contato",
			usuario_id: 1
		}]
	},
	{
		id: 2,
		usuario_id:  1,
		local: "Sala",
		numero: 320,
		motivo: [
			"Projetor", "Mouse"
		],
		data: 1458010800,
		nivel_urgencia: 2,
		status: 1,
		obs: [{
			id: 1,
			comentario: "Sala sem acesso à internet",
			usuario_id: 1
		}]
	},
	{
		id: 3,
		usuario_id:  1,
		local: "Laboratório",
		numero: 350,
		motivo: [
			"Internet", "Periféricos"
		],
		data: 1458442800,
		nivel_urgencia: 3,
		status: 2,
		obs: [{
			id: 1,
			comentario: "A marioria dos Mouse's não está funcionando.",
			usuario_id: 1
		}]
	},
	{
		id: 4,
		usuario_id:  1,
		local: "Laboratório",
		numero: 324,
		motivo: [
			"Energia", "Internet"
		],
		data: 1458442800,
		nivel_urgencia: 3,
		status: 3,
		obs: [{
			id: 1,
			comentario: "A energia caiu e a internet não voltou desde então.",
			usuario_id: 1
		}]
	}];

	var users = [
		{
			id: 1,
			status: 1,
			name: "Guilherme",
			email: "guilherme@prof.una.br",
			matricula: 11111,
			tipo: 1
		},
		{
			id: 2,
			status: 1,
			name: "Admin",
			email: "admin@una.br",
			matricula: 22222,
			tipo: 3
		},
		{
			id: 3,
			status: 1,
			name: "João",
			email: "joao@una.br",
			matricula: 33333,
			tipo: 2
		},
		{
			id: 4,
			status: 2,
			name: "Maria",
			email: "maria@prof.una.br",
			matricula: 444444,
			tipo: 1
		},
		{
			id: 5,
			status: 1,
			name: "Fulano",
			email: "fulano@una.br",
			matricula: 555555,
			tipo: 2
		},
		{
			id: 6,
			status: 0,
			name: "João Sem Braço",
			email: "joao@hotmail.com",
			matricula: 66123123,
			tipo: 1
		},
		{
			id: 7,
			status: 0,
			name: "Will Smith",
			email: "willsmith@prof.una.br",
			matricula: 9090990,
			tipo: 1
		}
	];

	return {
		getSolicitacoes: function () {
		    $http.get("http://helpserver20160512124409.azurewebsites.net/api/solicitacao").then(function (payload) {
		        return payload;
		    });
		},
		getSolicitacao: function (id) {
			var ret = null;
			solicitacoes.forEach(function(s) {
				if (s.id == id) {
					ret = s;
				}
			});
			return ret;
		},
		cancelarSolicitacao: function (obj) {
			var hasChanged = false;
			console.log(obj);
			angular.forEach(solicitacoes, function (s) {
				if (s.id ==obj.id) {
					s.status = 4;
					hasChanged = true;
				}
			}) ;
			return hasChanged;
		},
		getUsers: function () {
			 return users.filter(function (u) {
			 	return u.status !== 0;
			 });
		},
		getUser: function (id) {
			var ret = null;
			users.forEach(function(s) {
				if (s.id == id) {
					ret = s;
				}
			});
			return ret;
		},
		novoUsuario: function (obj) {
			var id = users.length + 1;
			obj.id = id;
			users.unshift(obj);
		},
		editarusuario: function (obj) {
			var ret = null;
			users.forEach(function(s) {
				if (s.id == obj.id) {
					s = obj;
				}
			});
			if (ret) {
				return true;
			} else {
				return false;
			}
		},
		getPendentes: function () {
			return users.filter(function (u) {
				return u.status === 0;
			});
		}
	}
});
