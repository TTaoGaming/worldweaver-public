---
name: prepare-proposal
description: Produce a useful reviewable proposal for a user or authorized executor from a session with public reads only.
---
# Prepare a proposal

Use when the user needs action that this read-only session cannot perform, or wants a concrete next step based on public context.

1. State the user's desired outcome and the smallest change that could produce it.
2. Bind the proposal to the public snapshot or artifact revision actually read. List material unknowns.
3. Describe the proposed action, target, expected result and an observable acceptance check.
4. Separate reversible preparation from any action needing the user's authority, such as publishing, sending, spending or deleting.
5. Include a rollback or stopping condition where relevant. An ambiguous result should be investigated before repeating a consequential action.
6. Return the proposal in the conversation. Use /coala/proposal.schema.json when its format fits the task. The public site is a read surface; it does not accept the proposal or store memory.
7. End with a concrete deliverable or decision. Do not report proposed work as executed, approved or verified.

Return: outcome; source revision; proposed action; expected effect; acceptance check; unknowns; needed executor capability; stopping condition. Use plain language for voice conversation and structured detail only when useful.

Sources: public adaptation of H4 operational heritage. This procedure supplies a way to describe work, not permission or tools to execute it.

