function exemplo_somar(numero1, numero2) {
  if (typeof numero1 !== "number") {
    return "Erro";
  }
  return numero1 + numero2;
}

exports.exemplo_somar = exemplo_somar;
