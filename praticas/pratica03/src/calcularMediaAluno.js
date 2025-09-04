function calcularMediaAluno(a1, a2, a3) {
    if (a1 === undefined || a2 === undefined) {
      throw new Error("Notas a1 ou a2 não informadas");
    }
  
    if (a1 < 0 || a2 < 0) {
      throw new Error("Notas a1 ou a2 não podem ser negativas");
    }
  
    if (a3 !== undefined && a3 < 0) {
      throw new Error("Nota a3 não pode ser negativa");
    }
  
    
    const mediaBase = a1 * 0.4 + a2 * 0.6;
  
    if (a3 === undefined) {
      return mediaBase;
    }
  
    
    const notas = [a1, a2, a3];
    notas.sort((a, b) => b - a); 
    const mediaMelhorCombinacao = (notas[0] + notas[1]) / 2;
  
  
    return Math.max(mediaBase, mediaMelhorCombinacao);
  }
  
  module.exports = { calcularMediaAluno };
  
  
  
  
  