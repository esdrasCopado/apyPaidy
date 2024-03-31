const amazonService=require('../services/amazonService');
const fs = require('fs');

const getFile=async(req,res)=>{
    const result= await amazonService.getFiles();
    res.json( result)
};

const postFile=async (req,res)=>{
    try {
        if (!req.files || !req.files.file) {
          return res.status(400).json({ message: "No file uploaded" });
        }
        // Subir el archivo al servicio S3
        const result = await amazonService.upLoadFile(req.files.file);

        const fileName = req.files.file.name;
    
        // Eliminar el archivo temporal después de haberlo subido al servicio S3
        fs.unlinkSync(req.files.file.tempFilePath);
    
        // Envía una respuesta JSON con un mensaje de confirmación
        console.log(result);
        res.json({ result, fileName: fileName });
      } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante la carga del archivo
        console.error("Error uploading file:", error);
        res.status(500).json({ message: "Internal server error" });
      }
};

const getAllUrlFiles=async(req,res)=>{
  const result= await amazonService.getAllFileURL();
  res.json(result)

};
const getOneUrlFiles = async (req, res) => {
  try {
      const key = req.params.key;
      if (!key) {
          return res.status(400).json({ message: "Key parameter is missing" });
      }
      const url = await amazonService.getOneUrlFiles(key);
      if (!url) {
          return res.status(404).json({ message: "URL not found for the specified key" });
      }

      return res.json({ url });
  } catch (error) {
      console.error("Error retrieving URL for key:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports ={getFile,postFile,getAllUrlFiles,getOneUrlFiles}
