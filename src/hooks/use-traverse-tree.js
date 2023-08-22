function useTraverseTree() {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: []
      });
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((exp) => {
      return insertNode(exp, folderId, item, isFolder);
    });
    return {
      ...tree,
      items: latestNode
    };
  }
  function deleteNode(tree, folderId) {
    console.log(tree, folderId);
    if (tree.id === folderId) {
      return null;
    }
    let filteredTree = [];
    filteredTree = tree.items
      .filter((item) => item.id !== folderId)
      .map((item) => deleteNode(item, folderId));
    return {
      ...tree,
      items: filteredTree
    };
  }

  function updateNode(tree, folderId, item) {
    if (tree.id === folderId) {
      tree.name = item;
      return tree;
    }
    let updatedTree = [];
    updatedTree = tree.items.map((newItem) =>
      updateNode(newItem, folderId, item)
    );

    return {
      ...tree,
      items: updatedTree
    };
  }
  return { insertNode, deleteNode, updateNode };
}
export default useTraverseTree;
