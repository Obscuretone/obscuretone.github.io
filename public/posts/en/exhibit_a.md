---
title: The Emulator Does Not Count
description: A professional Python contract and a Game Boy emulator can both disappear when a hiring system only recognizes experience from the approved kind of employment record.
tags: [hiring, careers, evidence, software, python, credentials]
---

I am apparently not qualified to write Python.

Exhibit A is a Game Boy emulator written in Python.

[PyGameBoy](/posts/en/pygameboy) implements a CPU, memory bus, interrupts, timers, graphics, audio, cartridge controllers, saves, and a headless conformance runner. It runs real games and diagnostic ROMs. Its tests cover the ordinary Python implementation as well as the assembled machine, because making every line execute is much easier than proving that the result behaves like a Game Boy.

I wrote it for fun, which is where the problem begins.

## The Evidence Arrived On Separate Lines

I have written software professionally for years, mostly in PHP. That history already answers whether I can work with other developers, negotiate requirements, maintain existing systems, support users, survive code review, and deliver inside constraints I did not choose.

I originally learned C at university. A lot of students now meet programming through Python, which makes my apparent lack of Python qualification especially funny. Since then I have picked up whatever languages the work required: PHP, Java, some C++, and even assembly for an ATmega bootloader. Yes, really. Moving between languages has never been the speculative part of hiring me.

I also had a contract building Azure cloud-onramp automation in Python. That is professional Python experience in the most literal possible sense: an organization paid me to solve an infrastructure problem with Python. Because the engagement was a contract, an internal talent system can still treat it as something adjacent to employment rather than part of the history it knows how to count.

PyGameBoy is the corroborating evidence. It demonstrates that the contract was not an isolated encounter with the language and that I can design, write, profile, test, document, and maintain a substantial Python system. Nobody paid me to build it, so it can be filed under hobbies and ignored for the opposite reason.

The qualification can be decomposed into three ordinary questions:

1. Can this person build software professionally?
2. Has this person used Python professionally?
3. Can this person build substantial software in Python?

My career answers the first. The Azure contract answers the second. The emulator answers the third. The hiring field quietly asks another question: did an approved employer classify this person as an employee and pay them specifically to write Python for the required number of years?

That is easier to query, but it is not the same question.

The evidence arrived on separate lines, and the form does not know how to join them.

## Exhibit A

A Game Boy emulator is an unusually inconvenient way to fake knowing Python.

The processor alone has hundreds of instruction encodings, each with flag and timing behavior that other software expects. Memory reads and writes can reach work RAM, video RAM, hardware registers, cartridge controllers, or mirrored regions depending on the address and machine state. Graphics and audio run on clocks connected to the processor but produce output on the host computer. Performance matters because CPython has to simulate all of it quickly enough to keep sound and video synchronized.

The project now has complete legal opcode dispatch, multiple memory-bank controllers, all four audio channels, a public compatibility report, and test ROMs that enter through the cartridge interface. I eventually wrote [a diagnostic cartridge that audits its own opcode coverage](/posts/en/obscuretone_test_rom) because unit coverage could no longer answer the interesting questions.

None of that proves that I am the world's greatest Python programmer. It does establish that "has this person written meaningful Python?" should not be the difficult part of the evaluation.

The source is public. The architecture is documented. The tests run in public CI. The claims are unusually falsifiable for a resume line because anyone can inspect the code, run the emulator, or find the places where the project still admits that it is incomplete.

The evidence is stronger than a keyword. It is also much more expensive to evaluate.

## Why The Checkbox Wins

Talent acquisition works at a different level of abstraction from engineering. Its systems need fields that can be searched, compared, audited, and moved through a workflow. Employer, title, employment type, dates, and years with a technology fit neatly into that model. Understanding why a test ROM is meaningful requires time and enough domain knowledge to distinguish engineering from theatre.

The checkbox wins because it is cheap to process.

This is the same compression problem that turns [a resume into an advertisement](/posts/en/ten_seconds) and reduces complicated work to familiar titles, approved keywords, and easily scanned numbers. Evidence that requires interpretation loses to metadata that can be counted.

That tradeoff is understandable when one recruiter is screening hundreds of applications. It becomes harder to defend in internal hiring, where the organization already has access to more context and still chooses the smallest possible representation of the person.

A contractor can spend months building systems inside a company while remaining strangely absent from its institutional memory. The work happened. Coworkers relied on it. The HR record may still describe a vendor relationship rather than experience the organization is prepared to recognize.

The personal project suffers from the inverse problem. It is visible, inspectable, and attributable, but it happened outside the approved container. The stronger the project becomes, the stranger it feels to explain that it does not count because it was voluntary.

## Let The Evidence Join

[EMH](/posts/en/inevitability) was designed around exactly this failure. Instead of asking whether one resume line contains the approved phrase, it can decompose a requirement into the capabilities the phrase is supposed to represent and look for evidence across the whole record.

Years of professional PHP work support collaboration, maintenance, delivery, and production judgment. The Azure contract supports professional Python use. PyGameBoy supports current, substantial Python engineering with source, tests, and public results. A conventional filter sees three incomplete entries. An evidence matcher can show how the entries answer one requirement together.

EMH should not automatically declare that the candidate is qualified. Its useful job is to surface the evidence, preserve where each claim came from, and make uncertainty explicit. A human can still decide how much language-specific professional tenure matters for a particular role, but the decision would begin with the available facts rather than an empty checkbox produced by lossy parsing.

That is a better use of automation than making rejection faster. The expensive part of this case is assembling the argument. Software can do that work cheaply enough to give the evidence a chance to be read.

## Professional Is Not A Language Feature

A hobby project alone does not prove that its author can negotiate requirements, support users, coordinate with a team, maintain someone else's system, or make compromises under an organization's constraints. A person working alone can choose the problem, architecture, deadline, and definition of done.

PyGameBoy does not need to prove those things because years of professional software work already do. The Python contract already joins the language to a professional setting. The emulator adds technical depth that can be inspected directly instead of inferred from a title.

Python has its own ecosystem, conventions, tooling, and runtime behavior. Those differences matter, and the emulator confronts many of them directly: package structure, typing, profiling, NumPy, `pytest`, CI across interpreter versions, and the performance cost of doing hardware simulation in CPython.

The professional skills transfer because collaboration, maintenance, judgment, and accountability are not language features. The language skills are visible because the code exists, and their professional use is established by the contract. Requiring all of this to have occurred under one preferred payroll category does not reveal an additional ability; it reveals whether someone previously passed the same filter.

That is a wonderfully circular way to create professional Python experience.

## Missing Checkbox, Present Ability

Calling recruiters stupid would miss how reliably the process creates this result. People use the tools, categories, and incentives available to them. A recruiter is rarely given an afternoon to inspect emulator architecture, and an applicant-tracking system cannot become curious about a repository.

The failure lives in the decision model. It refuses to compose evidence, and it can even discard a record that already contains the complete answer because the employment type is wrong. Years of software work, a professional Python contract, and a substantial public Python system remain insufficient when the system demands one approved employment entry with the right title, technology, and duration. When the proxy disagrees with direct evidence, the process often protects the field rather than revising the conclusion.

I can understand how the system arrives there without accepting that it arrived somewhere sensible.

The checkbox says I am not qualified to write Python.

The emulator continues to run anyway.
