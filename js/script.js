var buttonNovoContato = document.getElementById('buttonNovoContato');
var buttonCancelar = document.getElementById('buttonCancelar');
var novoContato = document.getElementById('novoContato');
var formNovoContato = document.getElementById('formNovoContato');
var inputCodigo = document.getElementById('codigo');
var inputNome = document.getElementById('nome');
var inputEmail = document.getElementById('email');
var inputTelefone = document.getElementById('telefone');
var divMensagemErro = document.getElementById('mensagemErro');
var tabelaContatos = document.getElementById('tabelaContatos')

/*Vetor */
var listaContatos = [];
var contatoExemplo1 = {
    codigo : '001001',
    nome: 'Jose da Silva',
    email: 'jose@email.com',
    telefone : '(11) 99901-1234' 
};

var contatoExemplo2 = {
    codigo : '001002',
    nome: 'Marcio de Souza',
    email: 'marcio@email.com',
    telefone : '(11) 99902-1234'    
};

var contatoExemplo3 = {
    codigo: '001003',
    nome: 'Mauricio Cruz', 
    email: 'mauricio@email.com',
    telefone: '(11) 99903-1234'
};

var contatoExemplo4 = {
   codigo: '001004', 
   nome: 'Fabiana Dias', 
   email: 'fabiana@email.com',
   telefone: '(11) 99904-1234'
};


listaContatos.push(contatoExemplo1, contatoExemplo2, contatoExemplo3, contatoExemplo4);

function removerContato() {
    var posicao = event.target.getAttribute('data-contato');
    listaContatos.splice(posicao, 1);
    console.log('Remover Contato: ' + posicao);
    atualizarTabelaContatos();
}


function atualizarTabelaContatos () {
    if (listaContatos.length === 0) {
        tabelaContatos.innerHTML = '<tr><td colspan="4">Nenhum contato</td></tr>';
        return;
    }
 
    tabelaContatos.innerHTML = '';
    for (var i = 0; i < listaContatos.length; i++) {
        var contato = listaContatos[i];
        var linha = document.createElement('tr')
        var celulaCodigo = document.createElement ('td');
        var celulaNome = document.createElement ('td');
        var celulaEmail = document.createElement ('td');
        var celulaTelefone = document.createElement ('td');
        var celulaAcoes = document.createElement ('td');
        var botaoExcluir = document.createElement ('button');
        botaoExcluir.setAttribute('data-contato', i);
        botaoExcluir.classList.add('btn');
        botaoExcluir.classList.add('btn-danger');
        botaoExcluir.classList.add('btn-sm');
        botaoExcluir.addEventListener('click', removerContato);
        celulaCodigo.innerText = contato.codigo;
        celulaNome.innerText = contato.nome;
        celulaEmail.innerText = contato.email;
        celulaTelefone.innerText = contato.telefone;
        botaoExcluir.innerText = "Remover";
        celulaAcoes.appendChild(botaoExcluir);
        linha.appendChild(celulaCodigo);
        linha.appendChild(celulaNome);
        linha.appendChild(celulaEmail);
        linha.appendChild(celulaTelefone);
        linha.appendChild(celulaAcoes);
        tabelaContatos.appendChild(linha);    
    }
}

function limparNovoContato () {
    inputCodigo.value = '';
    inputNome.value = '';
    inputEmail.value = '';
    inputTelefone.value = '';
    inputCodigo.classList.remove('is-invalid');
    inputNome.classList.remove('is-invalid');
    inputEmail.classList.remove('is-invalid');
    inputTelefone.classList.remove('is-invalid');
    divMensagemErro.classList.add('d-none');
    divMensagemErro.innerHTML = '';
}

function mostrarNovoContato() {
   novoContato.classList.remove('d-none');
}

function ocultarNovoContato() {
    novoContato.classList.add('d-none');
    limparNovoContato();
}

function novoContatoValido(Codigo, Nome, Email, Telefone) {
    var validaCorreto = true
    var erro = '';
    
    if (Codigo.trim().length === 0) {
        erro = 'O codigo do contato é obrigatório!';
        inputCodigo.classList.add('is-invalid');
        validaCorreto = false;

    } else {
        inputCodigo.classList.remove('is-invalid');
        
    }
    if (Nome.trim().length === 0) {
        if (erro.length > 0) {
            erro += '<br>'
        }
        erro += 'O nome do contato é obrigatório!';
        inputNome.classList.add('is-invalid');
        validaCorreto = false;

    } else {
        inputNome.classList.remove('is-invalid');
        
    }
    if (Email.trim().length === 0) {
        if (erro.length > 0) {
            erro += '<br>'
        }
        erro += 'O e-mail do contato é obrigatório!';
        inputEmail.classList.add('is-invalid');
        validaCorreto = false;

    } else {
        inputEmail.classList.remove('is-invalid');
        
    }
    if (Telefone.trim().length === 0) {
        if (erro.length > 0) {
            erro += '<br>'
        }
        erro += 'O telefone do contato é obrigatório!';
        inputTelefone.classList.add('is-invalid');
        validaCorreto = false;

    } else {
        inputTelefone.classList.remove('is-invalid');
        
    }
   if (!validaCorreto) {
        divMensagemErro.innerHTML = erro;
        divMensagemErro.classList.remove('d-none');
    } else {
        divMensagemErro.classList.add('d-none');
    }
    
    return validaCorreto;
}



function salvarNovoContato(event) {
    event.preventDefault();
    var Codigo = inputCodigo.value;
    var Nome = inputNome.value;
    var Email = inputEmail.value;
    var Telefone = inputTelefone.value;
    if (novoContatoValido(Codigo, Nome, Email, Telefone)) {
        console.log('Contato é Válido!');
        listaContatos.push({
            codigo: Codigo,
            nome: Nome,
            email: Email,
            telefone: Telefone,

        });
        atualizarTabelaContatos();
        ocultarNovoContato();

    } else {
        console.log('Contato Não é Válido!');
    }
    
}

buttonNovoContato.addEventListener('click', mostrarNovoContato);
buttonCancelar.addEventListener('click', ocultarNovoContato);
formNovoContato.addEventListener('submit', salvarNovoContato);
window.addEventListener('load', atualizarTabelaContatos);