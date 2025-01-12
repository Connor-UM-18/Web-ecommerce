import multer from 'multer';
import path from 'path';
import connection from "./database.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.resolve(), 'uploads'));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `imagen_${timestamp}${ext}`);
  }
});

const upload = multer({ storage: storage });

const handleFileUpload = (req, res, next) => {
  upload.single('imagen')(req, res, (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).send('Server error');
    }

    const { nombre, descripcion, precio, id_categoria } = req.body;
    const imagenUrl = req.file ? `uploads/${req.file.filename}` : null;

    const query = 'INSERT INTO Productos (nombre, descripcion, precio, id_categoria, imagen_url) VALUES (?, ?, ?, ?, ?)';
    const values = [nombre, descripcion, precio, id_categoria, imagenUrl];
    
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Error inserting into database:', err);
        return res.status(500).send('Server error');
      }

      res.json({ message: 'File uploaded and product saved!', productId: result.insertId });
    });
  });
};

const handleFileUploadAndUpdate = (req, res, next) => {
  upload.single('imagen')(req, res, (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).send('Server error');
    }

    const { id } = req.params;
    const { nombre, descripcion, precio, id_categoria } = req.body;
    const imagenUrl = req.file ? `uploads/${req.file.filename}` : null;

    let query = 'UPDATE Productos SET nombre = ?, descripcion = ?, precio = ?, id_categoria = ?';
    const values = [nombre, descripcion, precio, id_categoria];

    if (imagenUrl) {
      query += ', imagen_url = ?';
      values.push(imagenUrl);
    }

    query += ' WHERE id_producto = ?';
    values.push(id);

    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Error updating product:', err);
        return res.status(500).send('Server error');
      }

      res.json({ message: 'Product updated successfully!' });
    });
  });
};

export { handleFileUpload, handleFileUploadAndUpdate };
