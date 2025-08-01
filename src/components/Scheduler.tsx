import React, { useState } from "react";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import {
  Calendar,
  CalendarDays,
  Clock,
  MapPin,
  User,
  Plus,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Job {
  id: string;
  date: Date;
  time: string;
  address: string;
  cleaner: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: "Scheduled" | "In Progress" | "Completed";
  notes?: string;
  client: string;
}

interface SchedulerProps {
  jobs?: Job[];
  cleaners?: Array<{ id: string; name: string; avatar?: string }>;
  onCreateJob?: (job: Omit<Job, "id">) => void;
  onUpdateJob?: (jobId: string, updates: Partial<Job>) => void;
}

const Scheduler = ({
  jobs = [],
  cleaners = [],
  onCreateJob = () => {},
  onUpdateJob = () => {},
}: SchedulerProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week">("week");
  const [createJobOpen, setCreateJobOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [filters, setFilters] = useState({
    cleaner: "",
    status: "",
    dateRange: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    },
  });

  // Mock data for demonstration
  const mockCleaners =
    cleaners.length > 0
      ? cleaners
      : [
          {
            id: "1",
            name: "John Doe",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
          },
          {
            id: "2",
            name: "Jane Smith",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
          },
          {
            id: "3",
            name: "Mike Johnson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
          },
          {
            id: "4",
            name: "Sarah Wilson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
          },
        ];

  const mockJobs: Job[] =
    jobs.length > 0
      ? jobs
      : [
          {
            id: "1",
            date: new Date(),
            time: "09:00",
            address: "123 Main St, Dallas, TX",
            cleaner: mockCleaners[0],
            status: "Scheduled",
            client: "Johnson Family",
            notes: "Deep clean kitchen and bathrooms",
          },
          {
            id: "2",
            date: addDays(new Date(), 1),
            time: "14:00",
            address: "456 Oak Ave, Fort Worth, TX",
            cleaner: mockCleaners[1],
            status: "In Progress",
            client: "Smith Residence",
          },
          {
            id: "3",
            date: addDays(new Date(), -1),
            time: "10:30",
            address: "789 Pine Blvd, Arlington, TX",
            cleaner: mockCleaners[2],
            status: "Completed",
            client: "Davis Home",
          },
          {
            id: "4",
            date: addDays(new Date(), 2),
            time: "11:00",
            address: "321 Elm St, Plano, TX",
            cleaner: mockCleaners[3],
            status: "Scheduled",
            client: "Wilson Office",
          },
        ];

  const getWeekDays = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    const end = endOfWeek(date, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  };

  const getJobsForDate = (date: Date) => {
    return mockJobs.filter((job) => isSameDay(job.date, date));
  };

  const getStatusColor = (status: Job["status"]) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleCreateJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newJob = {
      date: selectedDate || new Date(),
      time: formData.get("time") as string,
      address: formData.get("address") as string,
      cleaner:
        mockCleaners.find((c) => c.id === formData.get("cleaner")) ||
        mockCleaners[0],
      status: "Scheduled" as const,
      client: formData.get("client") as string,
      notes: formData.get("notes") as string,
    };
    onCreateJob(newJob);
    setCreateJobOpen(false);
  };

  const navigateDate = (direction: "prev" | "next") => {
    const days = viewMode === "day" ? 1 : 7;
    setCurrentDate((prev) =>
      direction === "next" ? addDays(prev, days) : addDays(prev, -days),
    );
  };

  const renderDayView = () => {
    const dayJobs = getJobsForDate(currentDate);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {format(currentDate, "EEEE, MMMM d, yyyy")}
          </h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDate("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDate("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-3">
          {dayJobs.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                No jobs scheduled for this day
              </CardContent>
            </Card>
          ) : (
            dayJobs.map((job) => <JobCard key={job.id} job={job} />)
          )}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Week of {format(weekDays[0], "MMMM d")} -{" "}
            {format(weekDays[6], "MMMM d, yyyy")}
          </h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDate("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDate("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {weekDays.map((day) => {
            const dayJobs = getJobsForDate(day);
            const isToday = isSameDay(day, new Date());

            return (
              <Card
                key={day.toISOString()}
                className={isToday ? "ring-2 ring-blue-500" : ""}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {format(day, "EEE d")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="space-y-2">
                    {dayJobs.map((job) => (
                      <div
                        key={job.id}
                        className={`p-2 rounded-md text-xs ${getStatusColor(job.status)}`}
                      >
                        <div className="font-medium">{job.time}</div>
                        <div className="truncate">{job.client}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <Avatar className="h-4 w-4">
                            <AvatarImage src={job.cleaner.avatar} />
                            <AvatarFallback className="text-xs">
                              {job.cleaner.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="truncate">{job.cleaner.name}</span>
                        </div>
                      </div>
                    ))}
                    {dayJobs.length === 0 && (
                      <div className="text-xs text-muted-foreground text-center py-2">
                        No jobs
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  const JobCard = ({ job }: { job: Job }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
              <span className="text-sm text-muted-foreground">
                {format(job.date, "MMM d, yyyy")}
              </span>
            </div>

            <h4 className="font-semibold mb-1">{job.client}</h4>

            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{job.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{job.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <Avatar className="h-5 w-5">
                  <AvatarImage src={job.cleaner.avatar} />
                  <AvatarFallback className="text-xs">
                    {job.cleaner.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span>{job.cleaner.name}</span>
              </div>
            </div>

            {job.notes && (
              <div className="mt-2 text-sm text-muted-foreground">
                <strong>Notes:</strong> {job.notes}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="bg-white min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Job Scheduler</h1>
          <p className="text-muted-foreground">
            Manage and view all cleaning jobs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFiltersOpen(true)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button onClick={() => setCreateJobOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Job
          </Button>
        </div>
      </div>

      {/* View Toggle */}
      <Tabs
        value={viewMode}
        onValueChange={(value) => setViewMode(value as "day" | "week")}
      >
        <TabsList>
          <TabsTrigger value="day">
            <CalendarDays className="h-4 w-4 mr-2" />
            Day View
          </TabsTrigger>
          <TabsTrigger value="week">
            <Calendar className="h-4 w-4 mr-2" />
            Week View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="day" className="mt-6">
          {renderDayView()}
        </TabsContent>

        <TabsContent value="week" className="mt-6">
          {renderWeekView()}
        </TabsContent>
      </Tabs>

      {/* Create Job Dialog */}
      <Dialog open={createJobOpen} onOpenChange={setCreateJobOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Job</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateJobSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {selectedDate ? (
                        format(selectedDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" name="time" type="time" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="client">Client</Label>
                <Input
                  id="client"
                  name="client"
                  placeholder="Client name"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter client address"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="cleaner">Assign Cleaner</Label>
                <Select name="cleaner" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a cleaner" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCleaners.map((cleaner) => (
                      <SelectItem key={cleaner.id} value={cleaner.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={cleaner.avatar} />
                            <AvatarFallback className="text-xs">
                              {cleaner.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {cleaner.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Special instructions or notes"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Create Job</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Filters Dialog */}
      <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Filter Jobs</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Cleaner</Label>
              <Select
                value={filters.cleaner}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, cleaner: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All cleaners" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All cleaners</SelectItem>
                  {mockCleaners.map((cleaner) => (
                    <SelectItem key={cleaner.id} value={cleaner.id}>
                      {cleaner.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                value={filters.status}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Date Range</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 justify-start text-left font-normal"
                    >
                      {filters.dateRange.from
                        ? format(filters.dateRange.from, "MMM d")
                        : "From"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={filters.dateRange.from}
                      onSelect={(date) =>
                        setFilters((prev) => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, from: date },
                        }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 justify-start text-left font-normal"
                    >
                      {filters.dateRange.to
                        ? format(filters.dateRange.to, "MMM d")
                        : "To"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={filters.dateRange.to}
                      onSelect={(date) =>
                        setFilters((prev) => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, to: date },
                        }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setFilters({
                  cleaner: "",
                  status: "",
                  dateRange: { from: undefined, to: undefined },
                })
              }
            >
              Clear Filters
            </Button>
            <DialogClose asChild>
              <Button>Apply Filters</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Scheduler;
