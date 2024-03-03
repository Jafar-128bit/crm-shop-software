class TreeNode {
    constructor(id, value) {
        this.id = id;
        this.value = value;
        this.children = [];
    }
}

class Tree {
    root = null;

    insert(parentId, id, value) {
        const newNode = new TreeNode(id, value);

        if (!this.root) {
            this.root = newNode;
            return;
        }

        const parent = this.findNode(parentId);
        if (!parent) {
            throw new Error(`Parent node with ID ${parentId} not found`);
        }

        parent.children.push(newNode);
    }

    preorder(node = this.root, result = []) {
        if (!node) {
            return result;
        }

        result.push(node.value);
        for (const child of node.children) {
            this.preorder(child, result);
        }

        return result;
    }

    getTree() {
        if (!this.root) {
            return [];
        }

        return [{
            id: this.root.id,
            value: this.root.value,
            children: this.getTreeFromNode(this.root)
        }];
    }


    getTreeFromNode(node) {
        return node.children.map(child => ({
            id: child.id,
            value: child.value,
            children: this.getTreeFromNode(child)
        }));
    }

    findNode(id, node = this.root) {
        if (!node) {
            return null;
        }

        if (node.id === id) {
            return node;
        }

        for (const child of node.children) {
            const found = this.findNode(id, child);
            if (found) {
                return found;
            }
        }

        return null;
    }
}

// Create a tree instance
const myTree = new Tree();

// Insert some nodes
myTree.insert(null, 0, "Food Category");
myTree.insert(0, 1, "Vegetarian");
myTree.insert(1, 2, "Fruits");
myTree.insert(1, 3, "Vegetables");
myTree.insert(0, 4, "Non-Vegetarian");

// Perform a preorder traversal
const preOrderedValues = myTree.preorder();
console.log("Preorder traversal:", preOrderedValues);

// Get the entire tree structure
const treeData = myTree.getTree();
console.log("Tree structure:", treeData);

