type Taxonomy = {
  reino: string;
  division: string;
  clase: string;
  subclase: string;
  orden: string;
  familia: string;
  subfamilia: string;
  tribu: string;
  subtribu: string;
  genero: string;
};

type Plant = {
  commonName: string;
  scientificName: string;
  image?: string;
  description?: string;
  taxonomy?: Taxonomy;
};

export const plants: Plant[] = [
  {
    commonName: "suculenta",
    scientificName: "sedum prealtum",
  },
  {
    commonName: "jirafita",
    scientificName: "ledebouria socialis",
    description:
      " Soporta el sol ligero, su temperatura óptima de desarrollo es de 15 a 25°C, no tolera las heladas",
  },
];
