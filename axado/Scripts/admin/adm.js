$(document).ready(function(){
	//LOGIN DO USUARIO NO SISTEMA
	$("#btn-entrar").on("click", function(){
        //CAPTURA OS DADOS DO FORMULARIO
	    var email = $("#email").val(), psw = $("#psw").val();
		$('#message').removeClass('hide');

		if (email.length > 0 && psw.length > 0){
		    //PREPARA O JSON PARA ENVIAR OS DADOS PARA A API
		    var jsonDados = "{";
		    jsonDados += "'email': '" + email + "',";
		    jsonDados += "'password': '" + $.md5(psw) + "'";
		    jsonDados += "}";

            //ENVIA OS DADOS PARA A API
		    $.ajax({
	            type: "POST",
	            url: "/login/loginusuario/",
	            async: false,
	            data: {
	                json: jsonDados
	            }
	        }).done(function(data) {
	            //SE USUARIO EXISTE, GRAVA O COOKIE COM AS INFORMACOES DO USUARIO
                //SENAO INFORMA O ERRO AO USUARIO
	            if (!data.erro) {
	                data = JSON.parse(data);
        		    if (data.lista != null) {        		        
        		        $.cookie.raw = true;
        		        $.cookie.json = true;

        		        $.cookie('id', data.lista._id, { expires: 365, path: '/' });
        		        $.cookie('name', data.lista.name, { expires: 365, path: '/' });
        		        $.cookie('cpf', data.lista.cpf, { expires: 365, path: '/' });
        		        $.cookie('email', data.lista.email, { expires: 365, path: '/' });

        		        window.location = '/admin/transportadora/';
        		    }
        		    else {
        		        $('#message').html("<div class='alert alert-danger alert-dismissible' role='alert'>"
                            + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                            + "<span aria-hidden='true'>&times;</span></button>"
                            + "Não foi possível realizar o login, verifique o usuário e a senha."
                            + "</div>");
        		        $('#message').removeClass('hide');
        		    }
        		}
        		else{
                    $('#message').html("<div class='alert alert-danger alert-dismissible' role='alert'>"
                        + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                        + "<span aria-hidden='true'>&times;</span></button>"
                        + "Por favor verifique o usuário e a senha."
                        + "</div>");
        		    $('#message').removeClass('hide');
        		}
	        });
	    }
		else {
		    $('#message').html("<div class='alert alert-danger alert-dismissible' role='alert'>"
                        + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                        + "<span aria-hidden='true'>&times;</span></button>"
                        + "Por favor digite o e-mail e a senha."
                        + "</div>");
		    $('#message').removeClass('hide');
	    }
	});
});