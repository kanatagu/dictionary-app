import express from 'express';
import type { Express, Request, Response } from 'express';
const app: Express = express();
const PORT = 3001;

app.get('/', (req: Request, res: Response) => res.send('Hello World!'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
