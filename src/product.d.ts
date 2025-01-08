export type DiscountItem = {
  minQuantity: number;
  discountedPrice: number;
  _id: string;
};
export type product = {
  _id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  salePrice: number;
  model: string;
  totalStock: number;
  createdAt: Date;
  updatedAt: Date;
  quantityDiscounts: DiscountItem[];
};
