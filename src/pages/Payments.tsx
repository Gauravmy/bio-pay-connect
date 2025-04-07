import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { HandMetal, ArrowRight, CreditCard, Banknote, Wallet, IndianRupee } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const vendorSchema = z.object({
  amount: z.string().min(1, "Amount is required").refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
  merchant: z.string().min(1, "Merchant name is required"),
  description: z.string().optional(),
});

const userSchema = z.object({
  amount: z.string().min(1, "Amount is required").refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
  merchant: z.string().min(1, "Merchant name is required"),
  bank: z.string().min(1, "Bank is required"),
});

type VendorFormValues = z.infer<typeof vendorSchema>;
type UserFormValues = z.infer<typeof userSchema>;

const Payments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"vendor" | "user">("vendor");
  
  const vendorForm = useForm<VendorFormValues>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      amount: "",
      merchant: "",
      description: "",
    }
  });

  const userForm = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      amount: "",
      merchant: "",
      bank: "SBI",
    }
  });
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('user') === 'true') {
      setActiveTab("user");
    }
  }, [location.search]);
  
  const handleVendorSubmit = (values: VendorFormValues) => {
    console.log('Vendor payment request:', values);
    toast.success('Payment request created!');
    navigate(`/palm-vein-scan?amount=${values.amount}&merchant=${values.merchant}`);
  };
  
  const handleUserSubmit = (values: UserFormValues) => {
    console.log('User payment:', values);
    toast.success('Processing payment...');
    navigate(`/palm-vein-scan?amount=${values.amount}&merchant=${values.merchant}`);
  };
  
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] w-full">
        <div className="space-y-6 md:space-y-8 max-w-6xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">BioPay Payments</h1>
            <p className="text-muted-foreground mt-1">
              Make secure payments or request money using palm vein authentication.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-card/80 backdrop-blur-xl border border-cyan-800/30 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-center md:text-left">Vendor Panel</CardTitle>
                <CardDescription className="text-center md:text-left">Create a payment request for customers</CardDescription>
              </CardHeader>
              
              <CardContent>
                <form id="vendor-form" onSubmit={vendorForm.handleSubmit(handleVendorSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="v-amount">Amount (₹)</Label>
                    <div className="relative">
                      <Input
                        id="v-amount"
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        min="0"
                        className="pl-8"
                        {...vendorForm.register("amount")}
                      />
                      <IndianRupee className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                    {vendorForm.formState.errors.amount && (
                      <p className="text-red-500 text-sm">{vendorForm.formState.errors.amount.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="v-merchant">Merchant Name</Label>
                    <Input 
                      id="v-merchant" 
                      placeholder="Store name" 
                      {...vendorForm.register("merchant")}
                    />
                    {vendorForm.formState.errors.merchant && (
                      <p className="text-red-500 text-sm">{vendorForm.formState.errors.merchant.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="v-description">Description (Optional)</Label>
                    <Input 
                      id="v-description" 
                      placeholder="What is this payment for?" 
                      {...vendorForm.register("description")}
                    />
                  </div>
                </form>
              </CardContent>
              
              <CardFooter className="flex-col space-y-4">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-800/30 to-transparent"></div>
                <Button 
                  form="vendor-form"
                  type="submit"
                  className="w-full relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Request Payment
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-xl border border-blue-800/30 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-center md:text-left">User Panel</CardTitle>
                <CardDescription className="text-center md:text-left">Make a payment using palm vein authentication</CardDescription>
              </CardHeader>
              
              <CardContent>
                <form id="user-form" onSubmit={userForm.handleSubmit(handleUserSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="u-amount">Amount (₹)</Label>
                    <div className="relative">
                      <Input
                        id="u-amount"
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        min="0"
                        className="pl-8"
                        {...userForm.register("amount")}
                      />
                      <IndianRupee className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                    {userForm.formState.errors.amount && (
                      <p className="text-red-500 text-sm">{userForm.formState.errors.amount.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="u-merchant">Pay To (Merchant)</Label>
                    <Input 
                      id="u-merchant" 
                      placeholder="Merchant name" 
                      {...userForm.register("merchant")}
                    />
                    {userForm.formState.errors.merchant && (
                      <p className="text-red-500 text-sm">{userForm.formState.errors.merchant.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="u-bank">Select Bank</Label>
                    <Select 
                      defaultValue="SBI"
                      onValueChange={(value) => userForm.setValue("bank", value)}
                    >
                      <SelectTrigger id="u-bank">
                        <SelectValue placeholder="Select bank account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SBI">State Bank of India</SelectItem>
                        <SelectItem value="HDFC">HDFC Bank</SelectItem>
                        <SelectItem value="ICICI">ICICI Bank</SelectItem>
                        <SelectItem value="Axis">Axis Bank</SelectItem>
                        <SelectItem value="PNB">Punjab National Bank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </form>
              </CardContent>
              
              <CardFooter className="flex-col space-y-4">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-800/30 to-transparent"></div>
                <Button 
                  form="user-form"
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Make Payment
                    <HandMetal className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-[-2px]" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-12 space-y-6">
            <h2 className="text-xl font-semibold tracking-tight">Payment Methods</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-card/80 backdrop-blur-xl border border-cyan-800/30 hover:border-cyan-500/50 transition-colors cursor-pointer group">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-cyan-900/30 flex items-center justify-center mb-4 group-hover:bg-cyan-800/50 transition-colors">
                    <HandMetal className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Palm Vein</h3>
                  <p className="text-sm text-muted-foreground">Secure biometric palm authentication</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80 backdrop-blur-xl border border-gray-800/30 hover:border-gray-500/50 transition-colors cursor-pointer group">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-gray-900/30 flex items-center justify-center mb-4 group-hover:bg-gray-800/50 transition-colors">
                    <CreditCard className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Card</h3>
                  <p className="text-sm text-muted-foreground">Traditional card payments</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80 backdrop-blur-xl border border-gray-800/30 hover:border-gray-500/50 transition-colors cursor-pointer group">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-gray-900/30 flex items-center justify-center mb-4 group-hover:bg-gray-800/50 transition-colors">
                    <Wallet className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="font-semibold mb-2">UPI</h3>
                  <p className="text-sm text-muted-foreground">Fast bank-to-bank transfers</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Payments;
