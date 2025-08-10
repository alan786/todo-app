import { useState } from 'react';

export function TodoCard(props) {
    const {todo, handleDeleteTodo, todoIndex, handleCompleteTodo, handleUpdateTodo} = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.input);

    const handleSaveEdit = () => {
        handleUpdateTodo(todoIndex, editText);
        setIsEditing(false);
    };

    return (
        <div className="card todo-item">
            {isEditing ? (
                <div className="edit-mode">
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        autoFocus
                    />
                    <div className="edit-buttons">
                        <button onClick={handleSaveEdit}>
                            <h6>Save</h6>
                        </button>
                        <button onClick={() => setIsEditing(false)}>
                            <h6>Cancel</h6>
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <p>{todo.input}</p>
                    <div className="todo-buttons">
                        <button 
                            onClick={() => handleCompleteTodo(todoIndex)} 
                            disabled={todo.complete}
                        >
                            <h6>Done</h6>
                        </button>
                        <button onClick={() => setIsEditing(true)}>
                            <h6>Edit</h6>
                        </button>
                        <button onClick={() => handleDeleteTodo(todoIndex)}>
                            <h6>Delete</h6>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}