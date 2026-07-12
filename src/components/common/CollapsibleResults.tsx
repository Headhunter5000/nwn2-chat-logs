import { Button, Collapsible, List } from 'grommet';
import { Minus, Plus } from 'lucide-react';
import { useState, type ReactNode } from 'react';

const CollapsibleResults = ({ label, results, color } :  { label: ReactNode, results: string[], color?: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  if (results.length) {
    return (
      <>
        <Button
          onClick={() => setOpen(!open)}
          icon={open ? <Minus /> : <Plus />}
          alignSelf='start'
          label={label}
          color={color}
          plain
        />
        <Collapsible open={open}>
          <List
            margin={{ top: 'medium', bottom: 'small' }}
            data={results}
            paginate={{ step: 10 }}
            pad={{ horizontal: 'none', vertical: 'medium' }}
          />
        </Collapsible>
      </>
    );
  }

  return null;
};

export default CollapsibleResults;