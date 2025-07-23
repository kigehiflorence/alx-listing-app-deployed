export interface Property {
  id: number;
  name: string;
  location: string;
  price: number;
  description: string;
  // Add any other fields your API provides
}
export interface Review {
  id: number;
  propertyId: number;
  rating: number;
  comment: string;
  reviewerName: string;
}