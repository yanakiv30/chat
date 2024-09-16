// export async function fetchUsers() {
//     const response = await fetch('http://localhost:3000/api/users');
//     if (!response.ok) {
//       throw new Error('Failed to fetch users');
//     }
//     return response.json();
//   }

  export async function fetchUsersClient() {
    const response = await fetch('/api/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  }

  

  export async function deleteUser() { 
    
    const response = await fetch("api/users/delete", {
      method: "DELETE",     
    });  
    const result = await response.json();
  
    if (!response.ok) {
      throw new Error(result.error || 'Failed to delete user');
    }  
    return result;
  }