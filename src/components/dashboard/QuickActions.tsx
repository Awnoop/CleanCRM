import React, { useState } from "react";
import { Plus, UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface QuickActionsProps {
  onCreateJob?: (jobData: any) => void;
  onAssignCleaner?: (assignData: any) => void;
}

const QuickActions = ({
  onCreateJob = () => {},
  onAssignCleaner = () => {},
}: QuickActionsProps) => {
  const [createJobOpen, setCreateJobOpen] = useState(false);
  const [assignCleanerOpen, setAssignCleanerOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock data for selects
  const mockCleaners = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Mike Johnson" },
  ];

  const mockJobs = [
    { id: "1", address: "123 Main St, Dallas, TX" },
    { id: "2", address: "456 Oak Ave, Fort Worth, TX" },
    { id: "3", address: "789 Pine Blvd, Arlington, TX" },
  ];

  const handleCreateJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    onCreateJob({ date });
    setCreateJobOpen(false);
  };

  const handleAssignCleanerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    onAssignCleaner({});
    setAssignCleanerOpen(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="flex gap-3">
        <Button
          onClick={() => setCreateJobOpen(true)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Create Job
        </Button>
        <Button
          onClick={() => setAssignCleanerOpen(true)}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
        >
          <UserPlus className="mr-2 h-4 w-4" /> Assign Cleaner
        </Button>
      </div>

      {/* Create Job Dialog */}
      <Dialog open={createJobOpen} onOpenChange={setCreateJobOpen}>
        <DialogContent className="sm:max-w-[425px]">
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
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter client address" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="cleaner">Assign Cleaner</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a cleaner" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCleaners.map((cleaner) => (
                      <SelectItem key={cleaner.id} value={cleaner.id}>
                        {cleaner.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
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

      {/* Assign Cleaner Dialog */}
      <Dialog open={assignCleanerOpen} onOpenChange={setAssignCleanerOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Cleaner to Job</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAssignCleanerSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="job">Select Job</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a job" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockJobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="cleaner">Select Cleaner</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a cleaner" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCleaners.map((cleaner) => (
                      <SelectItem key={cleaner.id} value={cleaner.id}>
                        {cleaner.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Assign Cleaner</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuickActions;
