import express, { Response, Request, NextFunction } from "express";

const app = express();
const PORT = 3333;

app.use(express.json());

const products: string[] = ["Leite", "Pão", "café", "sabão", "Pão de Forma"];

function removerSpecials(texto: string): string {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello" });
});

app.get("/products", (req: Request, res: Response) => {
  const { name } = req.query;

  if (name) {
    const productsFilter = products.filter((item) => {
      const product = removerSpecials(item).toLowerCase();
      const search = removerSpecials(String(name)).toLowerCase();
      return product.includes(search);
    });
    return res.json(productsFilter);
  }

  return res.json(products);
});

app.post("/products", (req: Request, res: Response) => {
  const { product } = req.body;

  products.map((item) => {
    if (
      removerSpecials(item).toLowerCase() ===
      removerSpecials(product).toLowerCase()
    ) {
      throw new Error("Product already exists!");
    }
  });
  products.push(product);
  return res.status(201).json(product);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    return res.status(400).json(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`server run http://localhost:${PORT}`);
});
