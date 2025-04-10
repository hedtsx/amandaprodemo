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
  FormControl
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
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
        content: 'Welcome to the Nestlé Formula Calculator! Please select a product:',
        showProductSelector: true
      }
    ]);
  }, []);

  const handleProductSelect = (product: string | null) => {
    if (!product) return;
    
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
    setMessages(prev => [...prev, { type: 'user', content: option }]);
    
    switch (currentStep) {
      case 1: // Calculation method
        setUserInput(prev => ({ ...prev, calculationMethod: option as CalculationMethod }));
        setMessages(prev => [...prev, {
          type: 'bot',
          content: 'Please enter the number of cartons per day:'
        }]);
        break;
      default:
        break;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleAgeGenderSelect = (ageSex: string | null) => {
    if (!ageSex) return;
    
    setUserInput(prev => ({ ...prev, ageGender: ageSex }));
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
        bgcolor: '#008EAA',
        color: 'white',
        p: 2,
        display: 'flex',
        alignItems: 'center'
      }}>
        <Typography variant="h6">Formula Calculator</Typography>
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
                mb: 1
              }}
            >
              <Paper
                sx={{
                  p: 1,
                  bgcolor: message.type === 'user' ? '#E3F2FD' : '#F5F5F5',
                  maxWidth: '80%'
                }}
              >
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {message.content}
                </Typography>
              </Paper>
              {message.showProductSelector && (
                <Box sx={{ mt: 1, width: '100%' }}>
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
              )}
              {message.showAgeSexSelector && (
                <Box sx={{ mt: 1, width: '100%' }}>
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
              )}
              {message.showWeightInput && (
                <Box sx={{ mt: 1, width: '100%', display: 'flex', gap: 1 }}>
                  <TextField
                    label="Weight"
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleWeightSubmit(inputValue, weightUnit)}
                    sx={{ flex: 1 }}
                  />
                  <FormControl sx={{ minWidth: 80 }}>
                    <Select
                      value={weightUnit}
                      onChange={(e) => setWeightUnit(e.target.value as 'kg' | 'lb')}
                      size="small"
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
              )}
              {message.options && (
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
              )}
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      <Box sx={{ p: 2, bgcolor: '#f5f5f5' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Type your message..."
            sx={{ display: messages[messages.length - 1]?.showWeightInput ? 'none' : 'block' }}
          />
          {!messages[messages.length - 1]?.showWeightInput && (
            <IconButton color="primary" onClick={handleSubmit}>
              <SendIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default Chatbot; 