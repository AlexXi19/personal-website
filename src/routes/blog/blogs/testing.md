---
title: Test
date: '2022-10-1'
layout: blog
live: false
---

# Hi I'm testing my blog

# [Security Principles](https://textbook.cs161.org/principles/principles.html)

```js
def testCodeBlock() {
  // Testing code block
	return 250
}
```

- Testing
  - Nested
    - Bullet points

1. Testing
2. Numbered List

Shannon's Maxim

- Shannon’s Maxim states that the attacker knows the system that they are attacking.
- Do not rely on obscurity for your security.

Threat model

- A model of who your attacker is and what resources they have

Trusted computing base (TCB)

- The components of a system that security relies upon
- Properties of the TCB:
  - Correctness
  - Completeness (can’t be bypassed)
  - Security (can’t be tampered with)
  - Generally made to be as small as possible
  - A smaller, simpler TCB is easier to write and audit.
  - KISS principle: Keep It Simple, Stupid

Security is economics

### Summary:

- Know your threat model: Understand your attacker and their resources and motivation
- Consider human factors: If your system is unusable, it will be unused
- Security is economics: Balance the expected cost of security with the expected benefit
- Detect if you can’t prevent: Security requires not just preventing attacks but detecting and responding to them
- Defense in depth: Layer multiple types of defenses
- Least privilege: Only grant privileges that are needed for correct functioning, and no more
- Separation of responsibility: Consider requiring multiple parties to work together to exercise a privilege
- Ensure complete mediation: All access must be monitored and protected, unbypassable
- Shannon’s maxim: The enemy knows the system
- Use fail-safe defaults: Construct systems that fail in a safe state, balancing security and usability.
- Design in security from the start: Consider all of these security principles when designing a new system, rather than patching it afterwards

## [Memory Safety](https://textbook.cs161.org/memory-safety/x86.html)

x86 fact sheet

- Little Endian
- Variable-length instructions

### Pointers

ESP: Stack pointer (similar to sp in RISC-V)

- Points to the bottom of the current stack frame
  EBP: Base pointer (similar to fp in RISC-V)
- Points to the top of the current stack frame
  EIP: Instruction pointer register

### Pushing and Popping

The push instruction adds an element to the stack

- Decrements ESP and saves new value on the lowest value on the stack.

The pop instruction removes an element from the stack.

- Loads lowest value into register and increments ESP.

### Stack layout

- Local variables are stored on the stack
- First variable at the highest address
- Members of a struct, the first member is stored at the lowest address
- Global variables (not on the stack) are stored with the first variable at the lowest address

![Memory](https://tbsnhkewuwyfxowgazvr.supabase.co/storage/v1/object/public/public/cs161/memory.png)

### Calling convention

- Arguments are pushed onto the stack in reverse order, so func(val1, val2, val3) will place val3 at the highest memory address, then val2, then val1
- Return values are passed in EAX
- When calling a function, the ESP and EBP need to shift to create a new stack frame, and the EIP must move to the callee’s code
- When returning from a function, the ESP, EBP, and EIP must return to their old values

![Alt](https://tbsnhkewuwyfxowgazvr.supabase.co/storage/v1/object/public/public/cs161/call-stack.png)

- EIP stores a pointer that points to the current instruction.

### [Function Call](https://docs.google.com/presentation/d/1wVV6SD8pzBzCooWvOUwFMSLAlrpaFyAJMmVdhWAht28/edit#slide=id.g150f76b9c85_0_327)

1. Push arguments on the stack in reverse order and adjust ESP.
2. Push the current EIP onto the stack called RIP and adjust ESP.
3. Push the current EBP onto the stack called SFP and adjust ESP.
4. Adjust the stack frame (no need to save ESP because it will always be at the bottom of the stack)
5. Move EBP to the top of the current stack frame (which is always SFP)
6. Move ESP to the bottom otf the current stack frame (this is determined by the compiler)
7. We finish the function and restore the pointers. We use values stored in RIP and SFP to restore EIP and EBP. ESP returns to it's original place by popping values off the stack.

### Complete Process

Caller:

1. Push arguments
2. Push RIP onto stack
   Callee:
3. Push EBP onto stack
4. Move EBP to ESP
5. Return function
6. Move ESP to EBP
7. Restore EBP to value in SFP and increment ESP from `pop`
8. `pop %eip` to restore the address of the caller function
9. Remove arguments from stack and move ESP up.

## Memory Safety Vulnerabilities

### Buffer Overflow Vulnerabilities

Stack Smashing
Recall: What does are some values on the stack an attacker can overflow?

- Local variables
- Function arguments
- Saved frame pointer (SFP)
- Return instruction pointer (RIP)

![Instructions](https://tbsnhkewuwyfxowgazvr.supabase.co/storage/v1/object/public/public/cs161/instructions.png)

Python Syntax
![Python](https://tbsnhkewuwyfxowgazvr.supabase.co/storage/v1/object/public/public/cs161/python.png)

Overwriting the RIP with the address of the shellcode

### Memory Safe Code

- Heap overflows with `malloc` are also vulnerable
- Specifying the size of the buffer using the length parameter

### Vulnerable C Functions

- gets - Read a string from stdin
  - Use fgets instead
- strcpy - Copy a string
  - Use strncpy (more compatible, less safe) or strlcpy (less compatible, more safe) instead
- strlen - Get the length of a string
  - Use strnlen instead (or memchr if you really need compatible code)

### Signed Unsigned Vulnerabilities

There is an unsigned comparison.

### Format String Vulnerabilities

- `printf` assumes that there is 1 more argument because there is one format sequence and will look 4 bytes up the stack for the argument

Defensive programming:

- Always add checks in your code just in case
  Example: Always check a pointer is not null before dereferencing it, even if you’re sure the pointer is going to be valid
  - Relies on programmer discipline
- Use safe libraries
- Use functions that check bounds
  - Example: Use fgets instead of gets
    - fgets still has a integer conversion vulnerability
  - Example: Use strncpy or strlcpy instead of strcpy
  - Example: Use snprintf instead of sprintf
  - Relies on programmer discipline or tools that check your program

# Mitigating Memory Safety Vulnerabilities

Compiler and runtime defenses that make common exploits harder
Find ways to turn attempted exploits into program crashes
Crashing is safer than exploitation: The attacker can crash our system, but at least they can’t execute arbitrary code
Mitigations are cheap (low overhead) but not free (some costs associated with them)

## Non Executable Pages

### Idea:

Most programs don’t need memory that is both written to and executed, so make portions of memory either executable or writable but not both

### Exploit:

Non-executable pages doesn’t prevent an attacker from leveraging existing code in memory as part of the exploit
ROP strategy: We write a chain of return addresses starting at the RIP to achieve the behavior we want
Each return address points to a gadget
The gadget executes its instructions and ends with a ret instruction
The ret instruction jumps to the address of the next gadget on the stack

## Stack Canary

### Idea:

A canary value uses a NULL byte as the first byte to mitigate string-based attacks (since it terminates any string before it)

### Exploit

- Leak the value of the canary: Overwrite the canary with itself
- Bypass the value of the canary: Use a random write, not a sequential write
  - Write around the canary
- Guess the value of the canary: Brute-force

## Pointer Authentication

### Idea:

- Placing a secret value in the pointer
- Only someone with the CPU master secret can generate a pointer

### Exploit

- Brute force
- Learn the master secret
- Pointer reuse

## Address Space Layout Randomization (ASLR)

### Idea:

- Put each segment of memory in a different location each time the program is run
  The attacker can’t know where their shellcode will be because its address changes every time you run the program
- ASLR can shuffle all four segments of memory
  Randomize the stack: Can’t place shellcode on the stack without knowing the address of the stack
  Randomize the heap: Can’t place shellcode on the heap without knowing the address of the heap
  Randomize the code: Can’t construct a ROP chain or return-to-libc attack without knowing the address of code
  Within each segment of memory, relative addresses are the same (e.g. the RIP is always 4 bytes above the SFP)

### Exploit

- Leak the address of a pointer, whose address relative to your shellcode is known
  Relative addresses are usually fixed, so this is sufficient to undo randomization!
  Leak a stack pointer: Leak the location of the stack
- Leak an RIP: Leak the location of the caller
- Guess the address of your shellcode: Brute-force
  - Randomization usually happens on page boundaries (usually 12 bits for 4 KiB pages)
    32-bit: 32 - 12 = 20 bits, 220 possible pages, which is feasibly brute-forced
    64-bit (usually 48-bit addressing): 48 - 12 = 36 bits, 236 possible pages

## Heap Vulnerabilities

- Heap overflow
  - Objects are allocated in the heap (using malloc in C or new in C++)
  - A write to a buffer in the heap is not checked
  - The attacker overflows the buffer and overwrites the vtable pointer of the next object to point to a malicious vtable, with pointers to malicious code
  - The next object’s function is called, accessing the vtable pointer
- Use-after-free
  - An object is deallocated too early (using free in C or delete in C++)
  - The attacker allocates memory, which returns the memory freed by the object
  - The attacker overwrites a vtable pointer under the attacker’s control to point to a malicious vtable, with pointers to malicious code
  - The deallocated object’s function is called, accessing the vtable pointer

### NOP Sleds

Idea: Instead of having to jump to an exact address, make it “close enough” so that small shifts don’t break your exploit

- NOP: Short for no-operation or no-op, an instruction that does nothing (except advance the EIP)
- A real instruction in x86, unlike RISC-V
- Chaining a long sequence of NOPs means that landing anywhere in the sled will bring you to your shellcode

### Serialization Vulnerabilities

Attacker can provide malicious files to be deserialized.

# Cryptography

## Three Goals of Cryptoraphy

- Confidentiality: An adversary cannot read our messages.
- Integrity: An adversary cannot change our messages without being detected.
- Authenticity: I can prove that this message came from the person who claims to have written it.
  - Integrity and authenticity are closely related properties…
    Before I can prove that a message came from a certain person, I have to prove that the message wasn’t changed!
    … but they’re not identical properties
    Later we’ll see some edge cases

## Two Models of Keys

- Symmetric key model: Alice and Bob both know the value of the same secret key.
- Asymmetric key model: Everybody has two keys, a secret key and a public key.
  - Example: You might remember RSA encryption from CS 70

## Kerckhoff’s principle

- Cryptosystems should remain secure even when the attacker knows all internal details of the system
- The key should be the only thing that must be kept secret
- The system should be designed to make it easy to change keys that are leaked (or suspected to be leaked)
  - If your secrets are leaked, it is usually a lot easier to change the key than to replace every instance of the running software
- Our assumption: The attacker knows all the algorithms we use. The only information the attacker is missing is the secret key(s).

## Confidentiality

An adversary cannot read our messages
![Crypto](https://tbsnhkewuwyfxowgazvr.supabase.co/storage/v1/object/public/public/cs161/crypto.png)

The ciphertext should not give the attacker any additional information about the plaintext.

1. Alice uses the key to encrypt the message: Change the message into a scrambled form
2. Alice sends the encrypted message over the insecure channel
3. Eve sees the encrypted message, but cannot figure out the original message without the key
4. Bob receives the encrypted message and uses the key to decrypt the message back into its original form

## Integrity

An adversary cannot change our messages without being detected.

## Cryptography Roadmap

![Road map](https://tbsnhkewuwyfxowgazvr.supabase.co/storage/v1/object/public/public/cs161/call-stack.png)

## Symmetric Encryption Scheme

### Properties

- Correctness: Decrypting a ciphertext should result in the message that was originally encrypted
  Dec(K, Enc(K, M)) = M for all K ← KeyGen() and M
- Efficiency: Encryption/decryption algorithms should be fast: >1 Gbps on a standard computer
- Security: Confidentiality

## IND-CPA

### Process

Testing for confidentiality

Eve chooses two messages M0 and M1 **of the same length**
Alice chooses one message at random Mb, encrypts it, and sends the ciphertext
Eve knows either M0 or M1 was sent, but doesn't know which
Eve reads the ciphertext and tries to guess which message was sent
If the probability that Eve correctly guesses which message was sent is 1/2, then the encryption scheme is confidential

Eve is limited to practical runtime.

### Intuition

If the scheme is confidential, Eve can only guess with probability 1/2, which is no different than if Eve hadn’t sent the ciphertext at all
In other words: the ciphertext gave Eve no additional information about which plaintext was sent!

## One time pads

KeyGen()

- Randomly generate an n-bit key, where n is the length of your message
  - Recall: For today, we assume that Alice and Bob can securely share this key
- For one-time pads, we generate a new key for every message
  - Enc(K, M) = K ⊕ M
    - Bitwise XOR M and K to produce C
- In other words: XOR the ith bit of the plaintext with the ith bit of the key.
  - Ci = Ki ⊕ Mi
    - Alice and Bob use a different key for each encryption (this is the “one-time” in one-time pad).
- Dec(K, C) = K ⊕ C
  - Bitwise XOR C and K to produce M
    - Mi = Ki ⊕ Ci

This scheme is secure.

One time pads are not secure if the key is reused. Eve can find out Mi ⊕ Mi+1 if the key is used on both Mi and Mi+1.

### Impracticality of One-Time Pads

1. Key Generation: expensive
2. Key Distribution: need to generate and distribute new key for each message

## Block cyphers

An encryption/decryption algorithm that encrypts a fixed-sized block of bits

- Properties
  - Correctness: EK is a permutation, DK is its inverse
  - Efficiency: Encryption/decryption should be fast
  - Security: E behaves like a random permutation

### Correctness

EK(M) must be a permutation (bijective function) on n-bit strings
Each input must correspond to exactly one unique output

### Security

A secure block cipher behaves like a randomly chosen permutation permutation from the set of all permutations on n-bit strings

### Efficiency

- Encryption and decryption should be computable in microseconds
  Formally: KeyGen(), Enc(), and Dec(), should not take exponential time.
- Block cipher algorithms typically use operations like XOR, bit-shifting, and small table lookups

## AES (Advanced Encryption Standard)

### Parameters

- Key size 128, 192, or 256 bits (k = 128, 192, or 256)
- Block size 128 bits (n = 128)

### Issues

- Block cyphers are not IND-CPA secure because it's deterministic.
- Block ciphers can only encrypt messages of a fixed size

## ECB Mode

The message is divided into blocks, and each block is encrypted separately.
![ECB](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/ECB_encryption.svg/2880px-ECB_encryption.svg.png)

Not IND-CPA secure.

## CBC Mode

Ci = EK(Mi ⊕ Ci-1); C0 = IV

![CBC1](https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/CBC_encryption.svg/1202px-CBC_encryption.svg.png)

![CBC2](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/CBC_decryption.svg/1202px-CBC_decryption.svg.png)

![CBC3](https://tbsnhkewuwyfxowgazvr.supabase.co/storage/v1/object/public/public/cs161/definition.png)

### Efficiency & Parallelism

Encryption cannot be parallelized
Decryption can be parallelized

### Padding

Pad the message until it’s a multiple of the block size

### Security

CBC mode is secure iff IV is randomly generated and never reused, otherwise it would be deterministic.

If the IV is reused, for two messages P1P2P3 and P1P2P4, CBC reveals when the two messages start with the same plaintext blocks.

## CTR Mode

Central idea comes from one time padding, which is XORing the plaintext with random nonces.

### Decryption

Parse C into (nonce, C1, …, Cm). Compute Pi by XORing Ci with output of Ek on nonce and counter

### Efficiency

Both encryption and decryption can be parallelized.

### Padding

We don't need padding, we can just cut off the parts of the XOR that's longer than the message.

### Security

This scheme is only secure if nonce is randomly generated and never reused.

![CTR1](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/CTR_encryption_2.svg/1202px-CTR_encryption_2.svg.png)
![CTR2](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/CTR_decryption_2.svg/1202px-CTR_decryption_2.svg.png)

### CBC vs. CTR

- CBC is more "secure" and CTR has better performance.
- Both can be equally secure if used properly.
  However, if used improperly (IV/nonce reuse), CBC only leaks partial information, and CTR fails catastrophically

## CFB Mode

![CFB1](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/CFB_encryption.svg/1202px-CFB_encryption.svg.png)
![CFB2](https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/CFB_decryption.svg/1202px-CFB_decryption.svg.png)

CFB is IND-CPA secure.

If the IV is reused, then the attacker can determine whether the two messages have identical prefixes.

## Lack of Integrity and Authenticity

Block cyphers are designed for _confidentiality_. .

## Cryptographic Hashes

A hash function provides a fixed-length “fingerprint” over a sequence of bits

### Hash Function: One-way-ness or Preimage Resistance

Informal: Given an output y, it is infeasible to find any input x such that H(x) = y

Collision: Two different inputs with the same output
x ≠ x' and H(x) = H(x')

Collision resistance: It is infeasible to (i.e. no polynomial time attacker can) find any pair of inputs x' ≠ x such that H(x) = H(x')

### Hash Function Examples

MD5

- Output: 128 bits
- Security: Completely broken

SHA-1

- Output: 160 bits
- Security: Completely broken in 2017
- Was known to be weak before 2017, but still used sometimes

SHA-2

- Output: 256, 384, or 512 bits (sometimes labeled SHA-256, SHA-384, SHA-512)
- Not currently broken, but some variants are vulnerable to a length extension attack
- Current standard

SHA-3 (Keccak)

- Output: 256, 384, or 512 bits
- Current standard (not meant to replace SHA-2, just a different construction)

### Length Extension Attack

Given H(x) and the length of x, but not x, an attacker can create H(x || m) for any m of the attacker’s choosing

SHA-256 (256-bit version of SHA-2) is vulnerable

### Integrity

Depends on the thread model, we assume that the attacker cannot modify the hash.

Main issue: Hashes are unkeyed functions

- There is no secret key being used as input, so any attacker can compute a hash on any value

## Message Authentication Codes (MACs)

Macs and hashes don't provide confidentiality.

We want to attach some piece of information to prove that someone with the key sent this message

- Alice wants to send M to Bob, but doesn’t want Mallory to tamper with it
- Alice sends M and T = MAC(K, M) to Bob
- Bob receives M and T
- Bob computes MAC(K, M) and checks that it matches T
- If the MACs match, Bob is confident the message has not been tampered with (integrity)

### Security

- Correctness: Determinism
  - Note: Some more complicated MAC schemes have an additional Verify(K, M, T) function that don’t require determinism, but this is out of scope
- Efficiency: Computing a MAC should be efficient
- Security: EU-CPA (existentially unforgeable under chosen plaintext attack)

## EU-CPA

A secure MAC is existentially unforgeable: without the key, an attacker cannot create a valid tag on a message

- Mallory cannot generate MAC(K, M') without K
- Mallory cannot find any M' ≠ M such that MAC(K, M') = MAC(K, M)

### EU-CPA Definition

Mallory may send messages to Alice and receive their tags
Eventually, Mallory creates a message-tag pair (M', T')
M' cannot be a message that Mallory requested earlier
If T' is a valid tag for M', then Mallory wins. Otherwise, she loses.

A scheme is EU-CPA secure if for all polynomial time adversaries, the probability of winning is 0 or negligible

## NMAC

Can we use secure cryptographic hashes to build a secure MAC?

- Intuition: Hash output is unpredictable and looks random, so let’s hash the key and the message together

KeyGen():

- Output two random, n-bit keys K1 and K2, where n is the length
  of the hash output

NMAC(K1, K2, M):

- Output H(K1 || H(K2 || M))

NMAC is EU-CPA secure if the two keys are different

- Provably secure if the underlying hash function is secure
- Intuition: Using two hashes prevents a length extension attack
  - Otherwise, an attacker who sees a tag for M could generate a tag for M || M'

### Issues

- Recall: NMAC(K1, K2, M) = H(K1 || H (K2 || M))
- We need two different keys
- NMAC requires the keys to be the same length as the hash output (n bits)
- Can we use NMAC to design a scheme that uses one key?

## HMAC

HMAC(K, M) = H((K' ⊕ opad) || H((K' ⊕ ipad) || M))

- HMAC is a hash function, so it has the properties of the underlying hash too
  - It is collision resistant
  - Given HMAC(K, M) and K, an attacker can’t learn M
    If the underlying hash is secure, HMAC doesn’t reveal M, but it is still deterministic
- You can’t verify a tag T if you don’t have K
  - This means that an attacker can’t brute-force the message M without knowing K

### MAC Properties

- MACs provide integrity
- If only two people have the key, then MACs provide authenticity.
- No confidentiality.

## AE (Authenticated Encryption)

- MAC then Encrypt
- Encrypt then MAC

Reusing keys between schemes can interfere with the security

### Authenticated encryption with additional data (AEAD)

An algorithm that provides both confidentiality and integrity over the plaintext and integrity over additional data

Incorrect usage leads to _both_ confidentiality and integrity/authentication.
`TODO: get more info on this`

## Pseudorandom Number Generators (PRNGs)

An algorithm that uses a little bit of true randomness to generate a lot of random-looking output

**Entropy**: a measure of uncertainty.

### Definition

PRNG.Seed(randomness): Initializes the internal state using the entropy
Input: Some truly random bits

PRNG.Reseed(randomness): Updates the internal state using the existing state and the entropy
Input: More truly random bits

PRNG.Generate(n): Generate n pseudorandom bits
Input: A number n
Output: n pseudorandom bits
Updates the internal state as needed

Properties

- Correctness: Deterministic
- Efficiency: Efficient to generate pseudorandom bits
- Security: Indistinguishability from random
- Additional security: Rollback resistance

A PRNG cannot be truly random, it's deterministic given the initial seed.

Rollback resistance (not required but useful): If the attacker learns the internal PRNG state, they cannot learn anything about previous states or outputs

### HMAC-DRBG

Using HMAC to nuild PRNG.

This is secure and rollback resistant.

## Stream Ciphers

Protocol: Alice and Bob both seed a secure PRNG with their symmetric secret key, and then use the output as the key for a one-time pad

AES-CTR is a type of stream cipher

### Encryption Efficiency

Stream ciphers can continually process new elements as they arrive

### Decryption Efficiency

Benefit of some stream ciphers: You can decrypt one part of the ciphertext without decrypting the entire ciphertext

## Diffie-Hellman Key Exchange

Discrete logarithm problem (discrete log problem): Given g, p, ga mod p for random a, it is computationally hard to find a

Diffie-Hellman assumption: Given g, p, ga mod p, and gb mod p for random a, b, no polynomial time attacker can distinguish between a random value R and gab mod p.

![DH](https://tbsnhkewuwyfxowgazvr.supabase.co/storage/v1/object/public/public/cs161/dh?t=2022-10-05T07%3A19%3A21.463Z)

Diffie-Hellman can be used ephemerally

Benefit of DHE: Forward secrecy

### Issues

Diffie-Hellman is not secure against a MITM adversary
![DH MITM](https://tbsnhkewuwyfxowgazvr.supabase.co/storage/v1/object/public/public/cs161/dh-mitm)

Diffie-Hellman does not provide authentication, you're not sure who you exchanged your keys with.

### Elliptic-Curve Diffie-Hellman (ECDH)

A variation of Diffie-Hellman that uses elliptic curves instead of modular arithmetic.

## Public Key Encryption

Everyone can encrypt with the public key. Only the recipient can decrypt with the private key.

Encrypt plaintext using public key and decrypt using the private key.

## ElGamal Encryption

![ElGamal](https://tbsnhkewuwyfxowgazvr.supabase.co/storage/v1/object/public/public/cs161/elgamal.png)

ElGamal sends these values over the insecure channel
Bob’s public key: B
Ciphertext: R, M × Br mod p
Eve can’t derive gbr, so she can’t recover M

### Issues

ElGamal is not IND-CPA secure, the attacker can send m0 = 0 and m1 != 0.

The adversary can manipulate C1’ = C1, C2’ = 2 × C2 = 2 × M × gbr to make it look like 2 × M was encrypted

## RSA Encryption

![RSA](https://tbsnhkewuwyfxowgazvr.supabase.co/storage/v1/object/public/public/cs161/rsa.png)

Enc(e, N, M):

- Output Me mod N
  Dec(d, C):
- Output Cd = (Me)d mod N

RSA by itself is not IND-CPA secure.

### Optimal asymmetric encryption padding (OAEP)

A variation of RSA that introduces randomness
Different from “padding” used for symmetric encryption, used to add randomness instead of dummy bytes
Idea: RSA can only encrypt “random-looking” numbers, so encrypt the message with a random key

## Digital Signature

1. KeyGen() → PK, SK: Generate a public/private keypair, where PK is the verify (public) key, and SK is the signing (secret) key
2. Sign(SK, M) → sig: Sign the message M using the signing key SK to produce the signature sig
3. Verify(PK, M, sig) → {0, 1}: Verify the signature sig on message M using the verify key PK and output 1 if valid and 0 if invalid

EU-CPA secure

### RSA Signature

KeyGen():

- Same as RSA encryption:
  - Public key: N and e
  - Private key: d
    Sign(d, M):
- Compute H(M)d mod N
  Verify(e, N, M, sig)
- Verify that H(M) ≡ sige mod N

We say a function ff is one-way if given f(x)f(x) it is hard to find x'x such that f(x') = f(x)f(x′)=f(x).
We say a function ff is “collision-resistant” if it is hard to find two inputs xx, yy such that f(x) = f(y)f(x)=f(y) but x \ne yx

​
=y.

![Stack](https://tbsnhkewuwyfxowgazvr.supabase.co/storage/v1/object/public/public/cs161/stack.png)

# Random notes

EBP points to the sfp of the current call stack.

ESP points to the bottom of the current call stack.

ESP gets moved up 4 bytes every time something is popped off the stack.

Arrays are put on the stack in reverse order.

An x86 instruction is 8 bytes.

%c walks up the stack by 4 bytes.

```js
int main() {
    int i;    // i is an int
    int *p;   // this is a * in a type-name. It means p is a pointer-to-int
    p = &i;   // use & operator to get a pointer to i, assign that to p.
    *p = 3;   // use * operator to "dereference" p, meaning 3 is assigned to i.
}
```

A string is a pointer, so `printf(str)` prints the string that `str` points to.

Non executable pages mean you cannot execute shell code on the stack.

return to libc attack

- Overwrite the RIP with the address of the libc function
- Write 4 bytes of garbage as the RIP of the libc function
- Write 4 bytes pointing to the address above as pointer to the string
- (Alternative) Write 4 bytes pointing to an address inside the buffer
- Write the string as the argument as the libc function
- (Alternative) Write the string in the buffer.

MACs and hashes don't have confidentiality guarantees.

Pay attention to string concat. (e.g. swapping)

A scheme is not confidential if it leaks **ANY** information about the plaintext

MAC on plaintext is **LEAKY**

For integrity, you need to sign with some kind of key. Hashes don't provide integrity.

AES-CTR is IND-CPA secure. AES-CTR does not need padding.

This follows from the definition of certificates: they include a user’s public key, and
a signature on the enclosed public key, signed by the issuer

RSA uses public key to encrypt messages and private key to decrypt messages.

Theorem: Med ≡ M mod N
Raise the ciphertext to your private key.

Time of check time of use
A common failure of ensuring complete mediation involves race conditions. The time of check to time of use (TOCTTOU) vulnerability usually arises when enforcing access control policies such as when using a reference monitor. Consider the following code:

ASLR causes the absolute addresses of variables, saved registers (sfp and rip), and code instructions to be different each time the program is run. This means the attacker can no longer overwrite some part of memory (such as the rip) with a constant address. Instead, the attacker has to guess the address of their malicious instructions.

Entropy (k bits of entropy) cannot be increased.

ECB is insecure.

Certificates are signed by superior's signing keys.

IND-CPA implies non-deterministic

CTR with reused IV is a one time pad.

Pointer Authentication: just overwriting the pointer info is not enough, the pointer is authenticated using the combination of the address and the pointer info.

ESP gets moved when an item is popped off the stack.

Length extension attack: Given H(x) and the length of x, but not x, an attacker can create H(x || m) for any m of the attacker’s choosing

MSB lives at highest address in little-endian.

IND-CPA secure => confidentiality

# Random notes

EBP points to the sfp of the current call stack.

ESP points to the bottom of the current call stack.

ESP gets moved up 4 bytes every time something is popped off the stack.

Arrays are put on the stack in reverse order.

An x86 instruction is 8 bytes.

%c walks up the stack by 4 bytes.

```js
int main() {
    int i;    // i is an int
    int *p;   // this is a * in a type-name. It means p is a pointer-to-int
    p = &i;   // use & operator to get a pointer to i, assign that to p.
    *p = 3;   // use * operator to "dereference" p, meaning 3 is assigned to i.
}
```

A string is a pointer, so `printf(str)` prints the string that `str` points to.

Non executable pages mean you cannot execute shell code on the stack.

return to libc attack

- Overwrite the RIP with the address of the libc function
- Write 4 bytes of garbage as the RIP of the libc function
- Write 4 bytes pointing to the address above as pointer to the string
- (Alternative) Write 4 bytes pointing to an address inside the buffer
- Write the string as the argument as the libc function
- (Alternative) Write the string in the buffer.

MACs and hashes don't have confidentiality guarantees.

Pay attention to string concat. (e.g. swapping)

A scheme is not confidential if it leaks **ANY** information about the plaintext

MAC on plaintext is **LEAKY**

For integrity, you need to sign with some kind of key. Hashes don't provide integrity.

AES-CTR is IND-CPA secure. AES-CTR does not need padding.

This follows from the definition of certificates: they include a user’s public key, and
a signature on the enclosed public key, signed by the issuer

RSA uses public key to encrypt messages and private key to decrypt messages.

Theorem: Med ≡ M mod N
Raise the ciphertext to your private key.

Time of check time of use
A common failure of ensuring complete mediation involves race conditions. The time of check to time of use (TOCTTOU) vulnerability usually arises when enforcing access control policies such as when using a reference monitor. Consider the following code:

ASLR causes the absolute addresses of variables, saved registers (sfp and rip), and code instructions to be different each time the program is run. This means the attacker can no longer overwrite some part of memory (such as the rip) with a constant address. Instead, the attacker has to guess the address of their malicious instructions.

Entropy (k bits of entropy) cannot be increased.

ECB is insecure.

Certificates are signed by superior's signing keys.

IND-CPA implies non-deterministic

CTR with reused IV is a one time pad.

Pointer Authentication: just overwriting the pointer info is not enough, the pointer is authenticated using the combination of the address and the pointer info.

ESP gets moved when an item is popped off the stack.

Length extension attack: Given H(x) and the length of x, but not x, an attacker can create H(x || m) for any m of the attacker’s choosing

MSB lives at highest address in little-endian.

IND-CPA secure => confidentiality

## Web

### Same origin policy

Same origin iff protocol, domain, and port of the url all match exactly.

Two websites with different origins cannot interact with each other (e.g. through iframes)

Exceptions

- JavaScript runs with the origin of the page that loads it
- Websites can fetch and display images from other origins
- Websites can agree to allow some limited sharing

Cookies
Domain and path attribute define which requests the browser should attach this cookie for

If the Secure attribute is True, then the browser only sends the cookie if the request is made over HTTPS (not HTTP)

If the HttpOnly attribute is True, then JavaScript in the browser is not allowed to access the cookie

Server can create a cookie by including a `Set-Cookie` header in the response

Cookie Policies

### Setting Cookies

- Server with domain X can set a cookie with domain attribute Y if
  - The domain attribute is a domain suffix of the server’s domain
  - X ends in Y
  - X is below or equal to Y on the hierarchy
  - X is more specific or equal to Y
- The domain attribute Y is not a top-level domain (TLD)
- No restrictions for the Path attribute (the browser will accept any path)

Examples:

- mail.google.com can set cookies for Domain=google.com
- google.com can set cookies for Domain=google.com
- google.com cannot set cookies for Domain=com, because com is a top-level domain

### Sending Cookies

- The browser sends the cookie if both of these are true:
  - The domain attribute is a domain suffix of the server’s domain
  - The path attribute is a prefix of the server’s path

### CSRF
