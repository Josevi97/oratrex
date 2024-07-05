import { processCsv } from '@src/middlewares/csv.middleware';

const validHeaders = {
  "titulo": "title",
  "descripcion": "description",
}

const invalidHeaders = {
  "Titulo": "title",
  "Descripcion": "description",
}

const validContent = "titulo;Descripcion\rHarry potter; Pelicula de fantasia"

describe('Processing csv', () => {
  it("Should fail when trying process content", () => {
    const result = processCsv(invalidHeaders, validContent);
    expect(result.length).toBe(0);
  });

  it("Should process content to a valid object", () => {
    const result = processCsv(validHeaders, validContent);

    expect(result.length).toBe(1);
    expect('title' in result[0]).toBe(true);
    expect('description' in result[0]).toBe(true);
  });
});
