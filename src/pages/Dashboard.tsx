import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Wallet, 
  CreditCard, 
  Send, 
  Download, 
  ArrowUpRight, 
  ArrowDownLeft,
  UserPlus,
  Zap,
  QrCode,
  Check 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReceiveMoneyPanel from "@/components/merchant/ReceiveMoneyPanel";
import { toast } from "sonner";
import WalletCard from "@/components/wallet/WalletCard";
import TransactionItem from "@/components/wallet/TransactionItem";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  
  const [showReceiveMoney, setShowReceiveMoney] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
    
    const storedTransactions = sessionStorage.getItem('transactions');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
    
    const handleStorageChange = () => {
      const updatedTransactions = sessionStorage.getItem('transactions');
      if (updatedTransactions) {
        setTransactions(JSON.parse(updatedTransactions));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const isMerchant = userData?.userType === 'merchant';

  const chartData = [
    { name: 'Jan', amount: 2400 },
    { name: 'Feb', amount: 1398 },
    { name: 'Mar', amount: 9800 },
    { name: 'Apr', amount: 3908 },
    { name: 'May', amount: 4800 },
    { name: 'Jun', amount: 3800 },
    { name: 'Jul', amount: 4300 },
  ];

  const pieData = [
    { name: 'Shopping', value: 540 },
    { name: 'Food', value: 620 },
    { name: 'Transport', value: 210 },
    { name: 'Entertainment', value: 180 },
    { name: 'Bills', value: 450 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const recentTransactions = transactions.length > 0 
    ? transactions.slice(0, 4) 
    : [
        {
          id: 1,
          amount: 45.99,
          type: 'outgoing',
          date: 'Today, 14:35'
        },
        {
          id: 2,
          amount: 1250.00,
          type: 'incoming',
          date: 'Yesterday, 09:10'
        },
        {
          id: 3,
          amount: 29.99,
          type: 'outgoing',
          date: 'Jun 24, 19:45'
        },
        {
          id: 4,
          amount: 120.50,
          type: 'incoming',
          date: 'Jun 22, 14:00'
        }
      ];

  const calculateBalance = () => {
    if (transactions.length === 0) return 2584.23;
    
    let balance = 2584.23;
    transactions.forEach(tx => {
      if (tx.type === 'incoming') {
        balance += tx.amount;
      } else {
        balance -= tx.amount;
      }
    });
    return balance;
  };
  
  const balance = calculateBalance();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(value);
  };

  const toggleReceiveMoney = () => {
    setShowReceiveMoney(!showReceiveMoney);
  };
  
  const downloadReceipt = (transaction: any) => {
    const receiptContent = `
      ======== TRANSACTION RECEIPT ========
      
      Bio Pay
      
      Date: ${transaction.date}
      Time: ${transaction.time || 'N/A'}
      
      Transaction ID: ${transaction.id}
      
      ${transaction.type === 'incoming' ? 'From' : 'To'}: ${transaction.type === 'incoming' ? transaction.sender : transaction.recipient}
      
      Amount: ₹${transaction.amount.toFixed(2)}
      
      Status: ${transaction.status}
      
      Note: ${transaction.note || 'No description provided'}
      
      ===================================
      
      Thank you for using Bio Pay!
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${transaction.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-1 text-gradient-cyan animate-text-gradient">Dashboard</h2>
          <p className="text-white/60">Welcome to your BioPay dashboard</p>
        </div>
        
        {showReceiveMoney && isMerchant ? (
          <ReceiveMoneyPanel onClose={toggleReceiveMoney} />
        ) : (
          <div className="container mx-auto p-4 space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold">Welcome back, {userData?.name || 'User'}</h1>
                <p className="text-muted-foreground">Here's what's happening with your account today.</p>
              </div>
              <div className="flex gap-2">
                {isMerchant && (
                  <Button 
                    onClick={toggleReceiveMoney}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    Receive Money
                  </Button>
                )}
                <Button variant="outline">Scheduled Payments</Button>
                <Button>Add Money</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <StatCard 
                value={userData?.name || 'Not Available'}
                label="Account Holder"
                className="bg-gradient-to-br from-indigo-900/40 to-indigo-700/20"
              />
              <StatCard 
                value={userData?.email || 'Not Available'}
                label="Email Address"
                className="bg-gradient-to-br from-purple-900/40 to-purple-700/20"
              />
              <StatCard 
                value={userData?.mobile || 'Not Available'}
                label="Mobile Number"
                className="bg-gradient-to-br from-cyan-900/40 to-cyan-700/20"
              />
              <StatCard 
                value={userData?.userType === 'merchant' ? 'Merchant' : 'Customer'}
                label="Account Type"
                className="bg-gradient-to-br from-blue-900/40 to-blue-700/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <WalletCard 
                title="Current Balance"
                value={balance}
                currency="₹"
                icon={<Wallet className="h-5 w-5 text-primary" />}
                trend={{
                  value: 12.5,
                  direction: 'up',
                  text: 'from last month'
                }}
              />
              <WalletCard 
                title="Money Spent"
                value={1248.35}
                currency="₹"
                icon={<ArrowUpRight className="h-5 w-5 text-destructive" />}
                trend={{
                  value: 8.2,
                  direction: 'up',
                  text: 'from last month'
                }}
                className="bg-destructive/5"
              />
              <WalletCard 
                title="Money Received"
                value={3482.55}
                currency="₹"
                icon={<ArrowDownLeft className="h-5 w-5 text-green-500" />}
                trend={{
                  value: 15.3,
                  direction: 'up',
                  text: 'from last month'
                }}
                className="bg-green-500/5"
              />
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Money Flow</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                            <Area 
                              type="monotone" 
                              dataKey="amount" 
                              stroke="#8884d8" 
                              fillOpacity={1} 
                              fill="url(#colorAmount)" 
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Spending Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Transactions</CardTitle>
                    <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => navigate('/transactions')}>
                      View All <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentTransactions.map((transaction, index) => (
                        <div key={transaction.id || index} className="flex items-center">
                          <TransactionItem
                            transaction={transaction}
                            merchant={transaction.recipient || transaction.sender}
                            amount={transaction.amount}
                            date={transaction.date}
                            status={transaction.status || 'completed'}
                            type={transaction.type}
                            className="flex-grow"
                          />
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => downloadReceipt(transaction)}
                            className="ml-2"
                          >
                            <ReceiptIndianRupee className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Analytics content will be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle>Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Reports content will be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
