$(document).ready(function () {
    /* HABILITAR MASCARA TELEFONE E CNPJ */
    try {
		$('#cnpj').mask('99.999.999/9999-99');
		$('.telcliente').mask('(99) 999999-9999');
	}
    catch (e) {
        console.log(e.message);
    }

	/* FORMATAR TELEFONE 8 E 9 DIGITOS AO SAIR DO CAMPO */
	try{
		$('.telcliente').on('blur', function() {
		    var last = $(this).val().substr( $(this).val().indexOf("-") + 1 );

		    if( last.length == 3 ) {
		        var move = $(this).val().substr( $(this).val().indexOf("-") - 1, 1 );
		        var lastfour = move + last;
		        var first = $(this).val().substr( 0, 9 );

		        $(this).val( first + '-' + lastfour );
		    }
		});
	}
    catch (e) {
        console.log(e.message);
    }

    /* SALVAR TRANSPORTADORA */
    try {
        $('.btn-salvar').on('click', function () {
            //PREPARAR OS DADOS RETIRANDO AS MASCARAS
            var name = $('#name').val().trim(),
                company_name = $('#company_name').val().trim(),
                cnpj = $('#cnpj').val().trim().replace(/[\.\-\/]/g, ""),
                phone = $('#phone').val().trim().replace(/([.*+?^$|(){}\[\]\-\s])/mg, ""),
                email = $('#email').val().trim();

            $('#message').addClass('hide');

            if (name.length > 0 && company_name.length > 0 &&
                cnpj.length > 0 && phone.length > 0 && email.length > 0) {
                //MONTAR JSON PARA ENVIAR OS DADOS PARA A API
                var jsonDados = "{";
                jsonDados += "'name': '" + name + "',";
                jsonDados += "'company_name': '" + company_name + "',";
                jsonDados += "'cnpj': '" + cnpj + "',";
                jsonDados += "'phone': '" + phone + "',";
                jsonDados += "'email': '" + email + "'";
                jsonDados += "}";

                /* SALVAR DADOS DA TRANSPORTADORA */
                $.post('/transportadora/salvar/', {
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
                                + "Os dados n&atilde;o foram salvos, verifique as informa&ccedil;&oacute;es e tente novamente."
                                + "</div>");
                            $('#message').removeClass('hide');
                        }
                    }
                    else {
                        $('#message').html("<div class='alert alert-danger alert-dismissible' role='alert'>"
                            + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                            + "<span aria-hidden='true'>&times;</span></button>"
                            + "Não foi possível salvar as informa&ccedil;&oacute;es."
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