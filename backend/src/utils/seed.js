const db = require('../config/database');
const { hashPassword } = require('./password');

async function seedData() {
  try {
    // Check if librarian exists
    const librarians = await db.query("SELECT id FROM users WHERE role = 'librarian' LIMIT 1");
    if (librarians.length === 0) {
      const librarianHash = await hashPassword('Librarian@123');
      await db.execute(
        "INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, 'librarian', 'active')",
        ['Head Librarian', 'librarian@library.com', librarianHash]
      );
      console.log('🌱 Seeded default librarian: librarian@library.com (Password: Librarian@123)');
    }

    // Check if sample student exists
    const students = await db.query("SELECT id FROM users WHERE role = 'student' LIMIT 1");
    if (students.length === 0) {
      const studentHash = await hashPassword('Student@123');
      await db.execute(
        "INSERT INTO users (name, email, password, role, student_id, status) VALUES (?, ?, ?, 'student', 'STU1001', 'active')",
        ['Alex Morgan', 'student@university.edu', studentHash]
      );
      console.log('🌱 Seeded default student: student@university.edu (Password: Student@123, ID: STU1001)');
    }

    // Check if books exist
    const books = await db.query('SELECT id FROM books LIMIT 1');
    if (books.length === 0) {
      const sampleBooks = [
        {
          isbn: '978-0132350884',
          title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
          author: 'Robert C. Martin',
          category: 'Computer Science',
          total: 5,
          available: 5
        },
        {
          isbn: '978-0262046305',
          title: 'Introduction to Algorithms (4th Edition)',
          author: 'Thomas H. Cormen, Charles E. Leiserson',
          category: 'Algorithms',
          total: 4,
          available: 4
        },
        {
          isbn: '978-0201633610',
          title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
          author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
          category: 'Software Engineering',
          total: 3,
          available: 3
        },
        {
          isbn: '978-0078022159',
          title: 'Database System Concepts (7th Edition)',
          author: 'Abraham Silberschatz, Henry F. Korth',
          category: 'Database Systems',
          total: 6,
          available: 6
        },
        {
          isbn: '978-0134610993',
          title: 'Artificial Intelligence: A Modern Approach',
          author: 'Stuart Russell, Peter Norvig',
          category: 'Artificial Intelligence',
          total: 4,
          available: 4
        },
        {
          isbn: '978-0136657279',
          title: 'Computer Networks (6th Edition)',
          author: 'Andrew S. Tanenbaum, Nick Feamster',
          category: 'Networking',
          total: 5,
          available: 5
        },
        {
          isbn: '978-0137618880',
          title: 'Modern Operating Systems (5th Edition)',
          author: 'Andrew S. Tanenbaum, Herbert Bos',
          category: 'Operating Systems',
          total: 3,
          available: 3
        },
        {
          isbn: '978-0060935467',
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          category: 'Literature',
          total: 5,
          available: 5
        }
      ];

      for (const b of sampleBooks) {
        await db.execute(
          'INSERT INTO books (isbn, title, author, category, total_copies, available_copies) VALUES (?, ?, ?, ?, ?, ?)',
          [b.isbn, b.title, b.author, b.category, b.total, b.available]
        );
      }
      console.log(`🌱 Seeded ${sampleBooks.length} sample books into catalog.`);
    }
  } catch (err) {
    console.error('Seed error:', err.message);
  }
}

module.exports = { seedData };
