export const displayObject = (obj, parentKey = '') => {
  return Object.entries(obj).map(([key, value]) => {
    const currentKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      return (
        <li key={currentKey} style={{ listStyle: 'none' }}>
          <strong>{key}:</strong>
          <ul>{displayObject(value, currentKey)}</ul>
        </li>
      );
    } else {
      if (typeof value !== 'boolean') {
        return (
          <li key={currentKey} style={{ listStyle: 'none' }}>
            <strong>{key}: </strong>{value}
          </li>
        );
      }
    }
  });
};

export const runId = async (typeId) => {
  try {
    const response = await fetch("http://localhost:3000/nextID", {
      method: "GET",
    });
    const json = await response.json();
    const id = json[0][typeId];

    fetch("http://localhost:3000/nextID/1", {
      method: "PATCH",
      body: JSON.stringify({
        [typeId]: id + 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
    return `${id}`;
  } catch (error) {
    console.error("Error fetching next ID:", error);
    throw error;
  }
};