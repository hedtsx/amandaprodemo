export type Product = string;

export type CalculationMethod = 'Calories/Day' | 'Volume/Day' | 'Cartons/Day';

export type AgeGender = string;

export interface ChatMessage {
  type: 'bot' | 'user';
  content: string;
  options?: string[];
  showProductSelector?: boolean;
  showAgeSexSelector?: boolean;
  showWeightInput?: boolean;
  showCartonsInput?: boolean;
  isDisclaimer?: boolean;
  showSkipButton?: boolean;
  showResults?: boolean;
  results?: CalculationResult & {
    productName: string;
    productImage: string;
    mlPerCarton: number;
  };
}

export interface CalculationResult {
  totalDailyVolume: number;
  totalDailyCalories: number;
  totalDailyProtein: number;
}

export interface UserInput {
  product?: Product;
  calculationMethod?: CalculationMethod;
  cartonsPerDay?: number;
  ageGender?: AgeGender;
  weight?: number;
}

export interface ProductCategory {
  category: string;
  items: string[];
}

export interface AgeGroup {
  category: string;
  items: string[];
} 