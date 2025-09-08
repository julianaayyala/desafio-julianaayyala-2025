const animais = [
  {nome: "Rex", tipo: "cão", brinquedos: ["RATO", "BOLA"]},
  {nome: "Mimi", tipo: "gato", brinquedos: ["BOLA", "LASER"]},
  {nome: "Fofo", tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"]},
  {nome: "Zero", tipo: "gato", brinquedos: ["RATO", "BOLA"]},
  {nome: "Bola", tipo: "cão", brinquedos: ["CAIXA", "NOVELO"]},
  {nome: "Bebe", tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"]},
  {nome: "Loco", tipo: "jabuti", brinquedos: ["SKATE", "RATO"]}
];

function exibeAnimais(animais){
    for (const animal of animais){
        console.log(` ${animal.nome} (${animal.tipo}) tem os brinquedos:`);
        
        if(animal.tipo === 'gato'){
            console.log(` Gatos não compartilham seus brinquedos`);
        }
        for (const brinquedo of animal.brinquedos){
            console.log(`   - ${brinquedo}`);
        }
    }    
}

function validaExistenciaDoAnimal(nomeAnimal){
    const animal = animais.find(a => a.nome.toUpperCase() === nomeAnimal.toUpperCase());

    if (animal){
        console.log(`\n O ${animal.nome} existe!`);
        console.log(`   Gosta dos brinquedos:`);
        for (const brinquedo of animal.brinquedos){
            console.log(`   - ${brinquedo}`);
        }
        return animal;
    } else {
        console.log(`\n O ${nomeAnimal} não existe!`);
        return null;
    }
}

function validaExistenciaDoBrinquedo(nomeBrinquedo, animal, pessoa){
    const brinquedoEncontrado = animal.brinquedos.some(
        b => b.toUpperCase() === nomeBrinquedo.toUpperCase());

    if (brinquedoEncontrado){
        console.log(`    ${pessoa} deu match: ${animal.nome} tem o brinquedo ${nomeBrinquedo}!`);
        return true;
    }
    return false;
}

class AbrigoAnimais {
    encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
  
      const arrPessoa1 = brinquedosPessoa1.split(',').map(x => x.trim().toUpperCase());
      const arrPessoa2 = brinquedosPessoa2.split(',').map(x => x.trim().toUpperCase());
      const arrOrdem   = ordemAnimais.split(',').map(x => x.trim());
  
      for(const nomeAnimal of arrOrdem){
          const animal = validaExistenciaDoAnimal(nomeAnimal);
          if (!animal) continue;
  
          for(const brinquedo of arrPessoa1){
              validaExistenciaDoBrinquedo(brinquedo, animal, "Pessoa 1");
          }
  
          for(const brinquedo of arrPessoa2){
              validaExistenciaDoBrinquedo(brinquedo, animal, "Pessoa 2");
          }
      }
    }
}

new AbrigoAnimais().encontraPessoas(
  'Rato,bola', 'RATO,NOVELO', 'Rex,Fofo');

//new AbrigoAnimais().encontraPessoas('BOLA,LASER',
  //    'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');
