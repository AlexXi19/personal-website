---
title: Test
date: '2022-10-1'
layout: blog
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

### Calling convention

- Arguments are pushed onto the stack in reverse order, so func(val1, val2, val3) will place val3 at the highest memory address, then val2, then val1
- Return values are passed in EAX
- When calling a function, the ESP and EBP need to shift to create a new stack frame, and the EIP must move to the callee’s code
- When returning from a function, the ESP, EBP, and EIP must return to their old values

![Alt](https://tbsnhkewuwyfxowgazvr.supabase.co/storage/v1/object/public/public/call-stack.png)

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

Python Syntax

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
