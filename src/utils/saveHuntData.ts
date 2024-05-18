export const saveHuntData = async (huntId: number, updatedHuntData: any) => {
  try {
    const response = await fetch(`http://localhost:5555/api/hunt-data/${huntId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedHuntData),
    });

    console.log(response.ok)

    if (!response.ok) {
      throw new Error('Failed to save hunt data');
    }
  } catch (error) {
    console.error(error);
  }
};
