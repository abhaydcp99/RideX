import { Link } from "react-router-dom";

const featuredCars = [
  {
    id: 1,
    name: "Toyota Corolla",
    price: "$50/day",
    image: "/images/car1.jpg",
  },
  {
    id: 2,
    name: "Honda Civic",
    price: "$60/day",
    image: "/images/car2.jpg",
  },
  {
    id: 3,
    name: "Tesla Model 3",
    price: "$120/day",
    image: "/images/car3.jpg",
  },
];

const ExploreCars = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Featured Cars</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredCars.map((car) => (
          <div key={car.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{car.name}</h2>
            <p className="text-gray-600">{car.price}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/" className="text-blue-600 hover:underline">
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ExploreCars;
