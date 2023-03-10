#!/usr/bin/env node
import crypto from 'crypto';

const iterations = 100000;
const salt = crypto.getRandomValues(new Uint8Array(16));

console.log(
  Buffer.from(
    'v01' +
      []
        .concat(
          Array.from(new Uint8Array(salt)),
          ('000000' + iterations.toString(16))
            .slice(-6)
            .match(/.{2}/g)
            .map((byte) => parseInt(byte, 16)),
          Array.from(
            new Uint8Array(
              await crypto.subtle.deriveBits(
                {
                  name: 'PBKDF2',
                  hash: 'SHA-256',
                  salt,
                  iterations: iterations,
                },
                await crypto.subtle.importKey('raw', new TextEncoder().encode(process.argv[2]), 'PBKDF2', false, [
                  'deriveBits',
                ]),
                256,
              ),
            ),
          ),
        )
        .map((byte) => String.fromCharCode(byte))
        .join(''),
    'binary',
  ).toString('base64'),
);
