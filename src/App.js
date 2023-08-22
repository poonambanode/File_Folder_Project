import { useState } from "react";
import "./styles.css";
import explorer from "./data/folderData";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  //console.log(explorerData);

  const { insertNode, deleteNode, updateNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (folderId, isFolder) => {
    const finalTree = deleteNode(explorerData, folderId, isFolder);
    setExplorerData(finalTree);
  };

  const handleUpdateNode = (folderId, item) => {
    const finalTree = updateNode(explorerData, folderId, item);
    setExplorerData(finalTree);
  };

  return (
    <div className="App">
      <Folder
        handleDeleteNode={handleDeleteNode}
        handleInsertNode={handleInsertNode}
        handleUpdateNode={handleUpdateNode}
        explorer={explorerData}
      />
    </div>
  );
}
