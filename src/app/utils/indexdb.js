
const openDB = () => {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined") {
      const request = indexedDB.open('myDatabase', 2);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Check if the object store already exists
        if (!db.objectStoreNames.contains('myStore')) {
            const objectStore = db.createObjectStore('myStore', { autoIncrement: true });
        }

        resolve(db);
    };

      request.onsuccess = (event) => {
          const db = event.target.result;
          // Resolve with the database instance
          resolve(db);
      };

      request.onerror = (event) => {
          reject('Error opening database: ' + event.target.errorCode);
      };
}else{
  console.error("Cannot use indexedDB on the server side.");
}
}

  )}
  export const addData = async (id,dataArray) => {
    const db = await openDB();
  
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('myStore', 'readwrite');
      const objectStore = transaction.objectStore('myStore');
  
      const request = objectStore.add({filename: id, jobsselectedstring: dataArray });
  
      request.onsuccess = () => {
        resolve();
      };
  
      request.onerror = (event) => {
        reject('Error adding data: ' + event.target.errorCode);
      };
    });
  };
  
  export const getLatestData = async () => {
    const db = await openDB();
  
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('myStore', 'readonly');
      const objectStore = transaction.objectStore('myStore');
      
      const request = objectStore.openCursor(null, 'prev');
  
      request.onsuccess = (event) => {
        const cursor = event.target.result;
  
        if (cursor) {
          const latestData = cursor.value;
          resolve(latestData);
        } else {
          resolve(null);
        }
      };
  
      request.onerror = (event) => {
        reject('Error getting latest data: ' + event.target.errorCode);
      };
    });
  };

  export const updateLatestDataAttribute = async (attribute, value) => {
    const db = await openDB();
  
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('myStore', 'readwrite');
      const objectStore = transaction.objectStore('myStore');
  
      // Get the latest data
      const request = objectStore.openCursor(null, 'prev');
  
      request.onsuccess = (event) => {
        const cursor = event.target.result;
  
        if (cursor) {
          // Update the specified attribute with the new value
          cursor.value[attribute] = value;
  
          // Save the updated data
          const updateRequest = cursor.update(cursor.value);
  
          updateRequest.onsuccess = () => {
            resolve();
          };
  
          updateRequest.onerror = (event) => {
            reject('Error updating latest data: ' + event.target.errorCode);
          };
        } else {
          // No data found
          resolve();
        }
      };
  
      request.onerror = (event) => {
        reject('Error getting latest data for update: ' + event.target.errorCode);
      };
    });
  };