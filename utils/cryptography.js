const crypto = require('crypto');

const key = crypto
  .createHash('sha256')
  .update(String(process.env.CRYPTO_SECRET))
  .digest('base64')
  .substr(0, 32);

exports.encrypt = data => {
  const iv = crypto
    .randomBytes(16)
    .toString('hex')
    .slice(0, 16);
  const cipher = crypto.createCipheriv(process.env.CRYPTO_ALGORITHM, key, iv);
  const encrypted =
    cipher.update(String(data), 'utf8', 'hex') + cipher.final('hex');
  return Buffer.from(`${encrypted}::${iv}`).toString('hex');
};

exports.decrypt = data => {
  const [encryptedData, iv] = Buffer.from(data, 'hex')
    .toString('ascii')
    .split('::');
  const decipher = crypto.createDecipheriv(
    process.env.CRYPTO_ALGORITHM,
    key,
    iv
  );
  const decrypted =
    decipher.update(String(encryptedData), 'hex', 'utf8') +
    decipher.final('uft8');
  return decrypted;
};
