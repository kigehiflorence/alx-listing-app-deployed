// app/property-details/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Property } from "@/types"; // ✅ Adjust path if needed

const PropertyDetails = () => {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("id");
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!propertyId || Array.isArray(propertyId)) return;

    const fetchProperty = async () => {
      try {
        const response = await axios.get<Property[]>(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/properties`
);
setProperties(response.data); // assuming you have setProperties in your state
        const propertyResponse = await axios.get<Property>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${propertyId}`
        );
        setProperty(propertyResponse.data);
      } catch (error) {
        console.error("Failed to fetch property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (!propertyId || Array.isArray(propertyId)) {
    return <p>Invalid property ID</p>;
  }

  if (loading) return <p>Loading...</p>;

  if (!property) return <p>Property not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
      <p className="text-gray-700 mb-2">{property.description}</p>
      <p className="text-sm text-gray-500">
        Location: {property.location} | Price: ${property.price}
      </p>
    </div>
  );
};

export default PropertyDetails;
