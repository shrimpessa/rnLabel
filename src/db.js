import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('rnlabels.db')

export class DB {
    static init() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS rnlabels (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT, date TEXT, booked INT)',
                    [],
                    resolve, // success                    
                    (_, error) => reject(error) // _ - sql запрос
                )
            })
        })
    }
}