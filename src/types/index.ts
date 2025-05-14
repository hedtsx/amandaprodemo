export type Product = string;

export type CalculationMethod = "Calories/Day" | "Volume/Day" | "Cartons/Day";

export type AgeGender = string;

export interface ChatMessage {
  type: "bot" | "user";
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
  calculatedCartonsPerDay: number;
  totalDailyVolume: number;
  totalDailyCalories: number;
  totalDailyProtein: number;
  kcalsPerKg?: number;
  proteinPerKg?: number;
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

export interface NutrientDRI {
  value?: number; // DRI value; optional if some nutrients don't have a DRI
  unit: string; // e.g., "mg", "mcg", "g"
}

export interface AgeSexDRIs {
  [nutrientName: string]: NutrientDRI;
}

export interface AllDRIData {
  [ageSexGroup: string]: AgeSexDRIs;
}

// For the final table display
export interface DisplayNutrientDetail {
  nutrient: string;
  amount: string | number; // Amount in finalTotalDailyVolume
  dri: string | number; // DRI value from driData
  percentDri: string | number; // Calculated %DRI
  unit: string; // The unit for display for amount and DRI
  notes?: string; // For things like RAE*, DFE**
}

export interface CalculationResult {
  calculatedCartonsPerDay: number;
  totalDailyVolume: number;
  totalDailyCalories: number;
  totalDailyProtein: number;
  kcalsPerKg?: number;
  proteinPerKg?: number;
  driNutrients?: DisplayNutrientDetail[]; // Add this line
}
