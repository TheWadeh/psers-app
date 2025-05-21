// const mockUsers = [
//   {
//     id: "1",
//    password: "123",
//     role: "admin",
//   },
//   {
//     id: "2",
//    password: "123",
//     role: "commander",
//   },
//   {
//     id: "3",
//     password: "123",
//     role: "user",
//   },
// ];

// const mockApi = {
//   login(credentials) {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         const user = mockUsers.find(
//           (u) => u.id === credentials.id && u.password === credentials.password
//         );

//         if (user) {
//           resolve({
//             data: {
//               user: {
//                 id: user.id,
//                 name: user.name,
//                 role: user.role,
//               },
//               token: "mock-jwt-token-" + user.id,
//             },
//           });
//         } else {
//           reject(new Error("Invalid credentials"));
//         }
//       }, 500);
//     });
//   },

//   register(userData) {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const newUser = {
//           id: String(mockUsers.length + 1), // ID as a string
//           ...userData,
//           role: "user",
//         };
//         mockUsers.push(newUser);

//         resolve({
//           data: {
//             user: {
//               id: newUser.id,
//               name: newUser.name,
//               role: newUser.role,
//             },
//             token: "mock-jwt-token-" + newUser.id,
//           },
//         });
//       }, 500);
//     });
//   },

//   logout() {
//     return Promise.resolve({ data: { message: "Logged out" } });
//   },
// };

// export default mockApi;
