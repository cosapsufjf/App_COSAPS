function calcChecker(digits: string, factor: number): number {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    sum += parseInt(digits.charAt(i), 10) * (factor - i);
  }
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export default function validateCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, '');

  if (cleaned.length !== 11) return false;

  if (/^(\d)\1{10}$/.test(cleaned)) return false;

  const firstNine = cleaned.substring(0, 9);
  const checker1 = calcChecker(firstNine, 10);
  const checker2 = calcChecker(firstNine + checker1, 11);

  return cleaned.endsWith(`${checker1}${checker2}`);
}