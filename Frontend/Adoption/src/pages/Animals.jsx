import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";

// Fake staff flag — replace with real user logic
const isStaff = true; // <-- Replace this with real role check (e.g. from context or props)

function Animals() {
  const [animal, setAnimal] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/animals")
      .then((res) => res.json())
      .then((data) => setAnimal(data))
      .catch((error) => console.error("Error fetching animals:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/animals/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete");
        }
        setAnimal((prev) => prev.filter((a) => a.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting animal:", error);
      });
  };

  return (
    <>
      <section>
        <h2 className="text-4xl font-bold mb-6 text-green-700 text-center">
          Our Furry Friends
        </h2>
      </section>

      {/* Changed gap-0 to gap-1 */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 **gap-1** ">
        {animal.length === 0 ? (
          <p className="text-gray-600">No animals available.</p>
        ) : (
          animal.map((animal) => (
            <div
              key={animal.id}
              // Kept w-56 to keep cards small
              className="rounded-xl shadow-md overflow-hidden hover:shadow-xl transform transition duration-300 w-56 relative"
            >
              <Link to={`/animals/${animal.id}`}>
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="font-semibold text-lg">{animal.name}</h3>
                  <p className="text-base text-black">Age: {animal.age}</p>
                </div>
              </Link>

              {/* Show only if staff */}
              {isStaff && (
                <button
                  onClick={() => handleDelete(animal.id)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 p-2 bg-white rounded-full shadow"
                  title="Delete Animal"
                >
                  <FaTrash />
                </button>
              )}
              <Link
                to={`/adopt/${animal.id}`}
                state={{ animal }} // sends the whole animal object
                title="Adopt Me"
                className="absolute top-2 left-2 text-green-600 hover:text-green-800 p-2 bg-white rounded-full shadow"
              >
                <FaPaw />
              </Link>
            </div>
          ))
        )}
      </section>
    </>
  );
}

export default Animals;
