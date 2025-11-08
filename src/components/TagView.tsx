import React, { useState } from "react";
import { TagViewProps, TreeNode } from "../types/tree";
import "./TagView.css";

/**
 * TagView Component - Recursive component for rendering nested tag hierarchy
 *
 * @param {Object} node - Current tag node with name and either children or data
 * @param {Array} path - Path to this node in the tree [0, 1, ...] for updates
 * @param {Function} onUpdate - Callback to update the tree structure
 * @param {Number} level - Nesting level for styling (0 for root)
 */
const TagView: React.FC<TagViewProps> = React.memo(({
    node,
    path = [],
    onUpdate,
    level = 0,
}) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const [editedName, setEditedName] = useState<string>(node.name);

    const hasChildren = node.children && node.children.length > 0;
    const hasData = node.data !== undefined;

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleAddChild = () => {
        const newChild: TreeNode = {
            name: "New Child",
            data: "New Data",
        };

        // Expand the parent to show the new child
        if (isCollapsed) {
            setIsCollapsed(false);
        }

        if (hasData) {
            // Convert data node to children node
            onUpdate(path, {
                children: [newChild],
                data: undefined,
            });
        } else {
            // Add to existing children
            const updatedChildren = [...(node.children || []), newChild];
            onUpdate(path, { children: updatedChildren });
        }
    };

    const handleNameClick = () => {
        setIsEditingName(true);
        setEditedName(node.name);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(e.target.value);
    };

    const handleNameSave = () => {
        if (editedName.trim()) {
            onUpdate(path, { name: editedName.trim() });
        }
        setIsEditingName(false);
    };

    const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleNameSave();
        } else if (e.key === "Escape") {
            setIsEditingName(false);
            setEditedName(node.name);
        }
    };

    return (
        <div className={`tag-view ${level === 0 ? "root-tag" : ""}`}>
            {/* Tag Header */}
            <div className="tag-header" style={{ paddingLeft: `${16 + level * 20}px` }}>
                {/* Collapse/Expand Button */}
                <button
                    className="toggle-btn"
                    onClick={toggleCollapse}
                    aria-label={isCollapsed ? "Expand" : "Collapse"}
                >
                    {isCollapsed ? "›" : "∨"}
                </button>

                {/* Tag Name */}
                {isEditingName ? (
                    <input
                        type="text"
                        className="tag-name-input"
                        value={editedName}
                        onChange={handleNameChange}
                        onBlur={handleNameSave}
                        onKeyDown={handleNameKeyDown}
                        autoFocus
                    />
                ) : (
                    <div className="tag-name" onClick={handleNameClick}>
                        {node.name}
                    </div>
                )}

                {/* Add Child Button */}
                <button className="add-child-btn" onClick={handleAddChild}>
                    Add Child
                </button>
            </div>

            {/* Tag Content - Animated collapse/expand */}
            <div className={`tag-content ${isCollapsed ? "collapsed" : ""}`}>
                <div className="tag-content-inner">
                    {/* Render Data Field */}
                    {hasData && (
                        <div
                            className="tag-data"
                            style={{ paddingLeft: `${16 + (level + 1) * 20}px` }}
                        >
                            <label className="data-label">Data</label>
                            <input
                                type="text"
                                className="data-input"
                                value={node.data}
                                onChange={(e) => onUpdate(path, { data: e.target.value })}
                                placeholder="Enter data..."
                            />
                        </div>
                    )}

                    {/* Render Children Recursively */}
                    {hasChildren && (
                        <div className="tag-children">
                            {node.children!.map((child, index) => (
                                <TagView
                                    key={`${child.name}-${index}`}
                                    node={child}
                                    path={[...path, index]}
                                    onUpdate={onUpdate}
                                    level={level + 1}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

TagView.displayName = "TagView";

export default TagView;

