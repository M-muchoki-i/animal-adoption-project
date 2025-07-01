import { useState, useEffect } from "react";
// import {Link} from 'react-router-dom'

function AnimalList() {
  const [adoptions, setAdoptions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/adoptions")
      .then((res) => res.json())
      .then((data) => {
        setAdoptions(data);
      });
  }, []);

  return (
    <>
      <section className="text-4xl font-bold mb-6 text-green-700 text-center">
        <h1> Track your adoption status </h1>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 ml-10 ">
        {adoptions.map((adoption) => (
          <div
            key={adoption.id}
            className="rounded-xl shadow-md overflow-hidden hover:shadow-xl transform transition duration-300 w-72  "
          >
            <img
              src={adoption.animal.image}
              alt={""}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
              <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                {adoption.status}
              </span>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h1>{adoption.animal.name}</h1>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default AnimalList;
