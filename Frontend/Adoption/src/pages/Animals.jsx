import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaPaw } from "react-icons/fa";

function Animals() {
  const [animal, setAnimal] = useState([]);
  const navigate = useNavigate();

  
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetch("http://localhost:5000/animals", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized or error fetching animals");
        }
        return res.json();
      })
      .then((data) => setAnimal(data))
      .catch((error) => {
        console.error("Error fetching animals:", error);
       
      });
  }, [token, navigate]);

  const handleDelete = (id) => {
    if (!token) {
      alert("You must be logged in as staff to delete");
      navigate("/login");
      return;
    }

    fetch(`http://localhost:5000/animals/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        setAnimal((prev) => prev.filter((a) => a.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting animal:", error);
        alert("Unauthorized or failed to delete");
      });
  };

  return (
    <>
      <section>
        <h2 className="text-4xl font-bold mb-6 text-green-700 text-center">
          Our Fury Friends
        </h2>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
        {animal.length === 0 ? (
          <p className="text-gray-600">No animals available.</p>
        ) : (
          animal.map((animal) => (
            <div
              key={animal.id}
              className="rounded-xl shadow-md overflow-hidden hover:shadow-xl transform transition duration-300 w-84 relative"
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
                   {user?.role === "staff" && (
                   <p className="text-base text-gray-800 font-semibold">Animal ID: {animal.id}</p>
                     )}
                </div>
              </Link>

              {/* ✅ Only show delete button if user is staff */}
              {user?.role === "staff" && (
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
                state={{ animal }}
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
