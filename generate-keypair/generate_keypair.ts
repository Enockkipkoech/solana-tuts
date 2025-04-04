import { Keypair } from '@solana/web3.js';
import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import 'dotenv/config';

// Generate a new keypair
const keypair = Keypair.generate();

console.log('🔥 Generating a new keypair ✅');
console.log('Public Key:', keypair.publicKey.toBase58());
console.log('Secret Key:', keypair.secretKey);
console.log(`✅ DONE!`);

// LOAD EXISTING KEYPAIR
const keypairFromEnv = getKeypairFromEnvironment('SECRET_KEY');

console.log('🔥 Loading keypair from environment ✅');
console.log({ keypairFromEnv });

const loadedPublicKey = keypairFromEnv.publicKey.toBase58();
const expectedPublicKey = '5YgViMrZgdtLZfYJyGvD3kjzBDgTNbqX3ABgsHhzZjdo';

if (loadedPublicKey === expectedPublicKey) {
	console.log('🚀  Perfect Match!✅');
	console.log('Loaded Public Key:', loadedPublicKey);
	console.log('Expected Public Key:', expectedPublicKey);
} else {
	console.error('❌ Loaded keypair does NOT match the expected public key!');
	console.error(`Expected: ${expectedPublicKey}`);
	console.error(`Loaded: ${loadedPublicKey}`);
}
