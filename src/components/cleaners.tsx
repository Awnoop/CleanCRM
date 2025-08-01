import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PhoneIcon,
  StarIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PlusIcon,
  CheckCircleIcon,
} from "lucide-react";

interface JobHistory {
  id: string;
  title: string;
  date: string;
  time: string;
  address: string;
  client: string;
  status: "Completed" | "Cancelled";
  rating?: number;
}

interface CleanerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  rating: number;
  totalJobs: number;
  avatar?: string;
  availability: "Available" | "Busy" | "Off Duty";
  specialties: string[];
  joinDate: string;
}

interface CleanerDetailsProps {
  cleaner?: CleanerProfile;
  jobHistory?: JobHistory[];
}

const CleanerDetails = ({
  cleaner = {
    id: "1",
    name: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@email.com",
    rating: 4.8,
    totalJobs: 127,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    availability: "Available",
    specialties: ["Deep Cleaning", "Kitchen Specialist", "Pet-Friendly"],
    joinDate: "2023-03-15",
  },
  jobHistory = [
    {
      id: "1",
      title: "House Deep Clean",
      date: "2024-01-14",
      time: "09:00",
      address: "123 Main St, City",
      client: "John Doe",
      status: "Completed",
      rating: 5,
    },
    {
      id: "2",
      title: "Office Cleaning",
      date: "2024-01-13",
      time: "14:00",
      address: "456 Business Ave, City",
      client: "ABC Corp",
      status: "Completed",
      rating: 4,
    },
    {
      id: "3",
      title: "Apartment Cleaning",
      date: "2024-01-12",
      time: "10:00",
      address: "789 Oak St, City",
      client: "Jane Smith",
      status: "Completed",
      rating: 5,
    },
  ],
}: CleanerDetailsProps) => {
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    date: "",
    time: "",
    address: "",
    client: "",
  });

  const getAvailabilityColor = (
    availability: CleanerProfile["availability"],
  ) => {
    switch (availability) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Busy":
        return "bg-yellow-100 text-yellow-800";
      case "Off Duty":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAssignJob = () => {
    console.log("Assigning job to", cleaner.name, ":", newAssignment);
    setIsAssignDialogOpen(false);
    setNewAssignment({
      title: "",
      date: "",
      time: "",
      address: "",
      client: "",
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="bg-white min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Cleaner Details</h1>
          <Dialog
            open={isAssignDialogOpen}
            onOpenChange={setIsAssignDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusIcon className="w-4 h-4" />
                Assign New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Assign Job to {cleaner.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={newAssignment.title}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        title: e.target.value,
                      })
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
                      value={newAssignment.date}
                      onChange={(e) =>
                        setNewAssignment({
                          ...newAssignment,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newAssignment.time}
                      onChange={(e) =>
                        setNewAssignment({
                          ...newAssignment,
                          time: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newAssignment.address}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        address: e.target.value,
                      })
                    }
                    placeholder="123 Main St, City"
                  />
                </div>
                <div>
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    value={newAssignment.client}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        client: e.target.value,
                      })
                    }
                    placeholder="John Doe"
                  />
                </div>
                <Button onClick={handleAssignJob} className="w-full">
                  Assign Job
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Cleaner Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={cleaner.avatar} alt={cleaner.name} />
                  <AvatarFallback className="text-lg">
                    {cleaner.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {cleaner.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      {renderStars(cleaner.rating)}
                      <span className="text-sm text-gray-600 ml-1">
                        {cleaner.rating}
                      </span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">
                      {cleaner.totalJobs} jobs completed
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <PhoneIcon className="w-4 h-4" />
                    <span>{cleaner.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={getAvailabilityColor(cleaner.availability)}
                    >
                      {cleaner.availability}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Specialties
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cleaner.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <span>
                    Joined: {new Date(cleaner.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job History */}
        <Card>
          <CardHeader>
            <CardTitle>Job History</CardTitle>
          </CardHeader>
          <CardContent>
            {jobHistory.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No job history available.
              </p>
            ) : (
              <div className="space-y-4">
                {jobHistory.map((job) => (
                  <div
                    key={job.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-600">{job.client}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {job.status === "Completed" && (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        )}
                        <Badge
                          variant={
                            job.status === "Completed"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {job.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
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
                    </div>

                    {job.rating && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Rating:</span>
                        <div className="flex items-center gap-1">
                          {renderStars(job.rating)}
                          <span className="text-sm text-gray-600 ml-1">
                            {job.rating}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CleanerDetails;
