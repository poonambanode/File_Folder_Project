import { useState } from "react";

function Folder({
  explorer,
  handleInsertNode,
  handleDeleteNode,
  handleUpdateNode
}) {
  const [expand, setExpand] = useState(false);
  const [hover, setHover] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editInput, setEditInput] = useState("");

  const [showInput, setShowInput] = useState({
    isFolder: false,
    visibility: false
  });

  const onFolderHander = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      ...showInput,
      isFolder,
      visibility: true
    });
  };

  const onFileHandler = (e, isFolder) => {
    e.stopPropagation();
    setShowInput({
      ...showInput,
      isFolder,
      visibility: true
    });
  };

  const onBlurInput = () => {
    setShowInput({
      ...showInput,
      visibility: false
    });
  };

  const onInsert = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({
        ...showInput,
        visibility: false
      });
    }
  };

  const onDelete = (e) => {
    e.stopPropagation();
    handleDeleteNode(explorer.id, showInput.isFolder);
  };

  const onEdit = (e) => {
    e.stopPropagation();
    setIsEdit(true);
    setEditInput(explorer.name);
    setHover(false);
  };

  const onUpdateItem = (e) => {
    if (e.keyCode === 13 && editInput) {
      handleUpdateNode(explorer.id, editInput, showInput.isFolder);
      setIsEdit(false);
    }
  };

  if (explorer && explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div
          className="folder"
          onClick={() => {
            setExpand(!expand);
          }}
          onMouseEnter={(e) => setHover(true)}
          onMouseLeave={(e) => setHover(false)}
        >
          <div>
            {" "}
            {!isEdit ? (
              <span> 📁 {explorer.name} </span>
            ) : (
              <input
                value={editInput}
                autoFocus
                onChange={(e) => setEditInput(e.target.value)}
                onKeyDown={(e) => onUpdateItem(e)}
                onBlur={() => setIsEdit(false)}
              />
            )}
            {hover && !isEdit && (
              <label
                className="edit_delete_container"
                style={{ marginLeft: 20 }}
              >
                <span onClick={(e) => onDelete(e)}> x </span>
                <span onClick={(e) => onEdit(e)}> ✎ </span>
              </label>
            )}
          </div>
          <div>
            <button onClick={(e) => onFolderHander(e, true)}> Folder + </button>
            <button onClick={(e) => onFileHandler(e, false)}> File + </button>
          </div>
        </div>
        {showInput.visibility && (
          <div className="input_container">
            <span> {showInput.isFolder ? "📁" : "📄"} </span>
            <input
              autoFocus
              onBlur={() => onBlurInput()}
              onKeyDown={(e) => {
                onInsert(e, explorer);
              }}
            />
          </div>
        )}

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {explorer.items.map((exp) => {
            return (
              <Folder
                handleDeleteNode={handleDeleteNode}
                handleInsertNode={handleInsertNode}
                handleUpdateNode={handleUpdateNode}
                explorer={exp}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="file"
        onMouseEnter={(e) => setHover(true)}
        onMouseLeave={(e) => setHover(false)}
      >
        {!isEdit ? (
          explorer && <span>📄 {explorer.name} </span>
        ) : (
          <input
            value={editInput}
            autoFocus
            onChange={(e) => setEditInput(e.target.value)}
            onKeyDown={(e) => onUpdateItem(e)}
            onBlur={() => setIsEdit(false)}
          />
        )}
        {hover && (
          <label className="edit_delete_container" style={{ marginLeft: 20 }}>
            <span onClick={(e) => onDelete(e)}> x </span>
            <span onClick={(e) => onEdit(e)}> ✎ </span>
          </label>
        )}
      </div>
    );
  }
}

export default Folder;
