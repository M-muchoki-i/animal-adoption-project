import { useState, useEffect } from "react";
// import {Link} from 'react-router-dom'

function Animals() {
  const [animal, setAnimal] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/animals")
      .then((res) => res.json())
      .then((data) => {
        setAnimal(data);
      });
  }, []);

  return (
    <>
    
      <section >
        <h2 className="text-4xl font-bold mb-6 text-green-700 text-center">
        Our Fury Friends
      </h2>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 ml-10 ">
        {animal.map((animal) => (
          
          <div
            key={animal.id}
            className="rounded-xl shadow-md overflow-hidden hover:shadow-xl transform transition duration-300 w-72  "
           
          >
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold text-lg">{animal.name}</h3>
              <p className="text-sm text-black">{animal.description}</p>
            </div>
          </div>
        ))}
      </section>
      
    </>
  );
}

export default Animals;