// returns a score on based on the accuracy between several string fields on an object and an given input
export default function multimatcher(
  options: Record<string, unknown>[],
  input: string
) {
  const results: [number, Record<string, unknown>][] = [];
  for (const option of options) {
    let score = 0;
    let divisor = 0;

    for (const value of Object.values(option)) {
      if (typeof value !== "string") {
        continue;
      }
      let copy = `${input}`;

      for (const letter of value) {
        console.log(copy);
        const index = copy.indexOf(letter);
        if (index !== -1) {
          score += 1;
          copy = replaceOne(copy, index);
        }
        divisor += 1;
      }
    }
    results.push([score / divisor, option]);
  }
  return results.sort((a, b) => b[0] - a[0]).map((item) => item[1]);
}

export const replaceOne = (input: string, index: number) => {
  return input.slice(0, index) + "*" + input.slice(index + 1);
};
