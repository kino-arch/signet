# Forge Bot Security Decision Memo

**Date**: ${new Date().toISOString().split('T')[0]}
**Author**: Staff Engineer (Design Infrastructure)
**Status**: APPROVED

## Executive Summary
This memo outlines the security boundaries and architecture for the "Forge Bot", our AI-assisted migration pipeline responsible for converting legacy arbitrary Tailwind values into the new Constellation token architecture.

## Decision: Self-Hosted vs. External LLMs

### Primary Recommendation: Self-Hosted (Approved)
The Forge Bot will run utilizing a **self-hosted open-source model** (CodeLlama 34B or StarCoder2) deployed inside our VPC via Ollama/vLLM. 
- **Rationale**: Prevents sending proprietary UI components, internal business logic, and custom styling to third-party APIs. Guarantees zero external data leakage and eliminates the need for complex code sanitization pipelines.

### Fallback Architecture: External API
In the event that the self-hosted architecture cannot scale to meet CI demands:
1. We will fall back to an external LLM provider (OpenAI/Anthropic).
2. **Hard Requirement**: Legal must sign a Data Processing Agreement (DPA) explicitly opting out of training data usage.
3. **Hard Requirement**: A pre-processing sanitization layer must strip all comments, non-UI business logic, and sensitive variable names before payload transmission.

## Operational Safeguards

### No Auto-Merge Policy
The Forge Bot operates under a strict **Human-in-the-Loop** model. 
- The bot will generate Pull Requests or inline PR comments mapping arbitrary values to the highest-confidence token.
- The bot **will not** auto-merge or force-push code. Human engineers (Design Infrastructure Team) must manually review and apply the suggestions.

### Graceful Degradation
If the AI layer fails (timeout, rate limits, infrastructure outage), the pipeline degrades to manual mode:
- The codemod will output a standard PR comment identifying the arbitrary value and providing a static URL to the token dictionary, leaving the resolution entirely to the engineer.
