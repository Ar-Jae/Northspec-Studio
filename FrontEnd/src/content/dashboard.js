export const projects = [
  {
    id: 1,
    name: "E-Commerce Platform Redesign",
    client: "TechRetail Co",
    status: "In Progress",
    progress: 65,
    dueDate: "2025-01-15",
    team: ["Alice", "Bob", "Charlie"],
    budget: 45000,
    spent: 28500,
    description: "Complete redesign of e-commerce platform with improved UX"
  },
  {
    id: 2,
    name: "Mobile App Development",
    client: "StartupX",
    status: "Planning",
    progress: 20,
    dueDate: "2025-02-28",
    team: ["David", "Emma"],
    budget: 65000,
    spent: 8000,
    description: "Native iOS and Android app for productivity"
  },
  {
    id: 3,
    name: "API Integration",
    client: "FinanceHub",
    status: "Completed",
    progress: 100,
    dueDate: "2024-12-10",
    team: ["Frank", "Grace", "Henry"],
    budget: 25000,
    spent: 25000,
    description: "Third-party API integration and data sync"
  },
  {
    id: 4,
    name: "Performance Optimization",
    client: "MediaCo",
    status: "In Progress",
    progress: 45,
    dueDate: "2025-01-30",
    team: ["Isaac"],
    budget: 15000,
    spent: 6750,
    description: "Optimize website performance and load times"
  },
  {
    id: 5,
    name: "CMS Implementation",
    client: "PublishingHouse",
    status: "Planning",
    progress: 10,
    dueDate: "2025-03-15",
    team: ["Jack", "Karen"],
    budget: 35000,
    spent: 3500,
    description: "Custom CMS with workflow automation"
  }
];

export const invoices = [
  {
    id: "INV-001",
    project: "E-Commerce Platform Redesign",
    client: "TechRetail Co",
    amount: 15000,
    date: "2024-12-01",
    dueDate: "2025-01-01",
    status: "Paid",
    description: "Phase 1 - Design & Planning"
  },
  {
    id: "INV-002",
    project: "Mobile App Development",
    client: "StartupX",
    amount: 8000,
    date: "2024-12-10",
    dueDate: "2025-01-10",
    status: "Pending",
    description: "Initial development sprint"
  },
  {
    id: "INV-003",
    project: "E-Commerce Platform Redesign",
    client: "TechRetail Co",
    amount: 13500,
    date: "2024-12-15",
    dueDate: "2025-01-15",
    status: "Pending",
    description: "Phase 2 - Development"
  },
  {
    id: "INV-004",
    project: "API Integration",
    client: "FinanceHub",
    amount: 25000,
    date: "2024-12-01",
    dueDate: "2024-12-31",
    status: "Paid",
    description: "Complete API integration"
  },
  {
    id: "INV-005",
    project: "Performance Optimization",
    client: "MediaCo",
    amount: 6750,
    date: "2024-12-12",
    dueDate: "2025-01-12",
    status: "Pending",
    description: "Phase 1 optimization"
  }
];

export const teamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Lead Developer",
    email: "alice@northspecstudio.com",
    status: "Active",
    projects: ["E-Commerce Platform Redesign", "Performance Optimization"],
    joinDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Frontend Developer",
    email: "bob@northspecstudio.com",
    status: "Active",
    projects: ["E-Commerce Platform Redesign"],
    joinDate: "2024-03-20"
  },
  {
    id: 3,
    name: "Charlie Brown",
    role: "Backend Developer",
    email: "charlie@northspecstudio.com",
    status: "Active",
    projects: ["E-Commerce Platform Redesign", "CMS Implementation"],
    joinDate: "2024-02-10"
  },
  {
    id: 4,
    name: "David Lee",
    role: "Mobile Developer",
    email: "david@northspecstudio.com",
    status: "Active",
    projects: ["Mobile App Development"],
    joinDate: "2024-05-01"
  },
  {
    id: 5,
    name: "Emma Wilson",
    role: "UI/UX Designer",
    email: "emma@northspecstudio.com",
    status: "Active",
    projects: ["Mobile App Development", "E-Commerce Platform Redesign"],
    joinDate: "2024-04-15"
  }
];

export const analyticsData = {
  overview: {
    totalProjects: 5,
    completedProjects: 1,
    activeProjects: 2,
    totalRevenue: 188000,
    pendingInvoices: 27250,
    teamSize: 5
  },
  revenueByMonth: [
    { month: "Oct", revenue: 45000 },
    { month: "Nov", revenue: 62000 },
    { month: "Dec", revenue: 81000 }
  ],
  projectStatus: [
    { status: "Completed", count: 1, percentage: 20 },
    { status: "In Progress", count: 2, percentage: 40 },
    { status: "Planning", count: 2, percentage: 40 }
  ],
  topClients: [
    { name: "TechRetail Co", projects: 1, revenue: 28500 },
    { name: "StartupX", projects: 1, revenue: 8000 },
    { name: "FinanceHub", projects: 1, revenue: 25000 }
  ]
};
