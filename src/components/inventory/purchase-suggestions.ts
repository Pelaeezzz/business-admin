export interface PurchaseSuggestion {
    id: string;
    name: string;
    image: string;
    unit: string;
    /** Cantidad que hace falta reponer */
    needed: number;
    supplier: string;
    pricePerUnit: number;
    /** Unidad del precio: "L", "kg", "ud", "caja"... */
    priceUnit: string;
  }
  
  export const purchaseSuggestions: PurchaseSuggestion[] = [
    {
      id: "ACE-001",
      name: "Aceite de oliva virgen extra",
      image: "/file.svg",
      unit: "botellas",
      needed: 24,
      supplier: "Aceites del Sur",
      pricePerUnit: 12.5,
      priceUnit: "L",
    },
    {
      id: "ARR-014",
      name: "Arroz bomba",
      image: "/file.svg",
      unit: "sacos",
      needed: 30,
      supplier: "Arroces Valencia",
      pricePerUnit: 1.85,
      priceUnit: "kg",
    },
    {
      id: "CAF-032",
      name: "Café molido natural",
      image: "/file.svg",
      unit: "paquetes",
      needed: 40,
      supplier: "Cafés Selectos",
      pricePerUnit: 9.9,
      priceUnit: "kg",
    },
    {
      id: "LEC-008",
      name: "Leche entera",
      image: "/file.svg",
      unit: "cajas",
      needed: 60,
      supplier: "Lácteos Norte",
      pricePerUnit: 0.95,
      priceUnit: "L",
    },
    {
      id: "AZU-021",
      name: "Azúcar blanco",
      image: "/file.svg",
      unit: "bolsas",
      needed: 50,
      supplier: "Azucarera Ibérica",
      pricePerUnit: 0.8,
      priceUnit: "kg",
    },
    {
      id: "HAR-005",
      name: "Harina de trigo",
      image: "/file.svg",
      unit: "sacos",
      needed: 20,
      supplier: "Molinos del Duero",
      pricePerUnit: 0.65,
      priceUnit: "kg",
    },
    {
      id: "SAL-011",
      name: "Sal marina fina",
      image: "/file.svg",
      unit: "paquetes",
      needed: 35,
      supplier: "Salinas del Mar",
      pricePerUnit: 0.45,
      priceUnit: "kg",
    },
    {
      id: "TOM-019",
      name: "Tomate triturado",
      image: "/file.svg",
      unit: "latas",
      needed: 48,
      supplier: "Conservas Rojas",
      pricePerUnit: 2.1,
      priceUnit: "kg",
    },
  ];