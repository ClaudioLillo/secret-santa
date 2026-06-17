

type Language = 'Spanish' | 'Italian' | 'English' 

export type BookItem = {
  name: string;
  pages?: number;
  year?: number;
  author?: string;
  editorial?: string;
  edition?: number;
  isbn?: string;
  language?: Language
};