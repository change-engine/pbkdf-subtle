# pbkdf-subtle

Hash/Verify PBKDF2. Uses only `crypto.subtle`.

# Usage

```bash
./hash.mjs my_secret_password
```

## To check the Authorization header:

```typescript
const TOKEN_HASH = 'djAxKFWLYXubAcE8y5FktPCwWQGGoKVaFpkJ2OUcLRnV56O68DFbWSODXoVkBZn19otVVSiP';

const [scheme, token] = (request.headers.get('Authorization') ?? ' ').split(' ');
if (scheme != 'token' || !(await verify(TOKEN_HASH, token))) return new Response('', { status: 401 });
```
