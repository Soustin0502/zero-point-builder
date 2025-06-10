
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      user: "You",
      action: "completed",
      target: "Dashboard redesign",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      user: "Team",
      action: "updated",
      target: "Project timeline",
      time: "4 hours ago",
      type: "info",
    },
    {
      id: 3,
      user: "You",
      action: "created",
      target: "New task: Review mockups",
      time: "6 hours ago",
      type: "default",
    },
    {
      id: 4,
      user: "System",
      action: "generated",
      target: "Weekly report",
      time: "1 day ago",
      type: "info",
    },
    {
      id: 5,
      user: "You",
      action: "archived",
      target: "Old project files",
      time: "2 days ago",
      type: "secondary",
    },
  ];

  const typeColors = {
    success: "bg-green-100 text-green-800",
    info: "bg-blue-100 text-blue-800",
    default: "bg-gray-100 text-gray-800",
    secondary: "bg-purple-100 text-purple-800",
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs">
                {activity.user === "You" ? "YU" : activity.user === "Team" ? "TM" : "SY"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-foreground">{activity.user}</span>
                <Badge variant="outline" className={typeColors[activity.type as keyof typeof typeColors]}>
                  {activity.action}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{activity.target}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
