import { processCsv } from '@src/middlewares/csv.middleware';

const validContent = "titulo;descripcion\rHarry potter; Pelicula de fantasia"

const validHeaders = {
  "titulo": "title",
  "descripcion": "description",
}

const invalidHeaders = {
  "Titulo": "title",
  "Descripcion": "description",
}

describe('Processing csv', () => {
  it("Should fail when trying process content", () => {
    const result = processCsv(invalidHeaders, validContent);
    expect(result).toBe(null);
  });

  it("Should process content to a valid object", () => {
    const result = processCsv(validHeaders, validContent);

    expect(result).not.toBe(null);
    expect(result!.length).toBe(1);
    expect('title' in result![0]).toBe(true);
    expect('description' in result![0]).toBe(true);
  });
});
