const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-provider-ini");

const client = new S3Client({
  region: "sa-east-1", // Substitua pela sua região
  endpoint: process.env.ENDPOINT_S3,
  credentials: fromIni({
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.APP_KEY,
  }),
});

const uploadFile = async (path, buffer, mimetype) => {
  const uploadParams = {
    Bucket: process.env.BLACKBLAZE_BUCKET,
    Key: path,
    Body: buffer,
    ContentType: mimetype,
  };

  const command = new PutObjectCommand(uploadParams);

  try {
    const response = await client.send(command);
    return {
      url: response.Location,
      path: response.Key,
    };
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
};

const excluirArquivo = async (path) => {
  const deleteParams = {
    Bucket: process.env.BLACKBLAZE_BUCKET,
    Key: path,
  };

  const command = new DeleteObjectCommand(deleteParams);

  try {
    await client.send(command);
  } catch (err) {
    console.error("Error deleting file:", err);
    throw err;
  }
};

module.exports = {
  uploadFile,
  excluirArquivo,
};
