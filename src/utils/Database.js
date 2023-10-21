import { openDatabase } from 'react-native-sqlite-storage';


// Open and export the database
const db = openDatabase({ name: 'taskhub.db', location: 'default' });

export default db;

export const createTableIfNotExists = (tableName, tableDefinition) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
        [tableName],
        (tx, res) => {
          if (res.rows.length === 0) {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName} ${tableDefinition}`)
            console.log(`Table ${tableName} created successfully`);
          } else {
            console.log(`Table ${tableName} already exists`);
          }
        },
      );
    });
  };
  
  export const insertDataIntoTable = (tableName, data, onSuccess, onError) => {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data).map((value) => `'${value}'`).join(', ');
  
    db.transaction(
      (tx) => {
        tx.executeSql(`INSERT INTO ${tableName} (${columns}) VALUES (${values})`, [], (_, resultSet) => {
          if (onSuccess) {
            onSuccess(resultSet); // Pass the result set to the success callback
          }
        });
      },
      (error) => {
        if (onError) {
          onError(error); // Pass the error to the error callback
        }
      }
    );
  };

  export const retrieveDataFromTable = (tableName, onSuccess, onError) => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM ${tableName}`, [], (_, resultSet) => {
        if (onSuccess) {
          onSuccess(resultSet);
        }
      }, (error) => {
        if (onError) {
          onError(error);
        }
      });
    });
  };
 
  export const deleteDataFromTable = (tableName, whereClause, onSuccess, onError) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`DELETE FROM ${tableName} WHERE ${whereClause}`, [], (_, resultSet) => {
          if (onSuccess) {
            onSuccess(resultSet); // Pass the result set to the success callback
          }
        });
      },
      (error) => {
        if (onError) {
          onError(error); // Pass the error to the error callback
        }
      }
    );
  };