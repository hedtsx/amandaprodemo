// src/services/driData.ts
import { AllDRIData } from "../types";

export const driData: AllDRIData = {
  // --- PEDIATRICS ---
  "0-6 months (Male)": {
    // Assuming "0-6m" applies to both if not specified
    Sodium: { value: 120, unit: "mg" },
    Potassium: { value: 400, unit: "mg" },
    Chloride: { value: 180, unit: "mg" },
    Calcium: { value: 200, unit: "mg" },
    Phosphorus: { value: 100, unit: "mg" },
    Magnesium: { value: 30, unit: "mg" },
    Copper: { value: 200, unit: "mcg" }, // Excel: 0.2mg
    Selenium: { value: 15, unit: "mcg" }, // Excel: 0.015mg
    Zinc: { value: 2, unit: "mg" },
    Chromium: { value: 0.2, unit: "mcg" }, // Excel: 0.0002mg
    Manganese: { value: 3, unit: "mcg" }, // Excel: 0.003mg
    Molybdenum: { value: 2, unit: "mcg" }, // Excel: 0.002mg
    Iodine: { value: 110, unit: "mcg" }, // Excel: 0.11mg
    Iron: { value: 0.27, unit: "mg" },
    "Vitamin A (IU)": { value: 1333, unit: "IU" }, // Using IU from Excel
    "Vitamin C": { value: 40, unit: "mg" },
    "Vitamin D (IU)": { value: 400, unit: "IU" }, // Using IU from Excel
    "Vitamin E": { value: 4, unit: "mg" }, // alpha-TE
    "Vitamin K": { value: 2, unit: "mcg" }, // Excel: 0.002mg
    Thiamin: { value: 0.2, unit: "mg" },
    Riboflavin: { value: 0.3, unit: "mg" },
    Niacin: { value: 2, unit: "mg" }, // NE
    "Vitamin B6": { value: 0.1, unit: "mg" },
    Folate: { value: 65, unit: "mcg DFE" }, // DFE
    "Vitamin B12": { value: 0.4, unit: "mcg" },
    "Pantothenic Acid": { value: 1.7, unit: "mg" },
    Biotin: { value: 5, unit: "mcg" }, // Excel: 0.005mg
    Choline: { value: 125, unit: "mg" },
    Protein: { value: 9.1, unit: "g" }, // Approx from AI/EAR
    "Dietary Fiber": { unit: "g" }, // ND
  },
  "0-6 months (Female)": {
    // Assuming "0-6m" applies to both if not specified
    Sodium: { value: 120, unit: "mg" },
    Potassium: { value: 400, unit: "mg" },
    Chloride: { value: 180, unit: "mg" },
    Calcium: { value: 200, unit: "mg" },
    Phosphorus: { value: 100, unit: "mg" },
    Magnesium: { value: 30, unit: "mg" },
    Copper: { value: 200, unit: "mcg" },
    Selenium: { value: 15, unit: "mcg" },
    Zinc: { value: 2, unit: "mg" },
    Chromium: { value: 0.2, unit: "mcg" },
    Manganese: { value: 3, unit: "mcg" },
    Molybdenum: { value: 2, unit: "mcg" },
    Iodine: { value: 110, unit: "mcg" },
    Iron: { value: 0.27, unit: "mg" },
    "Vitamin A (IU)": { value: 1333, unit: "IU" },
    "Vitamin C": { value: 40, unit: "mg" },
    "Vitamin D (IU)": { value: 400, unit: "IU" },
    "Vitamin E": { value: 4, unit: "mg" },
    "Vitamin K": { value: 2, unit: "mcg" },
    Thiamin: { value: 0.2, unit: "mg" },
    Riboflavin: { value: 0.3, unit: "mg" },
    Niacin: { value: 2, unit: "mg" },
    "Vitamin B6": { value: 0.1, unit: "mg" },
    Folate: { value: 65, unit: "mcg DFE" },
    "Vitamin B12": { value: 0.4, unit: "mcg" },
    "Pantothenic Acid": { value: 1.7, unit: "mg" },
    Biotin: { value: 5, unit: "mcg" },
    Choline: { value: 125, unit: "mg" },
    Protein: { value: 9.1, unit: "g" },
    "Dietary Fiber": { unit: "g" },
  },
  "7-12 months (Male)": {
    // Assuming "7-12m" applies to both
    Sodium: { value: 370, unit: "mg" },
    Potassium: { value: 700, unit: "mg" },
    Chloride: { value: 570, unit: "mg" },
    Calcium: { value: 260, unit: "mg" },
    Phosphorus: { value: 275, unit: "mg" },
    Magnesium: { value: 75, unit: "mg" },
    Copper: { value: 220, unit: "mcg" }, // Excel: 0.22mg
    Selenium: { value: 20, unit: "mcg" }, // Excel: 0.02mg
    Zinc: { value: 3, unit: "mg" },
    Chromium: { value: 5.5, unit: "mcg" }, // Excel: 0.0055mg
    Manganese: { value: 600, unit: "mcg" }, // Excel: 0.6mg
    Molybdenum: { value: 3, unit: "mcg" }, // Excel: 0.003mg
    Iodine: { value: 130, unit: "mcg" }, // Excel: 0.13mg
    Iron: { value: 11, unit: "mg" },
    "Vitamin A (IU)": { value: 1667, unit: "IU" },
    "Vitamin C": { value: 50, unit: "mg" },
    "Vitamin D (IU)": { value: 400, unit: "IU" },
    "Vitamin E": { value: 5, unit: "mg" },
    "Vitamin K": { value: 2.5, unit: "mcg" }, // Excel: 0.0025mg
    Thiamin: { value: 0.3, unit: "mg" },
    Riboflavin: { value: 0.4, unit: "mg" },
    Niacin: { value: 4, unit: "mg" },
    "Vitamin B6": { value: 0.3, unit: "mg" },
    Folate: { value: 80, unit: "mcg DFE" },
    "Vitamin B12": { value: 0.5, unit: "mcg" },
    "Pantothenic Acid": { value: 1.8, unit: "mg" },
    Biotin: { value: 6, unit: "mcg" }, // Excel: 0.006mg
    Choline: { value: 150, unit: "mg" },
    Protein: { value: 11, unit: "g" },
    "Dietary Fiber": { unit: "g" }, // ND
  },
  "7-12 months (Female)": {
    // Assuming "7-12m" applies to both
    Sodium: { value: 370, unit: "mg" },
    Potassium: { value: 700, unit: "mg" },
    Chloride: { value: 570, unit: "mg" },
    Calcium: { value: 260, unit: "mg" },
    Phosphorus: { value: 275, unit: "mg" },
    Magnesium: { value: 75, unit: "mg" },
    Copper: { value: 220, unit: "mcg" },
    Selenium: { value: 20, unit: "mcg" },
    Zinc: { value: 3, unit: "mg" },
    Chromium: { value: 5.5, unit: "mcg" },
    Manganese: { value: 600, unit: "mcg" },
    Molybdenum: { value: 3, unit: "mcg" },
    Iodine: { value: 130, unit: "mcg" },
    Iron: { value: 11, unit: "mg" },
    "Vitamin A (IU)": { value: 1667, unit: "IU" },
    "Vitamin C": { value: 50, unit: "mg" },
    "Vitamin D (IU)": { value: 400, unit: "IU" },
    "Vitamin E": { value: 5, unit: "mg" },
    "Vitamin K": { value: 2.5, unit: "mcg" },
    Thiamin: { value: 0.3, unit: "mg" },
    Riboflavin: { value: 0.4, unit: "mg" },
    Niacin: { value: 4, unit: "mg" },
    "Vitamin B6": { value: 0.3, unit: "mg" },
    Folate: { value: 80, unit: "mcg DFE" },
    "Vitamin B12": { value: 0.5, unit: "mcg" },
    "Pantothenic Acid": { value: 1.8, unit: "mg" },
    Biotin: { value: 6, unit: "mcg" },
    Choline: { value: 150, unit: "mg" },
    Protein: { value: 11, unit: "g" },
    "Dietary Fiber": { unit: "g" },
  },
  "1-3 years (Male)": {
    // "1-3y"
    Sodium: { value: 1000, unit: "mg" },
    Potassium: { value: 3000, unit: "mg" },
    Chloride: { value: 1500, unit: "mg" },
    Calcium: { value: 700, unit: "mg" },
    Phosphorus: { value: 460, unit: "mg" },
    Magnesium: { value: 80, unit: "mg" },
    Copper: { value: 340, unit: "mcg" }, // 0.34mg
    Selenium: { value: 20, unit: "mcg" }, // 0.02mg
    Zinc: { value: 3, unit: "mg" },
    Chromium: { value: 11, unit: "mcg" }, // 0.011mg
    Manganese: { value: 1200, unit: "mcg" }, // 1.2mg
    Molybdenum: { value: 17, unit: "mcg" }, // 0.017mg
    Iodine: { value: 90, unit: "mcg" }, // 0.09mg
    Iron: { value: 7, unit: "mg" },
    "Vitamin A (IU)": { value: 1000, unit: "IU" },
    "Vitamin C": { value: 15, unit: "mg" },
    "Vitamin D (IU)": { value: 600, unit: "IU" },
    "Vitamin E": { value: 6, unit: "mg" },
    "Vitamin K": { value: 30, unit: "mcg" }, // 0.03mg
    Thiamin: { value: 0.5, unit: "mg" },
    Riboflavin: { value: 0.5, unit: "mg" },
    Niacin: { value: 6, unit: "mg" },
    "Vitamin B6": { value: 0.5, unit: "mg" },
    Folate: { value: 150, unit: "mcg DFE" },
    "Vitamin B12": { value: 0.9, unit: "mcg" },
    "Pantothenic Acid": { value: 2, unit: "mg" },
    Biotin: { value: 8, unit: "mcg" }, // 0.008mg
    Choline: { value: 200, unit: "mg" },
    Protein: { value: 13, unit: "g" },
    "Dietary Fiber": { value: 19, unit: "g" },
  },
  "1-3 years (Female)": {
    // "1-3y"
    Sodium: { value: 1000, unit: "mg" },
    Potassium: { value: 3000, unit: "mg" },
    Chloride: { value: 1500, unit: "mg" },
    Calcium: { value: 700, unit: "mg" },
    Phosphorus: { value: 460, unit: "mg" },
    Magnesium: { value: 80, unit: "mg" },
    Copper: { value: 340, unit: "mcg" },
    Selenium: { value: 20, unit: "mcg" },
    Zinc: { value: 3, unit: "mg" },
    Chromium: { value: 11, unit: "mcg" },
    Manganese: { value: 1200, unit: "mcg" },
    Molybdenum: { value: 17, unit: "mcg" },
    Iodine: { value: 90, unit: "mcg" },
    Iron: { value: 7, unit: "mg" },
    "Vitamin A (IU)": { value: 1000, unit: "IU" },
    "Vitamin C": { value: 15, unit: "mg" },
    "Vitamin D (IU)": { value: 600, unit: "IU" },
    "Vitamin E": { value: 6, unit: "mg" },
    "Vitamin K": { value: 30, unit: "mcg" },
    Thiamin: { value: 0.5, unit: "mg" },
    Riboflavin: { value: 0.5, unit: "mg" },
    Niacin: { value: 6, unit: "mg" },
    "Vitamin B6": { value: 0.5, unit: "mg" },
    Folate: { value: 150, unit: "mcg DFE" },
    "Vitamin B12": { value: 0.9, unit: "mcg" },
    "Pantothenic Acid": { value: 2, unit: "mg" },
    Biotin: { value: 8, unit: "mcg" },
    Choline: { value: 200, unit: "mg" },
    Protein: { value: 13, unit: "g" },
    "Dietary Fiber": { value: 19, unit: "g" },
  },
  "4-8 years (Male)": {
    // "4-8y"
    Sodium: { value: 1200, unit: "mg" },
    Potassium: { value: 3800, unit: "mg" },
    Chloride: { value: 1900, unit: "mg" },
    Calcium: { value: 1000, unit: "mg" },
    Phosphorus: { value: 500, unit: "mg" },
    Magnesium: { value: 130, unit: "mg" },
    Copper: { value: 440, unit: "mcg" }, // 0.44mg
    Selenium: { value: 30, unit: "mcg" }, // 0.03mg
    Zinc: { value: 5, unit: "mg" },
    Chromium: { value: 15, unit: "mcg" }, // 0.015mg
    Manganese: { value: 1500, unit: "mcg" }, // 1.5mg
    Molybdenum: { value: 22, unit: "mcg" }, // 0.022mg
    Iodine: { value: 90, unit: "mcg" }, // 0.09mg
    Iron: { value: 10, unit: "mg" },
    "Vitamin A (IU)": { value: 1333, unit: "IU" },
    "Vitamin C": { value: 25, unit: "mg" },
    "Vitamin D (IU)": { value: 600, unit: "IU" },
    "Vitamin E": { value: 7, unit: "mg" },
    "Vitamin K": { value: 55, unit: "mcg" }, // 0.055mg
    Thiamin: { value: 0.6, unit: "mg" },
    Riboflavin: { value: 0.6, unit: "mg" },
    Niacin: { value: 8, unit: "mg" },
    "Vitamin B6": { value: 0.6, unit: "mg" },
    Folate: { value: 200, unit: "mcg DFE" },
    "Vitamin B12": { value: 1.2, unit: "mcg" },
    "Pantothenic Acid": { value: 3, unit: "mg" },
    Biotin: { value: 12, unit: "mcg" }, // 0.012mg
    Choline: { value: 250, unit: "mg" },
    Protein: { value: 19, unit: "g" },
    "Dietary Fiber": { value: 25, unit: "g" },
  },
  "4-8 years (Female)": {
    // "4-8y"
    Sodium: { value: 1200, unit: "mg" },
    Potassium: { value: 3800, unit: "mg" },
    Chloride: { value: 1900, unit: "mg" },
    Calcium: { value: 1000, unit: "mg" },
    Phosphorus: { value: 500, unit: "mg" },
    Magnesium: { value: 130, unit: "mg" },
    Copper: { value: 440, unit: "mcg" },
    Selenium: { value: 30, unit: "mcg" },
    Zinc: { value: 5, unit: "mg" },
    Chromium: { value: 15, unit: "mcg" },
    Manganese: { value: 1500, unit: "mcg" },
    Molybdenum: { value: 22, unit: "mcg" },
    Iodine: { value: 90, unit: "mcg" },
    Iron: { value: 10, unit: "mg" },
    "Vitamin A (IU)": { value: 1333, unit: "IU" },
    "Vitamin C": { value: 25, unit: "mg" },
    "Vitamin D (IU)": { value: 600, unit: "IU" },
    "Vitamin E": { value: 7, unit: "mg" },
    "Vitamin K": { value: 55, unit: "mcg" },
    Thiamin: { value: 0.6, unit: "mg" },
    Riboflavin: { value: 0.6, unit: "mg" },
    Niacin: { value: 8, unit: "mg" },
    "Vitamin B6": { value: 0.6, unit: "mg" },
    Folate: { value: 200, unit: "mcg DFE" },
    "Vitamin B12": { value: 1.2, unit: "mcg" },
    "Pantothenic Acid": { value: 3, unit: "mg" },
    Biotin: { value: 12, unit: "mcg" },
    Choline: { value: 250, unit: "mg" },
    Protein: { value: 19, unit: "g" },
    "Dietary Fiber": { value: 25, unit: "g" },
  },
  "9-13 years (Male)": {
    // "9-13y (M)"
    Sodium: { value: 1500, unit: "mg" },
    Potassium: { value: 4500, unit: "mg" },
    Chloride: { value: 2300, unit: "mg" },
    Calcium: { value: 1300, unit: "mg" },
    Phosphorus: { value: 1250, unit: "mg" },
    Magnesium: { value: 240, unit: "mg" },
    Copper: { value: 700, unit: "mcg" }, // 0.7mg
    Selenium: { value: 40, unit: "mcg" }, // 0.04mg
    Zinc: { value: 8, unit: "mg" },
    Chromium: { value: 25, unit: "mcg" }, // 0.025mg
    Manganese: { value: 1900, unit: "mcg" }, // 1.9mg
    Molybdenum: { value: 34, unit: "mcg" }, // 0.034mg
    Iodine: { value: 120, unit: "mcg" }, // 0.12mg
    Iron: { value: 8, unit: "mg" },
    "Vitamin A (IU)": { value: 2000, unit: "IU" },
    "Vitamin C": { value: 45, unit: "mg" },
    "Vitamin D (IU)": { value: 600, unit: "IU" },
    "Vitamin E": { value: 11, unit: "mg" },
    "Vitamin K": { value: 60, unit: "mcg" }, // 0.06mg
    Thiamin: { value: 0.9, unit: "mg" },
    Riboflavin: { value: 0.9, unit: "mg" },
    Niacin: { value: 12, unit: "mg" },
    "Vitamin B6": { value: 1.0, unit: "mg" },
    Folate: { value: 300, unit: "mcg DFE" },
    "Vitamin B12": { value: 1.8, unit: "mcg" },
    "Pantothenic Acid": { value: 4, unit: "mg" },
    Biotin: { value: 20, unit: "mcg" }, // 0.02mg
    Choline: { value: 375, unit: "mg" },
    Protein: { value: 34, unit: "g" },
    "Dietary Fiber": { value: 31, unit: "g" },
  },
  "9-13 years (Female)": {
    // "9-13y (F)"
    Sodium: { value: 1500, unit: "mg" },
    Potassium: { value: 4500, unit: "mg" },
    Chloride: { value: 2300, unit: "mg" },
    Calcium: { value: 1300, unit: "mg" },
    Phosphorus: { value: 1250, unit: "mg" },
    Magnesium: { value: 240, unit: "mg" },
    Copper: { value: 700, unit: "mcg" },
    Selenium: { value: 40, unit: "mcg" },
    Zinc: { value: 8, unit: "mg" },
    Chromium: { value: 21, unit: "mcg" }, // 0.021mg
    Manganese: { value: 1600, unit: "mcg" }, // 1.6mg
    Molybdenum: { value: 34, unit: "mcg" },
    Iodine: { value: 120, unit: "mcg" },
    Iron: { value: 8, unit: "mg" },
    "Vitamin A (IU)": { value: 2000, unit: "IU" },
    "Vitamin C": { value: 45, unit: "mg" },
    "Vitamin D (IU)": { value: 600, unit: "IU" },
    "Vitamin E": { value: 11, unit: "mg" },
    "Vitamin K": { value: 60, unit: "mcg" },
    Thiamin: { value: 0.9, unit: "mg" },
    Riboflavin: { value: 0.9, unit: "mg" },
    Niacin: { value: 12, unit: "mg" },
    "Vitamin B6": { value: 1.0, unit: "mg" },
    Folate: { value: 300, unit: "mcg DFE" },
    "Vitamin B12": { value: 1.8, unit: "mcg" },
    "Pantothenic Acid": { value: 4, unit: "mg" },
    Biotin: { value: 20, unit: "mcg" },
    Choline: { value: 375, unit: "mg" },
    Protein: { value: 34, unit: "g" },
    "Dietary Fiber": { value: 26, unit: "g" },
  },
  "14-18 years (Male)": {
    // "14-18y (M)"
    Sodium: { value: 1500, unit: "mg" },
    Potassium: { value: 4700, unit: "mg" },
    Chloride: { value: 2300, unit: "mg" },
    Calcium: { value: 1300, unit: "mg" },
    Phosphorus: { value: 1250, unit: "mg" },
    Magnesium: { value: 410, unit: "mg" },
    Copper: { value: 890, unit: "mcg" }, // 0.89mg
    Selenium: { value: 55, unit: "mcg" }, // 0.055mg
    Zinc: { value: 11, unit: "mg" },
    Chromium: { value: 35, unit: "mcg" }, // 0.035mg
    Manganese: { value: 2200, unit: "mcg" }, // 2.2mg
    Molybdenum: { value: 43, unit: "mcg" }, // 0.043mg
    Iodine: { value: 150, unit: "mcg" }, // 0.15mg
    Iron: { value: 11, unit: "mg" },
    "Vitamin A (IU)": { value: 3000, unit: "IU" },
    "Vitamin C": { value: 75, unit: "mg" },
    "Vitamin D (IU)": { value: 600, unit: "IU" },
    "Vitamin E": { value: 15, unit: "mg" },
    "Vitamin K": { value: 75, unit: "mcg" }, // 0.075mg
    Thiamin: { value: 1.2, unit: "mg" },
    Riboflavin: { value: 1.3, unit: "mg" },
    Niacin: { value: 16, unit: "mg" },
    "Vitamin B6": { value: 1.3, unit: "mg" },
    Folate: { value: 400, unit: "mcg DFE" },
    "Vitamin B12": { value: 2.4, unit: "mcg" },
    "Pantothenic Acid": { value: 5, unit: "mg" },
    Biotin: { value: 25, unit: "mcg" }, // 0.025mg
    Choline: { value: 550, unit: "mg" },
    Protein: { value: 52, unit: "g" },
    "Dietary Fiber": { value: 38, unit: "g" },
  },
  "14-18 years (Female)": {
    // "14-18y (F)"
    Sodium: { value: 1500, unit: "mg" },
    Potassium: { value: 4700, unit: "mg" },
    Chloride: { value: 2300, unit: "mg" },
    Calcium: { value: 1300, unit: "mg" },
    Phosphorus: { value: 1250, unit: "mg" },
    Magnesium: { value: 360, unit: "mg" },
    Copper: { value: 890, unit: "mcg" },
    Selenium: { value: 55, unit: "mcg" },
    Zinc: { value: 9, unit: "mg" },
    Chromium: { value: 24, unit: "mcg" }, // 0.024mg
    Manganese: { value: 1600, unit: "mcg" }, // 1.6mg
    Molybdenum: { value: 43, unit: "mcg" },
    Iodine: { value: 150, unit: "mcg" },
    Iron: { value: 15, unit: "mg" },
    "Vitamin A (IU)": { value: 2333, unit: "IU" },
    "Vitamin C": { value: 65, unit: "mg" },
    "Vitamin D (IU)": { value: 600, unit: "IU" },
    "Vitamin E": { value: 15, unit: "mg" },
    "Vitamin K": { value: 75, unit: "mcg" },
    Thiamin: { value: 1.0, unit: "mg" },
    Riboflavin: { value: 1.0, unit: "mg" },
    Niacin: { value: 14, unit: "mg" },
    "Vitamin B6": { value: 1.2, unit: "mg" },
    Folate: { value: 400, unit: "mcg DFE" },
    "Vitamin B12": { value: 2.4, unit: "mcg" },
    "Pantothenic Acid": { value: 5, unit: "mg" },
    Biotin: { value: 25, unit: "mcg" },
    Choline: { value: 400, unit: "mg" },
    Protein: { value: 46, unit: "g" },
    "Dietary Fiber": { value: 26, unit: "g" },
  },

  // --- ADULTS ---
  "19-30 years (Male)": {
    // "19-30y (M)"
    Sodium: { value: 1500, unit: "mg" },
    Potassium: { value: 3400, unit: "mg" }, // Corrected from Excel image which shows 4700 for 19-50y, but DRIs often split 19-30 and 31-50 for Potassium. Using general adult male AI.
    Chloride: { value: 2300, unit: "mg" },
    Calcium: { value: 1000, unit: "mg" },
    Phosphorus: { value: 700, unit: "mg" },
    Magnesium: { value: 400, unit: "mg" },
    Copper: { value: 900, unit: "mcg" }, // 0.9mg
    Selenium: { value: 55, unit: "mcg" }, // 0.055mg
    Zinc: { value: 11, unit: "mg" },
    Chromium: { value: 35, unit: "mcg" }, // 0.035mg
    Manganese: { value: 2300, unit: "mcg" }, // 2.3mg
    Molybdenum: { value: 45, unit: "mcg" }, // 0.045mg
    Iodine: { value: 150, unit: "mcg" }, // 0.15mg
    Iron: { value: 8, unit: "mg" },
    "Vitamin A (IU)": { value: 3000, unit: "IU" }, // RDA 900 mcg RAE ~ 3000 IU
    "Vitamin C": { value: 90, unit: "mg" },
    "Vitamin D (IU)": { value: 600, unit: "IU" }, // up to 70y
    "Vitamin E": { value: 15, unit: "mg" },
    "Vitamin K": { value: 120, unit: "mcg" }, // 0.12mg
    Thiamin: { value: 1.2, unit: "mg" },
    Riboflavin: { value: 1.3, unit: "mg" },
    Niacin: { value: 16, unit: "mg" },
    "Vitamin B6": { value: 1.3, unit: "mg" },
    Folate: { value: 400, unit: "mcg DFE" },
    "Vitamin B12": { value: 2.4, unit: "mcg" },
    "Pantothenic Acid": { value: 5, unit: "mg" },
    Biotin: { value: 30, unit: "mcg" }, // 0.03mg
    Choline: { value: 550, unit: "mg" },
    Protein: { value: 56, unit: "g" },
    "Dietary Fiber": { value: 38, unit: "g" },
  },
  "19-30 years (Female)": {
    // "19-30y (F)"
    Sodium: { value: 1500, unit: "mg" },
    Potassium: { value: 2600, unit: "mg" }, // Corrected from Excel image. General adult female AI.
    Chloride: { value: 2300, unit: "mg" },
    Calcium: { value: 1000, unit: "mg" },
    Phosphorus: { value: 700, unit: "mg" },
    Magnesium: { value: 310, unit: "mg" },
    Copper: { value: 900, unit: "mcg" },
    Selenium: { value: 55, unit: "mcg" },
    Zinc: { value: 8, unit: "mg" },
    Chromium: { value: 25, unit: "mcg" }, // 0.025mg
    Manganese: { value: 1800, unit: "mcg" }, // 1.8mg
    Molybdenum: { value: 45, unit: "mcg" },
    Iodine: { value: 150, unit: "mcg" },
    Iron: { value: 18, unit: "mg" },
    "Vitamin A (IU)": { value: 2333, unit: "IU" }, // RDA 700 mcg RAE ~ 2333 IU
    "Vitamin C": { value: 75, unit: "mg" },
    "Vitamin D (IU)": { value: 600, unit: "IU" },
    "Vitamin E": { value: 15, unit: "mg" },
    "Vitamin K": { value: 90, unit: "mcg" }, // 0.09mg
    Thiamin: { value: 1.1, unit: "mg" },
    Riboflavin: { value: 1.1, unit: "mg" },
    Niacin: { value: 14, unit: "mg" },
    "Vitamin B6": { value: 1.3, unit: "mg" },
    Folate: { value: 400, unit: "mcg DFE" },
    "Vitamin B12": { value: 2.4, unit: "mcg" },
    "Pantothenic Acid": { value: 5, unit: "mg" },
    Biotin: { value: 30, unit: "mcg" },
    Choline: { value: 425, unit: "mg" },
    Protein: { value: 46, unit: "g" },
    "Dietary Fiber": { value: 25, unit: "g" },
  },
  "31-50 years (Male)": {
    // "31-50y (M)"
    Sodium: { value: 1500, unit: "mg" },
    Potassium: { value: 3400, unit: "mg" },
    Chloride: { value: 2300, unit: "mg" },
    Calcium: { value: 1000, unit: "mg" },
    Phosphorus: { value: 700, unit: "mg" },
    Magnesium: { value: 420, unit: "mg" }, // Value changes from 19-30
    Copper: { value: 900, unit: "mcg" },
    Selenium: { value: 55, unit: "mcg" },
    Zinc: { value: 11, unit: "mg" },
    Chromium: { value: 35, unit: "mcg" },
    Manganese: { value: 2300, unit: "mcg" },
    Molybdenum: { value: 45, unit: "mcg" },
    Iodine: { value: 150, unit: "mcg" },
    Iron: { value: 8, unit: "mg" },
    "Vitamin A (IU)": { value: 3000, unit: "IU" },
    "Vitamin C": { value: 90, unit: "mg" },
    "Vitamin D (IU)": { value: 600, unit: "IU" },
    "Vitamin E": { value: 15, unit: "mg" },
    "Vitamin K": { value: 120, unit: "mcg" },
    Thiamin: { value: 1.2, unit: "mg" },
    Riboflavin: { value: 1.3, unit: "mg" },
    Niacin: { value: 16, unit: "mg" },
    "Vitamin B6": { value: 1.3, unit: "mg" }, // Stays 1.3 up to 50y, then 1.7
    Folate: { value: 400, unit: "mcg DFE" },
    "Vitamin B12": { value: 2.4, unit: "mcg" },
    "Pantothenic Acid": { value: 5, unit: "mg" },
    Biotin: { value: 30, unit: "mcg" },
    Choline: { value: 550, unit: "mg" },
    Protein: { value: 56, unit: "g" },
    "Dietary Fiber": { value: 38, unit: "g" }, // Changes to 30g for 51+
  },
  "31-50 years (Female)": {
    // "31-50y (F)"
    Sodium: { value: 1500, unit: "mg" },
    Potassium: { value: 2600, unit: "mg" },
    Chloride: { value: 2300, unit: "mg" },
    Calcium: { value: 1000, unit: "mg" },
    Phosphorus: { value: 700, unit: "mg" },
    Magnesium: { value: 320, unit: "mg" }, // Value changes from 19-30
    Copper: { value: 900, unit: "mcg" },
    Selenium: { value: 55, unit: "mcg" },
    Zinc: { value: 8, unit: "mg" },
    Chromium: { value: 25, unit: "mcg" },
    Manganese: { value: 1800, unit: "mcg" },
    Molybdenum: { value: 45, unit: "mcg" },
    Iodine: { value: 150, unit: "mcg" },
    Iron: { value: 18, unit: "mg" }, // Drops to 8mg for 51+
    "Vitamin A (IU)": { value: 2333, unit: "IU" },
    "Vitamin C": { value: 75, unit: "mg" },
    "Vitamin D (IU)": { value: 600, unit: "IU" },
    "Vitamin E": { value: 15, unit: "mg" },
    "Vitamin K": { value: 90, unit: "mcg" },
    Thiamin: { value: 1.1, unit: "mg" },
    Riboflavin: { value: 1.1, unit: "mg" },
    Niacin: { value: 14, unit: "mg" },
    "Vitamin B6": { value: 1.3, unit: "mg" }, // Stays 1.3 up to 50y, then 1.5
    Folate: { value: 400, unit: "mcg DFE" },
    "Vitamin B12": { value: 2.4, unit: "mcg" },
    "Pantothenic Acid": { value: 5, unit: "mg" },
    Biotin: { value: 30, unit: "mcg" },
    Choline: { value: 425, unit: "mg" },
    Protein: { value: 46, unit: "g" },
    "Dietary Fiber": { value: 25, unit: "g" }, // Changes to 21g for 51+
  },
  "51-70 years (Male)": {
    // "51-70y (M)"
    Sodium: { value: 1300, unit: "mg" }, // Excel shows 1500, but DRI typically drops for 51+
    Potassium: { value: 3400, unit: "mg" },
    Chloride: { value: 2000, unit: "mg" }, // Excel shows 2300
    Calcium: { value: 1000, unit: "mg" }, // Increases to 1200 for 70+ M
    Phosphorus: { value: 700, unit: "mg" },
    Magnesium: { value: 420, unit: "mg" },
    Copper: { value: 900, unit: "mcg" },
    Selenium: { value: 55, unit: "mcg" },
    Zinc: { value: 11, unit: "mg" },
    Chromium: { value: 30, unit: "mcg" }, // 0.03mg
    Manganese: { value: 2300, unit: "mcg" },
    Molybdenum: { value: 45, unit: "mcg" },
    Iodine: { value: 150, unit: "mcg" },
    Iron: { value: 8, unit: "mg" },
    "Vitamin A (IU)": { value: 3000, unit: "IU" },
    "Vitamin C": { value: 90, unit: "mg" },
    "Vitamin D (IU)": { value: 600, unit: "IU" }, // Increases to 800 IU for 70+
    "Vitamin E": { value: 15, unit: "mg" },
    "Vitamin K": { value: 120, unit: "mcg" },
    Thiamin: { value: 1.2, unit: "mg" },
    Riboflavin: { value: 1.3, unit: "mg" },
    Niacin: { value: 16, unit: "mg" },
    "Vitamin B6": { value: 1.7, unit: "mg" },
    Folate: { value: 400, unit: "mcg DFE" },
    "Vitamin B12": { value: 2.4, unit: "mcg" },
    "Pantothenic Acid": { value: 5, unit: "mg" },
    Biotin: { value: 30, unit: "mcg" },
    Choline: { value: 550, unit: "mg" },
    Protein: { value: 56, unit: "g" },
    "Dietary Fiber": { value: 30, unit: "g" },
  },
  "51-70 years (Female)": {
    // "51-70y (F)"
    Sodium: { value: 1300, unit: "mg" },
    Potassium: { value: 2600, unit: "mg" },
    Chloride: { value: 2000, unit: "mg" },
    Calcium: { value: 1200, unit: "mg" }, // Higher for F 51+
    Phosphorus: { value: 700, unit: "mg" },
    Magnesium: { value: 320, unit: "mg" },
    Copper: { value: 900, unit: "mcg" },
    Selenium: { value: 55, unit: "mcg" },
    Zinc: { value: 8, unit: "mg" },
    Chromium: { value: 20, unit: "mcg" }, // 0.02mg
    Manganese: { value: 1800, unit: "mcg" },
    Molybdenum: { value: 45, unit: "mcg" },
    Iodine: { value: 150, unit: "mcg" },
    Iron: { value: 8, unit: "mg" },
    "Vitamin A (IU)": { value: 2333, unit: "IU" },
    "Vitamin C": { value: 75, unit: "mg" },
    "Vitamin D (IU)": { value: 600, unit: "IU" }, // Increases to 800 IU for 70+
    "Vitamin E": { value: 15, unit: "mg" },
    "Vitamin K": { value: 90, unit: "mcg" },
    Thiamin: { value: 1.1, unit: "mg" },
    Riboflavin: { value: 1.1, unit: "mg" },
    Niacin: { value: 14, unit: "mg" },
    "Vitamin B6": { value: 1.5, unit: "mg" },
    Folate: { value: 400, unit: "mcg DFE" },
    "Vitamin B12": { value: 2.4, unit: "mcg" },
    "Pantothenic Acid": { value: 5, unit: "mg" },
    Biotin: { value: 30, unit: "mcg" },
    Choline: { value: 425, unit: "mg" },
    Protein: { value: 46, unit: "g" },
    "Dietary Fiber": { value: 21, unit: "g" },
  },
  "70+ years (Male)": {
    // "70+y (M)"
    Sodium: { value: 1200, unit: "mg" }, // Excel shows 1500
    Potassium: { value: 3400, unit: "mg" },
    Chloride: { value: 1800, unit: "mg" }, // Excel shows 2300
    Calcium: { value: 1200, unit: "mg" },
    Phosphorus: { value: 700, unit: "mg" },
    Magnesium: { value: 420, unit: "mg" },
    Copper: { value: 900, unit: "mcg" },
    Selenium: { value: 55, unit: "mcg" },
    Zinc: { value: 11, unit: "mg" },
    Chromium: { value: 30, unit: "mcg" },
    Manganese: { value: 2300, unit: "mcg" },
    Molybdenum: { value: 45, unit: "mcg" },
    Iodine: { value: 150, unit: "mcg" },
    Iron: { value: 8, unit: "mg" },
    "Vitamin A (IU)": { value: 3000, unit: "IU" },
    "Vitamin C": { value: 90, unit: "mg" },
    "Vitamin D (IU)": { value: 800, unit: "IU" },
    "Vitamin E": { value: 15, unit: "mg" },
    "Vitamin K": { value: 120, unit: "mcg" },
    Thiamin: { value: 1.2, unit: "mg" },
    Riboflavin: { value: 1.3, unit: "mg" },
    Niacin: { value: 16, unit: "mg" },
    "Vitamin B6": { value: 1.7, unit: "mg" },
    Folate: { value: 400, unit: "mcg DFE" },
    "Vitamin B12": { value: 2.4, unit: "mcg" },
    "Pantothenic Acid": { value: 5, unit: "mg" },
    Biotin: { value: 30, unit: "mcg" },
    Choline: { value: 550, unit: "mg" },
    Protein: { value: 56, unit: "g" },
    "Dietary Fiber": { value: 30, unit: "g" },
  },
  "70+ years (Female)": {
    // "70+y (F)"
    Sodium: { value: 1200, unit: "mg" },
    Potassium: { value: 2600, unit: "mg" },
    Chloride: { value: 1800, unit: "mg" },
    Calcium: { value: 1200, unit: "mg" },
    Phosphorus: { value: 700, unit: "mg" },
    Magnesium: { value: 320, unit: "mg" },
    Copper: { value: 900, unit: "mcg" },
    Selenium: { value: 55, unit: "mcg" },
    Zinc: { value: 8, unit: "mg" },
    Chromium: { value: 20, unit: "mcg" },
    Manganese: { value: 1800, unit: "mcg" },
    Molybdenum: { value: 45, unit: "mcg" },
    Iodine: { value: 150, unit: "mcg" },
    Iron: { value: 8, unit: "mg" },
    "Vitamin A (IU)": { value: 2333, unit: "IU" },
    "Vitamin C": { value: 75, unit: "mg" },
    "Vitamin D (IU)": { value: 800, unit: "IU" },
    "Vitamin E": { value: 15, unit: "mg" },
    "Vitamin K": { value: 90, unit: "mcg" },
    Thiamin: { value: 1.1, unit: "mg" },
    Riboflavin: { value: 1.1, unit: "mg" },
    Niacin: { value: 14, unit: "mg" },
    "Vitamin B6": { value: 1.5, unit: "mg" },
    Folate: { value: 400, unit: "mcg DFE" },
    "Vitamin B12": { value: 2.4, unit: "mcg" },
    "Pantothenic Acid": { value: 5, unit: "mg" },
    Biotin: { value: 30, unit: "mcg" },
    Choline: { value: 425, unit: "mg" },
    Protein: { value: 46, unit: "g" },
    "Dietary Fiber": { value: 21, unit: "g" },
  },
};

// Nutrient order based on the target UI image ("All Nutritional Details")
export const driTableNutrientOrder: Array<{
  key: string;
  displayName: string;
  notesKey?: string;
  defaultUnit?: string;
}> = [
  { key: "Sodium", displayName: "Sodium (mg)", defaultUnit: "mg" },
  { key: "Potassium", displayName: "Potassium (mg)", defaultUnit: "mg" },
  { key: "Chloride", displayName: "Chloride (mg)", defaultUnit: "mg" },
  { key: "Calcium", displayName: "Calcium (mg)", defaultUnit: "mg" },
  { key: "Phosphorus", displayName: "Phosphorus (mg)", defaultUnit: "mg" },
  { key: "Magnesium", displayName: "Magnesium (mg)", defaultUnit: "mg" },
  { key: "Copper", displayName: "Copper (mcg)", defaultUnit: "mcg" }, // UI shows 0.3mg, DRI is in mcg
  { key: "Selenium", displayName: "Selenium (mcg)", defaultUnit: "mcg" },
  { key: "Zinc", displayName: "Zinc (mg)", defaultUnit: "mg" },
  { key: "Chromium", displayName: "Chromium (mcg)", defaultUnit: "mcg" },
  { key: "Manganese", displayName: "Manganese (mg)", defaultUnit: "mg" }, // UI shows 0.42mg
  { key: "Molybdenum", displayName: "Molybdenum (mcg)", defaultUnit: "mcg" }, // Not in UI image, but in Excel
  { key: "Iodine", displayName: "Iodine (mcg)", defaultUnit: "mcg" },
  { key: "Iron", displayName: "Iron (mg)", defaultUnit: "mg" },
  {
    key: "Vitamin A (IU)",
    displayName: "Vitamin A",
    notesKey: " (mcg RAE*)",
    defaultUnit: "IU",
  }, // Will need conversion logic for RAE
  { key: "Retinol", displayName: "Retinol (mcg)", defaultUnit: "mcg" }, // Assuming product data is in mcg
  { key: "β-carotene", displayName: "β-carotene (mcg)", defaultUnit: "mcg" }, // Assuming product data is in mcg
  { key: "Vitamin C", displayName: "Vitamin C (mg)", defaultUnit: "mg" },
  {
    key: "Vitamin D (IU)",
    displayName: "Vitamin D (mcg)",
    notesKey: "",
    defaultUnit: "IU",
  }, // UI shows mcg, DRI in IU. Conversion needed.
  { key: "Vitamin E", displayName: "Vitamin E (mg)", defaultUnit: "mg" }, // alpha-TE
  { key: "Vitamin K", displayName: "Vitamin K (mcg)", defaultUnit: "mcg" },
  { key: "Thiamin", displayName: "Thiamin (mg)", defaultUnit: "mg" },
  { key: "Taurine", displayName: "Taurine (mg)", defaultUnit: "mg" },
  { key: "L-carnitine", displayName: "L-carnitine (mg)", defaultUnit: "mg" },
  { key: "Riboflavin", displayName: "Riboflavin (mg)", defaultUnit: "mg" },
  { key: "Niacin", displayName: "Niacin (mg)", defaultUnit: "mg" }, // NE
  { key: "Vitamin B6", displayName: "Vitamin B6 (mg)", defaultUnit: "mg" },
  {
    key: "Folate",
    displayName: "Folate",
    notesKey: " (mcg DFE**)",
    defaultUnit: "mcg DFE",
  },
  { key: "Folic Acid", displayName: "Folic Acid (mcg)", defaultUnit: "mcg" }, // Usually part of Folate DFE
  { key: "Vitamin B12", displayName: "Vitamin B12 (mcg)", defaultUnit: "mcg" },
  {
    key: "Pantothenic Acid",
    displayName: "Pantothenic Acid (mg)",
    defaultUnit: "mg",
  },
  { key: "Biotin", displayName: "Biotin (mcg)", defaultUnit: "mcg" },
  { key: "Choline", displayName: "Choline (mg)", defaultUnit: "mg" },
  { key: "Water", displayName: "Water (mL)", defaultUnit: "mL" },
  { key: "Protein", displayName: "Protein (g)", defaultUnit: "g" },
  { key: "Total Carb.", displayName: "Total Carb. (g)", defaultUnit: "g" }, // Map from CHO
  { key: "Fat", displayName: "Fat (g)", defaultUnit: "g" },
  { key: "Dietary Fiber", displayName: "Dietary Fiber (g)", defaultUnit: "g" }, // Map from Fiber
];
