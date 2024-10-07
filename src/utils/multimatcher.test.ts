import multimatcher, { replaceOne } from "./multimatcher";

describe("multimatcher", () => {
  it("should have better score if more characters are contained", () => {
    const options = [
      { name: "How to Build a House", author: "Bob Builder" },
      { name: "A different Title", author: "Bob Builder" },
      { name: "How to Build a Horse", author: "Dwight Schrute" },
    ];
    const input = "how to build a house bob";
    const result = multimatcher(options, input);
    expect(result).toEqual([
      { name: "How to Build a House", author: "Bob Builder" },
      { name: "How to Build a Horse", author: "Dwight Schrute" },
      { name: "A different Title", author: "Bob Builder" },
    ]);
  });
});

describe("replaceOne", () => {
  it("can replace by * on the given index", () => {
    const replaced = replaceOne("arbol", 3);
    expect(replaced).toBe("arb*l");
  });
});
