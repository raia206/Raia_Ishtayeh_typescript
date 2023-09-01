import express, { Request, Response } from 'express';
import fs from 'fs';

const app = express();

app.get('/books', (req: Request, res: Response) => {
  try {
    const query = req.query.q?.toString() || '';
    const booksData = fs.readFileSync('books.json', 'utf8');
    const books = JSON.parse(booksData);

    const filteredBooks = books.filter((book: any) =>
      book.name.toLowerCase().startsWith(query.toLowerCase())
    );
if (filteredBooks.length === 0) {
    res.status(404).json({ message: 'No books found.' });
  } else {
    res.json(filteredBooks);
  }
    
  } 
  catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3333, () => {
  console.log('Server is running on port 3333');
});
