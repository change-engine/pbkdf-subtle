export async function verify(key: string, password: string) {
  return (
    Array.from(
      new Uint8Array(
        await crypto.subtle.deriveBits(
          {
            name: "PBKDF2",
            hash: "SHA-256",
            salt: new Uint8Array([...atob(key).slice(3, 19)].map((ch) => ch.charCodeAt(0))),
            iterations: parseInt(
              [...atob(key).slice(19, 22)].map((ch) => ch.charCodeAt(0).toString(16)).join(""),
              16,
            ),
          },
          await crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(password),
            "PBKDF2",
            false,
            ["deriveBits"],
          ),
          256,
        ),
      ),
    )
      .map((byte) => String.fromCharCode(byte))
      .join("") === atob(key).slice(22, 54)
  );
}
