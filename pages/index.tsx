import { useEffect, useState } from 'react';
import axios from 'axios';

interface Property {
  id: number;
  title: string;
  image: string;
  location: string;
  price: number;
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://api.example.com/properties');
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
            <img src={property.image} alt={property.title} className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-xl font-semibold">{property.title}</h2>
            <p className="text-gray-600">{property.location}</p>
            <p className="text-green-600 font-bold mt-2">KES {property.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
