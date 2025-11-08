import { useState } from "react";
import TagView from "./components/TagView";
import { TreeNode, TreePath } from "./types/tree";
import "./App.css";

function App() {
    // Initial tree structure - starting empty
    const [tree, setTree] = useState<TreeNode>({
        name: "root",
        children: [],
    });

    // State for exported JSON
    const [exportedJSON, setExportedJSON] = useState<string | null>(null);

    // Handler for updating the tree structure
    const handleUpdate = (path: TreePath, updatedNode: Partial<TreeNode>) => {
        setTree((prevTree) => {
            // Deep clone the tree
            const newTree = JSON.parse(JSON.stringify(prevTree)) as TreeNode;

            // Navigate to the node using path
            let current: TreeNode = newTree;
            for (let i = 0; i < path.length; i++) {
                if (current.children) {
                    current = current.children[path[i]];
                }
            }

            // Update the node
            Object.assign(current, updatedNode);

            return newTree;
        });
    };

    // Export tree as clean JSON
    const handleExport = () => {
        // Clean the tree to only include name, children, and data
        const cleanTree = (node: TreeNode): TreeNode => {
            const cleaned: TreeNode = { name: node.name };

            if (node.children) {
                cleaned.children = node.children.map(cleanTree);
            }

            if (node.data !== undefined) {
                cleaned.data = node.data;
            }

            return cleaned;
        };

        const exportedTree = cleanTree(tree);
        const jsonString = JSON.stringify(exportedTree, null, 2);

        // Set the exported JSON to display below
        setExportedJSON(jsonString);

        // Copy to clipboard
        navigator.clipboard.writeText(jsonString).then(() => {
            // Silent copy - JSON is now shown below
        }).catch(() => {
            // Ignore clipboard errors - JSON is shown below anyway
        });
    };

    return (
        <div className="app-container">
            <div className="app-header">
                <h1 className="app-title">🏷️ Nested Tag View</h1>
                <p className="app-subtitle">Manage your hierarchical tag structure</p>
            </div>

            <div className="tag-container">
                <TagView node={tree} path={[]} onUpdate={handleUpdate} level={0} />
            </div>

            <div className="app-footer">
                <button className="export-btn" onClick={handleExport}>
                    📋 Export JSON
                </button>
            </div>

            {/* Display exported JSON */}
            {exportedJSON && (
                <div className="export-output">
                    <div className="export-output-header">
                        <h3>Exported JSON</h3>
                        <button
                            className="close-btn"
                            onClick={() => setExportedJSON(null)}
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>
                    <pre className="export-output-content">{exportedJSON}</pre>
                </div>
            )}
        </div>
    );
}

export default App;

