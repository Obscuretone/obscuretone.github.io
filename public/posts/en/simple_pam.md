---
title: Simple PAM - Using Uptime As An Authentication Signal
image: rt_simple_pam_uptime.webp
imagealt: "A login doorway controlled by a reboot clock, uptime gauge, and relay-like PAM modules."
imagecaption: "Physical access, recent reboot, and PAM policy drawn as one local authentication boundary."
imagesource: "AI-generated illustration created for obscuretone with OpenAI image generation."
description: A project note on a small Linux PAM module that checks system uptime as a narrow authentication control for physical-access scenarios.
tags: [security, linux, authentication, software, systems]
---

[simple-pam](https://github.com/obscuretone/simple-pam) is a small Linux PAM module that checks system uptime during authentication.

By default, it allows authentication to continue only if the machine has been power-cycled recently. The idea is narrow: in some device scenarios, recent uptime can act as a rough signal that the user had physical access to the machine.

This small example shows how Linux PAM can enforce local policy at the authentication boundary.

## What PAM Gives You

PAM, or Pluggable Authentication Modules, lets Linux systems compose authentication behavior from modules. Login, `sudo`, SSH, display managers, and custom applications can all use PAM stacks depending on system configuration; the Linux-PAM manual describes the framework as a way for applications to be [independent of the underlying authentication scheme](https://man7.org/linux/man-pages/man8/pam.8.html).

That makes PAM powerful and dangerous. A small module can affect critical login paths. It needs to fail predictably, be easy to test, and be installed carefully.

The project is interesting because it touches a real system boundary:

1. Build a shared library.
2. Install it where PAM can load it.
3. Configure a PAM service to call it.
4. Test authentication behavior.
5. Avoid locking yourself out.

That is a different kind of programming from writing an application endpoint. The code is small, but the integration surface matters.

## Why Uptime?

Uptime is not identity. It does not prove who a user is.

What it can sometimes suggest is physical access. If a system requires recent reboot before accepting a login path, the user likely had the ability to power-cycle the device or be near someone who did.

That can be useful only in specific contexts, such as:

1. local lab machines
2. kiosk-like devices
3. embedded systems
4. controlled physical environments
5. experiments with multi-factor local policy

It would be inappropriate as a standalone security control for normal servers or remote access. It is a policy signal, not a password replacement.

## The Shape Of The Module

The module checks system uptime and returns a PAM result based on a configured threshold. If the uptime is recent enough, authentication continues to the next module in the stack. If not, authentication can fail immediately depending on how the PAM config is written.

That behavior makes configuration important. In PAM, words like `required`, `requisite`, and `sufficient` change how failure affects the rest of the stack; the `pam.conf` manual spells out those [control flag semantics](https://man7.org/linux/man-pages/man5/pam.conf.5.html).

For example, putting a module at the top of `common-auth` as `requisite` means a failed check can stop the authentication flow early. That may be exactly what you want in a test environment and exactly what you do not want on a remote system you depend on.

## Testing Matters

The repo includes a small test application that uses PAM directly. That is important because testing a PAM module only through system login is a good way to make mistakes painful.

A focused test program lets you exercise authentication and account behavior without repeatedly risking a real login path.

For system-level code, that kind of harness matters. The safest version of low-level work is the one where you can test the dangerous parts in a controlled way before integrating them into the real path.

## What This Project Shows

The value of this project comes from the kind of boundary it touches.

It shows:

1. comfort with Linux authentication plumbing
2. shared-library integration
3. security policy composition
4. careful testing around system-level behavior
5. awareness that small modules can have large operational consequences

Those are useful engineering instincts.

## Closing Thought

`simple-pam` is intentionally small, but small security modules are rarely trivial. The code is only one part of the work. The real question is how the module behaves inside the system that loads it.

That is the lesson: when software runs at an authentication boundary, integration, configuration, and failure behavior matter as much as the function itself.
