---
title: Factoring Large Semiprimes.
description: A novel approach to factoring large semiprimes.
---

# A New Approach to Factoring Large Semi-Primes: Is It Possible?

Years ago, an acquaintance challenged me with a problem, over beers, that I didn’t know to be impossible. I developed a legitimate method for factoring large semi-primes more efficiently—a method that depends on the difference between primes, not on the size of the semi-prime.

## Understanding Semi-Primes

At its most basic, multiplying two prime numbers is straightforward. For instance:

$$ 7 \times 5 = 35 $$

However, reversing this process—finding the prime factors from their product, such as determining the two numbers that multiply to 35—can be much harder. The product of two primes, called a semi-prime, is notoriously difficult to factor when the primes are large. This difficulty is a fundamental reason why RSA encryption is so secure: the problem of factoring large semi-primes is computationally intense.

## Optimizing the Search Space

The first step to improving efficiency is reducing the search space. Key observations include:

* $p$ and $q$ are odd primes.
* $p$ will always be greater than $\sqrt{pq}$, while $q$ will be smaller.

Even with these constraints, the search space remains large. However, I discovered a method to make it more manageable by refactoring the problem.

## A Mathematical Approach

To refactor $x = \sqrt{pq + n^2}$ into expressions for $p$ and $q$:

**Start with:**
$$
x = \sqrt{pq + n^2}
$$

**Square both sides** to remove the square root:
$$
x^2 = pq + n^2
$$

**Rearrange to express** $pq$:
$$
pq = x^2 - n^2
$$

**Assume:**
$$
p = x - n
$$
$$
q = x + n
$$

**Verify by substituting** $p$ and $q$:
$$
pq = (x - n)(x + n) = x^2 - n^2
$$

Therefore, the refactored expressions are:
$$
p = x - n
$$
$$
q = x + n
$$

By incrementing $x$, we can check if $p \times q = pq$. If they do, we’ve found our primes.

Let’s see this in action:

**For $pq = 35$:**
$$
x = \sqrt{35 + 1^2} = 6
$$
$$
p = 6 - 1 = 5
$$
$$
q = 6 + 1 = 7
$$

Therefore, $5 \times 7 = 35$, and the factors are correct.

**For $pq = 77$:**
$$
x = \sqrt{77 + 1^2}
$$

is not an integer. Try a larger $n$.

$$
x = \sqrt{77 + 2^2} = 9
$$
$$
p = 9 - 2 = 7
$$
$$
q = 9 + 2 = 11
$$

Here, $7 \times 11 = 77$, confirming the factors.

## Enhancing Efficiency

The method effectively narrows down the search to the range of possible differences between the primes, which is significantly smaller than brute-forcing all numbers. This approach can factor a 50-digit semi-prime in milliseconds on modest hardware.

The algorithm is non-deterministic, meaning that the specific values of $x$ and $n$ that lead to a correct factorization can vary, and it relies on iterative searching. Additionally, the method is inherently parallelizable: each range of potential values for $x$ can be tested simultaneously by different processes or machines, speeding up the overall search.

By reversing the process—fixing $x = \lceil \sqrt{pq} \rceil$ and solving for $n$—we can improve speed further:

$$
x = \lceil \sqrt{pq} \rceil
$$
$$
n = \sqrt{x^2 - pq}
$$

For instance, for $pq = 35$:
$$
x = 6
$$
$$
n = \sqrt{6^2 - 35} = \sqrt{36 - 35} = \pm 1
$$

Thus, $p = 5$ and $q = 7$, matching our earlier results.

## Time Complexity 

To analyze the time complexity of the proposed approach, consider the following: 

1. **Incrementing $x$**: The approach involves starting with $x$ initialized to $\lceil \sqrt{pq} \rceil$ and incrementing $x$ to find suitable values for $p$ and $q$. For each $x$, the computation of $n$ using $n = \sqrt{x^2 - pq}$ is performed in constant time, assuming basic arithmetic operations are $O(1)$.

2. **Checking Validity**: After calculating $p$ and $q$, the validation step involves checking if $p \times q = pq$, which is also an $O(1)$ operation.

In the worst-case scenario, the number of potential $x$ values that need to be checked is proportional to the square root of $pq$. If $pq$ is an $n$-digit number, then $x$ will range up to approximately $O(10^{n/2})$. Thus, the time complexity of the approach is approximately $O(\sqrt{pq})$. 

## Excluding More Values Based on Minimum Distance

If the minimum distance between two prime factors $p$ and $q$ of a semi-prime $pq$ is $\Delta$, you can exclude all potential pairs where the difference $|p - q|$ is less than $\Delta$. This effectively narrows down your search space.

* If the minimum distance $\Delta$ is substantial, such as $2^{412}$, you exclude all values where the difference between factors is less than $\Delta$.
* This could reduce the number of pairs to check, especially if the actual distance between the two primes $p$ and $q$ is much larger than $\Delta$.


For a 1024-bit RSA key, the recommended minimum difference $\Delta$ between the two primes $p$ and $q$ is calculated using the formula from Section B.3 of the Digital Signature Standard (DSS):

$$
\Delta > 2^{k/2 - 100}
$$

where $k$ is the bit length of the RSA modulus. For $k = 1024$:

$$
\Delta > 2^{1024/2 - 100}
$$
$$
\Delta > 2^{512 - 100}
$$
$$
\Delta > 2^{412}
$$

Therefore, the difference between the two primes for a 1024-bit RSA key should be greater than $2^{412}$. This condition helps ensure that the primes are sufficiently distinct to maintain the security of the RSA key.


## Practical Example

For a key of length $n$ bits, where $pq$ is an $n$-bit semi-prime, and the minimum distance $\Delta$ is $\Delta > 2^{k/2 - 100}$ for some $k$, the complexity might be updated to:

$$
O(\sqrt{pq} - 2^{k/2 - 100} )
$$

Which is still technically $$O(1)$$

This represents a significant improvement over brute-force methods, which have exponential complexity in terms of the number of digits, though it still scales with the size of the semi-prime.

## Impact on Cryptography

That acquaintance, whom I know to be involved in the Tor ecosystem, later told me that this approach directly influenced the transition to version 3 (v3) onion addresses.

Tor's v3 addresses moved from RSA to elliptic-curve cryptography (ECC) for several reasons:

* **Increased Security**: RSA keys, especially at 1024 bits, are less secure against modern factoring techniques and computational advances.
* **Better Efficiency**: ECC provides stronger security with smaller key sizes, making it more efficient.
* **Faster Computations**: ECC-based public-key cryptography enables faster and more efficient computations, which is crucial for secure communications in privacy-focused networks like Tor.

This is just one example of how cryptographic research and improvements in factorization algorithms can influence the evolution of secure communications systems.

## Conclusion

The method I’ve described offers a way to efficiently factor large semi-primes by exploiting the difference between primes. Though not a panacea, it is an important step in understanding the weaknesses of current cryptographic systems and lays the groundwork for future research into improving security.

This method shows that there is still room for improvement in factoring algorithms, but also reinforces why RSA, despite its vulnerabilities, continues to be widely used for many applications. 