const animais = [
  { nome: "Rex", tipo: "cão", brinquedos: ["RATO", "SKATE"], status: 'abrigo', divideBrinquedo: true, ordemBrinquedo: true, companiaObrigatoria: false},
  { nome: "Mimi", tipo: "gato", brinquedos: ["BOLA", "LASER"], status: 'abrigo', divideBrinquedo: false, ordemBrinquedo: true, companiaObrigatoria: false },
  { nome: "Fofo", tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"], status: 'abrigo', divideBrinquedo: false, ordemBrinquedo: true, companiaObrigatoria: false },
  { nome: "Zero", tipo: "gato", brinquedos: ["RATO", "BOLA"], status: 'abrigo', divideBrinquedo: false, ordemBrinquedo: true, companiaObrigatoria: false },
  { nome: "Bola", tipo: "cão", brinquedos: ["CAIXA", "NOVELO"], status: 'abrigo', divideBrinquedo: true, ordemBrinquedo: true, companiaObrigatoria: false },
  { nome: "Bebe", tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"], status: 'abrigo', divideBrinquedo: true, ordemBrinquedo: true, companiaObrigatoria: false },
  { nome: "Loco", tipo: "jabuti", brinquedos: ["SKATE", "RATO"], status: 'abrigo', divideBrinquedo: true, ordemBrinquedo: false, companiaObrigatoria: true },
  { nome: "Loca", tipo: "jabuti", brinquedos: ["SKATE", "RATO"], status: 'abrigo', divideBrinquedo: true, ordemBrinquedo: false, companiaObrigatoria: true }
];

let animaisPesquisados = [];
let listaBrinquedosValidos = [];

function validarExistenciaDoAnimal(nomeAnimal) {
  for (let animal of animais) {
    if (animal.nome.toUpperCase() == nomeAnimal) {
      return false;
    }
  }
  return true;
}

function verificarDuplicados(lista){
  return new Set(lista).size !== lista.length;
}

function montarListaValidaBrinquedos(){
  let lista = new Set();
  for(let animal of animais){
    for(let brinquedo of animal.brinquedos){
      lista.add(brinquedo);
    }
  }
  listaBrinquedosValidos = lista;
}

function verificarBrinquedosOrdem(animal, brinquedosPessoa){
  let qtd = 0;
   let brinquedosAnimal = animal.brinquedos;
  for(let brinquedoAnimal of brinquedosAnimal){
    for(let brinquedoPessoa of brinquedosPessoa){
      if(brinquedoAnimal == brinquedoPessoa){
        if(brinquedosPessoa.indexOf(brinquedoPessoa) >= brinquedosAnimal.indexOf(brinquedoAnimal)){
          qtd++;
        }
      }
    }
  }
  return qtd;
}

function verificarBrinquedosSemOrdem(animal, brinquedosPessoa){
  let qtd = 0;
  let brinquedosAnimal = animal.brinquedos;
  for(let brinquedoAnimal of brinquedosAnimal){
    for(let brinquedoPessoa of brinquedosPessoa){
      if(brinquedoAnimal == brinquedoPessoa){
        qtd++;
      }
    }
  }
  return qtd;
}

function verificarValidadeBrinquedos(brinquedos){
  for(let brinquedo of brinquedos){
    if(!listaBrinquedosValidos.has(brinquedo)){
      return true;
    }
  }
  return false
}

function checaMatch(nomeAnimal, brinquedosPessoa1, brinquedosPessoa2) {
  let pessoa1 = false;
  let pessoa2 = false;
  let animal = buscarAnimalPorNome(nomeAnimal);
  let qdtBrinquedosPessoa1 = animal.ordemBrinquedo == true ? verificarBrinquedosOrdem(animal, brinquedosPessoa1) : verificarBrinquedosSemOrdem(animal, brinquedosPessoa1);
  let qdtBrinquedosPessoa2 = animal.ordemBrinquedo == true ? verificarBrinquedosOrdem(animal, brinquedosPessoa2) : verificarBrinquedosSemOrdem(animal, brinquedosPessoa2);
  let qdtBrinquedosAnimal = buscaBrinquedos(nomeAnimal).length;

  if(qdtBrinquedosPessoa1 == qdtBrinquedosAnimal){
    pessoa1 = true;
  }

  if(qdtBrinquedosPessoa2 == qdtBrinquedosAnimal){
    pessoa2 = true; 
  }

  if(pessoa1 == pessoa2){
    mudarStatusAnimal(animal, 'abrigo');
  } else if(pessoa1){
    mudarStatusAnimal(animal, 'pessoa 1');
  } else if(pessoa2){
    mudarStatusAnimal(animal, 'pessoa 2')
  }
}

function validarBrinquedosOutrosAnimais(animal, pessoa){
  for(let brinquedo of animal.brinquedos){
    for(let animalPessoal of buscarAnimaisPessoa(pessoa)){
      for(let brinquedoAnimalPessoa of animalPessoal.brinquedos){
        if(brinquedo == brinquedoAnimalPessoa){
          return true;
        }
      }
    }
  }
  return false;
}

function mudarStatusAnimal(animal, pessoa) {
  if(animal.companiaObrigatoria && buscarAnimaisPessoa(pessoa).length == 0){  
    animal.status = 'abrigo';
    animaisPesquisados.push(`${animal.nome} - ${animal.status}`);
  } else if (pessoa != 'abrigo' && !animal.divideBrinquedo && buscarAnimaisPessoa(pessoa).length > 0 && validarBrinquedosOutrosAnimais(animal, pessoa)) {
    animal.status = 'abrigo';
    animaisPesquisados.push(`${animal.nome} - ${animal.status}`);
  } else if(buscarAnimaisPessoa(pessoa).length == 3) {
    animal.status = 'abrigo';
    animaisPesquisados.push(`${animal.nome} - ${animal.status}`);
  } else {
    animal.status = pessoa;
    animaisPesquisados.push(`${animal.nome} - ${animal.status}`);
  }
}

function buscaBrinquedos(nomeAnimal) {
  return animais.find(a => a.nome.toLocaleUpperCase() === nomeAnimal).brinquedos;
}

function buscarAnimalPorNome(nomeAnimal){
  return animais.find(a => a.nome.toLocaleUpperCase() === nomeAnimal);
}

function buscarAnimaisPessoa(pessoa){
  return animais.filter(a => a.status === pessoa);
}

function validarBrinquedos(arrPessoa1, arrPessoa2){
  montarListaValidaBrinquedos();
  if(verificarDuplicados(arrPessoa1) || verificarDuplicados(arrPessoa2)){
    return true;
  }
  if(verificarValidadeBrinquedos(arrPessoa1) || verificarValidadeBrinquedos(arrPessoa2)){
    return true;
  }
  return false;
}

class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    const arrPessoa1 = brinquedosPessoa1.split(',').map(x => x.trim().toUpperCase());
    const arrPessoa2 = brinquedosPessoa2.split(',').map(x => x.trim().toUpperCase());
    const arrOrdem = ordemAnimais.split(',').map(x => x.trim().toUpperCase());
    
    for(let animal of arrOrdem){
      if(validarExistenciaDoAnimal(animal) || verificarDuplicados(arrOrdem)){
        const erro = { erro: 'Animal inválido'};
        console.log(erro);
        return;
      }
    }

    if(validarBrinquedos(arrPessoa1, arrPessoa2)){
      const erro = { erro: 'Brinquedo inválido'};
      console.log(erro);
      return;
    }
   
    for(let animal of arrOrdem){
      checaMatch(animal, arrPessoa1, arrPessoa2);
    }

    if(animaisPesquisados.length > 0){
      const resultado = { lista: animaisPesquisados.sort() };
      console.log(resultado);
    }
  }

}

// Teste
new AbrigoAnimais().encontraPessoas('RATO,SKATE,BOLA,LASER', 'BOLA,SKATE', 'Mimi,Rex,Loco,Loca');

//{ nome: "Rex", tipo: "cão", brinquedos: ["RATO", "BOLA"], status: 'abrigo', divideBrinquedo: true, ordemBrinquedo: true, companiaObrigatoria: false},
//{ nome: "Mimi", tipo: "gato", brinquedos: ["BOLA", "LASER"], status: 'abrigo', divideBrinquedo: false, ordemBrinquedo: true, companiaObrigatoria: false },
//{ nome: "Fofo", tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"], status: 'abrigo', divideBrinquedo: false, ordemBrinquedo: true, companiaObrigatoria: false },
//{ nome: "Zero", tipo: "gato", brinquedos: ["RATO", "BOLA"], status: 'abrigo', divideBrinquedo: false, ordemBrinquedo: true, companiaObrigatoria: false },
