import Size from '@/interfaces';
interface ProductImage {
    url: string;
  }
  
  interface Product {
    title: string;
    slug: string;
    ProductImage: ProductImage[];
  }
  
  interface OrderItem {
    quantity: number;
    price: number;
    size: Size;
    product: Product;
  }
  
  interface OrderAddress {
    id: string;
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phoneNumber: string;
    orderId: string;
  }
  
  export interface Order {
    OrderItem: OrderItem[];
    OrderAddress: OrderAddress;
  }