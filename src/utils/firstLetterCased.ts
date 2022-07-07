export function firstLetterCased(name: string) {
  const [firstLetter, ...restOfName] = name.split("");
  const firstLetterName = [firstLetter.toUpperCase(), ...restOfName].join("");

  return firstLetterName;
}
