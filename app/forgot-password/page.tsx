// "use client";

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function ForgotPassword() {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/api/auth/forgot-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage('Password reset instructions sent to your email.');
//       } else {
//         setMessage(data.error || 'An error occurred. Please try again.');
//       }
//     } catch (error) {
//       setMessage('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>Forgot Password</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email:
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Send Reset Instructions</button>
//       </form>
//       <button onClick={() => router.push('/login')}>Back to Login</button>
//     </div>
//   );
// }