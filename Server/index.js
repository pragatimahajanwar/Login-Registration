import cors from 'cors'
import bcrypt, { hash } from 'bcrypt'
import cookieParser from 'cookie-parser';
import mysql from 'mysql'
import express, { response } from 'express'
import jwt from 'jsonwebtoken';



const salt=10


const app= express();
app.use (express.json());
app.use(cors({
    origin:['http://localhost:3000'],
    methods:["POST","GET"],
    Credentials: true
}));
app.use(cookieParser());

const db =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:'app'
})

const verifyUser=(req,res,next)=>{
    const token =req.cookies.token;
    if(!token){
        return res.json({ Error: "you are not authorised" }); 
    }else{
        jwt.verify(token,'jwt-secret-key',(err,decoded)=>{
            if(err){
                return res.json({Error:"Token is not okey"})
            }else{
                req.name=decoded.name;
                next();
            }
        })
    }
}

app.get('/',verifyUser,(req,res)=>{
   return res.json({status:"Success",name: req.name})
})
// app.post('/reg', async (req, res) => {
//     try {
//         const hash = await bcrypt.hash(req.body.password.toString(), salt);
//         const values = [
//             req.body.name,
//             req.body.email,
//             hash
//         ];
//         const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES?";
//         await db.query(sql, values);
//         return res.json({ status: "Success" });
//     } catch (err) {
//         console.error('Error while inserting data:', err);
//         return res.json({ Error: 'inserting data error in server' });
//     }
// });

app.post('/reg',(req,res)=>{
    const sql="INSERT INTO login (`name`,`email`,`password`) VALUES(?)";
    bcrypt.hash(req.body.password.toString(),salt,(err,hash)=>{
        if(err)return res,json({Error:'INSERTING hassing password '});
        const values=[
            req.body.name,
            req.body.email,
            hash
        ]

        db.query(sql,[values],(err,result)=>{
            if(err)return res.json({Error:'INSERTING data error in server'})
            return res.json({Status:"success"})
        })
        
    })
})

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM login WHERE email=?';
    db.query(sql, [req.body.email], async (err, data) => {
        if (err)   return res.json({ Error: "Login error in server" });
        

        if (data.length > 0) {
            const passwordMatch = await bcrypt.compare(req.body.password.toString(), data[0].password);
            if (passwordMatch) {

                const name = data[0].name;
                const token=jwt.sign({name},"jwt-secret-key",{expiresIn:'1d'});
                res.cookie('token',token);
                return res.json({ status: "Success" });
            } else {
                return res.json({ Error: "Password mismatch" });
            }
        } else {
            return res.json({ Error: "No email address" });
        }
    });
});


//    app.get('/logout',(req,res)=>{
//     res.clearCookie('token');
//     return res.json({status:"success"})
//    }) 


app.listen(4000, ()=>{
    console.log('running......')
})