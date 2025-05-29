// import React, { useEffect, useState } from "react";

// const User = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Replace the URL with your actual backend endpoint for users
//     fetch("http://localhost:8000/auth/all")
//       .then((res) => res.json())
//       .then((data) => setUsers(data.data || []))
//       .catch((err) => console.error("Failed to fetch users", err));
//   }, []);

//   return (
//     <div>
//       <h2>User List</h2>
//       <table style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead>
//           <tr>
//             <th style={{ border: "1px solid #ddd", padding: 8 }}>Name</th>
//             <th style={{ border: "1px solid #ddd", padding: 8 }}>Email</th>
//             <th style={{ border: "1px solid #ddd", padding: 8 }}>Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length === 0 ? (
//             <tr>
//               <td colSpan={3} style={{ textAlign: "center", padding: 16 }}>
//                 No users found.
//               </td>
//             </tr>
//           ) : (
//             users.map((user) => (
//               <tr key={user._id}>
//                 <td style={{ border: "1px solid #ddd", padding: 8 }}>{user.name}</td>
//                 <td style={{ border: "1px solid #ddd", padding: 8 }}>{user.email}</td>
//                 <td style={{ border: "1px solid #ddd", padding: 8 }}>{user.role || "User"}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default User;