import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Loader2, Edit } from "lucide-react";
import { toast } from "sonner";

function TodoListItem({
  todo,
  handleUpdateTodo,
  handleDeleteTodo,
  loadingTodoId,
  handleUpdateTodoTitle,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleTitleUpdate = () => {
    if (editedTitle.trim() === "") {
      toast.error("Task cannot be empty!");
      return;
    }
    if (editedTitle === todo.title) {
      setIsEditing(false);
      return;
    }
    handleUpdateTodoTitle(todo.id, editedTitle);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <li
      key={todo.id}
      className={`flex items-center mb-2 border border-gray-200 rounded-md p-3 shadow-sm hover:bg-blue-50 hover:border-blue-200 cursor-pointer ${
        todo.isCompleted ? "bg-gray-100" : "bg-white"
      }`}
    >
      {loadingTodoId === todo.id ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin text-blue-500" />
      ) : (
        <Checkbox
          checked={todo.isCompleted}
          onCheckedChange={(checked) => {
            handleUpdateTodo(todo.id, checked);
          }}
          className="mr-2"
        />
      )}
      {isEditing ? (
        <Input
          type="text"
          value={editedTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleUpdate}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleTitleUpdate();
            }
            if (e.key === "Escape") {
              handleCancelEdit();
            }
          }}
          className="flex-grow border-slate-300"
          autoFocus
        />
      ) : (
        <span
          className={`${todo.isCompleted ? "line-through" : ""} flex-grow`}
          onClick={
            loadingTodoId === todo.id
              ? null
              : () => handleUpdateTodo(todo.id, !todo.isCompleted)
          }
        >
          {todo.title}
        </span>
      )}
      {!todo.isCompleted && !isEditing && (
        <Button
          onClick={() => setIsEditing(true)}
          variant="outline"
          size="icon"
          className="ml-2"
        >
          <Edit className="h-4 w-4" />
        </Button>
      )}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteTodo(todo.id);
        }}
        variant="destructive"
        size="icon"
        className="ml-2"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  );
}

export default TodoListItem;
