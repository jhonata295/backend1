const { calcularMediaAluno } = require("../src/calcularMediaAluno");

describe("Função calcularMediaAluno", () => {
  test("deve estar definida", () => {
    expect(calcularMediaAluno).toBeDefined();
  });

  test("deve lançar erro se a1 ou a2 forem undefined", () => {
    expect(() => calcularMediaAluno(undefined, 5)).toThrow("Notas a1 ou a2 não informadas");
    expect(() => calcularMediaAluno(5, undefined)).toThrow("Notas a1 ou a2 não informadas");
    expect(() => calcularMediaAluno(undefined, undefined)).toThrow("Notas a1 ou a2 não informadas");
  });

  test("deve lançar erro se a1 ou a2 forem negativas", () => {
    expect(() => calcularMediaAluno(-1, 5)).toThrow("Notas a1 ou a2 não podem ser negativas");
    expect(() => calcularMediaAluno(5, -2)).toThrow("Notas a1 ou a2 não podem ser negativas");
    expect(() => calcularMediaAluno(-3, -4)).toThrow("Notas a1 ou a2 não podem ser negativas");
  });

  test("deve calcular a média base com a1 * 0.4 + a2 * 0.6 quando a3 não for informada", () => {
    const resultado = calcularMediaAluno(7, 9); 
    const esperado = 7 * 0.4 + 9 * 0.6;         
    expect(resultado).toBeCloseTo(esperado, 1); 
  });
  

  test("deve lançar erro se a3 for negativa", () => {
    expect(() => calcularMediaAluno(5, 7, -1)).toThrow("Nota a3 não pode ser negativa");
  });

  test("quando a3 é informada e a melhor combinação é a1 e a3", () => {
    const resultado = calcularMediaAluno(8, 6, 9);
    const esperado = (8 + 9) / 2;
    expect(resultado).toBeCloseTo(esperado, 2);
  });
  
  test("quando a3 é informada e a melhor combinação é a3 e a2", () => {
   const resultado = calcularMediaAluno(5, 7, 9);
    const esperado = (9 + 7) / 2; 
    expect(resultado).toBeCloseTo(esperado, 2);
  });
  
});


