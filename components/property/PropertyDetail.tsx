// pages/index.tsx or pages/home.tsx

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Property } from "@/types";
import PropertyDetail from "@/components/property/PropertyDetail"; // ✅ import the component

export default function Home() {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const propertyId = "123"; // Or get from router/query if dynamic

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

  return <PropertyDetail property={property} />;
}
