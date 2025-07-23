import { useEffect, useState } from 'react';
import axios from 'axios';

type Property = {
  id: string;
  name: string;
  location: string;
  price: number;
  image: string;
  // Add other expected fields here
};


interface PropertyDetailProps {
  propertyId: string;
}
export default function Home() {
  const [property, setProperty] = useState<Property | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
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
    const fetchProperties = async () => {
      try {
        const response = await axios.get<Property>(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${propertyId}`
);

        );
        if (response.status !== 200) {
          throw new Error('Failed to fetch properties');
        }
        setProperties(response.data);
      } catch (err) {
        setError('Failed to fetch properties.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p className="text-center">Loading properties...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Property Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="border rounded-lg shadow p-4">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold">{property.title}</h2>
            <p className="text-gray-600">{property.location}</p>
            <p className="text-green-600 font-bold mt-2">
              KES {property.price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
