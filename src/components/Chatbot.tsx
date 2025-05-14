import { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  Button,
  Autocomplete,
  Select,
  MenuItem,
  FormControl,
  Grow,
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import DownloadIcon from "@mui/icons-material/Download";
import {
  ChatMessage,
  UserInput,
  CalculationMethod,
  CalculationResult,
} from "../types";
import { products as importedProductsData } from "../services/products";

// Enhanced product list
interface ProductOption {
  name: string;
  imageUrl: string;
}

const PRODUCTS: ProductOption[] = importedProductsData.map((product) => ({
  name: product.product_name,
  imageUrl: product.imageURL,
}));

// const PRODUCTS: ProductOption[] = [
//   {
//     name: "Compleat Original",
//     imageUrl:
//       "https://www.nhsc-usa-cerebro.com/sites/default/files/Compleat%20Original%201.0%208.45oz%20no%20new.png",
//   },
//   {
//     name: "Compleat Pediatrics Original 1.5",
//     imageUrl:
//       "https://www.nhsc-usa-cerebro.com/sites/default/files/Compleat%20Pediatric%20Original%201.5.png",
//   },
//   {
//     name: "Compleat Peptide 1.0",
//     imageUrl:
//       "https://www.nhsc-usa-cerebro.com/sites/default/files/Compleat%20Peptide%201.0%208.45oz%20no%20new.png",
//   },
// ];

// Enhanced age/sex combinations
const AGE_SEX_OPTIONS = [
  {
    category: "Pediatric",
    items: [
      "0-6 months (Male)",
      "0-6 months (Female)",
      "7-12 months (Male)",
      "7-12 months (Female)",
      "1-3 years (Male)",
      "1-3 years (Female)",
      "4-8 years (Male)",
      "4-8 years (Female)",
      "9-13 years (Male)",
      "9-13 years (Female)",
      "14-18 years (Male)",
      "14-18 years (Female)",
    ],
  },
  {
    category: "Adult",
    items: [
      "19-30 years (Male)",
      "19-30 years (Female)",
      "31-50 years (Male)",
      "31-50 years (Female)",
      "51-70 years (Male)",
      "51-70 years (Female)",
      "70+ years (Male)",
      "70+ years (Female)",
    ],
  },
];

const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState<UserInput>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [cartonsInput, setCartonsInput] = useState("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting
    setMessages([
      {
        type: "bot",
        content:
          "Welcome to the Nestlé Formula Calculator. Please note that this tool is not a generative AI chatbot.",
        isDisclaimer: true,
      },
      {
        type: "bot",
        content: "Please select a product:",
        showProductSelector: true,
      },
    ]);
  }, []);

  const handleProductSelect = (product: ProductOption | null) => {
    if (!product) return;

    // First, hide the product selector
    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === prev.length - 1 ? { ...msg, showProductSelector: false } : msg
      )
    );
    // Then add the new messages
    setMessages((prev) => [
      ...prev,
      { type: "user", content: product.name },
      {
        type: "bot",
        content: "Choose calculation method:",
        options: ["Calories/Day", "Volume/Day", "Cartons/Day"],
      },
    ]);
    setUserInput((prev) => ({ ...prev, product: product.name }));
    setCurrentStep(1);
  };

  const handleOptionClick = (option: string) => {
    // First, hide the options
    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === prev.length - 1 ? { ...msg, options: undefined } : msg
      )
    );
    // Then add the new messages
    setMessages((prev) => [...prev, { type: "user", content: option }]);

    switch (currentStep) {
      case 1: // Calculation method
        setUserInput((prev) => ({
          ...prev,
          calculationMethod: option as CalculationMethod,
        }));
        let nextMessage = "";
        switch (option) {
          case "Calories/Day":
            nextMessage = "Enter goal total calories from formula per day:";
            break;
          case "Volume/Day":
            nextMessage = "Enter total volume from formula/day (mL):";
            break;
          case "Cartons/Day":
            nextMessage = "Please enter the number of cartons per day:";
            break;
        }
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: nextMessage,
            showCartonsInput: true,
          },
        ]);
        break;
      default:
        break;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleCartonsSubmit = (cartons: string) => {
    if (!cartons.trim()) return;

    const cartonsValue = Number(cartons);
    setUserInput((prev) => ({ ...prev, cartonsPerDay: cartonsValue }));
    // First, hide the cartons input
    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === prev.length - 1 ? { ...msg, showCartonsInput: false } : msg
      )
    );
    // Then add the new messages
    setMessages((prev) => [
      ...prev,
      { type: "user", content: cartons },
      {
        type: "bot",
        content: "To display DRI data, select patient’s age/sex (optional):",
        showAgeSexSelector: true,
        showSkipButton: true,
      },
    ]);
    setCartonsInput("");
    setCurrentStep((prev) => prev + 1);
  };

  const handleSkipAgeSex = () => {
    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === prev.length - 1
          ? { ...msg, showAgeSexSelector: false, showSkipButton: false }
          : msg
      )
    );
    setMessages((prev) => [
      ...prev,
      { type: "user", content: "Skipped" },
      {
        type: "bot",
        content:
          "To display kcals/kg and g protein/kg, enter patient's weight (optional):",
        showWeightInput: true,
        showSkipButton: true,
      },
    ]);
    setCurrentStep(4);
  };

  const handleSkipWeight = () => {
    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === prev.length - 1
          ? { ...msg, showWeightInput: false, showSkipButton: false }
          : msg
      )
    );
    setMessages((prev) => [...prev, { type: "user", content: "Skipped" }]);
    const results: CalculationResult = calculateResults(userInput);
    displayResults(results);
    setInputValue("");
    setCurrentStep((prev) => prev + 1);
  };

  const handleAgeGenderSelect = (ageSex: string | null) => {
    if (!ageSex) return;

    setUserInput((prev) => ({ ...prev, ageGender: ageSex }));
    // First, hide the age/sex selector
    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === prev.length - 1
          ? { ...msg, showAgeSexSelector: false, showSkipButton: false }
          : msg
      )
    );
    // Then add the new messages
    setMessages((prev) => [
      ...prev,
      { type: "user", content: ageSex },
      {
        type: "bot",
        content: "Enter patient's weight (Optional):",
        showWeightInput: true,
        showSkipButton: true,
      },
    ]);
    setCurrentStep(4);
  };

  const handleWeightSubmit = (weight: string, unit: "kg" | "lb") => {
    if (!weight.trim()) return;

    const weightValue = Number(weight);
    const weightInKg = unit === "lb" ? weightValue * 0.453592 : weightValue;

    setUserInput((prev) => ({ ...prev, weight: weightInKg }));
    // First, hide the weight input
    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === prev.length - 1 ? { ...msg, showWeightInput: false } : msg
      )
    );
    // Then add the new messages
    setMessages((prev) => [
      ...prev,
      { type: "user", content: `${weight} ${unit}` },
    ]);
    const results: CalculationResult = calculateResults({
      ...userInput,
      weight: weightInKg,
    });
    displayResults(results);
    setInputValue("");
    setCurrentStep((prev) => prev + 1);
  };

  const calculateResults = (input: UserInput): CalculationResult => {
    const selectedProductData = importedProductsData.find(
      (p) => p.product_name === input.product
    );

    if (!selectedProductData) {
      console.error("Product data not found for:", input.product);
      return {
        calculatedCartonsPerDay: 0,
        totalDailyVolume: 0,
        totalDailyCalories: 0,
        totalDailyProtein: 0,
      };
    }

    // --- 1. Get "per carton" base values from Energy section ---
    const energyObject = selectedProductData.nutritional_info[0]; // Assuming Energy (Cal) is always first
    if (
      !energyObject ||
      energyObject.Nutrition !== "Energy" ||
      energyObject.Units !== "Cal"
    ) {
      console.error(
        "Energy (Cal) information not found or not in expected position for:",
        input.product
      );
      return {
        calculatedCartonsPerDay: 0,
        totalDailyVolume: 0,
        totalDailyCalories: 0,
        totalDailyProtein: 0,
      };
    }

    const energyEntries = Object.entries(energyObject);
    if (energyEntries.length <= 3) {
      console.error(
        "Energy data does not have enough entries for 'per carton' info:",
        input.product,
        energyObject
      );
      return {
        calculatedCartonsPerDay: 0,
        totalDailyVolume: 0,
        totalDailyCalories: 0,
        totalDailyProtein: 0,
      };
    }

    const cartonEnergyData = energyEntries[3];
    const cartonVolumeString = cartonEnergyData[0] as string;
    const caloriesPerCarton = parseFloat(cartonEnergyData[1] as string);
    const cartonVolumeMl = parseFloat(cartonVolumeString);

    if (
      isNaN(cartonVolumeMl) ||
      cartonVolumeMl <= 0 ||
      isNaN(caloriesPerCarton)
    ) {
      console.error(
        "Could not parse valid carton volume or calories from energy data:",
        {
          cartonVolumeString,
          parsedVolume: cartonVolumeMl,
          caloriesPerCarton,
          product: input.product,
        }
      );
      return {
        calculatedCartonsPerDay: 0,
        totalDailyVolume: 0,
        totalDailyCalories: 0,
        totalDailyProtein: 0,
      };
    }

    const userInputValue = input.cartonsPerDay || 0;

    let rawTotalDailyVolume = 0;
    if (input.calculationMethod === "Calories/Day") {
      if (caloriesPerCarton > 0) {
        const volumePerCalorie = cartonVolumeMl / caloriesPerCarton;
        rawTotalDailyVolume = userInputValue * volumePerCalorie;
      }
    } else if (input.calculationMethod === "Volume/Day") {
      rawTotalDailyVolume = userInputValue;
    } else if (input.calculationMethod === "Cartons/Day") {
      rawTotalDailyVolume = userInputValue * cartonVolumeMl;
    }

    const finalTotalDailyVolume = Math.round(rawTotalDailyVolume / 25) * 25;

    let finalCalculatedCartonsPerDay = 0;
    if (cartonVolumeMl > 0) {
      finalCalculatedCartonsPerDay = finalTotalDailyVolume / cartonVolumeMl;
    }
    finalCalculatedCartonsPerDay =
      Math.round(finalCalculatedCartonsPerDay * 10) / 10;

    let finalTotalDailyCalories = 0;
    if (cartonVolumeMl > 0) {
      const caloriesPerMl = caloriesPerCarton / cartonVolumeMl;
      finalTotalDailyCalories = finalTotalDailyVolume * caloriesPerMl;
    }
    finalTotalDailyCalories = Math.round(finalTotalDailyCalories * 10) / 10;

    let finalTotalDailyProtein = 0;
    let proteinPerCarton = 0;

    const proteinObject = selectedProductData.nutritional_info.find(
      (info) =>
        typeof info.Nutrition === "string" && info.Nutrition.includes("Protein")
    );

    if (proteinObject) {
      const proteinEntries = Object.entries(proteinObject);
      if (proteinEntries.length > 3) {
        const cartonProteinData = proteinEntries[3];
        const proteinValueFrom4th = parseFloat(cartonProteinData[1] as string);
        if (!isNaN(proteinValueFrom4th)) {
          proteinPerCarton = proteinValueFrom4th;
        } else {
          console.warn(
            "Could not parse proteinPerCarton from 4th entry of proteinObject. Value:",
            cartonProteinData[1],
            "Product:",
            input.product
          );
        }
      }
      if (proteinPerCarton === 0 && cartonVolumeMl > 0) {
        const protein100mlValue =
          (proteinObject as any)["100 ml"] || (proteinObject as any)["100 ml*"];
        if (typeof protein100mlValue === "number") {
          proteinPerCarton = (protein100mlValue / 100) * cartonVolumeMl;
        } else {
          console.warn(
            "Fallback for proteinPerCarton failed. '100 ml' value not found or invalid. Product:",
            input.product,
            "protein100mlValue:",
            protein100mlValue
          );
        }
      }
    } else {
      console.warn("Protein object not found for product:", input.product);
    }

    if (isNaN(proteinPerCarton) || proteinPerCarton < 0) {
      proteinPerCarton = 0;
    }

    finalTotalDailyProtein = finalCalculatedCartonsPerDay * proteinPerCarton;
    finalTotalDailyProtein = Math.round(finalTotalDailyProtein * 10) / 10;
    if (isNaN(finalTotalDailyProtein)) {
      finalTotalDailyProtein = 0;
    }

    // --- NEW: Calculate kcals/kg and protein/kg if weight is provided ---
    let kcalsPerKgResult: number | undefined = undefined;
    let proteinPerKgResult: number | undefined = undefined;

    if (input.weight && input.weight > 0) {
      // input.weight is already in kg
      kcalsPerKgResult = finalTotalDailyCalories / input.weight;
      kcalsPerKgResult = Math.round(kcalsPerKgResult * 10) / 10; // Round to 1 decimal place

      proteinPerKgResult = finalTotalDailyProtein / input.weight;
      proteinPerKgResult = Math.round(proteinPerKgResult * 10) / 10; // Round to 1 decimal place

      // Handle potential NaN or Infinity if input.weight was somehow 0 or calculations went wrong
      if (isNaN(kcalsPerKgResult) || !isFinite(kcalsPerKgResult))
        kcalsPerKgResult = undefined;
      if (isNaN(proteinPerKgResult) || !isFinite(proteinPerKgResult))
        proteinPerKgResult = undefined;
    }

    return {
      calculatedCartonsPerDay: finalCalculatedCartonsPerDay,
      totalDailyVolume: finalTotalDailyVolume,
      totalDailyCalories: finalTotalDailyCalories,
      totalDailyProtein: finalTotalDailyProtein,
      kcalsPerKg: kcalsPerKgResult, // Add to return object
      proteinPerKg: proteinPerKgResult, // Add to return object
    };
  };

  const displayResults = (results: CalculationResult) => {
    const selectedProduct = PRODUCTS.find((p) => p.name === userInput.product);

    // The 'mlPerCarton' might also be dynamic based on the product.
    // We can get it from the same place we got cartonVolumeMl in calculateResults.
    let mlPerCartonDisplay = 250; // Default
    const selectedProductData = importedProductsData.find(
      (p) => p.product_name === userInput.product
    );
    if (selectedProductData) {
      const energyObject = selectedProductData.nutritional_info[0];
      if (
        energyObject &&
        energyObject.Nutrition === "Energy" &&
        energyObject.Units === "Cal"
      ) {
        const energyEntries = Object.entries(energyObject);
        if (energyEntries.length > 3) {
          const cartonVolumeString = energyEntries[3][0] as string; // e.g., "250 ml"
          const parsedVolume = parseFloat(cartonVolumeString);
          if (!isNaN(parsedVolume)) {
            mlPerCartonDisplay = parsedVolume;
          }
        }
      }
    }

    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        content: "", // Content is now part of the results display structure
        showResults: true,
        results: {
          ...results, // This already contains calculatedCartonsPerDay, totalDailyVolume, etc.
          productName: selectedProduct?.name || "",
          productImage: selectedProduct?.imageUrl || "",
          mlPerCarton: mlPerCartonDisplay, // Use the dynamically found carton size
        },
      },
    ]);
  };

  const getInputLabel = () => {
    switch (userInput.calculationMethod) {
      case "Calories/Day":
        return "Calories per day";
      case "Volume/Day":
        return "Volume per day (mL)";
      default:
        return "Cartons per day";
    }
  };

  const handleReturn = () => {
    // Remove the last two messages (user input and bot response)
    setMessages((prev) => {
      // Keep only the messages up to the current step
      const newMessages = prev.slice(0, -2);

      // If returning to product selection, keep only the initial messages
      if (currentStep - 1 === 0) {
        return [
          {
            type: "bot",
            content:
              "Welcome to the Nestlé Formula Calculator. Please note that this tool is not a generative AI chatbot.",
            isDisclaimer: true,
          },
          {
            type: "bot",
            content: "Please select a product:",
            showProductSelector: true,
          },
        ];
      }

      // For other steps, restore the appropriate input selector/options
      switch (currentStep - 1) {
        case 1: // Return to calculation method
          return newMessages.map((msg, idx) =>
            idx === newMessages.length - 1
              ? {
                  ...msg,
                  options: ["Calories/Day", "Volume/Day", "Cartons/Day"],
                }
              : msg
          );
        case 2: // Return to cartons input
          return newMessages.map((msg, idx) =>
            idx === newMessages.length - 1
              ? { ...msg, showCartonsInput: true }
              : msg
          );
        case 3: // Return to age/sex selection
          return newMessages.map((msg, idx) =>
            idx === newMessages.length - 1
              ? { ...msg, showAgeSexSelector: true, showSkipButton: true }
              : msg
          );
        case 4: // Return to weight input
          return newMessages.map((msg, idx) =>
            idx === newMessages.length - 1
              ? { ...msg, showWeightInput: true, showSkipButton: true }
              : msg
          );
        default:
          return newMessages;
      }
    });

    // Reset all input states based on which step we're returning to
    switch (currentStep - 1) {
      case 0:
        setUserInput({});
        break;
      case 1: // Return to calculation method
        setUserInput((prev) => ({ product: prev.product }));
        break;
      case 2: // Return to cartons input
        setUserInput((prev) => ({
          product: prev.product,
          calculationMethod: prev.calculationMethod,
        }));
        break;
      case 3: // Return to age/sex selection
        setUserInput((prev) => ({
          product: prev.product,
          calculationMethod: prev.calculationMethod,
          cartonsPerDay: prev.cartonsPerDay,
        }));
        break;
      case 4: // Return to weight input
        setUserInput((prev) => ({
          product: prev.product,
          calculationMethod: prev.calculationMethod,
          cartonsPerDay: prev.cartonsPerDay,
          ageGender: prev.ageGender,
        }));
        break;
    }

    // Decrement the current step
    setCurrentStep((prev) => prev - 1);
    // Reset the input values
    setInputValue("");
    setCartonsInput("");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: 400,
        height: "600px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          bgcolor: "#008C69",
          color: "white",
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          component="img"
          src="/Bot Avatar.jpg"
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%", // Make the image circular
          }}
        />
        <Typography variant="h6">Formula Calculator Demo</Typography>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          py: 2,
          pl: 0.75,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <List>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                flexDirection: "column",
                alignItems: message.type === "user" ? "flex-end" : "flex-start",
                mb:
                  message.showProductSelector ||
                  message.showAgeSexSelector ||
                  message.showWeightInput ||
                  message.showCartonsInput ||
                  message.options
                    ? 2
                    : 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  width: "100%",
                  justifyContent:
                    message.type === "user" ? "flex-end" : "flex-start",
                }}
              >
                {message.type === "bot" && !message.showResults && (
                  <Box
                    component="img"
                    src="/Bot Avatar.jpg"
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      position: "absolute",
                      left: -1,
                      top: -15,
                      zIndex: 100,
                      padding: "1px",
                    }}
                  />
                )}
                {(!message.showResults || message.type === "user") && (
                  <Paper
                    elevation={0}
                    sx={{
                      py: 0.75,
                      px: 1.25,
                      bgcolor: message.type === "user" ? "#F1F0F0" : "#00A67E",
                      color: message.type === "user" ? "inherit" : "white",
                      maxWidth: "80%",
                      position: "relative",
                      borderRadius: 3,
                      ...(message.type === "bot" && {
                        pl: 1.5,
                      }),
                    }}
                  >
                    {index === messages.length - 1 &&
                      index > 1 &&
                      message.type === "bot" && (
                        <Tooltip
                          title="Return to previous step"
                          placement="top"
                        >
                          <IconButton
                            size="small"
                            onClick={handleReturn}
                            sx={{
                              position: "absolute",
                              top: 4,
                              right: -40,
                              color: "text.secondary",
                              padding: "4px",
                              "&:hover": {
                                bgcolor: "rgba(0, 0, 0, 0.04)",
                              },
                            }}
                          >
                            <KeyboardReturnIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: "pre-line",
                        fontSize: "0.875rem",
                        "& .highlight": {
                          fontWeight: "bold",
                        },
                      }}
                    >
                      {message.isDisclaimer ? (
                        <>
                          Welcome to the Nestlé Formula Calculator. Please note
                          that{" "}
                          <span className="highlight">
                            this tool is not a generative AI chatbot
                          </span>
                          .
                        </>
                      ) : (
                        message.content
                      )}
                    </Typography>
                  </Paper>
                )}
              </Box>
              {message.showProductSelector && (
                <Grow in={message.showProductSelector} timeout={500}>
                  <Box
                    sx={{
                      mt: 1,
                      width: "100%",
                      display: "flex",
                      maxHeight: 30,
                      transition: "all 0.5s ease-out",
                      transform: message.showProductSelector
                        ? "translateY(0)"
                        : "translateY(-20px)",
                      opacity: message.showProductSelector ? 1 : 0,
                    }}
                  >
                    <Autocomplete
                      options={PRODUCTS}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Product"
                          variant="outlined"
                          size="small"
                          InputLabelProps={{
                            style: { fontSize: "0.75rem", paddingTop: 2.5 },
                          }}
                        />
                      )}
                      ListboxProps={{
                        sx: {
                          fontSize: "0.75rem", // Set the desired font size for all options here.
                        },
                      }}
                      onChange={(_, value) => handleProductSelect(value)}
                      fullWidth
                    />
                  </Box>
                </Grow>
              )}
              {message.showAgeSexSelector && (
                <Grow in={message.showAgeSexSelector} timeout={500}>
                  <Box
                    sx={{
                      mt: 1,
                      width: "100%",
                      maxHeight: 30,
                      transition: "all 0.5s ease-out",
                      transform: message.showAgeSexSelector
                        ? "translateY(0)"
                        : "translateY(-20px)",
                      opacity: message.showAgeSexSelector ? 1 : 0,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Autocomplete
                        options={AGE_SEX_OPTIONS.flatMap(
                          (category) => category.items
                        )}
                        groupBy={(option) =>
                          AGE_SEX_OPTIONS.find((cat) =>
                            cat.items.includes(option)
                          )?.category || ""
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Age & Sex"
                            variant="outlined"
                            size="small"
                            InputLabelProps={{
                              style: { fontSize: "0.75rem", paddingTop: 2.5 },
                            }}
                          />
                        )}
                        ListboxProps={{
                          sx: {
                            fontSize: "0.75rem", // Set the desired font size for all options here.
                          },
                        }}
                        onChange={(_, value) => handleAgeGenderSelect(value)}
                        fullWidth
                      />
                      {message.showSkipButton && (
                        <Button
                          variant="text"
                          size="small"
                          onClick={handleSkipAgeSex}
                          sx={{ alignSelf: "flex-end" }}
                        >
                          Skip
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Grow>
              )}
              {message.showWeightInput && (
                <Grow in={message.showWeightInput} timeout={500}>
                  <Box
                    sx={{
                      mt: 1,
                      width: "100%",
                      display: "flex",
                      maxHeight: 30,
                      transition: "all 0.5s ease-out",
                      transform: message.showWeightInput
                        ? "translateY(0)"
                        : "translateY(-20px)",
                      opacity: message.showWeightInput ? 1 : 0,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <TextField
                          label="Weight"
                          type="number"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            handleWeightSubmit(inputValue, weightUnit)
                          }
                          size="small"
                          sx={{
                            flex: 1,
                            "& .MuiOutlinedInput-root": {
                              height: "30px", // sets the overall height
                              "& input": {
                                padding: "4px", // adjust inner padding for consistency
                              },
                            },
                          }}
                          InputLabelProps={{
                            sx: { fontSize: "0.75rem" }, // sets the label font size
                          }}
                        />
                        <FormControl
                          size="small"
                          sx={{
                            minWidth: 80,
                            "& .MuiOutlinedInput-root": {
                              height: "30px",
                            },
                          }}
                        >
                          <Select
                            value={weightUnit}
                            onChange={(e) =>
                              setWeightUnit(e.target.value as "kg" | "lb")
                            }
                            sx={{
                              height: "30px",
                              fontSize: "0.75rem",
                              display: "flex",
                              alignItems: "center", // centers vertically
                              justifyContent: "center", // centers horizontally
                              "& .MuiSelect-select": {
                                padding: "4px",
                                textAlign: "center",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.75rem",
                              },
                            }}
                          >
                            <MenuItem value="kg" sx={{ fontSize: "0.75rem" }}>
                              kg
                            </MenuItem>
                            <MenuItem value="lb" sx={{ fontSize: "0.75rem" }}>
                              lb
                            </MenuItem>
                          </Select>
                        </FormControl>
                        <IconButton
                          color="primary"
                          onClick={() =>
                            handleWeightSubmit(inputValue, weightUnit)
                          }
                        >
                          <SendIcon />
                        </IconButton>
                      </Box>
                      {message.showSkipButton && (
                        <Button
                          variant="text"
                          size="small"
                          onClick={handleSkipWeight}
                          sx={{ alignSelf: "flex-end" }}
                        >
                          Skip
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Grow>
              )}

              {message.showCartonsInput && (
                <Grow in={message.showCartonsInput} timeout={500}>
                  <Box
                    sx={{
                      mt: 1,
                      width: "100%",
                      maxHeight: 30,
                      display: "flex",
                      gap: 1,
                      transition: "all 0.5s ease-out",
                      transform: message.showCartonsInput
                        ? "translateY(0)"
                        : "translateY(-20px)",
                      opacity: message.showCartonsInput ? 1 : 0,
                    }}
                  >
                    <TextField
                      label={getInputLabel()}
                      type="number"
                      value={cartonsInput}
                      onChange={(e) => setCartonsInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleCartonsSubmit(cartonsInput)
                      }
                      size="small"
                      sx={{
                        flex: 1,
                        "& .MuiOutlinedInput-root": {
                          height: "33px",
                        },
                      }}
                      InputLabelProps={{
                        sx: { fontSize: "0.75rem" },
                      }}
                    />
                    <IconButton
                      color="primary"
                      onClick={() => handleCartonsSubmit(cartonsInput)}
                    >
                      <SendIcon />
                    </IconButton>
                  </Box>
                </Grow>
              )}
              {message.options && (
                <Grow in={!!message.options} timeout={500}>
                  <Box
                    sx={{
                      mt: 1,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      transition: "all 0.5s ease-out",
                      transform: message.options
                        ? "translateY(0)"
                        : "translateY(-20px)",
                      opacity: message.options ? 1 : 0,
                    }}
                  >
                    {message.options.map((option, i) => (
                      <Button
                        key={i}
                        variant="outlined"
                        size="small"
                        onClick={() => handleOptionClick(option)}
                        sx={{ mb: 1 }}
                      >
                        {option}
                      </Button>
                    ))}
                  </Box>
                </Grow>
              )}
              {message.showResults && message.results && (
                <Box
                  sx={{
                    mt: 2,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    bgcolor: "white",
                    borderRadius: 1,
                    p: 2,
                    boxShadow: 1,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ textAlign: "center", mb: 0.5, fontSize: "1rem" }}
                  >
                    {message.results.productName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      mb: 2,
                      color: "text.secondary",
                      fontSize: "0.75rem",
                    }}
                  >
                    {message.results.mlPerCarton} mL/carton
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      gap: 4,
                      mb: 2,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Box
                        component="img"
                        src={message.results.productImage}
                        alt={message.results.productName}
                        sx={{
                          width: "100%",
                          maxWidth: 150,
                          height: "auto",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            textAlign: "left",
                            color: "#00A67E",
                            fontSize: "1.5rem",
                            fontWeight: 500,
                            lineHeight: 1.2,
                          }}
                        >
                          {message.results.calculatedCartonsPerDay || 0}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", fontSize: "0.75rem" }}
                        >
                          Cartons per Day
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            textAlign: "left",
                            color: "#00A67E",
                            fontSize: "1rem",
                            fontWeight: 500,
                            lineHeight: 1.2,
                          }}
                        >
                          {message.results.totalDailyVolume} mL
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", fontSize: "0.75rem" }}
                        >
                          Total Daily Volume
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            textAlign: "left",
                            color: "#00A67E",
                            fontSize: "1rem",
                            fontWeight: 500,
                            lineHeight: 1.2,
                          }}
                        >
                          {message.results.totalDailyCalories} kcals
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", fontSize: "0.75rem" }}
                        >
                          Total Daily Calories
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            textAlign: "left",
                            color: "#00A67E",
                            fontSize: "1rem",
                            fontWeight: 500,
                            lineHeight: 1.2,
                          }}
                        >
                          {message.results.totalDailyProtein}g
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", fontSize: "0.75rem" }}
                        >
                          Total Daily Protein
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  {typeof message.results.kcalsPerKg === "number" && ( // Check if weight was provided
                    <Box
                      sx={{
                        width: "100%",
                        mt: 2,
                        mb: 2,
                        borderTop: "1px solid #eee",
                        pt: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          textAlign: "center",
                          mb: 1.5,
                          fontWeight: "bold",
                        }}
                      >
                        This formula provides
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          {/* You might want to use actual flame/protein icons here */}
                          <Typography
                            variant="h4"
                            component="span"
                            sx={{ fontFamily: "monospace" }}
                          >
                            🔥
                          </Typography>{" "}
                          {/* Placeholder icon */}
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "medium" }}
                          >
                            {message.results.kcalsPerKg} kcals/kg
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <Typography
                            variant="h4"
                            component="span"
                            sx={{ fontFamily: "monospace" }}
                          >
                            🧬
                          </Typography>{" "}
                          {/* Placeholder icon */}
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "medium" }}
                          >
                            {message.results.proteinPerKg} g protein/kg
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      width: "100%",
                      mt: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: "#00A67E",
                        "&:hover": {
                          bgcolor: "#008C69",
                        },
                      }}
                      startIcon={
                        <Box component="span" sx={{ fontSize: "1.2rem" }}>
                          ✉
                        </Box>
                      }
                    >
                      Send Results via Email
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<DownloadIcon />}
                      sx={{
                        borderColor: "#00A67E",
                        color: "#00A67E",
                        "&:hover": {
                          borderColor: "#008C69",
                          color: "#008C69",
                          bgcolor: "rgba(0, 166, 126, 0.04)",
                        },
                      }}
                    >
                      Download PDF
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => {
                        setMessages([
                          {
                            type: "bot",
                            content:
                              "Welcome to the Nestlé Formula Calculator. Please note that this tool is not a generative AI chatbot.",
                            isDisclaimer: true,
                          },
                          {
                            type: "bot",
                            content: "Please select a product:",
                            showProductSelector: true,
                          },
                        ]);
                        setUserInput({});
                        setCurrentStep(0);
                        setInputValue("");
                        setCartonsInput("");
                      }}
                      sx={{
                        color: "#00A67E",
                        "&:hover": {
                          color: "#008C69",
                          bgcolor: "rgba(0, 166, 126, 0.04)",
                        },
                      }}
                    >
                      Start Again
                    </Button>
                  </Box>
                </Box>
              )}
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>
    </Paper>
  );
};

export default Chatbot;
