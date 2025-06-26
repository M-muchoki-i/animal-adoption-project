import React from "react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 text-gray-800">
      <h2 className="text-4xl font-bold mb-6 text-green-700 text-center">
        About Us
      </h2>

      <p className="mb-6 text-lg text-center">
        At the{" "}
        <span className="font-semibold text-green-800">
          Animal Adoption Center
        </span>
        , we are passionate about giving abandoned, neglected, or surrendered
        animals a second chance at life. We provide a safe, loving environment
        for every pet until they find their forever home.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold text-green-700 mb-3">
            🐾 Our Mission
          </h3>
          <p className="text-gray-700">
            Our mission is simple:{" "}
            <strong className="text-green-800">
              Rescue, Rehabilitate, and Rehome
            </strong>
            . We rescue animals from unsafe conditions, rehabilitate them
            physically and emotionally, and connect them with loving families.
            We aim to end pet homelessness one adoption at a time.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-green-700 mb-3">
            ❤️ Our Values
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Compassion for all animals</li>
            <li>Integrity in our rescue and adoption process</li>
            <li>Collaboration with shelters, vets & the community</li>
            <li>Transparency and accountability</li>
            <li>Education on responsible pet ownership</li>
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-green-700 mb-3">
          🌍 Community Impact
        </h3>
        <p className="text-gray-700">
          Since our founding, we've successfully helped{" "}
          <strong className="text-green-800">over 1,200 animals</strong> find
          their forever homes. We also run community outreach programs, adoption
          events, and school education drives to raise awareness about animal
          welfare.
        </p>
      </div>

      <div className="mt-10 bg-green-50 border-l-4 border-green-700 p-6 rounded-md shadow">
        <h4 className="text-xl font-bold text-green-800 mb-2">Thank You</h4>
        <p className="text-gray-700">
          Whether you’re here to adopt, volunteer, donate, or simply learn more,
          your support helps us save lives. Together, we are building a kinder,
          safer world for all animals — <strong>one paw at a time 🐾</strong>.
        </p>
      </div>
    </div>
  );
};

export default About;
