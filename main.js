var listaContatos = [];
var posAlteracao = '';

function adicionarContato(nomeContato, telContato, lista) {
	lista.push([nomeContato, telContato]);	
}

function montarTabela(lista) {
	var html = '';
	for (var linha = 0; linha < lista.length; linha++) {
		html += '<tr>';
		for (var c = 0; c < lista[linha].length; c++) {
			html += '<td>'+ lista[linha][c] +'</td>';
		}
		html += '<td><button id="btAlterar" rel="'+ linha +
			    '" class="btn btn-warning">Alterar</button></td>';		
		html += '<td><button id="btExcluir" rel="'+ linha +
			    '" class="btn btn-danger">Excluir</button></td>';				
		html += '</tr>';
	}
	return html;
}

function limparContatos() {
	listaContatos = [];
}

function excluirContato(lista, pos) {
	lista.splice(pos, 1);
}

function alterarContato(nomeContato, telContato, lista, pos) {
	lista[pos][0] = nomeContato;
	lista[pos][1] = telContato;
}

function limparCampos(){
	document.getElementById('nome').value=''
	document.getElementById('email').value=''
}

function checkMail(mail){  
	if (mail.value=='')
		return false
	var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);	
	if(typeof(mail) == "string"){
		if(er.test(mail)){ return true; }
		return false;
	}else if(typeof(mail) == "object"){
		if(er.test(mail.value)){
			return true; 
		}
		return false;
	}else{
		return false;
	}
}

function checkName(name){
	if (name=='')
		return false
	name = document.getElementById('nome').value.split(/[a-zA-Z\u00C0-\u00FF ]+/i).filter(item=>item);
	if (name.length==0)
		return true
	else
		return false
}


window.onload = function() {	
	document.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
		  event.preventDefault();
		  document.getElementById("btSalvar").click();
		}
	  });

	document.addEventListener('click', function(evento) {
		var elemento = evento.target || evento.SrcElement;
		
		switch(elemento.id) {
			case 'btSalvar':
				var btn = document.getElementById("btSalvar");
				btn.innerText = 'ASSINAR';
				var nome = document.getElementById('nome').value;
				var email = document.getElementById('email').value;
				// var nom = nome.split(/[a-zA-Z\u00C0-\u00FF ]+/i).filter(item=>item);
				//tudo valido
				if (checkName(nome) &&  checkMail(email)) {					
					if (posAlteracao != '') {						
						alterarContato(nome,  email, listaContatos, posAlteracao);
						posAlteracao = '';
					} else {
						adicionarContato(nome,  email, listaContatos);
						if (listaContatos.length>0){
							document.getElementById("btLimpar").style.visibility= "visible";
						}					
					}
					document.getElementById('tabela').innerHTML =
						montarTabela(listaContatos);
					document.getElementById('nome').value = '';
					document.getElementById('email').value = '';
				//email invalido
				}else if (checkName(nome) && !checkMail(email)){
					alert('Informe um email válido!');
					limparCampos()
					document.getElementById('email').focus()
				//nome invalido
				}else if (!checkName(nome) && checkMail(email) ){
					alert('Informe um nome válido!');
					limparCampos()
					document.getElementById('nome').focus()
				//qualquer outra merda
				}else
					alert('Campos inválidos! Revise nome e email e não deixe campos vazios!')
					document.getElementById('nome').focus()
					limparCampos()
					document.getElementById('nome').focus()
				break;
			case 'btLimpar':
				if (confirm('ATENÇÃO! Ao clicar em OK toda a lista será apagada. Deseja continuar?'))
					limparContatos();
					document.getElementById('tabela').innerHTML =
						montarTabela(listaContatos);
						document.getElementById("btLimpar").style.visibility= "hidden";
				break;
			case 'btExcluir':
				if (confirm('Tem certeza que deseja excluir?')) {
					var posicao = elemento.getAttribute('rel');
					excluirContato(listaContatos, posicao);
					document.getElementById('tabela').innerHTML =
						montarTabela(listaContatos);				
				}
				if (listaContatos<1)
					document.getElementById("btLimpar").style.visibility= "hidden";
				break;
			case 'btAlterar':
				var btn = document.getElementById("btSalvar");
				btn.innerText = 'ALTERAR';
				posAlteracao = elemento.getAttribute('rel');				
				document.getElementById('nome').value = listaContatos[posAlteracao][0];
				document.getElementById('email').value = listaContatos[posAlteracao][1];
				break;
		}
	});
}
