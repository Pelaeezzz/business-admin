export interface AlertProduct {
    id: string;
    name: string;
    image: string;
    unit: string;
    minStock: number;
    stock: number;
  }
  
  export const alertProducts: AlertProduct[] = [
    {
      id: "ACE-001",
      name: "Aceite de oliva virgen extra",
      image: "/file.svg",
      unit: "Botella 1 L",
      minStock: 12,
      stock: 3,
    },
    {
      id: "ARR-014",
      name: "Arroz bomba",
      image: "/file.svg",
      unit: "Saco 5 kg",
      minStock: 10,
      stock: 2,
    },
    {
      id: "CAF-032",
      name: "Café molido natural",
      image: "/file.svg",
      unit: "Paquete 250 g",
      minStock: 20,
      stock: 0,
    },
    {
      id: "LEC-008",
      name: "Leche entera",
      image: "/file.svg",
      unit: "Caja 1 L",
      minStock: 30,
      stock: 8,
    },
    {
      id: "AZU-021",
      name: "Azúcar blanco",
      image: "/file.svg",
      unit: "Bolsa 1 kg",
      minStock: 25,
      stock: 5,
    },
    {
      id: "HAR-005",
      name: "Harina de trigo",
      image: "/file.svg",
      unit: "Saco 25 kg",
      minStock: 8,
      stock: 1,
    },
    {
      id: "SAL-011",
      name: "Sal marina fina",
      image: "/file.svg",
      unit: "Paquete 500 g",
      minStock: 15,
      stock: 4,
    },
    {
      id: "TOM-019",
      name: "Tomate triturado",
      image: "/file.svg",
      unit: "Lata 400 g",
      minStock: 24,
      stock: 6,
    },
  ];