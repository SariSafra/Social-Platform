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
        return (<li key={currentKey} style={{ listStyle: 'none' }}>
          <strong>{key}:</strong>
          {value}
        </li>)
      }
      else
        return (<></>)
    }
  })
    }
  

export const runId = async (objListName) => {
  const findMaxId = fetch(`http://localhost:3000/${objListName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const numericIds = data.map(item => Number(item.id)).filter(id => !isNaN(id));
        return (Math.max(...numericIds) + 1).toString();
      }
      else return "1";
    })
    .catch(error => {
      console.error(error);
      setGlobalError("Server error. try again later.")
    });
  const id = await findMaxId;
  return id;
}

