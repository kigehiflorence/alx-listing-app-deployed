import React from "react";
import ReviewSection from '@/components/property/ReviewSection';



interface Property {
  id: number;
  title: string;
  image: string;
  location: string;
  price: number;
  title: string;
  description: string;
}

interface PropertyDetailProps {
  property: Property;
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">{property.title}</h1>

        <img
          src={property.image}
          alt={property.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />

        <p className="text-gray-600 mb-2">Location: {property.location}</p>
        <p className="text-green-600 font-bold mb-4">
          KES {property.price.toLocaleString()}
        </p>

        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{property.description}</p>
      </div>

      <ReviewSection propertyId={property.id} />
    </>
  );
}
