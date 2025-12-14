import express from 'express';
import 'dotenv/config';
import postRoutes from './routes/post.route.js';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT;


const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', postRoutes);

//views spa routing
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});