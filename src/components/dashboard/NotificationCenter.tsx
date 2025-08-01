import React from "react";
import { Bell, CheckCircle, Clock, Image, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  type: "check-in" | "check-out" | "delay" | "photo";
  message: string;
  timestamp: string;
  cleanerName: string;
  jobAddress?: string;
  isRead: boolean;
}

interface NotificationCenterProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onViewAll?: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications = [
    {
      id: "1",
      type: "check-in",
      message: "has checked in at the job site",
      timestamp: "10 mins ago",
      cleanerName: "Maria Lopez",
      jobAddress: "123 Main St, Dallas",
      isRead: false,
    },
    {
      id: "2",
      type: "delay",
      message: "reported a 15-minute delay",
      timestamp: "25 mins ago",
      cleanerName: "John Smith",
      jobAddress: "456 Oak Ave, Fort Worth",
      isRead: false,
    },
    {
      id: "3",
      type: "photo",
      message: "uploaded before/after photos",
      timestamp: "1 hour ago",
      cleanerName: "Sarah Johnson",
      jobAddress: "789 Pine Rd, Arlington",
      isRead: true,
    },
    {
      id: "4",
      type: "check-out",
      message: "has completed the job",
      timestamp: "2 hours ago",
      cleanerName: "David Wilson",
      jobAddress: "101 Elm St, Plano",
      isRead: true,
    },
  ],
  onMarkAsRead = () => {},
  onViewAll = () => {},
}) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "check-in":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "check-out":
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case "delay":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "photo":
        return <Image className="h-5 w-5 text-purple-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "check-in":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Check In
          </Badge>
        );
      case "check-out":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Check Out
          </Badge>
        );
      case "delay":
        return (
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
            Delay
          </Badge>
        );
      case "photo":
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            Photos
          </Badge>
        );
      default:
        return <Badge variant="secondary">Alert</Badge>;
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  return (
    <Card className="w-full bg-white shadow-sm border-0">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="ml-2 h-6 w-6 rounded-full p-0 flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          className="text-sm font-medium"
        >
          View all
        </Button>
      </CardHeader>
      <CardContent className="px-2 pb-4">
        <ScrollArea className="h-[200px] px-2">
          {notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-3 rounded-lg ${notification.isRead ? "bg-gray-50" : "bg-blue-50 border-l-4 border-blue-500"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">
                          {notification.cleanerName}
                        </p>
                        <div className="flex items-center gap-2">
                          {getNotificationBadge(notification.type)}
                          <span className="text-xs text-gray-500">
                            {notification.timestamp}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">
                        {notification.message}
                      </p>
                      {notification.jobAddress && (
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.jobAddress}
                        </p>
                      )}
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs mt-2 h-7 px-2 py-1"
                          onClick={() => onMarkAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
              <Bell className="h-10 w-10 text-gray-300 mb-2" />
              <p className="text-gray-500">No notifications yet</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
