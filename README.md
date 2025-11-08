# 🏷️ Nested Tag View

A beautiful, type-safe React + TypeScript application for managing hierarchical tag structures with collapsible nodes and dynamic editing.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 🚀 Features

### ✅ Implemented (Phase 1 & 2)
- **Recursive Tag Rendering** - Display nested tags at any depth
- **Collapsible Nodes** - Expand/collapse any tag including root
- **Beautiful UI** - Modern gradient design with smooth animations
- **TypeScript** - Full type safety and better DX
- **Responsive Design** - Works on all screen sizes

### 🔜 Coming Soon (Phase 3-7)
- **Editable Data Fields** - Modify tag data inline
- **Dynamic Child Creation** - Add children to any tag
- **Editable Names** - Click to rename tags
- **Export to JSON** - Export clean tree structure
- **Optimized Performance** - React.memo and other optimizations

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher (v22+ recommended)
- **npm**: v8.0.0 or higher

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
ai-monk-tag-view/
├── src/
│   ├── components/
│   │   ├── TagView.tsx       # Main recursive tag component
│   │   └── TagView.css       # Component styles
│   ├── types/
│   │   └── tree.ts           # TypeScript type definitions
│   ├── App.tsx               # Root application component
│   ├── App.css               # App-level styles
│   ├── main.tsx              # Application entry point
│   ├── index.css             # Global styles
│   └── vite-env.d.ts         # Vite type declarations
├── public/
├── index.html
├── package.json
├── tsconfig.json             # TypeScript configuration
├── vite.config.js            # Vite configuration
├── IMPLEMENTATION_PLAN.md    # Detailed implementation roadmap
└── TYPESCRIPT_MIGRATION.md   # TypeScript migration details
```

## 🏗️ Architecture

### Data Structure

Each tag node follows this TypeScript interface:

```typescript
interface TreeNode {
  name: string;          // Required: tag name
  children?: TreeNode[]; // Optional: array of child nodes
  data?: string;         // Optional: leaf node data
}
```

**Key Rule**: A node has **either** `children` OR `data`, never both.

### Component Hierarchy

```
App
 └─ TagView (recursive)
     ├─ Collapse/Expand Button
     ├─ Tag Name Header
     ├─ Add Child Button
     ├─ Data Input (if leaf node)
     └─ Children (recursive TagViews)
```

## 🎨 UI/UX Features

- **Modern Gradient Theme** - Purple gradient with professional aesthetics
- **Smooth Animations** - Fade-in effects and hover transitions
- **Visual Hierarchy** - Indentation and styling show nesting levels
- **Accessible** - Proper ARIA labels and keyboard support
- **Responsive** - Mobile-first design that scales beautifully

## 📖 Usage Example

### Initial Tree Structure

```typescript
const tree = {
  name: "root",
  children: [
    {
      name: "child1",
      children: [
        { name: "child1-child1", data: "c1-c1 Hello" },
        { name: "child1-child2", data: "c1-c2 JS" }
      ]
    },
    { name: "child2", data: "c2 World" }
  ]
};
```

### Collapse/Expand
- Click the **∨** button to collapse a tag (changes to **›**)
- Click the **›** button to expand a tag (changes to **∨**)
- Hidden content: children tags and data fields

## 🔧 Development

### Available Scripts

```bash
# Development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npx tsc --noEmit
```

### Code Quality

- **TypeScript**: Strict mode enabled for maximum type safety
- **ESLint**: Configured for React and TypeScript
- **Hot Module Replacement**: Instant updates during development

## 📚 Documentation

- **[Implementation Plan](IMPLEMENTATION_PLAN.md)** - Detailed 7-phase development roadmap
- **[TypeScript Migration](TYPESCRIPT_MIGRATION.md)** - Migration details and benefits

## 🗺️ Roadmap

### Phase 1: Core Structure ✅
- [x] Basic tree rendering
- [x] Recursive component architecture
- [x] Initial state management

### Phase 2: Collapse/Expand ✅
- [x] Toggle functionality
- [x] Visual indicators (∨/›)
- [x] Smooth transitions

### Phase 3: Editable Data ⏳
- [ ] Text input fields
- [ ] Real-time updates
- [ ] State synchronization

### Phase 4: Add Children ⏳
- [ ] "Add Child" button functionality
- [ ] Data-to-children conversion
- [ ] Dynamic tree updates

### Phase 5: Editable Names ⏳
- [ ] Click-to-edit names
- [ ] Enter to save
- [ ] Input validation

### Phase 6: Export JSON ⏳
- [ ] Export button
- [ ] Clean JSON output
- [ ] Display/download options

### Phase 7: Polish ⏳
- [ ] Performance optimization
- [ ] Edge case handling
- [ ] Final UX improvements

## 🤝 Contributing

This is a practice project. Feel free to fork and experiment!

## 📄 License

MIT

## 🙏 Acknowledgments

Built with modern web technologies:
- React 18+ for UI
- TypeScript for type safety
- Vite for blazing fast development
- CSS3 for beautiful styling

---

**Current Status**: Phase 1 & 2 Complete ✅ | TypeScript Migration Complete ✅

**Next Up**: Phase 3 - Editable Data Fields 🚀
