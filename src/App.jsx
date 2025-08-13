import { useState, useEffect, useCallback } from "react";
import { toast, Toaster } from "sonner";
import { Loader2 } from 'lucide-react';
import TodoListHeader from "./components/TodoListHeader";
import TodoStats from "./components/TodoStats";
import AddTodoForm from "./components/AddTodoForm";
import TodoListItem from "./components/TodoListItem";
import todoService from "@/services/todoService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [todoToDeleteId, setTodoToDeleteId] = useState(null);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [loadingTodoId, setLoadingTodoId] = useState(null);
  const [isDeletingTodo, setIsDeletingTodo] = useState(false);

  // Calculate statistics
  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.isCompleted).length;
  const unfinishedTasks = totalTasks - completedTasks;

  useEffect(() => {
    todoService.getAllTodos().then((data) => setTodos(data));
  }, []);

  const handleNewTodoChange = useCallback((event) => {
    setNewTodo(event.target.value);
  }, []);

  const handleNewTodo = useCallback(() => {
    if (newTodo.trim() === "") {
      toast.error("Task cannot be empty!");
      return;
    }
    setIsAddingTodo(true);
    todoService
      .addTodo(
        { title: newTodo, isCompleted: false },
        { successMessage: "Todo added successfully!" }
      )
      .then((data) => {
        setTodos([...todos, data]);
        setNewTodo("");
      })
      .finally(() => {
        setIsAddingTodo(false);
      });
  }, [newTodo, todos]);

  const handleUpdateTodo = useCallback(
    (id, isCompleted) => {
      setLoadingTodoId(id);
      const todo = todos.find((todo) => todo.id === id);
      todoService
        .updateTodo(
          id,
          { ...todo, isCompleted },
          { successMessage: "Todo updated successfully!" }
        )
        .then(() => {
          const newTodos = todos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, isCompleted };
            }
            return todo;
          });
          setTodos(newTodos);
        })
        .finally(() => {
          setLoadingTodoId(null);
        });
    },
    [todos]
  );

  const handleDeleteTodo = useCallback((id) => {
    setTodoToDeleteId(id);
    setShowConfirmModal(true);
  }, []);

  const confirmDeleteTodo = useCallback(() => {
    setIsDeletingTodo(true);
    todoService
      .deleteTodo(todoToDeleteId, {
        successMessage: "Todo deleted successfully!",
      })
      .then(() => {
        const newTodos = todos.filter((todo) => todo.id !== todoToDeleteId);
        setTodos(newTodos);
        setTodoToDeleteId(null);
      })
      .finally(() => {
        setIsDeletingTodo(false);
        setShowConfirmModal(false);
      });
  }, [todoToDeleteId, todos]);

  return (
    <>
      <>
        <div className="container mx-auto p-4 flex flex-col h-screen">
          <TodoListHeader />
          <TodoStats
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            unfinishedTasks={unfinishedTasks}
          />
          <AddTodoForm
            newTodo={newTodo}
            handleNewTodoChange={handleNewTodoChange}
            handleNewTodo={handleNewTodo}
            isAddingTodo={isAddingTodo}
          />
          <div className="overflow-y-auto flex-grow">
            {todos.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p>No tasks found. Add a new task above!</p>
              </div>
            ) : (
              <ul>
                {todos.map((todo) => (
                  <TodoListItem
                    key={todo.id}
                    todo={todo}
                    handleUpdateTodo={handleUpdateTodo}
                    handleDeleteTodo={handleDeleteTodo}
                    loadingTodoId={loadingTodoId}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </>
      <Toaster />
      <AlertDialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteTodo}
              disabled={isDeletingTodo}
            >
              {isDeletingTodo ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Continue"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default App;
