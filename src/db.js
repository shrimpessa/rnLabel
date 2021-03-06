import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('labels.db')

export class DB {
    static init() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    // 'DROP TABLE labels',
                    'CREATE TABLE IF NOT EXISTS labels (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT, date TEXT, booked INT, category TEXT, price INT, currency TEXT, season TEXT, it TEXT, eu TEXT, es TEXT, fr TEXT, uk TEXT, usa TEXT, universalSize TEXT, caresigns TEXT, notes TEXT, us TEXT, jp TEXT, chn TEXT, ru TEXT)',
                    [],
                    resolve, // success                    
                    (_, error) => reject(error) // _ - sql запрос                                                 
                )
            })
        })
    }

    static getPosts() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM labels',
                    [],
                    (_, result) => resolve(result.rows._array), // получаем набор всех данных из таблицы
                    (_, error) => reject(error)
                )
            })
        })
    }

    static createPost({ text, date, booked, img, category, price, currency, season, it, eu, es, fr, uk, usa, universalSize, caresigns, notes, us, jp, chn, ru }) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO labels (text, date, booked, img, category, price, currency, season, it, eu, es, fr, uk, usa, universalSize, caresigns, notes, us, jp, chn, ru) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [text, date, 0, img, category, price, currency, season, it, eu, es, fr, uk, usa, universalSize, caresigns, notes, us, jp, chn, ru],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static updatePost(post) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE labels SET booked = ? WHERE id = ?',
                    [post.booked ? 0 : 1, post.id],
                    resolve,                  
                    (_, error) => reject(error)
                )
            })
        })
    }

    static removePost(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM labels WHERE id = ?',
                    [id],
                    resolve,                  
                    (_, error) => reject(error)
                )
            })
        })
    }
}