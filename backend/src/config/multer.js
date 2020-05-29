const multer = require("multer")
const path = require("path")
const crypto = require("crypto")

module.exports ={
    // pra onde o arquivo vai quando a gente fazer o upload
    dest: path.resolve(__dirname,'..','..','tmp','uploads'),
    storage: multer.diskStorage({
        destination:(req,file,cb) =>{
            cb(null, path.resolve(__dirname,'..','..','tmp','uploads'))
        },
        // garantir que as imagens nao se sobreponham
        filename:(req,file,cb)=>{
            crypto.randomBytes(16,(err,hash)=>{
                if(err) cb(err);

                // hex converter os bytes do crypo em hex,letras e numeros hexdecimal
                // originalname, nome original do arquivo
                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null,fileName)
            })
        }

    }),
    // limites para o arquivo
    limits:{
        fileSize: 2 * 1024 * 1024,
    },
    // filtrar uploads de arquivos  
    fileFilter: (req, file,cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ]

        if(allowedMimes.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(new Error("invalid file type"))
        }
    },

}