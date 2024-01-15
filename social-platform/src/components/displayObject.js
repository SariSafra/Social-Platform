const displayObject = (obj, updateValue, index, parentKey = '') => {
    return Object.entries(obj).map(([key, value]) => {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof value === 'object' && value !== null) {
        return (
          <li key={currentKey} style={{ listStyle: 'none' }}>
            <strong>{key}:</strong>
            <ul>{displayObject(value, currentKey, updateValue)}</ul>
          </li>
        );
      } else {
        return (
          <li key={currentKey} style={{ listStyle: 'none' }}>
            <strong>{key}:</strong>
            {typeof value === 'boolean' ? (
             <input type="checkbox" checked={value} onChange={() => updateValue(currentKey, !value, index)}/>
            ) : (
              value
            )}
          </li>
        );
      }
    });
  };