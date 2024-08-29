export async function getMessages() {
    const response = await fetch('/api/messages');
    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }
    return response.json();
  }
  
  export async function createMessage(newGroupMessageObject: any) {
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGroupMessageObject),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create message');
    }
  
    return response.json();
  }
  
  export async function updateMessage(idForEdit: number, updateContent: string) {
    const response = await fetch('/api/messages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: idForEdit, message: updateContent }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Message could not be edited');
    }
  
    return response.json();
  }
  
  export async function deleteMessage(idForDelete: string) {
    const response = await fetch('/api/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: idForDelete }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete message');
    }
  
    return response.json();
  }