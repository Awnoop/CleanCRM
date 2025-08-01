import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  StarIcon,
  MessageSquareIcon,
  EditIcon,
} from "lucide-react";

interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  joinDate: string;
  totalJobs: number;
  preferences: {
    petFriendly: boolean;
    kitchenFocus: boolean;
    ecoFriendly: boolean;
    deepClean: boolean;
    specialInstructions: string;
  };
}

interface JobHistory {
  id: string;
  title: string;
  date: string;
  time: string;
  cleaner: string;
  status: "Completed" | "Scheduled" | "Cancelled";
  rating?: number;
  feedback?: string;
  cost: number;
}

interface ClientCRMProps {
  client?: ClientProfile;
  jobHistory?: JobHistory[];
}

const ClientCRM = ({
  client = {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 987-6543",
    address: "123 Main Street, Cityville, ST 12345",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    joinDate: "2023-06-15",
    totalJobs: 24,
    preferences: {
      petFriendly: true,
      kitchenFocus: true,
      ecoFriendly: false,
      deepClean: true,
      specialInstructions:
        "Please be careful around the antique furniture in the living room. Cat is friendly but may hide under the bed.",
    },
  },
  jobHistory = [
    {
      id: "1",
      title: "Weekly House Cleaning",
      date: "2024-01-14",
      time: "09:00",
      cleaner: "Sarah Johnson",
      status: "Completed",
      rating: 5,
      feedback: "Excellent work! Sarah was very thorough and professional.",
      cost: 120,
    },
    {
      id: "2",
      title: "Deep Kitchen Clean",
      date: "2024-01-07",
      time: "10:00",
      cleaner: "Mike Wilson",
      status: "Completed",
      rating: 4,
      feedback: "Good job overall, kitchen looks great.",
      cost: 80,
    },
    {
      id: "3",
      title: "House Cleaning",
      date: "2024-01-21",
      time: "14:00",
      cleaner: "Emma Davis",
      status: "Scheduled",
      cost: 120,
    },
  ],
}: ClientCRMProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [newFeedback, setNewFeedback] = useState("");

  const getStatusColor = (status: JobHistory["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));
  };

  const averageRating =
    jobHistory
      .filter((job) => job.rating)
      .reduce((sum, job) => sum + (job.rating || 0), 0) /
      jobHistory.filter((job) => job.rating).length || 0;

  const totalSpent = jobHistory
    .filter((job) => job.status === "Completed")
    .reduce((sum, job) => sum + job.cost, 0);

  return (
    <div className="bg-white min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Client CRM</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <EditIcon className="w-4 h-4" />
            Edit Client
          </Button>
        </div>

        {/* Client Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-shrink-0">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={client.avatar} alt={client.name} />
                  <AvatarFallback className="text-lg">
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {client.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Client since{" "}
                    {new Date(client.joinDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MailIcon className="w-4 h-4" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <PhoneIcon className="w-4 h-4" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600 md:col-span-2">
                    <MapPinIcon className="w-4 h-4 mt-0.5" />
                    <span>{client.address}</span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {client.totalJobs}
                    </div>
                    <div className="text-sm text-gray-600">Total Jobs</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      ${totalSpent}
                    </div>
                    <div className="text-sm text-gray-600">Total Spent</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Job History */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Job History</CardTitle>
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
                            <p className="text-sm text-gray-600">
                              {job.cleaner}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(job.status)}>
                              {job.status}
                            </Badge>
                            <span className="text-sm font-medium text-gray-900">
                              ${job.cost}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" />
                            {job.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <ClockIcon className="w-4 h-4" />
                            {job.time}
                          </div>
                        </div>

                        {job.rating && (
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-gray-600">
                              Rating:
                            </span>
                            <div className="flex items-center gap-1">
                              {renderStars(job.rating)}
                              <span className="text-sm text-gray-600 ml-1">
                                {job.rating}
                              </span>
                            </div>
                          </div>
                        )}

                        {job.feedback && (
                          <div className="bg-gray-50 p-3 rounded-md">
                            <p className="text-sm text-gray-700">
                              &quot;{job.feedback}&quot;
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cleaning Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Pet Friendly</span>
                    <Badge
                      variant={
                        client.preferences.petFriendly ? "default" : "secondary"
                      }
                    >
                      {client.preferences.petFriendly ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Kitchen Focus</span>
                    <Badge
                      variant={
                        client.preferences.kitchenFocus
                          ? "default"
                          : "secondary"
                      }
                    >
                      {client.preferences.kitchenFocus ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Eco-Friendly</span>
                    <Badge
                      variant={
                        client.preferences.ecoFriendly ? "default" : "secondary"
                      }
                    >
                      {client.preferences.ecoFriendly ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Deep Clean</span>
                    <Badge
                      variant={
                        client.preferences.deepClean ? "default" : "secondary"
                      }
                    >
                      {client.preferences.deepClean ? "Yes" : "No"}
                    </Badge>
                  </div>
                </div>

                {client.preferences.specialInstructions && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Special Instructions
                    </h3>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">
                        {client.preferences.specialInstructions}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquareIcon className="w-5 h-5" />
                  Client Feedback Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-3xl font-bold text-yellow-600 mb-1">
                      {averageRating.toFixed(1)}
                    </div>
                    <div className="flex justify-center mb-2">
                      {renderStars(averageRating)}
                    </div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {jobHistory.filter((job) => job.feedback).length}
                    </div>
                    <div className="text-sm text-gray-600">Total Reviews</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent Feedback
                  </h3>
                  {jobHistory
                    .filter((job) => job.feedback)
                    .map((job) => (
                      <div key={job.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {job.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {job.date} • {job.cleaner}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {job.rating && renderStars(job.rating)}
                            <span className="text-sm text-gray-600 ml-1">
                              {job.rating}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          &quot;{job.feedback}&quot;
                        </p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientCRM;
