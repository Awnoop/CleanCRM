import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Users } from "lucide-react";

interface JobMetricsPanelProps {
  todaysJobs?: number;
  completedJobs?: number;
  activeCleaners?: Array<{
    id: string;
    name: string;
    status: "available" | "busy" | "offline";
  }>;
  completionRate?: number;
}

const JobMetricsPanel = ({
  todaysJobs = 12,
  completedJobs = 5,
  activeCleaners = [
    { id: "1", name: "John Doe", status: "busy" },
    { id: "2", name: "Jane Smith", status: "available" },
    { id: "3", name: "Mike Johnson", status: "busy" },
    { id: "4", name: "Sarah Williams", status: "offline" },
  ],
  completionRate = 42,
}: JobMetricsPanelProps) => {
  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "busy":
        return "bg-amber-500";
      case "offline":
        return "bg-slate-300";
      default:
        return "bg-slate-300";
    }
  };

  const activeCleanerCount = activeCleaners.filter(
    (cleaner) => cleaner.status !== "offline",
  ).length;

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Today's Overview</h2>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Today's Jobs Card */}
        <Card>
          <CardContent className="p-3 flex flex-col items-center justify-center">
            <Clock className="h-5 w-5 text-blue-500 mb-1" />
            <p className="text-xs text-muted-foreground">Today's Jobs</p>
            <p className="text-2xl font-bold">{todaysJobs}</p>
          </CardContent>
        </Card>

        {/* Completed Jobs Card */}
        <Card>
          <CardContent className="p-3 flex flex-col items-center justify-center">
            <CheckCircle className="h-5 w-5 text-green-500 mb-1" />
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold">{completedJobs}</p>
          </CardContent>
        </Card>
      </div>

      {/* Completion Rate */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">Completion Rate</span>
          <span className="text-sm font-medium">{completionRate}%</span>
        </div>
        <Progress value={completionRate} className="h-2" />
      </div>

      {/* Active Cleaners */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Active Cleaners</span>
          <Badge variant="outline" className="font-normal">
            <Users className="h-3 w-3 mr-1" />
            {activeCleanerCount}/{activeCleaners.length}
          </Badge>
        </div>

        <div className="space-y-2">
          {activeCleaners.map((cleaner) => (
            <div
              key={cleaner.id}
              className="flex items-center justify-between bg-slate-50 p-2 rounded-md"
            >
              <div className="flex items-center">
                <div
                  className={`h-2 w-2 rounded-full mr-2 ${getStatusColor(cleaner.status)}`}
                ></div>
                <span className="text-sm">{cleaner.name}</span>
              </div>
              <Badge
                variant={
                  cleaner.status === "available" ? "secondary" : "outline"
                }
                className="text-xs font-normal"
              >
                {cleaner.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobMetricsPanel;
