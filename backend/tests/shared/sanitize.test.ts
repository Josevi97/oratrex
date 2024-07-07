import sanitize from "@src/shared/sanitize";

describe('Sanitizing', () => {
  it('Should remove not allowed characters for string', () => {
    const invalidInput = "@ 57";
    const expected = "57";

    expect(sanitize.fromUnknown(invalidInput)).toEqual(expected);
  });

  it('Should remove not allowed characters for array', () => {
    const invalidInput = ["@ 57", "-{*A B,c"];
    const expected = ["57", "A Bc"];

    expect(sanitize.fromUnknown(invalidInput)).toEqual(expected);
  });

  it('Should remove not allowed characters for object', () => {
    const invalidInput = { title: '-{*A B,c', }
    const expected = { title: 'A Bc', }

    expect(sanitize.fromUnknown(invalidInput)).toEqual(expected);
  });

  it('Should remove not allowed characters for mixing structure data', () => {
    const invalidInput = { title: '-{*A B,c', authors: [{ name: 'Jimmy$'}] }
    const expected = { title: 'A Bc', authors: [{ name: 'Jimmy'}] }

    expect(sanitize.fromUnknown(invalidInput)).toEqual(expected);
  });
});
