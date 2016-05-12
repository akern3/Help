'use strict';

$(function () {

    var usuarios = [
        {
            'id': '1',
            'nome': 'José das Couves',
            'email': 'jose@prof.una.br',
            'matricula': '12131415',
            'senha': 'jose',
            'tipo': 'professor'
        },
        {
            'id': '2',
            'nome': 'Fulano',
            'email': 'fulano@prof.una.br',
            'matricula': '12345677',
            'senha': 'fulano',
            'tipo': 'professor'
        },
        {
            'id': '3',
            'nome': 'Guilherme',
            'email': 'guilherme@prof.una.br',
            'matricula': '88884444',
            'senha': 'guilherme',
            'tipo': 'professor'
        }
    ];

    var solicitacoes = [
        {
            'id': '1',
            'local': 'sala',
            'num_sala': '325',
            'motivos': ['vga', 'internet', 'mouse'],
            'nivel_urgencia': '2',
            'observacao': 'O mouse não está funcionando de forma alguma. O cabo VGA está com mau contato',
            'status_id': '1',
            'usuario_id': '2'
        },
        {
            'id': '2',
            'local': 'lab',
            'num_sala': '335',
            'motivos': ['perifericos'],
            'nivel_urgencia': '1',
            'observacao': 'Dois teclados não estão funcionando.',
            'status_id': '1',
            'usuario_id': '2'
        },
        {
            'id': '3',
            'local': 'sala',
            'num_sala': '315',
            'motivos': ['projetor', 'notebook'],
            'nivel_urgencia': '3',
            'observacao': 'O projetor não está ligando, e preciso também de um notebook para dar a aula.',
            'status_id': '1',
            'usuario_id': '1'
        },
        {
            'id': '4',
            'local': 'lab',
            'num_sala': '312',
            'motivos': ['som'],
            'nivel_urgencia': '1',
            'observacao': 'Preciso de uma caixa de som.',
            'status_id': '1',
            'usuario_id': '1'
        },
        {
            'id': '5',
            'local': 'sala',
            'num_sala': '215',
            'motivos': ['controle'],
            'nivel_urgencia': '2',
            'observacao': 'Preciso de um controle para o datashow.',
            'status_id': '1',
            'usuario_id': '3'
        },
        {
            'id': '6',
            'local': 'lab',
            'num_sala': '324',
            'motivos': ['vga', 'internet', 'mouse'],
            'nivel_urgencia': '2',
            'observacao': 'O mouse não está funcionando de forma alguma. O cabo VGA está com mau contato',
            'status_id': '1',
            'usuario_id': '3'
        },
    ];

    var status = [
        {
            'id': '1',
            'nome': 'Em aberto',
            'cor': '#42A342'
        },
        {
            'id': '2',
            'nome': 'Em análise',
            'cor': '#FFFF4C'
        },
        {
            'id': '3',
            'nome': 'Encerrado',
            'cor': '#ADD8E6'
        },
        {
            'id': '4',
            'nome': 'Cancelado',
            'cor': '#CD5C5C'
        },
    ];

    var user = null;

    $("#loginForm").submit(function (event) {
        var inputs = $('#loginForm :input');

        var values = {};
        inputs.each(function () {
            if ($(this).val() != '') {
                values[this.name] = $(this).val();
            } else {
                window.alert("Insira seu e-mail/senha.");
            }
        });

        var user = _.findWhere(usuarios, { email: values.email, senha: values.senha });
        console.log(user);

        if (user) {
            carregarSolicitacoes(user);
        } else {
            window.alert("E-mail ou senha incorretos");
        }

        event.preventDefault();
    });

    var carregarSolicitacoes = function(user) {
        var sol = _.where(solicitacoes, { usuario_id: user.id });
        var _solicitacoes = sol;
        console.log("solicitacoes: " + _solicitacoes);
        $("#listaSolicitacoes").html("");
        sol.forEach(function (s) {
            var _status = _.findWhere(status, { id: s.status_id });
            var st = _status;
            console.log("status: " + st);
            var append = '<a href="solicitacao.html/' + s.id + '">' +
            '<div class="solicitacao">' +
                '<span class="item"><label>Nome: </label>' + user.name + '</span>' +
                '<span class="item"><label>Sala: </label>' + s.num_sala + '</span>' +
                '<span class="item"><label>Motivo(s): </label>' + s.motivos.toString() + '</span>' +
                '<span class="item"><label>Status: </label>' + st.name + '</span>' +
            '</div>' +
        '</a>';
            $("#listaSolicitacoes").append(append);
        });
        window.location.href = "professor/lista_solicitacoes.html";
    }
});