
//Refresh page
function atualizaPagina() {
    document.querySelector('#btnAtualizarPagina').disabled = true;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //refresh page
        chrome.tabs.reload(tabs[0].id);
        loop();
    });
  
}

//Loop refresh
function loop() {
    if (valor_slider.value == 0) {
        paraAtualizacao();        
    } else {
        intervalos = setInterval(function () { atualizaPagina(); }, valor_slider.value * 1000);
    }
}

//Stop refresh
function paraAtualizacao() {
   
    //stop refresh chrome tabs
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        window.close();
    });
    
    
    //window.close();
    //stop setInterval

    clearInterval(intervalos);
    console.log('Valor do intervalos dentro da funcao paraAtualizacao: ' + valor_slider.value );

    //console.log('stop');
    valor_slider.value = 0; 
    valor.innerHTML = valor_slider.value; 
    document.querySelector('#btnAtualizarPagina').disabled = true;
}

//valores do slider e intervalos de tempo
let intervalos = null;
let valor = document.querySelector('#valor');

valor_slider = document.querySelector('#intervalo')
valor.innerHTML = valor_slider.value;
valor_slider.oninput = function () {
    valor.innerHTML = this.value; 
}

valor_slider.addEventListener('change', function () {
    if (valor_slider.value == 0) {
        paraAtualizacao();        
    }else{
        document.querySelector('#btnAtualizarPagina').disabled = false;
    }
});


//AGENDAR POR DATA E HORÁRIO
function agendarData(){
    //Data
    let data = new Date();
    dia  = data.getDate();
    mes  = data.getMonth() + 1;
    ano  = data.getFullYear();
    

    if(mes < 10){
        mes = '0' + mes;
    }
    let dataAtual = document.querySelector('#data');
    input_data = ano + '-' + mes + '-' + dia;
    dataAtual.value = input_data;
}

function agendarHora(){
    //horas e minutos
    let horario = new Date();
    hora = horario.getHours();
    minuto = horario.getMinutes(); 
    secundos = horario.getSeconds();    

    if(minuto < 10){
        minuto = '0' + minuto;
    }
    else if(secundos < 10){
        secundos = '0' + secundos;
    }

    let horarioAtual = document.querySelector('#hora');
    input_data = hora + ':' + minuto + ':' + secundos;
    horarioAtual.value = input_data;   

}

function iniciarAgendamentoPorData(){    
    
    dataAgendada = document.querySelector('#data').value;
    horaAgendada = document.querySelector('#hora').value;   

    console.log(dataAgendada);
    console.log(horaAgendada);
   
    let data_corrente = new Date()
    data_coorrente_dia = data_corrente.getDate();
    data_coorrente_mes = data_corrente.getMonth() + 1;
    data_coorrente_ano = data_corrente.getFullYear();
    data_coorrente_hora = data_corrente.getHours();
    data_coorrente_minuto = data_corrente.getMinutes();
    data_coorrente_secundos = data_corrente.getSeconds();

    if(data_coorrente_mes < 10){
        data_coorrente_mes = '0' + data_coorrente_mes;
    }

    if(data_coorrente_minuto < 10){
        data_coorrente_minuto = '0' + data_coorrente_minuto;
    }
    
    if(data_coorrente_secundos < 10){
        data_coorrente_secundos = '0' + data_coorrente_secundos;
    }

    data_corrente = data_coorrente_ano + '-' + data_coorrente_mes + '-' + data_coorrente_dia + 'T' + data_coorrente_hora + ':' + data_coorrente_minuto + ':' + data_coorrente_secundos;
    console.log(data_corrente);

    data_corrente_em_timestamps = new Date(data_corrente).getTime();
    console.log(data_corrente_em_timestamps);

    data_horario_agendado_timestamps = new Date(dataAgendada + 'T' + horaAgendada).getTime(); 
    console.log(data_horario_agendado_timestamps);

    agendarAtualizacaoPorData(); 

}

function agendarAtualizacaoPorData(){

    if(data_horario_agendado_timestamps < data_corrente_em_timestamps){
       // alert('data de agendamento é menor que data atual');
       document.querySelector('#msg').innerHTML = 'Data de agendamento é menor que data atual';
    }
    else{
        document.querySelector('#btnAtualizarPaginaData').disabled = true;
        dataAgendada_br = dataAgendada.split('-').reverse().join('/');
        document.querySelector('#msg').innerHTML = 'Atualização agendada para: ' + dataAgendada_br + ' ' + horaAgendada;
        tempo_restante = data_horario_agendado_timestamps - data_corrente_em_timestamps;
        console.log(tempo_restante);
        setTimeout(function(){
            atualizaPagina();
        }, tempo_restante);
        
    }
}

function pararAgendamentoPorData(){
    clearTimeout(tempo_restante);
     //stop refresh chrome tabs
     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        window.close();
    });
}

window.onload = () => {
    // loop();
    agendarData();
    agendarHora();

    //click botao atualizar página
    document.querySelector('#btnAtualizarPagina').addEventListener('click', () => {
        atualizaPagina();
    });

    //click botao parar atualização
    document.querySelector('#stop').addEventListener('click', () => {
        paraAtualizacao();
    });

    //click botao agendar atualização por data
    document.querySelector('#btnAtualizarPaginaData').addEventListener('click', () => {
        iniciarAgendamentoPorData();
    });

    //click botao parar agendamento por data

    document.querySelector('#stopData').addEventListener('click', () => {
        pararAgendamentoPorData();
    });
}













