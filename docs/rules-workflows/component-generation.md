# Workflow: Component Generation

This workflow defines the state-machine for generating and styling components to enforce strict Shadcn and Semantic Variable compliance.

## State 1: Verification
- Check if the requested UI element exists in `components.json` or the official Shadcn registry.
- **Condition:** If yes, proceed to State 2. If no, proceed to State 1a.

## State 1a: Acquisition
- Run `npx shadcn@latest add [component]` to acquire the primitive.
- Verify installation before proceeding to State 2.

## State 2: Import & Scaffolding
- Import the Shadcn primitive into your custom component.
- Build the component structure using semantic HTML5, wrapping the primitive where necessary to achieve the "Avant-Garde" aesthetic.

## State 3: Variable Mapping
- Apply semantic Tailwind variables for coloring (`bg-background`, `text-primary`).
- **ABSOLUTE RULE:** Reject any hardcoded utility colors (e.g., `text-red-500` or `#FF0000`).

## State 4: Validation
- Verify against "Intentional Minimalism" directives: Are there unnecessary elements? Does the styling map exactly to the Great Forge taxonomy?
- Review for WCAG AAA contrast compliance if utilizing custom combinations.
