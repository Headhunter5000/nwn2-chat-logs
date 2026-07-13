import { Box, Button, Collapsible, List } from 'grommet';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState, type ReactNode } from 'react';

const CollapsibleResults = ({ label, results, color } :  { label: ReactNode, results: string[], color?: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  if (results.length) {
    return (
      <>
        <Button
          onClick={() => setOpen(!open)}
          icon={open ? <ChevronDown /> : <ChevronRight />}
          alignSelf='start'
          label={label}
          color={color}
          plain
        />
        <Collapsible open={open}>
          <Box overflow={{ vertical: 'auto' }}>
            <List
              margin={{ top: 'medium', bottom: 'small' }}
              data={results}
              paginate={{ step: 10 }}
              pad={{ horizontal: 'none', vertical: 'medium' }}
            />
          </Box>
        </Collapsible>
      </>
    );
  }

  return null;
};

export default CollapsibleResults;