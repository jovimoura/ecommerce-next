export type ItemProps = {
  id: string;
  imageUrl: string;
  title: string;
  type: string;
  price: string | number;
};

export type Product = {
  categorie: string;
  color: string;
  id: string;
  name: string;
  price: number;
  description: {
    html: string;
  };
  image: {
    url: string;
    id: string;
  };
};
