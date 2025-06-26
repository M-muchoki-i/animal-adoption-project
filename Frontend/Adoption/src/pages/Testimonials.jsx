import React from "react";

const testimonials = [
  {
    name: "Jane Mwende",
    text: "Adopting from this center changed my life. Bella has brought so much joy into our home!",
    image:
      "https://media.istockphoto.com/id/1191767798/photo/happy-african-american-athlete-enjoying-with-her-dog-in-the-park.jpg?s=612x612&w=0&k=20&c=jmjBmwp7mNDhhgBHuqX_L_UfqOk4QGZHYiHWBGpHGTU=",
  },
  {
    name: "Kevin Otieno",
    text: "The staff were so helpful. I found the perfect companion — Simba, my loyal dog.",
    image:
      "https://media.istockphoto.com/id/1367150296/photo/happy-young-african-american-man-petting-his-dog-outdoors-in-nature.jpg?s=612x612&w=0&k=20&c=HZT5V05AdmWbcUjeoYcJypF_20VYII8vv6iXxb2gJCg=",
  },
  {
    name: "Wanjiku Kariuki",
    text: "It feels great knowing I gave a stray cat a loving home. Thank you for all the support!",
    image:
      "https://media.istockphoto.com/id/1425107939/photo/african-american-woman-is-playing-with-her-french-bulldog-puppy-while-walking-in-the-dog-park.jpg?s=612x612&w=0&k=20&c=-n5PMV-oiMejkUIMmbrS7RZe3rMFUDQg4vPNa3ANZdQ=",
  },
  {
    name: "Brian Kiptoo",
    text: "Luna has brought peace and energy into my home. I’m forever grateful to this center.",
    image:
      "https://media.gettyimages.com/id/1765600103/photo/senior-black-man-playing-with-his-dogs-at-home.jpg?s=2048x2048&w=gi&k=20&c=GOkATJJsS8IzgTTYX2-O21N_7PJfCgZ12rFGWrfU4h4=",
  },
  {
    name: "Faith Nyambura",
    text: "I adopted Nala and now my kids can’t stop smiling. Truly a blessing!",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQvBKgsnXhFTAFUlZLc58Cn9S23eFvqbUrIg&s",
  },
  {
    name: "Daniel Kibet",
    text: "I was impressed by how organized and caring the staff were. Highly recommended!",
    image:
      "https://media.istockphoto.com/id/1494747134/photo/latin-american-man-walking-with-his-cute-dog-at-sunny-day-in-city-park-lawn-on-the-grass.jpg?s=612x612&w=0&k=20&c=YYLamtJTKI4D_1WNQ074RQa-krBFUA4vnkO04DpDXCE=",
  },
  {
    name: "Agnes Achieng",
    text: "Adopting a cat helped me cope with loneliness. Thank you for giving me a friend.",
    image:
      "https://media.istockphoto.com/id/522185081/photo/arent-you-so-cute.jpg?s=612x612&w=0&k=20&c=93exQv70pok-Nx7CxsWdGOg_oKtGCai3r1fV5IR5qE8=",
  },
  {
    name: "Tom Muli",
    text: "I had never owned a pet before, but they guided me through everything. Amazing experience!",
    image:
      "https://thumbs.dreamstime.com/b/young-african-guy-playing-his-pet-dog-side-portrait-sitting-table-home-working-laptop-67103726.jpg",
  },
];


const Testimonials = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        What Our Adopters Say
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-100 flex gap-4 items-start"
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-16 h-16 rounded-full object-cover border border-green-500"
            />
            <div>
              <p className="text-lg font-semibold text-green-800">{t.name}</p>
              <p className="text-gray-700 mt-1 italic">“{t.text}”</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
