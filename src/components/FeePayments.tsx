
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CreditCard, CheckCircle, Clock, AlertCircle, Download, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const FeePayments = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const feeStructure = [
    { category: "Tuition Fee", amount: 15000, paid: 15000, due: "2024-08-15", status: "paid" },
    { category: "Laboratory Fee", amount: 2500, paid: 2500, due: "2024-08-15", status: "paid" },
    { category: "Library Fee", amount: 500, paid: 500, due: "2024-08-15", status: "paid" },
    { category: "Sports Fee", amount: 1000, paid: 0, due: "2024-12-15", status: "pending" },
    { category: "Development Fee", amount: 3000, paid: 1500, due: "2024-11-30", status: "partial" },
  ];

  const paymentHistory = [
    { id: "PAY-001", date: "2024-08-10", amount: 18000, method: "Bank Transfer", status: "completed", receipt: "REC-001" },
    { id: "PAY-002", date: "2024-09-15", amount: 1500, method: "Credit Card", status: "completed", receipt: "REC-002" },
    { id: "PAY-003", date: "2024-10-20", amount: 2500, method: "Online Banking", status: "pending", receipt: "-" },
  ];

  const totalFees = feeStructure.reduce((sum, fee) => sum + fee.amount, 0);
  const totalPaid = feeStructure.reduce((sum, fee) => sum + fee.paid, 0);
  const totalPending = totalFees - totalPaid;

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return 'bg-green-500';
      case 'partial':
        return 'bg-yellow-500';
      case 'pending':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'partial':
        return 'Partial';
      case 'pending':
        return 'Pending';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const handlePayment = (category) => {
    toast({
      title: "Payment Initiated",
      description: `Processing payment for ${category}. You will be redirected to the payment gateway.`,
    });
  };

  const downloadReceipt = (receiptId) => {
    toast({
      title: "Receipt Downloaded",
      description: `Receipt ${receiptId} has been downloaded successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Fee Payments</h2>
          <p className="text-gray-600">Track and manage your tuition and fee payments</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <CreditCard className="h-4 w-4 mr-2" />
          Make Payment
        </Button>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md border-0 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Fees</p>
                <p className="text-2xl font-bold text-blue-900">${totalFees.toLocaleString()}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-0 bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Amount Paid</p>
                <p className="text-2xl font-bold text-green-900">${totalPaid.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-0 bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Outstanding</p>
                <p className="text-2xl font-bold text-red-900">${totalPending.toLocaleString()}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Progress */}
      <Card className="shadow-md border-0">
        <CardHeader>
          <CardTitle>Payment Progress</CardTitle>
          <CardDescription>
            Overall payment completion: {Math.round((totalPaid / totalFees) * 100)}%
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={(totalPaid / totalFees) * 100} className="h-3" />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Paid: ${totalPaid.toLocaleString()}</span>
            <span>Remaining: ${totalPending.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fee Structure */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle>Fee Structure</CardTitle>
            <CardDescription>Breakdown of all fees for the current academic year</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {feeStructure.map((fee, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{fee.category}</h4>
                    <p className="text-sm text-gray-600">Due: {fee.due}</p>
                  </div>
                  <Badge className={getStatusColor(fee.status)}>
                    {getStatusText(fee.status)}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Amount: ${fee.amount.toLocaleString()}</span>
                    <span>Paid: ${fee.paid.toLocaleString()}</span>
                  </div>
                  <Progress value={(fee.paid / fee.amount) * 100} className="h-2" />
                </div>

                {fee.status !== 'paid' && (
                  <Button
                    size="sm"
                    onClick={() => handlePayment(fee.category)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Pay ${(fee.amount - fee.paid).toLocaleString()}
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Record of all your payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentHistory.map((payment, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{payment.id}</p>
                    <p className="text-sm text-gray-600">{payment.method}</p>
                  </div>
                  <Badge className={getStatusColor(payment.status)}>
                    {getStatusText(payment.status)}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      ${payment.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {payment.date}
                    </p>
                  </div>
                  
                  {payment.receipt !== '-' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadReceipt(payment.receipt)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Receipt
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeePayments;
