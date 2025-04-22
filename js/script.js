const containerApp = document.querySelector('.container')
const inputs = document.querySelectorAll('input')
const spams = document.querySelectorAll('span')
const btncalcular = document.getElementById('calcular')
const calculadora =  document.querySelector('.box-break')
const btncalc = document.getElementById('calc')
const menuPrincipal = document.querySelector('.box-menu')

const mHamburguer = document.querySelector('.burguer-menu')
const spins = document.querySelectorAll('.burguer-menu span')

calculadora.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
});


btncalc.addEventListener('click', () => {
    menuPrincipal.classList.toggle('fechado') //opacity: 0 .3s
    setTimeout(() => {
        calculadora.classList.toggle('recuar'); // esconde com animation
        calculadora.classList.toggle('balanco-suave'); // exibe com animation
        containerApp.querySelector('h1').textContent = 'Calculadora de Ponto';
        containerApp.querySelector('h1').style.background = '#3599F2';
        menuPrincipal.classList.toggle('zeroMargin') // display:none no menu
        spins.forEach( (spin,index) =>{
            if (index == 0) {spin.id = 'close1'}
            if (index == 1) {spin.id = 'close2'}
            if (index == 2) {spin.id = 'close3'}            
        })               
    },400)    
});  // btncalc Event click


mHamburguer.addEventListener('click', () =>{
           if (calculadora.classList.contains('balanco-suave')) {
               calculadora.reset()
               spins.forEach((spin) => {
               spin.id = ''; // Remove o ID
           });
            calculadora.classList.toggle('balanco-suave')
            calculadora.classList.toggle('recuar');
            containerApp.querySelector('h1').textContent = 'Calculadora e Registro de Ponto';
            containerApp.querySelector('h1').style.background = '#6300EF';  
            menuPrincipal.classList.toggle('zeroMargin');
            setTimeout(() =>{menuPrincipal.classList.toggle('fechado')},300)
           } // condição if

        }) 




//Formata a entrada de tempo no formato HH:MM
inputs.forEach((inputbreak, index) =>{
    // efeito neon verde na borda inferior dos inputs
    inputbreak.addEventListener('focus', ()=> {spams[index].classList.toggle('efect-neon')})
    inputbreak.addEventListener('blur', ()=> {spams[index].classList.toggle('efect-neon')})    
    inputbreak.addEventListener('input', function(event) {
        if (inputbreak.value.length == 4) { // efeito neon vermelho na borda inferior dos inputs
            if (spams[index].classList.contains('efect-neon-red')) {
                spams[index].classList.remove('efect-neon-red')}
        } //fim if (inputbreak.value > 0)
    var value = event.target.value.replace(/\D/g,''); // Remove caracteres não numéricos
    value = value.slice(0, 4); // Limitar o valor a 4 dígitos
    value = value.replace(/(\d{2})(\d{2})/, '$1:$2'); // Formatar no formato 00:00
    event.target.value = value; // Atribui o valor formatado ao campo de entrada
});
}) // fim inputs.forEach

function Calcular() { // função do botão 'CALCULAR'
    // recupera o valor dos 4 inputs
    let inputEntrada = inputs[0].value, inputIda = inputs[1].value,
        inputVolta = inputs[2].value, inputFim = inputs[3].value

   // divide as horas e minutos das batidas. variáveis se tornam arrays com 2 índices.
    let batida1 = inputEntrada.split(":")
    let batida2 = inputIda.split(":")
    let batida3 = inputVolta.split(":")
    let batida4 = inputFim.split(":")
    
    // converte as batidas em minutos (horas e minutos juntos)
    let horaEntrada = batida1[0] * 60 + Number(batida1[1])
    let horaIda = batida2[0] * 60 + Number(batida2[1])
    let horaVolta = batida3[0] * 60 + Number(batida3[1])
    let horaFim = batida4[0] * 60 + Number(batida4[1])
    
    
    let hora, min, resultado;    
    function calcularBatidas(param) {
            /* // método com lógica pura
            if (param >= '60') {hora = parseInt(param / 60)} else {hora = '00'}
            if (hora < 10 && hora >= 1) {hora = '0' + String(hora)}
            let y = param % 60
            if (y == '0') {min = '00'} else if (y >= '10') {min = y} else {min = `0${y}`}
            return `${hora}:${min}`; */        
        let hora = Math.floor(param / 60); // método resumido, usando métodos()
        let min = param % 60;
    return `${hora.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        } // function calcularBatidas()
    
      let noturnas;

calcularHorasNoturnas(horaEntrada, horaIda, horaVolta, horaFim);

function calcularHorasNoturnas(entrada, ida, volta, fim) {
    const tempo1 = calcularTempoNoturno(entrada, ida);
    const tempo2 = calcularTempoNoturno(volta, fim);

    noturnas = calcularBatidas(tempo1 + tempo2);
}

function calcularTempoNoturno(inicio, fim) {
    // Converte para faixa de 0 a 2880 para lidar com horários que atravessam a meia-noite
    if (fim < inicio) {
        fim += 1440;
    }

    const periodosNoturnos = [
        [1320, 1440],     // 22:00 - 00:00
        [0, 300],         // 00:00 - 05:00
        [1320 + 1440, 1440 + 1440], // 22:00 - 00:00 do "dia seguinte"
        [0 + 1440, 300 + 1440]      // 00:00 - 05:00 do "dia seguinte"
    ];

    let total = 0;

    for (const [nInicio, nFim] of periodosNoturnos) {
        const sobreposicao = intersecao(inicio, fim, nInicio, nFim);
        total += sobreposicao;
    }

    return total;
}

function intersecao(aInicio, aFim, bInicio, bFim) {
    const inicio = Math.max(aInicio, bInicio);
    const fim = Math.min(aFim, bFim);
    return Math.max(0, fim - inicio);
}    
    
    
    
    let primeiroTempo, segundoTempo;    
    if (horaIda > horaEntrada) { // verifica se a 2ª batida é maior que a 1ª batida.
        primeiroTempo = horaIda - horaEntrada        
    } else {primeiroTempo = (1440 - horaEntrada) + horaIda}
    
    if (horaFim > horaVolta) { // verifica se a 4ª batida é maior que a 3ª batida.
        segundoTempo = horaFim - horaVolta        
    } else {segundoTempo = (1440 - horaVolta) + horaFim}
    
     let negativas, extras; // calcula as horas negativas
     let positivas = primeiroTempo + segundoTempo
     if (positivas < '440') {
         negativas = '440' - positivas
         extras = '00:00'
         negativas = calcularBatidas(negativas)
     } else {
         extras = positivas - 440 
         extras = calcularBatidas(extras) // calcula as horas extras
         negativas = '00:00'}

    // calcula as horas positivas
    positivas = calcularBatidas(positivas)
    
showModal(positivas, extras, negativas, noturnas) 
} // fim function Calcular()


function showModal(positivas, extras, negativas, noturnas) {
    let wrapperModal = document.createElement('div')
    wrapperModal.className = 'blackdiv'
    containerApp.appendChild(wrapperModal)    
    // Adiciona o evento de clique para fechar o modal
    wrapperModal.addEventListener('click', function () {
        wrapperModal.style.opacity = '0'
        boxMsg.style.opacity = '0'
        boxMsg.style.transform = 'translate(-50%,-50%) scale(.8)'
        setTimeout(() =>{
            boxMsg.remove()
            wrapperModal.remove()
            btncalcular.disabled = false;
                        },200)
    })
    
    let boxMsg = document.createElement('div')
    containerApp.appendChild(boxMsg)
    boxMsg.className = 'boxMensagem'
    
    setTimeout(() =>{wrapperModal.style.opacity = '1'},000)
    setTimeout(() =>{
        boxMsg.style.opacity = '1'
        boxMsg.style.transform = 'translate(-50%,-50%) scale(1)'
    },000)
    
    setTimeout(() =>{
        boxMsg.insertAdjacentHTML("afterbegin",`<h2>Resultado dos Registros</h2><div class="informations"><div><label id="positiva">Positivas</label><span>+ ${positivas}</span></div><div><label id="extra">Extras</label><span>+ ${extras}</span></div><div><label id="negativa">Negativas</label><span>- ${negativas}</span></div><div><label id="noturna">Noturnas</label><span>+ ${noturnas}</span></div></div>`)
    },000)
} // function showModal()


btncalcular.addEventListener('click', function () { // função do botão CALCULAR
    let camposPreenchidos = Array.from(inputs).every(input => input.value.length >= 4)
    if (camposPreenchidos) {
        Calcular()
        btncalcular.disabled = true;
    } else {
            inputs.forEach((input, index) =>{
                if (input.value.length < 5) {
                    spams[index].classList.add('efect-neon-red')
                    let firstInput = [...inputs].find(input => input.value.length == 0 || input.value.length < 5)
                if(firstInput) {firstInput.focus()}            
        }
    })
    }
})
