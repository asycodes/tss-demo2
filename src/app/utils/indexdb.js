
const openDB = () => {
  return new Promise((resolve, reject) => {
      const request = window.indexedDB.open('myDatabase', 2);

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
  });
};
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