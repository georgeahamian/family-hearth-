export type Role = 'parent' | 'teen' | 'kid';

export interface FamilyMember {
  id: string;
  name: string;
  role: Role;
  avatar: string;
  avatarBg?: string;
  color: string;
  points: number;
  completedStreak: number;
  weeklyGoal: number;
  completedChores: number;
  phone?: string;
  email?: string;
}

export type ChoreCategory = 'Kitchen' | 'Pets' | 'Bedroom' | 'Outdoor' | 'Laundry' | 'Cleaning' | 'Homework' | 'General';
export type ChoreFrequency = 'Daily' | 'Weekly' | 'Custom';
export type ChoreStatus = 'pending' | 'completed' | 'approved';
export type ChoreScope = 'personal' | 'family';

export interface Chore {
  id: string;
  title: string;
  description?: string;
  /** 'personal' = assigned to one member; 'family' = open pool any member can claim */
  scope: ChoreScope;
  /** Who created / posted this task */
  createdById: string;
  /** For personal tasks: the assigned member. For family tasks: empty string until claimed */
  assignedToId: string;
  /** For family tasks: the member who claimed it (and will get the points) */
  claimedById?: string;
  points: number;
  category: ChoreCategory;
  dueDate: string; // YYYY-MM-DD
  dueTime?: string;
  frequency: ChoreFrequency;
  status: ChoreStatus;
  completedAt?: string;
}

export type RewardCategory = 'Screen Time' | 'Treats' | 'Privileges' | 'Outings' | 'Fun';

export interface Reward {
  id: string;
  title: string;
  description?: string;
  cost: number;
  category: RewardCategory;
  isRedeemed?: boolean;
  claimedCount?: number;
}

export type EventCategory = 'School' | 'Sports' | 'Family' | 'Medical' | 'Work' | 'Social';

export interface ScheduleEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime?: string;
  location?: string;
  assignedMemberIds: string[];
  assignedName?: string;
  notes?: string;
  isConflict?: boolean;
}

export type GroceryCategory = 'PRODUCE' | 'DAIRY' | 'PANTRY' | 'SNACKS' | 'MEAT' | 'HOUSEHOLD';

export interface GroceryItem {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity?: string;
  price: number;
  isCompleted: boolean;
  addedById?: string;
}

export interface PantryRestockItem {
  id: string;
  name: string;
  stockPercentage: number;
  category?: string;
  isRestocked?: boolean;
}

export interface SavingsGoal {
  id: string;
  title: string;
  subtitle: string;
  targetAmount: number;
  currentAmount: number;
}

export interface HomeworkItem {
  id: string;
  title: string;
  subject: string;
  dueDateLabel: string;
  urgency: 'urgent' | 'warning' | 'normal';
  studentId: string;
  isCompleted?: boolean;
}

export interface PermissionSlipItem {
  id: string;
  title: string;
  subtext: string;
  studentId: string;
  isSigned: boolean;
  signedBy?: string;
}

export interface DirectoryContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

export interface CarpoolTrip {
  id: string;
  time: string;
  title: string;
  details: string;
  status: 'Completed' | 'Scheduled' | 'In Progress';
  driverName?: string;
  vehicle?: string;
  riders?: string;
}

export interface StickyNote {
  id: string;
  content: string;
  colorType: 'yellow' | 'mint' | 'peach';
  pinned?: boolean;
  reactions?: {
    heart: number;
    like: number;
    laugh: number;
  };
}

export interface MealPlanItem {
  id: string;
  day: string; // "Monday", "Tuesday", etc.
  name: string;
  chefName: string;
  emoji: string;
  ingredients: string[];
  isCooked?: boolean;
}

export interface DinnerVoteOption {
  id: string;
  name: string;
  emoji: string;
  votes: number;
  votedMemberIds: string[];
  ingredients: string[];
}

export interface VaultCard {
  id: string;
  title: string;
  category: 'wifi' | 'medical' | 'home';
  details: string;
  icon: string;
  copyableText?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string; // YYYY-MM-DD
  memberId: string;
  type: 'allowance' | 'purchase' | 'bonus' | 'penalty';
}

export interface Memory {
  id: string;
  imageUrl: string;
  caption: string;
  date: string; // YYYY-MM-DD
  addedById: string;
  likes: number;
}

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  countdownDays: number;
}

export interface PackingItem {
  id: string;
  name: string;
  assigneeId: string;
  isPacked: boolean;
}

export interface Pet {
  id: string;
  name: string;
  type: string;
  diet: string;
  avatar: string;
}

export interface PetTask {
  id: string;
  petId: string;
  title: string;
  time: string;
  isDone: boolean;
  assignedToId?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  memberId: string;
  isTaken: boolean;
}

export interface MaintenanceTask {
  id: string;
  title: string;
  dueDate: string;
  frequency: string;
  isCompleted: boolean;
  category: 'vehicle' | 'home';
}

export interface LibraryBook {
  id: string;
  title: string;
  dueDate: string;
  borrowerId: string;
  isReturned: boolean;
}

export interface MediaSubscription {
  id: string;
  name: string;
  cost: number;
  renewalDate: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
}

export interface SafetyPlan {
  id: string;
  title: string;
  description: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  link?: string;
  forMemberId: string;
  isPurchased: boolean;
}

export type TabType = 'dashboard' | 'chores' | 'schedule' | 'purchases' | 'meals' | 'school' | 'finances' | 'memories' | 'travel' | 'pets' | 'health' | 'home' | 'media' | 'safety' | 'gifts';
