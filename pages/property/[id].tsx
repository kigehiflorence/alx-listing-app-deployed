import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import PropertyDetail from "@/components/property/PropertyDetail";

interface Property {
  id: number;
  title: string;
  image: string;
  location: string;
  price: number;
  description: string;
}

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  // Add more fields depending on your actual API response
}

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
        const response = await axios.get<Property>(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${propertyId}`
);

        if (response.status !== 200) {
          throw new Error("Failed to fetch property details");
        }
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property details:", error);
        setError("Failed to fetch property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p className="text-center">Loading property details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!property) return <p className="text-center">Property not found.</p>;

  return <PropertyDetail property={property} />;
}
