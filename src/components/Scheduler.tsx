import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  FilterIcon,
  PlusIcon,
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  date: string;
  time: string;
  address: string;
  cleaner: string;
  status: "Scheduled" | "In Progress" | "Completed";
  client: string;
}

interface JobSchedulerProps {
  jobs?: Job[];
  cleaners?: string[];
}

const JobScheduler = ({
  jobs = [
    {
      id: "1",
      title: "House Cleaning",
      date: "2024-01-15",
      time: "09:00",
      address: "123 Main St, City",
      cleaner: "Sarah Johnson",
      status: "Scheduled",
      client: "John Doe",
    },
    {
      id: "2",
      title: "Office Cleaning",
      date: "2024-01-15",
      time: "14:00",
      address: "456 Business Ave, City",
      cleaner: "Mike Wilson",
      status: "In Progress",
      client: "ABC Corp",
    },
    {
      id: "3",
      title: "Apartment Deep Clean",
      date: "2024-01-14",
      time: "10:00",
      address: "789 Oak St, City",
      cleaner: "Emma Davis",
      status: "Completed",
      client: "Jane Smith",
    },
  ],
  cleaners = ["Sarah Johnson", "Mike Wilson", "Emma Davis", "Tom Brown"],
}: JobSchedulerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [viewMode, setViewMode] = useState<"day" | "week">("day");
  const [filterCleaner, setFilterCleaner] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    date: "",
    time: "",
    address: "",
    cleaner: "",
    client: "",
  });

  const getStatusColor = (status: Job["status"]) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesCleaner =
      !filterCleaner ||
      filterCleaner === "all-cleaners" ||
      job.cleaner === filterCleaner;
    const matchesStatus =
      !filterStatus ||
      filterStatus === "all-status" ||
      job.status === filterStatus;
    return matchesCleaner && matchesStatus;
  });

  const handleCreateJob = () => {
    console.log("Creating job:", newJob);
    setIsCreateDialogOpen(false);
    setNewJob({
      title: "",
      date: "",
      time: "",
      address: "",
      cleaner: "",
      client: "",
    });
  };

  return (
    <div className="bg-white min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Job Scheduler</h1>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusIcon className="w-4 h-4" />
                Create New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Job</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={newJob.title}
                    onChange={(e) =>
                      setNewJob({ ...newJob, title: e.target.value })
                    }
                    placeholder="House Cleaning"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newJob.date}
                      onChange={(e) =>
                        setNewJob({ ...newJob, date: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newJob.time}
                      onChange={(e) =>
                        setNewJob({ ...newJob, time: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newJob.address}
                    onChange={(e) =>
                      setNewJob({ ...newJob, address: e.target.value })
                    }
                    placeholder="123 Main St, City"
                  />
                </div>
                <div>
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    value={newJob.client}
                    onChange={(e) =>
                      setNewJob({ ...newJob, client: e.target.value })
                    }
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="cleaner">Assign Cleaner</Label>
                  <Select
                    value={newJob.cleaner}
                    onValueChange={(value) =>
                      setNewJob({ ...newJob, cleaner: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select cleaner" />
                    </SelectTrigger>
                    <SelectContent>
                      {cleaners.map((cleaner) => (
                        <SelectItem key={cleaner} value={cleaner}>
                          {cleaner}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleCreateJob} className="w-full">
                  Create Job
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* View Toggle and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Tabs
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "day" | "week")}
          >
            <TabsList>
              <TabsTrigger value="day">Day View</TabsTrigger>
              <TabsTrigger value="week">Week View</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap gap-2 items-center">
            <FilterIcon className="w-4 h-4 text-gray-500" />
            <Select value={filterCleaner} onValueChange={setFilterCleaner}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by cleaner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-cleaners">All Cleaners</SelectItem>
                {cleaners.map((cleaner) => (
                  <SelectItem key={cleaner} value={cleaner}>
                    {cleaner}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>

          {/* Job Cards */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {viewMode === "day" ? "Today's Jobs" : "This Week's Jobs"}
              </h2>

              {filteredJobs.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-500">
                      No jobs found matching your filters.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {filteredJobs.map((job) => (
                    <Card
                      key={job.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {job.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {job.client}
                            </p>
                          </div>
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" />
                            {job.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <ClockIcon className="w-4 h-4" />
                            {job.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="w-4 h-4" />
                            {job.address}
                          </div>
                          <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4" />
                            {job.cleaner}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobScheduler;
