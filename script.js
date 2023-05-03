const nave = document.querySelector('.nave')
const button = document.querySelector('button.start')
const input = document.querySelectorAll('.main input[type="text"]')
const contador = document.querySelector('.contador')
const txtRecord = document.querySelector('span.txtRecord')
let recorde = -999
let filterblur = document.querySelector('.container').style
let altitude = 820
let velocidade = 0
let combustivel = 45
let aceleracao = 0
let motor = false
let isDestruido = false
let inGame = false
nave.style.top = 745 + 'px'
for (let i = 0; i < input.length; i++){
    input[i].value = "----------"
}



function liga(){
    if(combustivel > 0){
        nave.src= "./img/nave2.png"
        if(!motor){
            nave.style.top = (parseFloat(nave.style.top)-16.3) + 'px'
        }
        combustivel--
        motor = true
    }else{
        desliga()
    }
}

function desliga(){
    if(isDestruido){
        isDestruido = false
        nave.style.top = (parseFloat(nave.style.top)+10) + 'px'
        nave.style.left = (parseFloat(nave.style.left)+3.5) + 'px'
    }else if(motor){
        nave.style.top = (parseFloat(nave.style.top)+16.3) + 'px'
    }
    motor = false
    nave.src="./img/nave.png"
}

function explode(){
    isDestruido = true
    nave.src="./img/nave3.png"
    nave.style.top = (parseFloat(nave.style.top)-10) + 'px'
    nave.style.left = (parseFloat(nave.style.left)-3.5) + 'px'
}

function reset(){
    altitude = 820
    velocidade = 0
    combustivel = 45
    aceleracao = 0
}

function pressButton(){
    filterblur.filter = 'blur(1.8px)'
    contador.classList.remove('invisivel')
    button.disabled = true
    button.textContent="---"
    let count = 3
    contador.style.left = '45%'
    contador.style.fontSize = '5em'
    contador.innerText = count
    let countInterval = window.setInterval( () => {
        count--
        if (count === 0) {
            filterblur.filter = 'none';
            contador.classList.add('invisivel')
            window.clearInterval(countInterval)
            inGame = true
            reset()
            gameAction = window.setInterval(ciclo,50);     
        }else{ 
            contador.innerHTML = `<p>${count}</p>`
        }

    }, 1000)
}

addEventListener( "keydown", (event) => {
    if (event.keyCode === 32 && inGame){
        liga()        
    }
} )

addEventListener( "keyup", (event) => {
    if (event.keyCode === 32 && inGame){
        desliga()
    }
} )

button.addEventListener( 'click' , () => {
    pressButton()
} )

function ciclo(){
    if (inGame){  
        button.disabled = true;
        if (motor && combustivel > 0 ){
            aceleracao = 0.25
        }else{
            aceleracao = -0.4
        }   
        // inicio = -69  fim = 745.40
        velocidade += aceleracao
        altitude += velocidade
        if ((altitude) <= 0 ){
            altitude = 0
            desliga()
            nave.style.top = 745 + 'px'
            clearInterval(gameAction)
            if(velocidade >= -6){
                if(velocidade > recorde){
                    txtRecord.textContent = (velocidade).toFixed(2)
                    recorde = velocidade
                }
                setTimeout(()=>{ganhou()}, 1000)        
            }else{
                explode()
                setTimeout(()=>{perdeu()}, 1000)      
            }
            inGame = false
        }else{
            nave.style.top = 820 -(altitude + 69) + 'px'
        }
        mostra()
    }
}


let mostra = () => {
    input[0].value = (altitude).toFixed(2)+' km de distância'
    input[1].value = (velocidade).toFixed(2)+ ' km por hora'
    if(combustivel < 0) combustivel = 0
    input[2].value = combustivel+' litros'
}

let perdeu = () => {  
    resultGameAjuste()
    contador.innerHTML = `<p>Pouso turbulento</p><p>Nave Explodiu!!!</p><p>Tente Novamente</p>`
    setTimeout( () => {
        reBuild()  
    } , 2500 )
}

let ganhou = () => {
    resultGameAjuste()
    contador.innerHTML = `<p>Pouso bem sucedido!!!</p><p>Parabéns</p>`
    setTimeout( () => {
        reBuild()  
    } , 2500 )
}


function resultGameAjuste() {
    contador.classList.remove('invisivel')
    filterblur.filter = 'blur(1.8px)'
    contador.style.left = '40%'
    contador.style.fontSize = '2.5em'
}

function reBuild() {
    filterblur.filter = 'none'
    contador.classList.add('invisivel')
    button.textContent = 'Jogar'
    button.disabled = false
    desliga()
}

