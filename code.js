class Node {
    constructor(id, parent) {
        this.id = id;
        this.children = [];
        this.parent = parent;
    }

    addChild() {
        let childId = (this.children || []).length + 1;        
        this.children.push(new Node(childId, this));        
    }

    getPrintableId() {
        let ids = "";
        let tempParent = this.parent;
        while (tempParent != null) {
            ids = tempParent.id + "." + ids;
            tempParent = tempParent.parent;
        }

        let printableId = "Node " + ids + this.id;
        return printableId;
    }

    getLevel() {
        let level = 0;
        let tempParent = this.parent;
        while (tempParent != null) {
            level++;
            tempParent = tempParent.parent;
        }
        return level;
    }

    getIndentedStyle(level) {
        return "display: block; margin-left: " + level * 5 + "em;";
    }    

    getRootNode() {
        let tempParent = this.parent;
        while (tempParent != null && tempParent.parent != null) {
            tempParent = tempParent.parent;
        }

        let root = tempParent;
        if (root === null || root === undefined) {
            root = this;
        }

        return root;
    }
}

function drawNode(node, clear) {
    let divTree = document.getElementById("divTree");
    
    if (clear === true) {
        divTree.innerHTML = "";
    }

    if (node === null || node === undefined) {
        CreateAddButtonForNotExistingNode();        
        return;
    }

    let divNode = document.createElement("div");
    divNode.innerHTML = node.getPrintableId();
    divNode.setAttribute("style", node.getIndentedStyle(node.getLevel()));
    divTree.appendChild(divNode);

    for (let child of node.children) {
        drawNode(child, false);
    }

    CreateAddButtonForExistingNode(node)
}

function CreateAddButtonForNotExistingNode() {
    let aAdd = document.createElement("a");
    aAdd.innerText = "[[ Add ]]";    
    aAdd.onclick = function () {
        tree = new Node(1, null);        
        drawNode(tree, true);
    };
    divTree.appendChild(aAdd);
}

function CreateAddButtonForExistingNode(node) {
    let btnAdd = document.createElement("a");
    btnAdd.innerText = "[[ Add ]]";
    btnAdd.setAttribute("style", node.getIndentedStyle(node.getLevel() + 1));
    btnAdd.onclick = function () {
        node.addChild();
        drawNode(node.getRootNode(), true);
    };    
    divTree.appendChild(btnAdd);
}

drawNode(null, true);