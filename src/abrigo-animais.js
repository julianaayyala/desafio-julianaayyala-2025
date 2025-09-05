console.log('teste');

const animais = [
  {nome: "Rex", tipo: "cão", brinquedos: ["RATO", "BOLA"]},
  {nome: "Mimi", tipo: "gato", brinquedos: ["BOLA", "LASER"]},
  {nome: "Fofo", tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"]},
  {nome: "Zero", tipo: "gato", brinquedos: ["RATO", "BOLA"]},
  {nome: "Bola", tipo: "cão", brinquedos: ["CAIXA", "NOVELO"]},
  {nome: "Bebe", tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"]},
  {nome: "Loco", tipo: "jabuti", brinquedos: ["SKATE", "RATO"]}
];

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const arrPessoa1 = brinquedosPessoa1.split(',');
    const arrPessoa2 = brinquedosPessoa2.split(',');
    const arrOrdem = ordemAnimais.split(',');

    validaAnimal(arrOrdem);
    validaBrinquedos(arrPessoa1);
    validaBrinquedos(arrPessoa2);

    return {
      lista: [
        `${arrOrdem[0]} - abrigo`,
        `${arrOrdem[1]} - pessoa 1`
      ]
    };
  }
}

function validaAnimal(arrOrdem){
  if(arrOrdem.length != 2){
    throw new Error("Animal inválido");
  }
}

function validaBrinquedos(arrBrinquedos){
  const duplicados = arrBrinquedos.filter((item, index) => arrBrinquedos.indexOf(item) !== index);
  if(arrBrinquedos.length != 2){
    throw new Error("Brinquedo inválido");
  }
}

try {
  const saida = new AbrigoAnimais().encontraPessoas(
    'RATO,BOLA',
    'NOVELO,RATO',
    'Fofo,Rex'
  );
  console.log(saida);
} catch(e) {
  console.log("Erro:", e.message);
}

export { AbrigoAnimais as AbrigoAnimais };
