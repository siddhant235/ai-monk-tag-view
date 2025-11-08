/**
 * Type definitions for the nested tag tree structure
 */

export interface TreeNode {
  name: string;
  children?: TreeNode[];
  data?: string;
}

export type TreePath = number[];

export interface TagViewProps {
  node: TreeNode;
  path?: TreePath;
  onUpdate: (path: TreePath, updatedNode: Partial<TreeNode>) => void;
  level?: number;
}

