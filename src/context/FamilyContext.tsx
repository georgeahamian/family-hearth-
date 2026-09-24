import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type {
  FamilyMember,
  Chore,
  ChoreScope,
  Reward,
  ScheduleEvent,
  GroceryItem,
  PantryRestockItem,
  SavingsGoal,
  HomeworkItem,
  PermissionSlipItem,
  DirectoryContact,
  CarpoolTrip,
  StickyNote,
  MealPlanItem,
  DinnerVoteOption,
  VaultCard,
  TabType,
  Transaction,
  Memory,
  Trip,
  PackingItem,
  Pet,
  PetTask,
  Medication,
  MaintenanceTask,
  LibraryBook,
  MediaSubscription,
  EmergencyContact,
  SafetyPlan,
  WishlistItem,
} from '../types';

const INITIAL_MEMBERS: FamilyMember[] = [
  {
    id: 'm1',
    name: 'Sarah',
    role: 'parent',
    avatar: 'SA',
    color: '#00b875',
    points: 1280,
    completedStreak: 12,
    weeklyGoal: 30,
    completedChores: 22,
    phone: '(555) 014-8891',
    email: 'sarah.morgan@family.net',
  },
  {
    id: 'm2',
    name: 'Alex',
    role: 'parent',
    avatar: 'AL',
    color: '#3b82f6',
    points: 940,
    completedStreak: 8,
    weeklyGoal: 10,
    completedChores: 7,
    phone: '(555) 014-8892',
    email: 'alex.morgan@family.net',
  },
  {
    id: 'm3',
    name: 'Lucas',
    role: 'teen',
    avatar: 'LU',
    color: '#6366f1',
    points: 760,
    completedStreak: 6,
    weeklyGoal: 8,
    completedChores: 5,
    phone: '(555) 014-8893',
    email: 'lucas.morgan@school.edu',
  },
  {
    id: 'm4',
    name: 'Maya',
    role: 'kid',
    avatar: 'MA',
    color: '#10b981',
    points: 520,
    completedStreak: 5,
    weeklyGoal: 6,
    completedChores: 4,
    phone: 'Kid Tablet',
    email: 'maya@kidsafe.net',
  },
];

const TODAY = '2026-09-16';

const INITIAL_CHORES: Chore[] = [
  // ─── Personal tasks assigned to Sarah (m1) ───
  {
    id: 'c1',
    title: 'Water the herb garden',
    scope: 'personal',
    createdById: 'm1',
    assignedToId: 'm1',
    points: 10,
    category: 'Outdoor',
    dueDate: TODAY,
    frequency: 'Daily',
    status: 'pending',
  },
  {
    id: 'c2',
    title: 'Review school permission slips',
    scope: 'personal',
    createdById: 'm1',
    assignedToId: 'm1',
    points: 15,
    category: 'Homework',
    dueDate: TODAY,
    frequency: 'Weekly',
    status: 'completed',
    completedAt: '09:00 AM',
  },
  // ─── Personal tasks assigned to Alex (m2) ───
  {
    id: 'c3',
    title: 'Fold clean laundry',
    scope: 'personal',
    createdById: 'm1',
    assignedToId: 'm2',
    points: 30,
    category: 'Laundry',
    dueDate: TODAY,
    frequency: 'Weekly',
    status: 'pending',
  },
  {
    id: 'c4',
    title: 'Schedule car oil change',
    scope: 'personal',
    createdById: 'm2',
    assignedToId: 'm2',
    points: 20,
    category: 'General',
    dueDate: TODAY,
    frequency: 'Custom',
    status: 'pending',
  },
  // ─── Personal tasks assigned to Lucas (m3) ───
  {
    id: 'c5',
    title: 'Feed Pepper',
    scope: 'personal',
    createdById: 'm1',
    assignedToId: 'm3',
    points: 15,
    category: 'Pets',
    dueDate: TODAY,
    frequency: 'Daily',
    status: 'completed',
    completedAt: '07:30 AM',
  },
  {
    id: 'c6',
    title: 'Finish book report draft',
    scope: 'personal',
    createdById: 'm3',
    assignedToId: 'm3',
    points: 40,
    category: 'Homework',
    dueDate: TODAY,
    frequency: 'Custom',
    status: 'pending',
  },
  // ─── Personal tasks assigned to Maya (m4) ───
  {
    id: 'c7',
    title: 'Empty dishwasher',
    scope: 'personal',
    createdById: 'm1',
    assignedToId: 'm4',
    points: 25,
    category: 'Kitchen',
    dueDate: TODAY,
    frequency: 'Daily',
    status: 'pending',
  },
  {
    id: 'c8',
    title: 'Practice violin 20 min',
    scope: 'personal',
    createdById: 'm2',
    assignedToId: 'm4',
    points: 20,
    category: 'Homework',
    dueDate: TODAY,
    frequency: 'Daily',
    status: 'pending',
  },
  // ─── Family Pool tasks (open, anyone can claim) ───
  {
    id: 'c9',
    title: 'Sweep the back patio',
    scope: 'family',
    createdById: 'm1',
    assignedToId: '',
    points: 20,
    category: 'Outdoor',
    dueDate: TODAY,
    frequency: 'Weekly',
    status: 'pending',
  },
  {
    id: 'c10',
    title: 'Wipe kitchen counters & stovetop',
    scope: 'family',
    createdById: 'm2',
    assignedToId: '',
    points: 25,
    category: 'Kitchen',
    dueDate: TODAY,
    frequency: 'Daily',
    status: 'pending',
  },
  {
    id: 'c11',
    title: 'Take out recycling bins',
    scope: 'family',
    createdById: 'm1',
    assignedToId: '',
    claimedById: 'm3',
    points: 15,
    category: 'Cleaning',
    dueDate: TODAY,
    frequency: 'Weekly',
    status: 'pending',
  },
  {
    id: 'c12',
    title: 'Vacuum living room & hallway',
    scope: 'family',
    createdById: 'm2',
    assignedToId: '',
    points: 35,
    category: 'Cleaning',
    dueDate: TODAY,
    frequency: 'Weekly',
    status: 'pending',
  },
];

const INITIAL_REWARDS: Reward[] = [
  { id: 'r1', title: '30 min screen time', cost: 120, category: 'Screen Time', isRedeemed: true },
  { id: 'r2', title: 'Choose movie night', cost: 180, category: 'Fun', isRedeemed: false },
  { id: 'r3', title: 'Ice cream trip', cost: 260, category: 'Treats', isRedeemed: false },
  { id: 'r4', title: 'Chore skip pass', cost: 320, category: 'Privileges', isRedeemed: false },
];

const INITIAL_EVENTS: ScheduleEvent[] = [
  {
    id: 'e1',
    title: 'School drop-off',
    category: 'School',
    date: '2026-09-14',
    startTime: '8:00',
    assignedMemberIds: ['m2'],
    assignedName: 'Alex',
  },
  {
    id: 'e2',
    title: 'Soccer practice',
    category: 'Sports',
    date: '2026-09-14',
    startTime: '3:30',
    assignedMemberIds: ['m3'],
    assignedName: 'Lucas',
    isConflict: true,
  },
  {
    id: 'e3',
    title: 'Dentist check-up',
    category: 'Medical',
    date: '2026-09-14',
    startTime: '3:45',
    assignedMemberIds: ['m4'],
    assignedName: 'Maya',
    isConflict: true,
  },
  {
    id: 'e4',
    title: 'Family dinner',
    category: 'Family',
    date: '2026-09-14',
    startTime: '6:30',
    assignedMemberIds: ['m1', 'm2', 'm3', 'm4'],
    assignedName: 'Everyone',
  },
];

const INITIAL_GROCERIES: GroceryItem[] = [
  { id: 'g1', name: 'Avocados', category: 'PRODUCE', price: 4.50, isCompleted: false },
  { id: 'g2', name: 'Baby spinach', category: 'PRODUCE', price: 3.25, isCompleted: false },
  { id: 'g3', name: 'Oat milk', category: 'DAIRY', price: 4.75, isCompleted: true },
  { id: 'g4', name: 'Greek yogurt', category: 'DAIRY', price: 5.50, isCompleted: false },
  { id: 'g5', name: 'Pasta', category: 'PANTRY', price: 2.80, isCompleted: false },
];

const INITIAL_PANTRY: PantryRestockItem[] = [
  { id: 'p1', name: 'Basmati rice', stockPercentage: 10, isRestocked: false },
  { id: 'p2', name: 'Olive oil', stockPercentage: 15, isRestocked: false },
  { id: 'p3', name: 'Coffee beans', stockPercentage: 20, isRestocked: false },
];

const INITIAL_SAVINGS_GOAL: SavingsGoal = {
  id: 'sg1',
  title: 'Beach weekend',
  subtitle: 'Family savings goal · $600',
  targetAmount: 600,
  currentAmount: 180,
};

const INITIAL_CARPOOL: CarpoolTrip[] = [
  {
    id: 'cp1',
    time: '7:45 AM',
    title: 'Morning drop-off',
    details: 'Alex · Blue Subaru · Lucas, Maya',
    status: 'Completed',
  },
  {
    id: 'cp2',
    time: '3:20 PM',
    title: 'Afternoon pickup',
    details: 'Sarah · Sage Honda · Lucas, Maya',
    status: 'Scheduled',
  },
];

const INITIAL_HOMEWORK: HomeworkItem[] = [
  { id: 'hw1', title: 'Fractions worksheet', subject: 'Math', dueDateLabel: 'Due tomorrow', urgency: 'urgent', studentId: 'm4' },
  { id: 'hw2', title: 'Ecosystems quiz', subject: 'Science', dueDateLabel: 'This week', urgency: 'normal', studentId: 'm4' },
  { id: 'hw3', title: 'Book report draft', subject: 'English', dueDateLabel: 'Friday', urgency: 'normal', studentId: 'm3' },
];

const INITIAL_SLIPS: PermissionSlipItem[] = [
  { id: 'ps1', title: 'Science museum trip', subtext: 'Due this week · Maya', studentId: 'm4', isSigned: false },
  { id: 'ps2', title: 'Spring athletics waiver', subtext: 'Due this week · Maya', studentId: 'm4', isSigned: false },
];

const INITIAL_CONTACTS: DirectoryContact[] = [
  { id: 'd1', name: 'Lincoln Elementary', phone: '(555) 014-2200', email: 'office@lincolnelem.edu' },
  { id: 'd2', name: 'School Nurse', phone: '(555) 014-2214', email: 'nurse@lincolnelem.edu' },
];

const INITIAL_NOTES: StickyNote[] = [
  { id: 'n1', content: 'Library books by the door!', colorType: 'yellow', pinned: true, reactions: { heart: 2, like: 3, laugh: 0 } },
  { id: 'n2', content: 'Friday = family pizza night', colorType: 'mint', pinned: true, reactions: { heart: 4, like: 4, laugh: 1 } },
  { id: 'n3', content: 'Call Nana after dinner', colorType: 'peach', pinned: true, reactions: { heart: 1, like: 2, laugh: 0 } },
];

const INITIAL_MEALS: MealPlanItem[] = [
  {
    id: 'm_mon',
    day: 'Monday',
    name: 'Taco Fiesta Night',
    chefName: 'Sarah',
    emoji: '🌮',
    ingredients: ['Tortillas', 'Ground Turkey', 'Cilantro', 'Avocados', 'Salsa Verde'],
    isCooked: true,
  },
  {
    id: 'm_tue',
    day: 'Tuesday',
    name: 'Creamy Pesto Penne',
    chefName: 'Alex',
    emoji: '🍝',
    ingredients: ['Penne Pasta', 'Basil Pesto', 'Cherry Tomatoes', 'Parmesan', 'Pine Nuts'],
    isCooked: false,
  },
  {
    id: 'm_wed',
    day: 'Wednesday',
    name: 'Sheet-Pan Honey Mustard Salmon',
    chefName: 'Sarah',
    emoji: '🐟',
    ingredients: ['Wild Salmon Fillets', 'Asparagus', 'Baby Potatoes', 'Dijon Mustard', 'Honey'],
    isCooked: false,
  },
  {
    id: 'm_thu',
    day: 'Thursday',
    name: 'Homemade Smash Burgers',
    chefName: 'Alex',
    emoji: '🍔',
    ingredients: ['Brioche Buns', 'Ground Beef', 'Cheddar Slices', 'Pickles', 'Sweet Potato Fries'],
    isCooked: false,
  },
  {
    id: 'm_fri',
    day: 'Friday',
    name: 'Sourdough Pizza Night',
    chefName: 'Family Team',
    emoji: '🍕',
    ingredients: ['Sourdough Pizza Dough', 'Mozzarella', 'San Marzano Sauce', 'Pepperoni', 'Fresh Basil'],
    isCooked: false,
  },
  {
    id: 'm_sat',
    day: 'Saturday',
    name: 'Grilled BBQ Chicken Bowls',
    chefName: 'Alex',
    emoji: '🍗',
    ingredients: ['Chicken Thighs', 'BBQ Sauce', 'Sweet Corn', 'Black Beans', 'Brown Rice'],
    isCooked: false,
  },
  {
    id: 'm_sun',
    day: 'Sunday',
    name: 'Slow-Cooker Herb Pot Roast',
    chefName: 'Sarah',
    emoji: '🍲',
    ingredients: ['Chuck Roast', 'Carrots', 'Yukon Gold Potatoes', 'Beef Broth', 'Fresh Thyme'],
    isCooked: false,
  },
];

const INITIAL_DINNER_POLL: DinnerVoteOption[] = [
  { id: 'dp1', name: 'Sourdough Pizza Party', emoji: '🍕', votes: 3, votedMemberIds: ['m3', 'm4', 'm2'], ingredients: ['Pizza Dough', 'Mozzarella', 'Pepperoni'] },
  { id: 'dp2', name: 'Crispy Chicken Fajitas', emoji: '🌮', votes: 2, votedMemberIds: ['m1', 'm2'], ingredients: ['Tortillas', 'Chicken Breast', 'Bell Peppers'] },
  { id: 'dp3', name: 'Thai Coconut Red Curry', emoji: '🍛', votes: 1, votedMemberIds: ['m1'], ingredients: ['Coconut Milk', 'Red Curry Paste', 'Jasmine Rice'] },
];

const INITIAL_VAULT: VaultCard[] = [
  {
    id: 'vc1',
    title: 'Home Wi-Fi Network',
    category: 'wifi',
    details: 'SSID: MorganHearth_5G • Pass: HappyHome2026!',
    icon: '📶',
    copyableText: 'HappyHome2026!',
  },
  {
    id: 'vc2',
    title: 'Pediatrician (Dr. Gomez)',
    category: 'medical',
    details: 'Oakridge Pediatric Clinic • (555) 019-3344 • Policy #MG-88421',
    icon: '🩺',
    copyableText: '(555) 019-3344',
  },
  {
    id: 'vc3',
    title: "Maya's Peanut Allergy Note",
    category: 'medical',
    details: 'Severe Peanut Allergy. EpiPen kept in kitchen pantry & backpack front pocket.',
    icon: '⚠️',
  },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 't1', amount: 10, description: 'Weekly Allowance', date: '2026-09-14', memberId: 'm3', type: 'allowance' },
  { id: 't2', amount: 5, description: 'Weekly Allowance', date: '2026-09-14', memberId: 'm4', type: 'allowance' },
  { id: 't3', amount: -4.99, description: 'Roblox Robux', date: '2026-09-15', memberId: 'm4', type: 'purchase' },
];

const INITIAL_MEMORIES: Memory[] = [
  { id: 'mem1', imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop', caption: 'Movie night with the kids!', date: '2026-09-12', addedById: 'm1', likes: 4 },
  { id: 'mem2', imageUrl: 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=600&auto=format&fit=crop', caption: 'Lucas won his soccer game ⚽', date: '2026-09-10', addedById: 'm2', likes: 3 },
];

const INITIAL_TRIP: Trip = {
  id: 'trip1',
  destination: 'Summer Camping at Pine Lake',
  startDate: '2026-09-25',
  endDate: '2026-09-28',
  countdownDays: 9,
};

const INITIAL_PACKING: PackingItem[] = [
  { id: 'pack1', name: 'Tent & Stakes', assigneeId: 'm2', isPacked: false },
  { id: 'pack2', name: 'Sleeping Bags', assigneeId: 'm1', isPacked: true },
  { id: 'pack3', name: 'Flashlights', assigneeId: 'm3', isPacked: false },
  { id: 'pack4', name: 'Marshmallows', assigneeId: 'm4', isPacked: false },
];

const INITIAL_PETS: Pet[] = [
  { id: 'pet1', name: 'Pepper', type: 'Dog (Labrador)', diet: '2 scoops kibble AM/PM', avatar: '🐕' },
];

const INITIAL_PET_TASKS: PetTask[] = [
  { id: 'pt1', petId: 'pet1', title: 'Morning Walk', time: '07:00 AM', isDone: true, assignedToId: 'm3' },
  { id: 'pt2', petId: 'pet1', title: 'Breakfast', time: '07:30 AM', isDone: true },
  { id: 'pt3', petId: 'pet1', title: 'Evening Walk', time: '05:00 PM', isDone: false, assignedToId: 'm2' },
  { id: 'pt4', petId: 'pet1', title: 'Dinner', time: '05:30 PM', isDone: false },
];

const INITIAL_MEDICATIONS: Medication[] = [
  { id: 'med1', name: 'Allergy Meds', dosage: '1 Pill', time: '08:00 AM', memberId: 'm4', isTaken: false },
  { id: 'med2', name: 'Vitamins', dosage: '2 Gummies', time: '08:00 AM', memberId: 'm3', isTaken: true },
];

const INITIAL_MAINTENANCE: MaintenanceTask[] = [
  { id: 'mt1', title: 'Change HVAC filter', dueDate: '2026-10-01', frequency: 'Monthly', isCompleted: false, category: 'home' },
  { id: 'mt2', title: 'Check smoke detectors', dueDate: '2026-11-01', frequency: 'Bi-annually', isCompleted: false, category: 'home' },
  { id: 'mt3', title: 'Oil change (Minivan)', dueDate: '2026-09-20', frequency: 'Every 5k miles', isCompleted: false, category: 'vehicle' },
];

const INITIAL_LIBRARY_BOOKS: LibraryBook[] = [
  { id: 'lb1', title: 'Harry Potter and the Sorcerer\'s Stone', dueDate: '2026-09-22', borrowerId: 'm3', isReturned: false },
  { id: 'lb2', title: 'The Very Hungry Caterpillar', dueDate: '2026-09-18', borrowerId: 'm4', isReturned: true },
];

const INITIAL_SUBSCRIPTIONS: MediaSubscription[] = [
  { id: 'ms1', name: 'Netflix', cost: 15.99, renewalDate: '2026-09-25' },
  { id: 'ms2', name: 'Spotify Family', cost: 16.99, renewalDate: '2026-10-02' },
];

const INITIAL_EMERGENCY_CONTACTS: EmergencyContact[] = [
  { id: 'ec1', name: 'Poison Control', relation: 'Emergency', phone: '1-800-222-1222' },
  { id: 'ec2', name: 'Jane Doe', relation: 'Next-door Neighbor', phone: '(555) 012-3456' },
];

const INITIAL_SAFETY_PLANS: SafetyPlan[] = [
  { id: 'sp1', title: 'Fire Evacuation', description: 'Meet at the big oak tree across the street.' },
  { id: 'sp2', title: 'Lockbox Code', description: 'Front door lockbox code is 1994.' },
];

const INITIAL_WISHLIST: WishlistItem[] = [
  { id: 'wl1', name: 'Lego Star Wars Set', forMemberId: 'm3', isPurchased: false },
  { id: 'wl2', name: 'Size 4 Winter Boots', forMemberId: 'm4', isPurchased: true },
];

interface FamilyContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  currentMember: FamilyMember;
  setCurrentMemberId: (id: string) => void;
  members: FamilyMember[];
  
  // Tasks
  chores: Chore[];
  toggleChoreStatus: (choreId: string) => void;
  addChore: (chore: Omit<Chore, 'id' | 'status'>) => void;
  addTask: (task: { title: string; scope: ChoreScope; assignedToId: string; points: number; category: Chore['category']; frequency: Chore['frequency'] }) => void;
  claimFamilyTask: (choreId: string) => void;
  
  // Rewards
  rewards: Reward[];
  redeemReward: (rewardId: string) => void;
  
  // Schedule
  events: ScheduleEvent[];
  addEvent: (event: Omit<ScheduleEvent, 'id'>) => void;
  
  // Groceries & Purchases
  groceries: GroceryItem[];
  toggleGroceryItem: (id: string) => void;
  addGroceryItem: (item: Omit<GroceryItem, 'id' | 'isCompleted'>) => void;
  
  // Pantry
  pantryItems: PantryRestockItem[];
  restockPantryItem: (id: string) => void;
  
  // Savings
  savingsGoal: SavingsGoal;
  contributeSavings: (amount: number) => void;
  
  // School & Carpool
  carpoolTrips: CarpoolTrip[];
  toggleCarpoolStatus: (id: string) => void;
  homeworkItems: HomeworkItem[];
  toggleHomeworkStatus: (id: string) => void;
  permissionSlips: PermissionSlipItem[];
  signPermissionSlip: (id: string) => void;
  directoryContacts: DirectoryContact[];
  
  // Sticky Notes
  notes: StickyNote[];
  addNote: (content: string, colorType?: 'yellow' | 'mint' | 'peach') => void;
  deleteNote: (id: string) => void;
  reactToNote: (noteId: string, reactionType: 'heart' | 'like' | 'laugh') => void;
  
  // Meals & Kitchen
  mealPlans: MealPlanItem[];
  toggleMealCooked: (mealId: string) => void;
  dinnerPoll: DinnerVoteOption[];
  voteForDinner: (optionId: string) => void;
  sendIngredientsToGroceries: (ingredients: string[], mealName: string) => void;
  
  // Family Vault Cards
  vaultCards: VaultCard[];
  
  // Finances
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  
  // Memories
  memories: Memory[];
  addMemory: (memory: Omit<Memory, 'id' | 'likes'>) => void;
  
  // Travel
  trip: Trip;
  packingItems: PackingItem[];
  togglePackingItem: (id: string) => void;
  
  // Pets
  pets: Pet[];
  petTasks: PetTask[];
  togglePetTask: (id: string) => void;
  
  // Health
  medications: Medication[];
  toggleMedication: (id: string) => void;
  
  // Home Maintenance
  maintenanceTasks: MaintenanceTask[];
  toggleMaintenanceTask: (id: string) => void;
  
  // Library & Media
  libraryBooks: LibraryBook[];
  toggleLibraryBook: (id: string) => void;
  subscriptions: MediaSubscription[];
  
  // Emergency & Safety
  emergencyContacts: EmergencyContact[];
  safetyPlans: SafetyPlan[];
  
  // Gifts & Wishlists
  wishlist: WishlistItem[];
  toggleWishlistItem: (id: string) => void;
  
  // Confetti helper
  triggerConfetti: () => void;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Reset demo data
  resetAllData: () => void;
}

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

export const FamilyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  
  const [members, setMembers] = useState<FamilyMember[]>(() => {
    const saved = localStorage.getItem('fh_v3_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });
  
  const [currentMemberId, setCurrentMemberId] = useState<string>('m1');
  
  const [chores, setChores] = useState<Chore[]>(() => {
    const saved = localStorage.getItem('fh_v4_chores');
    if (saved) {
      try {
        const parsed: Chore[] = JSON.parse(saved);
        // migrate tasks that predate scope/createdById fields — existing ch values win
        return parsed.map(ch => ({
          ...ch,
          scope: (ch as any).scope ?? ('personal' as const),
          createdById: (ch as any).createdById ?? (ch.assignedToId || 'm1'),
        }));
      } catch { return INITIAL_CHORES; }
    }
    return INITIAL_CHORES;
  });
  
  const [rewards, setRewards] = useState<Reward[]>(() => {
    const saved = localStorage.getItem('fh_v3_rewards');
    return saved ? JSON.parse(saved) : INITIAL_REWARDS;
  });
  
  const [events, setEvents] = useState<ScheduleEvent[]>(() => {
    const saved = localStorage.getItem('fh_v3_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });
  
  const [groceries, setGroceries] = useState<GroceryItem[]>(() => {
    const saved = localStorage.getItem('fh_v3_groceries');
    return saved ? JSON.parse(saved) : INITIAL_GROCERIES;
  });
  
  const [pantryItems, setPantryItems] = useState<PantryRestockItem[]>(() => {
    const saved = localStorage.getItem('fh_v3_pantry');
    return saved ? JSON.parse(saved) : INITIAL_PANTRY;
  });
  
  const [savingsGoal, setSavingsGoal] = useState<SavingsGoal>(() => {
    const saved = localStorage.getItem('fh_v3_savings');
    return saved ? JSON.parse(saved) : INITIAL_SAVINGS_GOAL;
  });
  
  const [carpoolTrips, setCarpoolTrips] = useState<CarpoolTrip[]>(() => {
    const saved = localStorage.getItem('fh_v3_carpool');
    return saved ? JSON.parse(saved) : INITIAL_CARPOOL;
  });
  
  const [homeworkItems, setHomeworkItems] = useState<HomeworkItem[]>(() => {
    const saved = localStorage.getItem('fh_v3_homework');
    return saved ? JSON.parse(saved) : INITIAL_HOMEWORK;
  });
  
  const [permissionSlips, setPermissionSlips] = useState<PermissionSlipItem[]>(() => {
    const saved = localStorage.getItem('fh_v3_slips');
    return saved ? JSON.parse(saved) : INITIAL_SLIPS;
  });
  
  const [directoryContacts] = useState<DirectoryContact[]>(INITIAL_CONTACTS);
  
  const [notes, setNotes] = useState<StickyNote[]>(() => {
    const saved = localStorage.getItem('fh_v3_notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  const [mealPlans, setMealPlans] = useState<MealPlanItem[]>(() => {
    const saved = localStorage.getItem('fh_v3_meals');
    return saved ? JSON.parse(saved) : INITIAL_MEALS;
  });

  const [dinnerPoll, setDinnerPoll] = useState<DinnerVoteOption[]>(() => {
    const saved = localStorage.getItem('fh_v3_dinner_poll');
    return saved ? JSON.parse(saved) : INITIAL_DINNER_POLL;
  });

  const [vaultCards] = useState<VaultCard[]>(INITIAL_VAULT);
  
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('fh_v3_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [memories, setMemories] = useState<Memory[]>(() => {
    const saved = localStorage.getItem('fh_v3_memories');
    return saved ? JSON.parse(saved) : INITIAL_MEMORIES;
  });

  const [trip, setTrip] = useState<Trip>(() => {
    const saved = localStorage.getItem('fh_v3_trip');
    return saved ? JSON.parse(saved) : INITIAL_TRIP;
  });

  const [packingItems, setPackingItems] = useState<PackingItem[]>(() => {
    const saved = localStorage.getItem('fh_v3_packing');
    return saved ? JSON.parse(saved) : INITIAL_PACKING;
  });

  const [pets] = useState<Pet[]>(INITIAL_PETS);
  
  const [petTasks, setPetTasks] = useState<PetTask[]>(() => {
    const saved = localStorage.getItem('fh_v3_pettasks');
    return saved ? JSON.parse(saved) : INITIAL_PET_TASKS;
  });

  const [medications, setMedications] = useState<Medication[]>(() => {
    const saved = localStorage.getItem('fh_v3_meds');
    return saved ? JSON.parse(saved) : INITIAL_MEDICATIONS;
  });
  
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>(() => {
    const saved = localStorage.getItem('fh_v3_maintenance');
    return saved ? JSON.parse(saved) : INITIAL_MAINTENANCE;
  });

  const [libraryBooks, setLibraryBooks] = useState<LibraryBook[]>(() => {
    const saved = localStorage.getItem('fh_v3_books');
    return saved ? JSON.parse(saved) : INITIAL_LIBRARY_BOOKS;
  });

  const [subscriptions] = useState<MediaSubscription[]>(INITIAL_SUBSCRIPTIONS);
  const [emergencyContacts] = useState<EmergencyContact[]>(INITIAL_EMERGENCY_CONTACTS);
  const [safetyPlans] = useState<SafetyPlan[]>(INITIAL_SAFETY_PLANS);

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('fh_v3_wishlist');
    return saved ? JSON.parse(saved) : INITIAL_WISHLIST;
  });
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('fh_theme') === 'dark';
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('fh_v3_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('fh_v4_chores', JSON.stringify(chores));
  }, [chores]);

  useEffect(() => {
    localStorage.setItem('fh_v3_rewards', JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem('fh_v3_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('fh_v3_groceries', JSON.stringify(groceries));
  }, [groceries]);

  useEffect(() => {
    localStorage.setItem('fh_v3_pantry', JSON.stringify(pantryItems));
  }, [pantryItems]);

  useEffect(() => {
    localStorage.setItem('fh_v3_savings', JSON.stringify(savingsGoal));
  }, [savingsGoal]);

  useEffect(() => {
    localStorage.setItem('fh_v3_carpool', JSON.stringify(carpoolTrips));
  }, [carpoolTrips]);

  useEffect(() => {
    localStorage.setItem('fh_v3_homework', JSON.stringify(homeworkItems));
  }, [homeworkItems]);

  useEffect(() => {
    localStorage.setItem('fh_v3_slips', JSON.stringify(permissionSlips));
  }, [permissionSlips]);

  useEffect(() => {
    localStorage.setItem('fh_v3_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('fh_v3_meals', JSON.stringify(mealPlans));
  }, [mealPlans]);

  useEffect(() => {
    localStorage.setItem('fh_v3_dinner_poll', JSON.stringify(dinnerPoll));
  }, [dinnerPoll]);

  useEffect(() => {
    localStorage.setItem('fh_v3_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('fh_v3_memories', JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem('fh_v3_trip', JSON.stringify(trip));
  }, [trip]);

  useEffect(() => {
    localStorage.setItem('fh_v3_packing', JSON.stringify(packingItems));
  }, [packingItems]);

  useEffect(() => {
    localStorage.setItem('fh_v3_pettasks', JSON.stringify(petTasks));
  }, [petTasks]);

  useEffect(() => {
    localStorage.setItem('fh_v3_meds', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem('fh_v3_maintenance', JSON.stringify(maintenanceTasks));
  }, [maintenanceTasks]);

  useEffect(() => {
    localStorage.setItem('fh_v3_books', JSON.stringify(libraryBooks));
  }, [libraryBooks]);

  useEffect(() => {
    localStorage.setItem('fh_v3_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('fh_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('fh_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2800);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#00b875', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
      });
    } catch {
      // fallback
    }
  };

  const currentMember = members.find(m => m.id === currentMemberId) || members[0];

  // Task handlers
  const toggleChoreStatus = (choreId: string) => {
    setChores(prev =>
      prev.map(ch => {
        if (ch.id === choreId) {
          const isCompleting = ch.status !== 'completed';
          const newStatus = isCompleting ? 'completed' : 'pending';

          if (isCompleting) {
            // For family tasks, points go to whoever claimed it; for personal, to assignee
            const recipientId = ch.scope === 'family' ? (ch.claimedById || currentMember.id) : ch.assignedToId;
            triggerConfetti();
            showToast(`✓ Completed "${ch.title}" (+${ch.points} pts)`);
            setMembers(prevMembers =>
              prevMembers.map(m =>
                m.id === recipientId
                  ? {
                      ...m,
                      points: m.points + ch.points,
                      completedChores: m.completedChores + 1,
                      completedStreak: m.completedStreak + 1,
                    }
                  : m
              )
            );
          }
          return { ...ch, status: newStatus, completedAt: isCompleting ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined };
        }
        return ch;
      })
    );
  };

  const addChore = (choreData: Omit<Chore, 'id' | 'status'>) => {
    const newChore: Chore = {
      ...choreData,
      id: `c_${Date.now()}`,
      status: 'pending',
    };
    setChores(prev => [newChore, ...prev]);
    showToast(`Added task "${newChore.title}"`);
  };

  const addTask = (taskData: { title: string; scope: ChoreScope; assignedToId: string; points: number; category: Chore['category']; frequency: Chore['frequency'] }) => {
    const newChore: Chore = {
      id: `c_${Date.now()}`,
      title: taskData.title,
      scope: taskData.scope,
      createdById: currentMember.id,
      assignedToId: taskData.scope === 'family' ? '' : taskData.assignedToId,
      points: taskData.points,
      category: taskData.category,
      dueDate: TODAY,
      frequency: taskData.frequency,
      status: 'pending',
    };
    setChores(prev => [newChore, ...prev]);
    const target = taskData.scope === 'family'
      ? 'the Family Pool'
      : members.find(m => m.id === taskData.assignedToId)?.name || 'someone';
    showToast(`📋 Task "${newChore.title}" added for ${target}`);
  };

  const claimFamilyTask = (choreId: string) => {
    setChores(prev =>
      prev.map(ch => {
        if (ch.id === choreId && ch.scope === 'family') {
          if (ch.claimedById) {
            showToast(`Already claimed by ${members.find(m => m.id === ch.claimedById)?.name}`);
            return ch;
          }
          showToast(`🙋 You claimed "${ch.title}" — go get it done!`);
          return { ...ch, claimedById: currentMember.id };
        }
        return ch;
      })
    );
  };

  // Reward handlers
  const redeemReward = (rewardId: string) => {
    const r = rewards.find(rw => rw.id === rewardId);
    if (!r) return;
    if (r.isRedeemed) {
      showToast(`Already redeemed`);
      return;
    }
    if (currentMember.points < r.cost) {
      showToast(`Need ${r.cost - currentMember.points} more points to redeem`);
      return;
    }

    triggerConfetti();
    setRewards(prev =>
      prev.map(item => (item.id === rewardId ? { ...item, isRedeemed: true } : item))
    );
    setMembers(prev =>
      prev.map(m => (m.id === currentMember.id ? { ...m, points: m.points - r.cost } : m))
    );
    showToast(`🎉 Redeemed "${r.title}"!`);
  };

  // Schedule handlers
  const addEvent = (eventData: Omit<ScheduleEvent, 'id'>) => {
    const newEvent: ScheduleEvent = {
      ...eventData,
      id: `e_${Date.now()}`,
    };
    setEvents(prev => [...prev, newEvent]);
    showToast(`Added event "${newEvent.title}"`);
  };

  // Grocery handlers
  const toggleGroceryItem = (id: string) => {
    setGroceries(prev =>
      prev.map(g => (g.id === id ? { ...g, isCompleted: !g.isCompleted } : g))
    );
  };

  const addGroceryItem = (itemData: Omit<GroceryItem, 'id' | 'isCompleted'>) => {
    const newItem: GroceryItem = {
      ...itemData,
      id: `g_${Date.now()}`,
      isCompleted: false,
    };
    setGroceries(prev => [...prev, newItem]);
    showToast(`Added "${newItem.name}" to groceries`);
  };

  // Pantry handlers
  const restockPantryItem = (id: string) => {
    setPantryItems(prev =>
      prev.map(p => {
        if (p.id === id) {
          showToast(`Restocked "${p.name}"!`);
          return { ...p, stockPercentage: 100, isRestocked: true };
        }
        return p;
      })
    );
  };

  // Savings handlers
  const contributeSavings = (amount: number) => {
    setSavingsGoal(prev => {
      const nextAmount = Math.min(prev.targetAmount, prev.currentAmount + amount);
      if (nextAmount >= prev.targetAmount) {
        triggerConfetti();
        showToast(`🎉 Goal achieved! $${prev.targetAmount} fully saved for ${prev.title}!`);
      } else {
        showToast(`Contributed +$${amount} toward ${prev.title}!`);
      }
      return { ...prev, currentAmount: nextAmount };
    });
  };

  // Carpool handlers
  const toggleCarpoolStatus = (id: string) => {
    setCarpoolTrips(prev =>
      prev.map(cp => {
        if (cp.id === id) {
          const nextStatus = cp.status === 'Scheduled' ? 'Completed' : 'Scheduled';
          showToast(`Carpool "${cp.title}" is now ${nextStatus}`);
          return { ...cp, status: nextStatus };
        }
        return cp;
      })
    );
  };

  // Homework handlers
  const toggleHomeworkStatus = (id: string) => {
    setHomeworkItems(prev =>
      prev.map(hw => {
        if (hw.id === id) {
          const nextState = !hw.isCompleted;
          if (nextState) showToast(`Marked "${hw.title}" done`);
          return { ...hw, isCompleted: nextState };
        }
        return hw;
      })
    );
  };

  // Permission slip handlers
  const signPermissionSlip = (id: string) => {
    triggerConfetti();
    setPermissionSlips(prev =>
      prev.map(ps => {
        if (ps.id === id) {
          showToast(`Signed "${ps.title}" as ${currentMember.name}`);
          return { ...ps, isSigned: true, signedBy: currentMember.name };
        }
        return ps;
      })
    );
  };

  // Sticky note handlers
  const addNote = (content: string, colorType: 'yellow' | 'mint' | 'peach' = 'yellow') => {
    const newNote: StickyNote = {
      id: `n_${Date.now()}`,
      content,
      colorType,
      pinned: true,
      reactions: { heart: 0, like: 0, laugh: 0 },
    };
    setNotes(prev => [...prev, newNote]);
    showToast(`Posted note to family fridge`);
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const reactToNote = (noteId: string, reactionType: 'heart' | 'like' | 'laugh') => {
    setNotes(prev =>
      prev.map(n => {
        if (n.id === noteId) {
          const reactions = n.reactions || { heart: 0, like: 0, laugh: 0 };
          return {
            ...n,
            reactions: {
              ...reactions,
              [reactionType]: reactions[reactionType] + 1,
            },
          };
        }
        return n;
      })
    );
    showToast(`Reacted with ${reactionType === 'heart' ? '❤️' : reactionType === 'like' ? '👍' : '😂'}!`);
  };

  // Meal planning handlers
  const toggleMealCooked = (mealId: string) => {
    setMealPlans(prev =>
      prev.map(m => (m.id === mealId ? { ...m, isCooked: !m.isCooked } : m))
    );
  };

  const voteForDinner = (optionId: string) => {
    setDinnerPoll(prev =>
      prev.map(opt => {
        if (opt.id === optionId) {
          const alreadyVoted = opt.votedMemberIds.includes(currentMember.id);
          const nextVoters = alreadyVoted
            ? opt.votedMemberIds.filter(id => id !== currentMember.id)
            : [...opt.votedMemberIds, currentMember.id];
          return {
            ...opt,
            votes: nextVoters.length,
            votedMemberIds: nextVoters,
          };
        }
        return opt;
      })
    );
    showToast(`Cast vote for dinner! 🍽️`);
  };

  const sendIngredientsToGroceries = (ingredients: string[], mealName: string) => {
    const newItems: GroceryItem[] = ingredients.map((ing, idx) => ({
      id: `g_meal_${Date.now()}_${idx}`,
      name: ing,
      category: 'PANTRY',
      price: 3.50,
      isCompleted: false,
    }));
    setGroceries(prev => [...prev, ...newItems]);
    triggerConfetti();
    showToast(`🛒 Sent ${ingredients.length} ingredients for "${mealName}" to Grocery List!`);
  };

  // Reset demo data
  const resetAllData = () => {
    setMembers(INITIAL_MEMBERS);
    setChores(INITIAL_CHORES);
    setRewards(INITIAL_REWARDS);
    setEvents(INITIAL_EVENTS);
    setGroceries(INITIAL_GROCERIES);
    setPantryItems(INITIAL_PANTRY);
    setSavingsGoal(INITIAL_SAVINGS_GOAL);
    setCarpoolTrips(INITIAL_CARPOOL);
    setHomeworkItems(INITIAL_HOMEWORK);
    setPermissionSlips(INITIAL_SLIPS);
    setNotes(INITIAL_NOTES);
    setMealPlans(INITIAL_MEALS);
    setDinnerPoll(INITIAL_DINNER_POLL);
    setTransactions(INITIAL_TRANSACTIONS);
    setMemories(INITIAL_MEMORIES);
    setTrip(INITIAL_TRIP);
    setPackingItems(INITIAL_PACKING);
    setPetTasks(INITIAL_PET_TASKS);
    setMedications(INITIAL_MEDICATIONS);
    setMaintenanceTasks(INITIAL_MAINTENANCE);
    setLibraryBooks(INITIAL_LIBRARY_BOOKS);
    setWishlist(INITIAL_WISHLIST);
    setCurrentMemberId('m1');
    localStorage.clear();
    showToast('Reset all demo data to default preset.');
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...transaction,
      id: `t_${Date.now()}`,
    };
    setTransactions(prev => [newTx, ...prev]);
    showToast(`Transaction added: ${newTx.description}`);
  };

  const addMemory = (memory: Omit<Memory, 'id' | 'likes'>) => {
    const newMemory: Memory = {
      ...memory,
      id: `mem_${Date.now()}`,
      likes: 0,
    };
    setMemories(prev => [newMemory, ...prev]);
    triggerConfetti();
    showToast(`Memory added: ${newMemory.caption}`);
  };

  const togglePackingItem = (id: string) => {
    setPackingItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newState = !item.isPacked;
          if (newState) triggerConfetti();
          return { ...item, isPacked: newState };
        }
        return item;
      })
    );
  };

  const togglePetTask = (id: string) => {
    setPetTasks(prev =>
      prev.map(task => {
        if (task.id === id) {
          const newState = !task.isDone;
          if (newState) triggerConfetti();
          return { ...task, isDone: newState };
        }
        return task;
      })
    );
  };

  const toggleMedication = (id: string) => {
    setMedications(prev =>
      prev.map(med => {
        if (med.id === id) {
          const newState = !med.isTaken;
          if (newState) triggerConfetti();
          return { ...med, isTaken: newState };
        }
        return med;
      })
    );
  };

  const toggleMaintenanceTask = (id: string) => {
    setMaintenanceTasks(prev =>
      prev.map(task => {
        if (task.id === id) {
          const newState = !task.isCompleted;
          if (newState) triggerConfetti();
          return { ...task, isCompleted: newState };
        }
        return task;
      })
    );
  };

  const toggleLibraryBook = (id: string) => {
    setLibraryBooks(prev =>
      prev.map(book => {
        if (book.id === id) {
          const newState = !book.isReturned;
          if (newState) triggerConfetti();
          return { ...book, isReturned: newState };
        }
        return book;
      })
    );
  };

  const toggleWishlistItem = (id: string) => {
    setWishlist(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newState = !item.isPurchased;
          if (newState) triggerConfetti();
          return { ...item, isPurchased: newState };
        }
        return item;
      })
    );
  };

  return (
    <FamilyContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentMember,
        setCurrentMemberId,
        members,
        chores,
        toggleChoreStatus,
        addChore,
        addTask,
        claimFamilyTask,
        rewards,
        redeemReward,
        events,
        addEvent,
        groceries,
        toggleGroceryItem,
        addGroceryItem,
        pantryItems,
        restockPantryItem,
        savingsGoal,
        contributeSavings,
        carpoolTrips,
        toggleCarpoolStatus,
        homeworkItems,
        toggleHomeworkStatus,
        permissionSlips,
        signPermissionSlip,
        directoryContacts,
        notes,
        addNote,
        deleteNote,
        reactToNote,
        mealPlans,
        toggleMealCooked,
        dinnerPoll,
        voteForDinner,
        sendIngredientsToGroceries,
        vaultCards,
        transactions,
        addTransaction,
        memories,
        addMemory,
        trip,
        packingItems,
        togglePackingItem,
        pets,
        petTasks,
        togglePetTask,
        medications,
        toggleMedication,
        maintenanceTasks,
        toggleMaintenanceTask,
        libraryBooks,
        toggleLibraryBook,
        subscriptions,
        emergencyContacts,
        safetyPlans,
        wishlist,
        toggleWishlistItem,
        triggerConfetti,
        toastMessage,
        showToast,
        isDarkMode,
        toggleDarkMode,
        resetAllData,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
};

export const useFamily = () => {
  const context = useContext(FamilyContext);
  if (!context) {
    throw new Error('useFamily must be used within a FamilyProvider');
  }
  return context;
};
