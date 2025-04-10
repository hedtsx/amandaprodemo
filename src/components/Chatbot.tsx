import { useState, useRef, useEffect } from 'react';
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
  Tooltip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { ChatMessage, UserInput, CalculationMethod, CalculationResult } from '../types';


// Enhanced product list
const PRODUCTS = [
  { category: 'Standard Formulas', items: [
    'Compleat® Pediatric Standard 1.0',
    'Compleat® Original',
    'Compleat® 1.5',
    'Compleat® 2.0'
  ]},
  { category: 'Specialized Formulas', items: [
    'Peptamen® 1.0',
    'Peptamen® 1.5',
    'Peptamen® AF',
    'Peptamen® Intense VHP'
  ]},
  { category: 'Pediatric Formulas', items: [
    'Compleat® Pediatric',
    'Peptamen® Junior',
    'Peptamen® Junior 1.5',
    'Peptamen® Junior HP'
  ]}
];

// Enhanced age/sex combinations
const AGE_SEX_OPTIONS = [
  { category: 'Pediatric', items: [
    '0-6 months (Male)',
    '0-6 months (Female)',
    '7-12 months (Male)',
    '7-12 months (Female)',
    '1-3 years (Male)',
    '1-3 years (Female)',
    '4-8 years (Male)',
    '4-8 years (Female)',
    '9-13 years (Male)',
    '9-13 years (Female)',
    '14-18 years (Male)',
    '14-18 years (Female)'
  ]},
  { category: 'Adult', items: [
    '19-30 years (Male)',
    '19-30 years (Female)',
    '31-50 years (Male)',
    '31-50 years (Female)',
    '51-70 years (Male)',
    '51-70 years (Female)',
    '70+ years (Male)',
    '70+ years (Female)'
  ]}
];

const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState<UserInput>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [cartonsInput, setCartonsInput] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting
    setMessages([
      {
        type: 'bot',
        content: 'Welcome to the Nestlé Formula Calculator. Please note that this tool is not a generative AI chatbot.',
        isDisclaimer: true
      },
      {
        type: 'bot',
        content: 'Please select a product:',
        showProductSelector: true
      }
    ]);
  }, []);

  const handleProductSelect = (product: string | null) => {
    if (!product) return;
    
    // First, hide the product selector
    setMessages(prev => prev.map((msg, idx) => 
      idx === prev.length - 1 ? { ...msg, showProductSelector: false } : msg
    ));
    // Then add the new messages
    setMessages(prev => [...prev, 
      { type: 'user', content: product },
      {
        type: 'bot',
        content: 'Choose calculation method:',
        options: ['Calories/Day', 'Volume/Day', 'Cartons/Day']
      }
    ]);
    setUserInput(prev => ({ ...prev, product }));
    setCurrentStep(1);
  };

  const handleOptionClick = (option: string) => {
    // First, hide the options
    setMessages(prev => prev.map((msg, idx) => 
      idx === prev.length - 1 ? { ...msg, options: undefined } : msg
    ));
    // Then add the new messages
    setMessages(prev => [...prev, 
      { type: 'user', content: option }
    ]);
    
    switch (currentStep) {
      case 1: // Calculation method
        setUserInput(prev => ({ ...prev, calculationMethod: option as CalculationMethod }));
        let nextMessage = '';
        switch (option) {
          case 'Calories/Day':
            nextMessage = 'Enter goal total calories from formula per day:';
            break;
          case 'Volume/Day':
            nextMessage = 'Enter total volume from formula/day (mL):';
            break;
          case 'Cartons/Day':
            nextMessage = 'Please enter the number of cartons per day:';
            break;
        }
        setMessages(prev => [...prev, {
          type: 'bot',
          content: nextMessage,
          showCartonsInput: true
        }]);
        break;
      default:
        break;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleCartonsSubmit = (cartons: string) => {
    if (!cartons.trim()) return;
    
    const cartonsValue = Number(cartons);
    setUserInput(prev => ({ ...prev, cartonsPerDay: cartonsValue }));
    // First, hide the cartons input
    setMessages(prev => prev.map((msg, idx) => 
      idx === prev.length - 1 ? { ...msg, showCartonsInput: false } : msg
    ));
    // Then add the new messages
    setMessages(prev => [...prev, 
      { type: 'user', content: cartons },
      {
        type: 'bot',
        content: 'Select patient\'s age and sex (Optional):',
        showAgeSexSelector: true
      }
    ]);
    setCartonsInput('');
    setCurrentStep(prev => prev + 1);
  };

  const handleAgeGenderSelect = (ageSex: string | null) => {
    if (!ageSex) return;
    
    setUserInput(prev => ({ ...prev, ageGender: ageSex }));
    // First, hide the age/sex selector
    setMessages(prev => prev.map((msg, idx) => 
      idx === prev.length - 1 ? { ...msg, showAgeSexSelector: false } : msg
    ));
    // Then add the new messages
    setMessages(prev => [...prev, 
      { type: 'user', content: ageSex },
      {
        type: 'bot',
        content: 'Enter patient\'s weight (Optional):',
        showWeightInput: true
      }
    ]);
    setCurrentStep(4);
  };

  const handleWeightSubmit = (weight: string, unit: 'kg' | 'lb') => {
    if (!weight.trim()) return;
    
    const weightValue = Number(weight);
    const weightInKg = unit === 'lb' ? weightValue * 0.453592 : weightValue;
    
    setUserInput(prev => ({ ...prev, weight: weightInKg }));
    // First, hide the weight input
    setMessages(prev => prev.map((msg, idx) => 
      idx === prev.length - 1 ? { ...msg, showWeightInput: false } : msg
    ));
    // Then add the new messages
    setMessages(prev => [...prev, 
      { type: 'user', content: `${weight} ${unit}` }
    ]);
    const results: CalculationResult = calculateResults({
      ...userInput,
      weight: weightInKg
    });
    displayResults(results);
    setInputValue('');
    setCurrentStep(prev => prev + 1);
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = { type: 'user', content: inputValue };
    setMessages(prev => [...prev, newMessage]);

    if (currentStep === 2) { // Handling cartons per day input
      setUserInput(prev => ({ ...prev, cartonsPerDay: Number(inputValue) }));
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Select patient\'s age and sex (Optional):',
        showAgeSexSelector: true
      }]);
      setInputValue('');
      setCurrentStep(prev => prev + 1);
    }
  };

  const calculateResults = (input: UserInput): CalculationResult => {
    // Mock calculations - replace with actual formulas
    return {
      totalDailyVolume: input.cartonsPerDay ? input.cartonsPerDay * 250 : 0,
      totalDailyCalories: input.cartonsPerDay ? input.cartonsPerDay * 250 : 0,
      totalDailyProtein: input.cartonsPerDay ? input.cartonsPerDay * 10 : 0,
    };
  };

  const displayResults = (results: CalculationResult) => {
    setMessages(prev => [...prev, {
      type: 'bot',
      content: `Results:\n
Total Daily Volume: ${results.totalDailyVolume}mL\n
Total Daily Calories: ${results.totalDailyCalories}kcal\n
Total Daily Protein: ${results.totalDailyProtein}g`
    }]);
  };

  const handleReturn = () => {
    // Remove the last two messages (user input and bot response)
    setMessages(prev => {
      // Keep only the messages up to the current step
      const newMessages = prev.slice(0, -2);
      
      // If returning to product selection, keep only the initial messages
      if (currentStep - 1 === 0) {
        return [
          {
            type: 'bot',
            content: 'Welcome to the Nestlé Formula Calculator. Please note that this tool is not a generative AI chatbot.',
            isDisclaimer: true
          },
          {
            type: 'bot',
            content: 'Please select a product:',
            showProductSelector: true
          }
        ];
      }

      // For other steps, restore the appropriate input selector/options
      switch (currentStep - 1) {
        case 1: // Return to calculation method
          return newMessages.map((msg, idx) => 
            idx === newMessages.length - 1 ? { ...msg, options: ['Calories/Day', 'Volume/Day', 'Cartons/Day'] } : msg
          );
        case 2: // Return to cartons input
          return newMessages.map((msg, idx) => 
            idx === newMessages.length - 1 ? { ...msg, showCartonsInput: true } : msg
          );
        case 3: // Return to age/sex selection
          return newMessages.map((msg, idx) => 
            idx === newMessages.length - 1 ? { ...msg, showAgeSexSelector: true } : msg
          );
        case 4: // Return to weight input
          return newMessages.map((msg, idx) => 
            idx === newMessages.length - 1 ? { ...msg, showWeightInput: true } : msg
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
        setUserInput(prev => ({ product: prev.product }));
        break;
      case 2: // Return to cartons input
        setUserInput(prev => ({ product: prev.product, calculationMethod: prev.calculationMethod }));
        break;
      case 3: // Return to age/sex selection
        setUserInput(prev => ({ 
          product: prev.product, 
          calculationMethod: prev.calculationMethod,
          cartonsPerDay: prev.cartonsPerDay 
        }));
        break;
      case 4: // Return to weight input
        setUserInput(prev => ({ 
          product: prev.product, 
          calculationMethod: prev.calculationMethod,
          cartonsPerDay: prev.cartonsPerDay,
          ageGender: prev.ageGender 
        }));
        break;
    }

    // Decrement the current step
    setCurrentStep(prev => prev - 1);
    // Reset the input values
    setInputValue('');
    setCartonsInput('');
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        width: '100%', 
        maxWidth: 400, 
        height: '600px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ 
        bgcolor: '#008C69',
        color: 'white',
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <Box
          component="img"
          src="/Bot Avatar.jpg"
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%'  // Make the image circular
          }}
        />
        <Typography variant="h6">Formula Calculator Demo</Typography>
      </Box>

      <Box sx={{ 
        flexGrow: 1, 
        overflow: 'auto',
        p: 2,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <List>
          {messages.map((message, index) => (
            <ListItem 
              key={index}
              sx={{
                flexDirection: 'column',
                alignItems: message.type === 'user' ? 'flex-end' : 'flex-start',
                mb: message.showProductSelector || message.showAgeSexSelector || 
                    message.showWeightInput || message.showCartonsInput || 
                    message.options ? 2 : 1
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 1,
                width: '100%',
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
              }}>
                {message.type === 'bot' && (
                  <Box
                    component="img"
                    src="/Bot Avatar.jpg"
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      position: 'absolute',
                      left: -16,
                      top: -16,
                      border: '2px solid white',
                      padding: '1px'
                    }}
                  />
                )}
                <Paper
                  sx={{
                    p: 1,
                    bgcolor: message.type === 'user' ? '#F1F0F0' : '#00A67E',
                    color: message.type === 'user' ? 'inherit' : 'white',
                    maxWidth: '80%',
                    position: 'relative',
                    ...(message.type === 'bot' && {
                      pl: 2
                    })
                  }}
                >
                  {index === messages.length - 1 && index > 1 && message.type === 'bot' && (
                    <Tooltip title="Return to previous step" placement="top">
                      <IconButton
                        size="small"
                        onClick={handleReturn}
                        sx={{ 
                          position: 'absolute',
                          top: -20,
                          right: 0,
                          color: 'text.secondary',
                          padding: '4px',
                          '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.04)'
                          }
                        }}
                      >
                        <KeyboardReturnIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      whiteSpace: 'pre-line',
                      '& .highlight': {
                        fontWeight: 'bold'
                      }
                    }}
                  >
                    {message.isDisclaimer ? (
                      <>
                        Welcome to the Nestlé Formula Calculator. Please note that{' '}
                        <span className="highlight">this tool is not a generative AI chatbot</span>.
                      </>
                    ) : (
                      message.content
                    )}
                  </Typography>
                </Paper>
              </Box>
              {message.showProductSelector && (
                <Grow in={message.showProductSelector} timeout={500}>
                  <Box sx={{ 
                    mt: 1, 
                    width: '100%',
                    transition: 'all 0.5s ease-out',
                    transform: message.showProductSelector ? 'translateY(0)' : 'translateY(-20px)',
                    opacity: message.showProductSelector ? 1 : 0
                  }}>
                    <Autocomplete
                      options={PRODUCTS.flatMap(category => category.items)}
                      groupBy={(option) => 
                        PRODUCTS.find(cat => cat.items.includes(option))?.category || ''
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Select Product" variant="outlined" />
                      )}
                      onChange={(_, value) => handleProductSelect(value)}
                      fullWidth
                    />
                  </Box>
                </Grow>
              )}
              {message.showAgeSexSelector && (
                <Grow in={message.showAgeSexSelector} timeout={500}>
                  <Box sx={{ 
                    mt: 1, 
                    width: '100%',
                    transition: 'all 0.5s ease-out',
                    transform: message.showAgeSexSelector ? 'translateY(0)' : 'translateY(-20px)',
                    opacity: message.showAgeSexSelector ? 1 : 0
                  }}>
                    <Autocomplete
                      options={AGE_SEX_OPTIONS.flatMap(category => category.items)}
                      groupBy={(option) => 
                        AGE_SEX_OPTIONS.find(cat => cat.items.includes(option))?.category || ''
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Select Age and Sex" variant="outlined" />
                      )}
                      onChange={(_, value) => handleAgeGenderSelect(value)}
                      fullWidth
                    />
                  </Box>
                </Grow>
              )}
              {message.showWeightInput && (
                <Grow in={message.showWeightInput} timeout={500}>
                  <Box sx={{ 
                    mt: 1, 
                    width: '100%', 
                    display: 'flex', 
                    gap: 1,
                    transition: 'all 0.5s ease-out',
                    transform: message.showWeightInput ? 'translateY(0)' : 'translateY(-20px)',
                    opacity: message.showWeightInput ? 1 : 0
                  }}>
                    <TextField
                      label="Weight"
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleWeightSubmit(inputValue, weightUnit)}
                      size="small"
                      sx={{ flex: 1 }}
                    />
                    <FormControl size="small" sx={{ minWidth: 80 }}>
                      <Select
                        value={weightUnit}
                        onChange={(e) => setWeightUnit(e.target.value as 'kg' | 'lb')}
                      >
                        <MenuItem value="kg">kg</MenuItem>
                        <MenuItem value="lb">lb</MenuItem>
                      </Select>
                    </FormControl>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleWeightSubmit(inputValue, weightUnit)}
                    >
                      <SendIcon />
                    </IconButton>
                  </Box>
                </Grow>
              )}
              {message.showCartonsInput && (
                <Grow in={message.showCartonsInput} timeout={500}>
                  <Box sx={{ 
                    mt: 1, 
                    width: '100%', 
                    display: 'flex', 
                    gap: 1,
                    transition: 'all 0.5s ease-out',
                    transform: message.showCartonsInput ? 'translateY(0)' : 'translateY(-20px)',
                    opacity: message.showCartonsInput ? 1 : 0
                  }}>
                    <TextField
                      label="Cartons per day"
                      type="number"
                      value={cartonsInput}
                      onChange={(e) => setCartonsInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleCartonsSubmit(cartonsInput)}
                      size="small"
                      sx={{ flex: 1 }}
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
                  <Box sx={{ 
                    mt: 1, 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 1,
                    transition: 'all 0.5s ease-out',
                    transform: message.options ? 'translateY(0)' : 'translateY(-20px)',
                    opacity: message.options ? 1 : 0
                  }}>
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
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>
    </Paper>
  );
};

export default Chatbot; 