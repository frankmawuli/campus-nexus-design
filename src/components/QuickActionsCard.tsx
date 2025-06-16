
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, User } from "lucide-react";

const QuickActionsCard = () => {
  return (
    <Card className="shadow-md border-0">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button variant="outline" className="w-full justify-start">
          <FileText className="h-4 w-4 mr-2" />
          Download Transcript
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Calendar className="h-4 w-4 mr-2" />
          Academic Calendar
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <User className="h-4 w-4 mr-2" />
          Student ID Card
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
