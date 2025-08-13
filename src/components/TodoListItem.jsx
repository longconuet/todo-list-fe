import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from 'lucide-react';

function TodoListItem({ todo, handleUpdateTodo, handleDeleteTodo, loadingTodoId }) {
  return (
    <li
      key={todo.id}
      className={`flex items-center mb-2 border border-gray-200 rounded-md p-3 shadow-sm cursor-pointer hover:bg-blue-50 hover:border-blue-200 ${todo.isCompleted ? 'bg-gray-100' : 'bg-white'}`}
      onClick={loadingTodoId === todo.id ? null : () => handleUpdateTodo(todo.id, !todo.isCompleted)}
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
      <span className={todo.isCompleted ? "line-through" : ""}>
        {todo.title}
      </span>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteTodo(todo.id);
        }}
        variant="destructive"
        size="icon"
        className="ml-auto"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  );
}

export default TodoListItem;
