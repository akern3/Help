"use strict";

var services = angular.module('helpApp.services', []);

services.factory('helpServices', function($rootScope) {
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

	return {
		getSolicitacoes: function () {
			return solicitacoes;
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
		salvarSolicitacao: function (obj) {
			var id = solicitacoes.length + 1;
			obj.id = id;
			if (obj.obs.comentario != "") {
				var comm = obj.obs.comentario;
				delete obj.obs;
				obj.obs = [];
				obj.obs.push({
					comentario: comm,
					usuario_id: $rootScope.user.id
				});
			} else {
				delete obj.obs;
				obj.obs = [];
			}
			obj.data = 15431230100;
			solicitacoes.unshift(obj);
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
		}
	}
});
