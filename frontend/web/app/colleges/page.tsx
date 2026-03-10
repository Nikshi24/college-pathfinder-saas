"use client";

import { useEffect, useState } from "react";
import API from "../../src/lib/api";

export default function CollegesPage() {

  const [colleges, setColleges] = useState<any[]>([]);

  useEffect(() => {

    const loadColleges = async () => {

      const res = await API.get("/colleges");

      setColleges(res.data.data || res.data);

    };

    loadColleges();

  }, []);

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Search Colleges
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {colleges.map((college) => (

          <div
            key={college.id}
            className="p-6 border rounded-lg"
          >

            <h3 className="text-xl font-semibold">
              {college.name}
            </h3>

            <p>Location: {college.location}</p>

            <p>Ranking: {college.ranking}</p>

            <p>Fees: {college.fees}</p>

          </div>

        ))}

      </div>

    </div>

  );
}