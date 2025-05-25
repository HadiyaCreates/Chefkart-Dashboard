import React from "react";

const CallBackRequest = () => {
  return (
    <div className="p-6 border rounded-2xl shadow-lg max-w-2xl mx-auto bg-white">
      <h2 className="text-xl font-bold text-center mb-4">Call Back Request</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Today's:</p>
          <input type="text" className="w-full border p-2 rounded-lg" />
          
          <p className="font-semibold mt-2">Week's:</p>
          <input type="text" className="w-full border p-2 rounded-lg" />
          
          <p className="font-semibold mt-2">Month's:</p>
          <input type="text" className="w-full border p-2 rounded-lg" />
        </div>
        
        <div>
          <p className="font-semibold">Total Request:</p>
          <input type="text" className="w-full border p-2 rounded-lg" />
          
          <p className="font-semibold mt-2">Open:</p>
          <input type="text" className="w-full border p-2 rounded-lg" />
          
          <p className="font-semibold mt-2">Closed:</p>
          <input type="text" className="w-full border p-2 rounded-lg" />
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-semibold">Calendar</h3>
        <div className="flex gap-2 mt-2">
          <p>From:</p>
          <input type="date" className="border p-2 rounded-lg" />
          <p>To:</p>
          <input type="date" className="border p-2 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default CallBackRequest;
