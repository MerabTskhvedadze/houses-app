import {
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';
import { HouseFilters } from '@/app/types';

interface FiltersProps {
  filters: HouseFilters;
  setFilters: React.Dispatch<React.SetStateAction<HouseFilters>>;
}

export default function Filters({ filters, setFilters }: FiltersProps) {
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: newValue as [number, number],
    }));
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Typography gutterBottom>Price Range</Typography>
        <Slider
          value={filters.priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay='auto'
          min={0}
          max={1000000}
          step={50000}
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Type</InputLabel>
        <Select
          value={filters.type}
          label='Type'
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              type: e.target.value as HouseFilters['type'],
            }))
          }
        >
          <MenuItem value='all'>All</MenuItem>
          <MenuItem value='apartment'>Apartment</MenuItem>
          <MenuItem value='villa'>Villa</MenuItem>
          <MenuItem value='house'>House</MenuItem>
        </Select>
      </FormControl>

      <FormControl component='fieldset' fullWidth sx={{ mb: 2 }}>
        <Typography component='legend'>Area</Typography>
        <RadioGroup
          row
          value={filters.area}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, area: e.target.value }))
          }
        >
          <FormControlLabel value='all' control={<Radio />} label='All' />
          <FormControlLabel value='Athens' control={<Radio />} label='Athens' />
          <FormControlLabel
            value='Mykonos'
            control={<Radio />}
            label='Mykonos'
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
