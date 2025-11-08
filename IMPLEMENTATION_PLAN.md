# Nested Tag View - Implementation Plan

## Overview

A React-based nested tag viewer that supports recursive tag hierarchies with collapsible nodes, inline editing, and dynamic child creation.

## Data Structure

```javascript
{
  name: 'root',
  children: [
    {
      name: 'child1',
      children: [
        { name: 'child1-child1', data: "c1-c1 Hello" },
        { name: 'child1-child2', data: "c1-c2 JS" }
      ]
    },
    { name: 'child2', data: "c2 World" }
  ]
}
```

### Key Rules:

1. Each tag has a `name` property
2. Each tag has **either** `children` (Array) **or** `data` (String), never both
3. Tags can be nested recursively
4. Structure is dynamic and modifiable

---

## Phase 1: Core Data Structure & Basic Rendering

**Goal:** Set up the foundation with basic tree rendering

### Tasks:

- [ ] Create initial tree state in App.jsx with example data
- [ ] Create TagView component with basic structure
- [ ] Implement recursive rendering of nested tags
- [ ] Display tag names in blue headers
- [ ] Render data fields as text (not input yet)
- [ ] Basic styling for tag hierarchy

### Acceptance Criteria:

- Tree structure displays correctly
- Nested tags show proper indentation/hierarchy
- All tag names and data values are visible

---

## Phase 2: Collapse/Expand Functionality

**Goal:** Make tags collapsible with toggle buttons

### Tasks:

- [ ] Add collapsed state to each tag node
- [ ] Implement toggle button (">" collapsed, "v" expanded)
- [ ] Show/hide children based on collapsed state
- [ ] Show/hide data field based on collapsed state
- [ ] Ensure all tags including root are collapsible
- [ ] Style collapse/expand buttons

### Acceptance Criteria:

- Clicking toggle button collapses/expands tag
- Collapsed tags show only name header with ">"
- Expanded tags show "v" and their contents
- Root tag is also collapsible

---

## Phase 3: Editable Data Fields

**Goal:** Make data values editable with text inputs

### Tasks:

- [ ] Convert data display to input fields
- [ ] Implement onChange handlers for data inputs
- [ ] Update tree structure when data is edited
- [ ] Ensure changes persist in the tree object
- [ ] Style input fields appropriately

### Acceptance Criteria:

- Data appears in text input fields
- Typing updates the internal tree structure
- Changes are immediately reflected in state
- Input fields are properly styled

---

## Phase 4: Add Child Functionality

**Goal:** Dynamically add new children to any tag

### Tasks:

- [ ] Add "Add Child" button to each tag
- [ ] Implement click handler for adding children
- [ ] Convert `data` property to `children` array when adding first child
- [ ] Remove data field when children are added
- [ ] Create new child with default values (name: "New Child", data: "Data")
- [ ] Update tree structure immutably
- [ ] Ensure recursive adding works at any level

### Acceptance Criteria:

- "Add Child" button appears on every tag
- Clicking adds a new child with defaults
- If tag had data field, it's replaced with children array
- New child appears in UI immediately
- Works at any nesting level

---

## Phase 5: Editable Tag Names

**Goal:** Allow inline editing of tag names

### Tasks:

- [ ] Make tag name clickable
- [ ] Show input field when name is clicked
- [ ] Implement input state for name editing
- [ ] Handle Enter key to save new name
- [ ] Handle blur event to cancel/save
- [ ] Update tree structure with new name
- [ ] Revert to display mode after saving

### Acceptance Criteria:

- Clicking tag name shows input field
- Can type new name
- Pressing Enter saves the name
- Name updates in tree structure
- Returns to display mode after save
- ESC or blur can cancel editing

---

## Phase 6: Export Functionality

**Goal:** Export clean JSON representation of tree

### Tasks:

- [ ] Add "Export" button to UI (likely at top/root level)
- [ ] Implement export function to traverse tree
- [ ] Filter out internal state (only include name, children, data)
- [ ] Use JSON.stringify with proper formatting
- [ ] Display exported JSON (console.log or UI element)
- [ ] Ensure all data modifications are reflected in export

### Acceptance Criteria:

- Export button is visible and accessible
- Clicking exports current tree state
- Exported JSON only contains name, children, data
- All edited values appear in export
- JSON is properly formatted and readable
- No internal state properties in output

---

## Phase 7: Polish & Optimization

**Goal:** Refine UI/UX and optimize performance

### Tasks:

- [ ] Review and optimize component re-renders
- [ ] Consider React.memo for TagView if needed
- [ ] Improve styling and visual hierarchy
- [ ] Add smooth transitions for collapse/expand
- [ ] Ensure keyboard navigation works well
- [ ] Add hover states and visual feedback
- [ ] Test with deeply nested structures
- [ ] Handle edge cases (empty trees, single nodes, etc.)
- [ ] Code cleanup and refactoring

### Acceptance Criteria:

- UI is smooth and responsive
- No unnecessary re-renders
- Visual hierarchy is clear
- Animations are smooth
- All interactions feel polished
- Edge cases handled gracefully

---

## Technical Considerations

### State Management:

- Use `useState` for tree structure in App.jsx
- Pass down update functions to child components
- Consider immutable updates for tree modifications
- Each tag node needs collapse state (can be internal or in tree)

### Component Structure:

```
App.jsx (main state container)
  └─ TagView.jsx (recursive component)
       ├─ Collapse/Expand button
       ├─ Tag name (clickable for edit)
       ├─ Data input (if data exists)
       ├─ Add Child button
       └─ Children (recursive TagView components)
```

### Key Functions Needed:

- `updateData(path, newData)` - Update data at specific path
- `updateName(path, newName)` - Update name at specific path
- `addChild(path)` - Add child at specific path
- `toggleCollapse(path)` - Toggle collapse state
- `exportTree()` - Clean export of tree structure

### Path Tracking:

- Use array indices or unique IDs to track position in tree
- Pass path down through props for updates
- Example: `[0, 1, 2]` represents tree.children[0].children[1].children[2]

---

## UI Components Breakdown

### TagView Component Props:

```javascript
{
  node: Object,           // Current tag node
  path: Array,            // Path to this node [0, 1, ...]
  onUpdate: Function,     // Update handler
  level: Number           // Nesting level (for styling)
}
```

### Styling Considerations:

- Use indentation/padding to show hierarchy depth
- Blue headers for tag names
- Clear button styling
- Proper spacing between elements
- Responsive design
- Clear visual separation between tags

---

## Testing Checklist (Post-Implementation)

- [ ] Can expand/collapse all tags including root
- [ ] Can edit all data fields
- [ ] Can edit all tag names
- [ ] Can add children at any level
- [ ] Data field converts to children when first child added
- [ ] Export shows current state accurately
- [ ] Export only includes name, children, data
- [ ] Deep nesting works correctly
- [ ] No console errors
- [ ] UI updates smoothly
- [ ] Changes persist correctly in tree structure

---

## Notes for Discussion

1. **Collapse State Location**: Should collapse state be part of tree structure or separate? (Recommend separate for clean export)
2. **Export Display**: Console.log, alert, or dedicated display area?
3. **Name Edit Cancellation**: ESC key, blur, or both?
4. **Delete Functionality**: Not mentioned in requirements - add later?
5. **Validation**: Should tag names be unique? Any validation rules?
6. **Styling Framework**: Plain CSS, CSS modules, or library (Tailwind, MUI)?

---

## Estimated Timeline

- Phase 1: 1-2 hours
- Phase 2: 1 hour
- Phase 3: 30 minutes
- Phase 4: 1-2 hours (most complex)
- Phase 5: 1 hour
- Phase 6: 30 minutes
- Phase 7: 1-2 hours
- **Total: ~7-10 hours**

---

## Next Steps

1. Review and discuss this plan
2. Clarify any questions in "Notes for Discussion"
3. Decide on implementation approach for complex parts
4. Begin Phase 1 implementation
