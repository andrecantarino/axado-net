$(document).ready(function () {
    /* FORMATAR CNPJ DAS TRANSPORTADORAS */
    try {
        $('.td-cnpj').each(function (i) {
            var cnpj = $(this).html().replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
            $(this).html(cnpj);
        });
    }
    catch (e) {
        console.log(e.message);
    }

    /* DELETAR TRANSPORTADORA */
    try {
        $('body').on('click', '.btn-delete', function () {
            var cnpj = $(this).data('cnpj'), btn = $(this);
            $('#message').addClass('hide');

            $.post('/transportadora/DeletarTransportadora/', {
                cnpj: cnpj
            })
            .done(function (data) {
                if (data != null) {
                    if (!data.erro) {
                        btn.closest('tr').remove();
                        $('#message').html("<div class='alert alert-success alert-dismissible' role='alert'>"
                            + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                            + "<span aria-hidden='true'>&times;</span></button>"
                            + "A Transportadora foi deletada com sucesso!"
                            + "</div>");
                        $('#message').removeClass('hide');
                    }
                }
            })
            .fail(function (error, statusError) {
                $('#message').html("<div class='alert alert-danger alert-dismissible' role='alert'>"
                    + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                    + "<span aria-hidden='true'>&times;</span></button>"
                    + "Ocorreu um erro ao deletar a transportadora."
                    + "</div>");
                $('#message').removeClass('hide');
            });
        });
    }
    catch (e) {
        console.log(e.message);
    }

    /* BUSCAR TRANSPORTADORA */
    try {
        $('.btn-buscar').on('click', function () {
            //ENVIAR PARAMETRO DE BUSCA PARA A API
            var q = $('#q').val();
            $('#message').addClass('hide');
            $.post('/transportadora/BuscarTransportadora/', {
                q: q
            })
            .done(function (data) {
                var html = "", j = 1;
                if (data != null) {
                    data = JSON.parse(data);
                    if (!data.erro) {
                        //IMPRIMIR O RESULTADO 
                        for (var i = 0; i < data.lista.length; i++) {
                            html += "<tr>"
                                + "<td>" + data.lista[i].name + "</td>"
                                + "<td class='td-cnpj'>" + data.lista[i].cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") + "</td>"
                                + "<td>"
                                + "<select id=\"tr-" + data.lista[i].cnpj + "\" class=\"rating\" data-cnpj=\"" + data.lista[i].cnpj + "\">"
                                + "<option value=\"1\">1</option>"
                                + "<option value=\"2\">2</option>"
                                + "<option value=\"3\">3</option>"
                                + "<option value=\"4\">4</option>"
                                + "<option value=\"5\">5</option>"
                                + "</select>"
                                + "</td>"
                                + "<td>"
                                + "<a href=\"/admin/transportadora/detalhe/" + data.lista[i].cnpj + "\" class=\"btn btn-primary btn-sm\">Detalhes</a>"
                                + "<a href=\"/admin/transportadora/editar/" + data.lista[i].cnpj + "\" class=\"btn btn-primary btn-sm\">Editar</a>"
                                + "<span class=\"btn btn-primary btn-sm btn-delete\" data-cnpj=" + data.lista[i].cnpj + ">Deletar</span>"
                                + "</td>"
                                + "</tr>";
                            j++;
                        }
                        $('.tbody-transportadora').html(html);

                        /* BIND NAS ESTRELAS QUE DAO CLASSIFICASSAO PARA A TRANSPORTADORA */
                        $('.rating').barrating({
                            theme: 'fontawesome-stars',
                            onSelect: function (value, text, event) {
                                if (typeof (event) !== 'undefined') {
                                    var cnpj = $(this)[0].$elem.attr("data-cnpj").replace(/[\.\-\/]/g, "");
                                    var jsonDados = "{";
                                    jsonDados += "'cpf': '" + $.cookie("cpf") + "',";
                                    jsonDados += "'cnpj': '" + cnpj + "',";
                                    jsonDados += "'rating': '" + value + "'";
                                    jsonDados += "}";
                                    
                                    //EVENTO QUE IRA ENVIAR PARA API A AVALIACAO DO USUARIO
                                    $.ajax({
                                        type: "POST",
                                        url: "/admin/transportadora/avaliar",
                                        data: {
                                            json: jsonDados
                                        }
                                    }).done(function (data) {
                                        if (!data.erro) {
                                            $('#tr-' + cnpj).barrating('readonly', true);
                                        }
                                        else {
                                            $('#message').html("<div class='alert alert-danger alert-dismissible' role='alert'>"
                                                + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                                                + "<span aria-hidden='true'>&times;</span></button>"
                                                + "Não foi possível salvar sua avaliação."
                                                + "</div>");
                                            $('#message').removeClass('hide');                                            
                                        }
                                    });
                                }
                            }
                        });

                        /* PREENCHER O PARAMETRO QUE CONTROLA QUAIS TRANSPORTADORAS FORAM AVALIADAS */
                        if ($('#hd-lista').val().length > 0) {
                            var cnpj = $('#hd-lista').val().split(';'), cn = '', rt = '';

                            for (var i = 0; i < cnpj.length; i++) {
                                if (cnpj[i].length > 0) {
                                    cn = cnpj[i].split('|')[0];
                                    rt = cnpj[i].split('|')[1];

                                    $('#tr-' + cn).barrating('set', rt);
                                    $('#tr-' + cn).barrating('readonly', true);
                                }
                            }
                        }
                    }
                }
            })
            .fail(function (error, statusError) {
                $('#message').html("<div class='alert alert-danger alert-dismissible' role='alert'>"
                    + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                    + "<span aria-hidden='true'>&times;</span></button>"
                    + "Não foi possível buscar a transportadora."
                    + "</div>");
                $('#message').removeClass('hide');
            });
        });
    }
    catch (e) {
        console.log(e.message);
    }

    /* BUSCAR TRANSPORTADORA (KEYPRESS) */
    $('#q').keypress(function (e) {
        var tecla = (e.keyCode ? e.keyCode : e.which);
        if (tecla == 13) {
            $('.btn-buscar').trigger('click');
        }
    });

    /* CLASSIFICAR TRANSPORTADORA */
    try {
        $('.rating').barrating({
            theme: 'fontawesome-stars',
            onSelect: function (value, text, event) {
                if (typeof (event) !== 'undefined') {
                    var cnpj = $(this)[0].$elem.attr("data-cnpj").replace(/[\.\-\/]/g, "");
                    var jsonDados = "{";
                    //PREENCHER JSON PARA ENVIAR AVALIACAO PARA API
                    jsonDados += "'cpf': '" + $.cookie("cpf").replace(/[\.\-\/]/g, "") + "',";
                    jsonDados += "'cnpj': '" + cnpj + "',";
                    jsonDados += "'rating': '" + value + "'";
                    jsonDados += "}";
                    $('#message').addClass('hide');

                    //AVALIAR TRANSPORTADORA
                    $.ajax({
                        type: "POST",
                        url: "/admin/transportadora/avaliar",
                        data: {
                            json: jsonDados
                        }
                    }).done(function (data) {
                        if (!data.erro) {
                            $('#tr-' + cnpj).barrating('readonly', true);

                            $('#message').html("<div class='alert alert-success alert-dismissible' role='alert'>"
                                + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                                + "<span aria-hidden='true'>&times;</span></button>"
                                + "Sua avaliação foi feita com sucesso!"
                                + "</div>");
                            $('#message').removeClass('hide');
                        }
                        else {
                            $('#message').html("<div class='alert alert-danger alert-dismissible' role='alert'>"
                                + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                                + "<span aria-hidden='true'>&times;</span></button>"
                                + "Não foi possível salvar sua avaliação."
                                + "</div>");
                            $('#message').removeClass('hide');
                        }
                    });
                }
            }
        });
    }
    catch (e) {
        console.log(e.message);
    }

    /* DESATIVAR CLASSIFICACAO */
    try {
        //PERCORRER PARAMETRO DE CONTROLE DAS TRANSPORTADORAS AVALIADAS,
        //ATRAVES DA JUNCAO CNPJ-NOTA IRA DESATIVAR O AS ESTRELAS QUE POSSIBILITAM A CLASSIFICACAO
        if ($('#hd-lista').val().length > 0) {
            var cnpj = $('#hd-lista').val().split(';'), cn = '', rt = '';

            for (var i = 0; i < cnpj.length; i++) {
                if (cnpj[i].length > 0) {
                    cn = cnpj[i].split('|')[0];
                    rt = cnpj[i].split('|')[1];

                    $('#tr-' + cn).barrating('set', rt);
                    $('#tr-' + cn).barrating('readonly', true);
                }
            }
        }
    }
    catch (e) {
        console.log(e.message);
    }

    /* 
        BUSCAR TODAS AVALIACOES FEITAS PELO USUARIO 
        A JUNCAO ENTRE CNPJ-NOTA SERVE DE PARAMETRO 
        PARA DESATIVAR AS CLASSFIFICACOES FEITAS PELO USUARIO
    */
    try {
        $.post('/admin/transportadora/BuscarAvaliacao/', {
            cpf: $.cookie("cpf")
        })
        .done(function (data) {
            var dt = "";
            if (data != null) {
                data = JSON.parse(data);
                if (!data.erro) {
                    for (var i = 0; i < data.lista.length; i++) {
                        dt += data.lista[i].cnpj + '|' + data.lista[i].rating + ';';
                        $('#tr-' + data.lista[i].cnpj).barrating('set', data.lista[i].rating);
                        $('#tr-' + data.lista[i].cnpj).barrating('readonly', true);
                    }
                    dt = dt.substring(0, dt.length - 1);
                    $('#hd-lista').val(dt);
                }
            }
        });
    }
    catch (e) {
        console.log(e.message);
    }
});