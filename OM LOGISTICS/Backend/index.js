import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

////////////////////////// 1. DATABASE Configuration //////////////////////////
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'test'
});

app.use(express.json()); // it allows client to send data in json format
app.use(cors()) // it allows client to send data from different domain


app.get("/", (req, res) => {
    res.json("Hello World");
});

app.get("/products", (req, res) => {
    const q = "SELECT * FROM products";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    });
});

////////////////////////// 2. Posting products //////////////////////////
app.post("/products", (req, res) => {
    const q = "INSERT INTO products (`Item`,`Item_Name`,`UOM`,`HSN_Code`,`Quantity`,`Rate`,`Gross_Value`,`CGSTP`,`CGST`,`SGSTP`,`SGST`,`IGSTP`,`IGST`,`Net_Value`,`Remarks`,`Cover`) VALUES (?)"
    // var ItemName = req.body.Item + " " + req.body.Name;
    // const HSNCode = req.body.HSN + " " + req.body.Code;
    const values = [        
        req.body.Item,
        req.body.Item_Name,
        req.body.UOM,
        req.body.HSN_Code,
        req.body.Quantity,
        req.body.Rate,
        req.body.Gross_Value,
        req.body.CGSTP,
        req.body.CGST,
        req.body.SGSTP,
        req.body.SGST,
        req.body.IGSTP,
        req.body.IGST,
        req.body.Net_Value,
        req.body.Remarks,
        req.body.Cover
    ]
    db.query(q, [values], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json("data inserted successfully");
        }
    });
});

app.delete("/products/:Item", (req, res) => {
    const productId = req.params.Item;
    const q = "DELETE FROM products WHERE Item = ?";

    db.query(q, [productId], (err, data) => {   
        if (err)
            return res.json(err);
            return res.json("product deleted successfully");
        });
    });

    app.put("/products/:Item", (req, res) => {
        const productId = req.params.Item;
        const q = "UPDATE products SET `Item` = ?, `Item_Name` = ?, `UOM` = ?, `HSN_Code` = ?, `Quantity` = ?, `Rate` = ?, `Gross_Value` = ?, `CGSTP` = ?, `CGST` = ?, `SGSTP` = ?, `SGST` = ?, `IGSTP` = ?, `IGST` = ?, `Net_Value` = ?, `Remarks` = ?, `Cover` = ? WHERE Item = ?";
        
        const values = [
        req.body.Item,
        req.body.Item_Name,
        req.body.UOM,
        req.body.HSN_Code,
        req.body.Quantity,
        req.body.Rate,
        req.body.Gross_Value,
        req.body.CGSTP,
        req.body.CGST,
        req.body.SGSTP,
        req.body.SGST,
        req.body.IGSTP,
        req.body.IGST,
        req.body.Net_Value,
        req.body.Remarks,
        req.body.Cover
        ]

    
        db.query(q, [...values,productId], (err, data) => {   
            if (err)
                return res.json(err);
                return res.json("product Updated successfully");
            });
        });



app.listen(8800, () =>{
    console.log('Server is running...')
});