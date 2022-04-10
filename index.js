const { range } = require('lodash')

const bin2dec = (binario) => {
	let decimal = 0, i = 0, resto;
    
    while (binario != 0) {
      resto = binario % 10;
      binario = Number.parseInt(binario / 10);
      decimal = decimal + resto * Math.pow(2, i);
      ++i;
    }
    
    return decimal;
}

const calculaRedundancia = tamanho => {
	const tamanhoArray = range(tamanho)

    for (let i of tamanhoArray) if(2**i >= (tamanho + i + 1)) return i;
}

const posicaoRedundante = (valor, redundante) => {
	let acc1 = 0, acc2 = 1, result = ''
	const m = valor.length
    const num = m + redundante +1

    const array = range(1, num);

	for (let i of array){
		if(i == 2**acc1){
			result = result + '0'
			acc1++
        }
		else{
			const valorArray = valor.split('')
			result += valorArray[valorArray.length - acc2]
			acc2++
        }
    };
	
	return result.split('').reverse().join('');
}

const calculaParidade = (valorBit, redundant) => {
    let tamamnhoArray = valorBit.length
    const array = range(redundant);
	let result = valorBit;
	let valorBitArray = valorBit.split('')

	for (let i of array){ 
		let valor = 0
        const arrayAux = range(1, tamamnhoArray + 1)

		for (let j of arrayAux){ 
			if((j & (2**i)) == (2**i)) {
				valor = valor ^ +valorBitArray[valorBitArray.length - j]
			}
        }
		
		result = result.substring(0,tamamnhoArray-(2**i)) + valor.toString() + result.substring(tamamnhoArray-(2**i) + 1)
    };

	return result
}
	

const verificaErro = (valorBit, redundancia) => {
    let tamamnhoArray = valorBit.length
	let valorBitArray = valorBit.split('')
	let result = 0
	
    const array = range(redundancia);

	for (let i of array){
		let valor = 0
        const arrayAux = range(1, tamamnhoArray + 1)

		for (let j of arrayAux) { 
			if((j & (2**i)) == (2**i)) 
				valor = valor ^ +valorBitArray[valorBitArray.length - j]
		}

		result = result + valor*(10**i)
    }
	return bin2dec(result)
}
	

// valor a ser transferido
// 1675
const valor = '11010001011'

// calcula a redundancia dos bits
const redundancia = calculaRedundancia(valor.length)

// verifica a posição dos bits redundantes
const posicaoBitsRedundantes = posicaoRedundante(valor, redundancia)

// analisa a paridade dos bits
const valorTransferido = calculaParidade(posicaoBitsRedundantes, redundancia)

// valor transferido
console.log("Valor transferido ->: " + valorTransferido)

// Força o erro.
// 3567
const valor2 = '110111101111'
console.log("Erro na transmissão dos dados, valor -> " + valor2)

const posicaoErro = verificaErro(valor2, redundancia)
console.log("O erro se encontra na posição -> " + posicaoErro)