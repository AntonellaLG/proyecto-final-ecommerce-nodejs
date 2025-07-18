import * as model from '../models/products.model.js'

export const getAllBooks = async (req, res) => {
    res.json(await model.getAllBooks());
};

//Filtro sólo por title
export const searchBook = async (req, res) => { 
    try{
        const { title } = req.query; 
        const books = await model.getAllBooks();

        const filteredBooks = books.filter((p) =>
            p.title.toLowerCase().includes(title.toLowerCase())
        );

        if(filteredBooks.length==0){
            res.status(404).json({ error: 'No se encontraron productos' });
        } else {
            res.json(filteredBooks);
        }
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar el producto' });
    }
};

export const getBookById = async (req, res) => {
    const { id } = req.params;
    const book = await model.getBookById(id);
    
    if (!book) {
        res.status(404).json({ error: 'No existe el producto' });
    } else {
        res.json(book);
    }
};

export const createBook = async (req, res) => {
    const { title, author, year, gender, categories, price } = req.body;

    //creo un objeto con los datos que necesito pasar (lo que persistió en la bdd)
    const newBook = await model.createBook({ title, author, year, gender, categories, price });

    res.status(201).json(newBook);
};

export const updateBookById = async (req, res) => {
    const bookId = req.params.id;
    const { title, author, year, gender, categories, price } = req.body;

    //Actualizo todos los datos
    const updatedBook = await model.updateBookById(bookId, { title, author, year, gender, categories, price });

    if (!updatedBook) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(updatedBook);
};

export const deleteBookById = async (req, res) => {
    const bookId = req.params.id;
    const book = await model.deleteBookById(bookId);

    if (!book) {
        return res.status(404).json({error: 'Producto no encontrado'});
    }

    res.status(204).send();
};