

export const getImageUrl = async (path: string): Promise<string | null> => {
  try {
    const response = await fetch(`/api/images?path=${encodeURIComponent(path)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch image URL');
    }
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error getting image URL:', error);
    return null;
  }
};

// Function to upload image
export const uploadImage = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/images', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.path;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

// Function to delete image
export const deleteImage = async (path: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/images?path=${encodeURIComponent(path)}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete image');
    }

    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};
