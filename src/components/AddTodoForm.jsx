import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

function AddTodoForm({ newTodo, handleNewTodoChange, handleNewTodo, isAddingTodo }) {
  return (
    <div className="flex mb-6 py-6 px-3 rounded-lg shadow-md bg-gray-100">
      <Input
        type="text"
        value={newTodo}
        onChange={handleNewTodoChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleNewTodo();
          }
        }}
        placeholder="Type here..."
        className="mr-2 bg-white border-slate-300"
      />
      <Button onClick={handleNewTodo} className="bg-blue-600 text-white" disabled={isAddingTodo}>
        {isAddingTodo ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          "Add"
        )}
      </Button>
    </div>
  );
}

export default AddTodoForm;
