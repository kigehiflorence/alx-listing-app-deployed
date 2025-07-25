"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Property } from "@/types"; // Adjust path if needed

export default function Home() {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const propertyId = "123"; // ✅ Make sure this line is above where it's used

    const fetchProperty = async () => {
      try {
        const response = await axios.get<Property>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${propertyId}`
        );
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, []);

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
}
