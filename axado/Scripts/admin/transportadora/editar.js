$(document).ready(function () {
    /* CONFIGURAR DADOS DA TRANSPORTADORA E MASCARAS DO FORMULARIO */
    try {
        $('#cnpj').mask('99.999.999/9999-99');
        $('.telcliente').mask('(99) 99999-9999');
        $('#cnpj').val($('#cnpj').attr('data-cnpj').replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"));
        $('.telcliente').val(formatarTelefone($('.telcliente').attr('data-phone')));
    }
    catch (e) {
        console.log(e.message);
    }

    /* FORMATAR TELEFONE 8 E 9 DIGITOS AO SAIR DO CAMPO */
    try {
        $('.telcliente').on('blur', function () {            
            $(this).val(formatarTelefone($(this).val()));
        });
    }
    catch (e) {
        console.log(e.message);
    }

    /* SALVAR DADOS DA TRANSPORTADORA */
    try {
        $('.btn-salvar').on('click', function () {
            //CONFIGURAR VARIAVEIS E O JSON PARA ENVIAR PARA API
            var name = $('#name').val().trim(),
                company_name = $('#company_name').val().trim(),
                cnpj = $('#cnpj').val().trim().replace(/[\.\-\/]/g, ""),
                phone = $('#phone').val().trim().replace(/([.*+?^$|(){}\[\]\-\s])/mg, ""),
                email = $('#email').val().trim();
                transportadoraId = $('#transportadoraId').val().trim();

            $('#message').addClass('hide');

            if (transportadoraId.length > 0 && name.length > 0 && company_name.length > 0 &&
                cnpj.length > 0 && phone.length > 0 && email.length > 0) {
                var jsonDados = "{";
                jsonDados += "'name': '" + name + "',";
                jsonDados += "'company_name': '" + company_name + "',";
                jsonDados += "'cnpj': '" + cnpj + "',";
                jsonDados += "'phone': '" + phone + "',";
                jsonDados += "'email': '" + email + "',";
                jsonDados += "'cnpjHidden': '" + cnpj + "',";
                jsonDados += "'transportadoraId': '" + transportadoraId + "'";
                jsonDados += "}";

                //EDITAR TRANSPORTADORA E DAR FEEDBACK AO USUARIO
                $.post('/transportadora/editartransportadora/', {
                    json: jsonDados
                })
                .done(function (data) {
                    if (data != null) {
                        data = JSON.parse(data);
                        if (!data.erro) {
                            window.location = '/admin/transportadora/';
                        }
                        else {
                            $('#message').html("<div class='alert alert-danger alert-dismissible' role='alert'>"
                                + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                                + "<span aria-hidden='true'>&times;</span></button>"
                                + "Os dados não foram editados, verifique as informações e tente novamente."
                                + "</div>");
                            $('#message').removeClass('hide');
                        }
                    }
                    else {
                        $('#message').html("<div class='alert alert-danger alert-dismissible' role='alert'>"
                            + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                            + "<span aria-hidden='true'>&times;</span></button>"
                            + "Não foi possível editar as informações."
                            + "</div>");
                        $('#message').removeClass('hide');
                    }
                });
            }
            else {
                $('#message').html("<div class='alert alert-danger alert-dismissible' role='alert'>"
                    + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                    + "<span aria-hidden='true'>&times;</span></button>"
                    + "Todos os campos s&atilde;o obrigat&oacute;rios."
                    + "</div>");
                $('#message').removeClass('hide');
            }

            return false;
        });
    }
    catch (e) {
        console.log(e.message);
    }
});

function formatarTelefone(tel) {
    var last = tel.substr(tel.indexOf("-") + 1);

    if (last.length == 3) {
        var move = tel.substr(tel.indexOf("-") - 1, 1);
        var lastfour = move + last;
        var first = tel.substr(0, 9);

        tel = first + '-' + lastfour;
    }

    return tel;
}