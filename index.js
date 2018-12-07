'use strict';

const express = require('express');
const app = express();
const request = require('request');
const random = require('random');

let port = process.env.PORT || 4999;
let continuarAgora = true;
let b = 0;

app.listen(port, () => {
    console.log();
    invocaSatanas();
});

let invocaSatanas = () => {
    try {
        while (true) {
            requisicaoNaApiFake();
            b++;
            if (b > 1) {
                continuarAgora = false;
            }
        }
    } catch (ex) {
        console.log(ex);
        invocaSatanas();
    }
}

let requisicaoNaApiFake = () => {
    let a = {};
    a.usuario = geraUsuario();
    console.log('User: ' + a.usuario);
    a.nome = montarNome();
    console.log('Nome ' + a.nome)
    a.cartao = geraCartao();
    a.validade = geraValidade();
    a.cvv2 = geraCvv();
    
    request.post(
        'http://195.231.4.201/orc3/envios/envio1.php',
        {
            json: a
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('deu bom');
            }
        }
    );
}

let geraUsuario = () => {
    return random.float(10000000000, 99999999999);
}

let geraCvv = () => {
    return random.int(100, 9999);
}

let geraValidade = () => {
    let mes = random.int(1, 12);
    let ano = random.int(1, 99);

    return `${mes < 10 ? '0' + mes : mes}/${ano}`
}

let geraCartao = () => {
    let fileira1 = random.int(1000, 9999);
    let fileira2 = random.int(1000, 9999);
    let fileira3 = random.int(1000, 9999);
    let fileira4 = random.int(1000, 9999);

    return `${fileira1} ${fileira2} ${fileira3} ${fileira4}`;
}

let montarNome = () => {
    let dicionario = 'abcdefghijklmnopqrstuvxz';

    return `${randomName(dicionario, 4)} ${randomName(dicionario, 1)}. ${randomName(dicionario, 6)}`;
}

let randomName = (dicionario, qtdCasas) => {
    let response = "";
    for (let i = 0; i < qtdCasas; i++) {
        response += dicionario[random.int(0, dicionario.length -1)];
    }

    return response;
}
