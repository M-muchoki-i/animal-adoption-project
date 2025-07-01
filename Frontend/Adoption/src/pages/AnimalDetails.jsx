import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function AnimalDetails() {
  const [animal, setAnimal] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/animals/${id}`)
      .then((res) => res.json())
      .then((data) => setAnimal(data));
  }, [id]);

  if (!animal) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      {/* Left: Image */}
      <div className="relative">
        <img
          src={animal.image}
          alt={animal.name}
          className="rounded-xl object-cover w-full h-[400px]"
        />
         <Link
          to={`/adopt/${animal.id}`}
          state={{ animal }}
          title="Adopt Me"
          className="absolute top-2 left-2 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded shadow"
        >
          Adopt Me
        </Link>
      </div>

      {/* Right: Description Content */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{animal.name}</h1>

        <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
          {animal.adoption_status}
        </span>

        <p className="text-2xl text-gray-900">Age: {animal.age}</p>

        <p className="text-gray-700 leading-relaxed">{animal.description}</p>

        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <strong>Species:</strong> {animal.species}
          </p>
          <p>
            <strong>Gender:</strong> {animal.gender}
          </p>
          <p>
            <strong>Health:</strong> {animal.health_status}
          </p>
        
        </div>
        

        <details className="border rounded p-4">
          <summary className="font-medium text-lg">More Info</summary>
          <p className="text-gray-600 mt-2">
            This animal is looking for a loving home. If you're interested in
            adoption, please contact the shelter or visit us during working
            hours.
          </p>
        </details>
      </div>
    </div>
  );
}

export default AnimalDetails;
