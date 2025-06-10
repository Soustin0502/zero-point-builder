
import { useState } from "react";
import { Plus, CheckCircle, Clock, TrendingUp, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/StatsCard";
import TaskCard from "@/components/TaskCard";
import ActivityFeed from "@/components/ActivityFeed";

const Index = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Review project proposals", completed: false, priority: "high" },
    { id: 2, title: "Update dashboard analytics", completed: true, priority: "medium" },
    { id: 3, title: "Schedule team meeting", completed: false, priority: "low" },
    { id: 4, title: "Finish quarterly report", completed: false, priority: "high" },
  ]);

  const stats = [
    { title: "Tasks Completed", value: "12", change: "+2.5%", icon: CheckCircle, color: "text-green-600" },
    { title: "Hours Worked", value: "34.2", change: "+8.1%", icon: Clock, color: "text-blue-600" },
    { title: "Productivity", value: "94%", change: "+12.3%", icon: TrendingUp, color: "text-purple-600" },
    { title: "Projects Active", value: "6", change: "+1", icon: Activity, color: "text-orange-600" },
  ];

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tasks Section */}
          <div className="lg:col-span-2">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Tasks</span>
                  <Badge variant="secondary">{tasks.filter(t => !t.completed).length} pending</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={() => toggleTask(task.id)}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed */}
          <div>
            <ActivityFeed />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
