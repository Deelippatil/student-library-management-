const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

let dbInstance = null;
let dbType = 'sqlite'; // 'mysql' or 'sqlite'

class DatabaseWrapper {
  constructor() {
    this.type = 'sqlite';
    this.sqliteDb = null;
    this.mysqlPool = null;
  }

  async init() {
    const requestedClient = (process.env.DB_CLIENT || 'auto').toLowerCase();

    if (requestedClient === 'mysql') {
      try {
        const mysql = require('mysql2/promise');
        this.mysqlPool = mysql.createPool({
          host: process.env.DB_HOST || '127.0.0.1',
          port: parseInt(process.env.DB_PORT || '3306', 10),
          user: process.env.DB_USER || 'root',
          password: process.env.DB_PASSWORD || '',
          database: process.env.DB_NAME || 'library_management',
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0
        });
        // Test connection
        const conn = await this.mysqlPool.getConnection();
        conn.release();
        this.type = 'mysql';
        console.log('✅ Connected to MySQL database successfully.');
      } catch (err) {
        console.warn('⚠️ Could not connect to MySQL (' + err.message + '). Falling back to built-in SQLite engine.');
        this.initSqlite();
      }
    } else {
      this.initSqlite();
    }

    await this.initTables();
  }

  initSqlite() {
    const { DatabaseSync } = require('node:sqlite');
    const dbFile = process.env.DB_FILE || './data/library.db';
    const dbPath = path.resolve(__dirname, '../../', dbFile);
    const dir = path.dirname(dbPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    this.sqliteDb = new DatabaseSync(dbPath);
    this.sqliteDb.exec('PRAGMA foreign_keys = ON;');
    this.sqliteDb.exec('PRAGMA journal_mode = WAL;');
    this.type = 'sqlite';
    console.log(`✅ Connected to SQLite database: ${dbPath}`);
  }

  async query(sql, params = []) {
    if (this.type === 'mysql') {
      const [rows] = await this.mysqlPool.query(sql, params);
      return rows;
    } else {
      // In SQLite, convert '?' placeholders and execute
      try {
        const stmt = this.sqliteDb.prepare(sql);
        const rows = stmt.all(...params);
        return rows;
      } catch (err) {
        // If query was an INSERT/UPDATE/DELETE run via query(), fallback to run
        if (/^\s*(INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)/i.test(sql)) {
          const stmt = this.sqliteDb.prepare(sql);
          const result = stmt.run(...params);
          return { insertId: Number(result.lastInsertRowid), affectedRows: Number(result.changes) };
        }
        throw err;
      }
    }
  }

  async execute(sql, params = []) {
    if (this.type === 'mysql') {
      const [result] = await this.mysqlPool.execute(sql, params);
      return {
        insertId: result.insertId,
        affectedRows: result.affectedRows
      };
    } else {
      const stmt = this.sqliteDb.prepare(sql);
      const result = stmt.run(...params);
      return {
        insertId: Number(result.lastInsertRowid),
        affectedRows: Number(result.changes)
      };
    }
  }

  async transaction(fn) {
    if (this.type === 'mysql') {
      const conn = await this.mysqlPool.getConnection();
      await conn.beginTransaction();
      try {
        const trxWrapper = {
          query: async (sql, params = []) => {
            const [rows] = await conn.query(sql, params);
            return rows;
          },
          execute: async (sql, params = []) => {
            const [res] = await conn.execute(sql, params);
            return { insertId: res.insertId, affectedRows: res.affectedRows };
          }
        };
        const result = await fn(trxWrapper);
        await conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
        throw err;
      } finally {
        conn.release();
      }
    } else {
      // SQLite synchronous transaction
      this.sqliteDb.exec('BEGIN IMMEDIATE TRANSACTION;');
      try {
        const trxWrapper = {
          query: async (sql, params = []) => {
            const stmt = this.sqliteDb.prepare(sql);
            return stmt.all(...params);
          },
          execute: async (sql, params = []) => {
            const stmt = this.sqliteDb.prepare(sql);
            const res = stmt.run(...params);
            return { insertId: Number(res.lastInsertRowid), affectedRows: Number(res.changes) };
          }
        };
        const result = await fn(trxWrapper);
        this.sqliteDb.exec('COMMIT;');
        return result;
      } catch (err) {
        this.sqliteDb.exec('ROLLBACK;');
        throw err;
      }
    }
  }

  async initTables() {
    const isSqlite = this.type === 'sqlite';
    const autoInc = isSqlite ? 'INTEGER PRIMARY KEY AUTOINCREMENT' : 'INT AUTO_INCREMENT PRIMARY KEY';
    const currentTs = isSqlite ? "DATETIME DEFAULT (datetime('now', 'localtime'))" : 'DATETIME DEFAULT CURRENT_TIMESTAMP';

    const usersSql = `
      CREATE TABLE IF NOT EXISTS users (
        id ${autoInc},
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL,
        student_id VARCHAR(50) UNIQUE,
        status VARCHAR(20) DEFAULT 'active',
        created_at ${currentTs},
        updated_at ${currentTs}
      );
    `;

    const booksSql = `
      CREATE TABLE IF NOT EXISTS books (
        id ${autoInc},
        isbn VARCHAR(30) NOT NULL UNIQUE,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        total_copies INT NOT NULL DEFAULT 1,
        available_copies INT NOT NULL DEFAULT 1,
        created_at ${currentTs},
        updated_at ${currentTs}
      );
    `;

    const transactionsSql = `
      CREATE TABLE IF NOT EXISTS circulation_transactions (
        id ${autoInc},
        book_id INT NOT NULL,
        student_id INT NOT NULL,
        librarian_id INT NOT NULL,
        issue_date ${currentTs},
        due_date DATETIME NOT NULL,
        return_date DATETIME DEFAULT NULL,
        status VARCHAR(20) DEFAULT 'issued',
        notes TEXT DEFAULT NULL,
        created_at ${currentTs},
        updated_at ${currentTs},
        FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE RESTRICT,
        FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE RESTRICT,
        FOREIGN KEY (librarian_id) REFERENCES users(id) ON DELETE RESTRICT
      );
    `;

    if (isSqlite) {
      this.sqliteDb.exec(usersSql);
      this.sqliteDb.exec(booksSql);
      this.sqliteDb.exec(transactionsSql);
    } else {
      await this.mysqlPool.query(usersSql);
      await this.mysqlPool.query(booksSql);
      await this.mysqlPool.query(transactionsSql);
    }

    console.log('✅ Database tables initialized (users, books, circulation_transactions).');
  }
}

const db = new DatabaseWrapper();

module.exports = db;
