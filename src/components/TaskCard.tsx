
import { CheckCircle, Circle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
}

const TaskCard = ({ task, onToggle }: TaskCardProps) => {
  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const priorityIcons = {
    low: Circle,
    medium: AlertCircle,
    high: AlertCircle,
  };

  const PriorityIcon = priorityIcons[task.priority];

  return (
    <div 
      className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${
        task.completed ? 'bg-slate-50 opacity-75' : 'bg-white hover:bg-slate-50'
      }`}
      onClick={onToggle}
    >
      <button className="flex-shrink-0">
        {task.completed ? (
          <CheckCircle className="w-5 h-5 text-green-600" />
        ) : (
          <Circle className="w-5 h-5 text-muted-foreground hover:text-primary" />
        )}
      </button>
      
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
          {task.title}
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <PriorityIcon className="w-4 h-4 text-muted-foreground" />
        <Badge variant="outline" className={priorityColors[task.priority]}>
          {task.priority}
        </Badge>
      </div>
    </div>
  );
};

export default TaskCard;
