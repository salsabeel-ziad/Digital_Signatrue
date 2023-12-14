var  { createSign, constants, generateKeyPairSync, createVerify } = require('crypto') ;
var { listenerCount } = require('process');   

let signature; // Declare the variable here

// 'RSA-SHA256' : This algorithm will be used for generating and verifying digital signatures.
const SIGNING_ALGORITHM = 'RSA-SHA256';

// Function to implement Digital signature using SHA256 and RSA algorithm by passing private key.

// This function takes an input string and    a private key as arguments and returns a digital signature as a Buffer object. 
// The function first creates a crypto.Sign object using the SIGNING_ALGORITHM. 
// Then, it updates the sign object with the input string using the update() method. 
// Finally, it signs the input using the private key and returns the signature.

function createDigitalSignature(input, privateKey) {
  const sign = createSign(SIGNING_ALGORITHM);
  sign.update(input);
  return sign.sign({ key: privateKey, padding: constants.RSA_PKCS1_PADDING });
}

// Generating the asymmetric key pair using SecureRandom class functions and RSA algorithm.

// This function generates an RSA key pair and returns an object containing the public key and private key in PEM format. 
// The modulusLength option specifies the length of the modulus in bits. 
// The publicKeyEncoding and privateKeyEncoding options specify the format of the public key and private key, respectively.

function generateRSAKeyPair(){
  return generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
  });
}

// Function for Verification of the digital signature by using the public key.

// This function takes an input string, a signature to verify, 
// and a public key as arguments and returns a boolean value indicating whether the signature is valid. 
// The function first creates a crypto.Verify object using the SIGNING_ALGORITHM. 
// Then, it updates the verify object with the input string using the update() method. 
// Finally, it verifies the signature using the public key and returns the result.

function verifyDigitalSignature(input, signatureToVerify, publicKey) {
  const verify = createVerify(SIGNING_ALGORITHM);
  verify.update(input);
  return verify.verify({ key: publicKey, padding: constants.RSA_PKCS1_PADDING }, signatureToVerify);
}

// Driver Code
function sign(inputText){
  const input = inputText;
}
  // generate private key and public key pair from RSA algorithm
  const keyPair = generateRSAKeyPair();
  // Function Call  : creates a digital signature using the private key.
  signature = createDigitalSignature(Buffer.from(input), keyPair.privateKey);

function printsSignature(){
    // prints the signature value, and verifies the signature using the public key.
    console.log('Signature Value:\n', signature.toString('hex'));
    console.log('Verification:', verifyDigitalSignature(Buffer.from(input), signature, keyPair.publicKey));
}
