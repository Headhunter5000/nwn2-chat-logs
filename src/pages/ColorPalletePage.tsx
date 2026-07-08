
import { Box, Grid, Heading, Text } from 'grommet';
import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import ThemeSettingField from '../components/settings/ThemeSettingField';
import themeColors from '../config/themeColors';

const groupedColors = Object.entries(themeColors).reduce<Record<string, [string, string][]>>(
  (acc, [key, value]) => {
    const group = key.match(/^([^-]+)/)?.[0] || 'andere';
    if (!acc[group]) acc[group] = [];
    acc[group].push([key, value]);
    return acc;
  },
  {},
);

const GolorCard = ({ name, hslValue }: { name: string, hslValue: string}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const level = parseInt(name.split('-')[1], 10);
  const textColor = level > 400 ? 'white' : 'black';

  return(
    <Box
      key={name}
      background={hslValue}
      pad="medium"
      round="xsmall"
      onClick={() => handleCopy(name, hslValue)}
      hoverIndicator={{ opacity: 'medium' }}
      style={{ cursor: 'pointer' }}
      justify="between"
      height="64px"
    >
      <Text size="small" weight="bold" color={textColor}>
        {name}
      </Text>
      <Text size="xsmall" color={textColor} style={{ opacity: 0.7 }}>
        {copiedKey === name ? 'Copied!' : hslValue}
      </Text>
    </Box>
  );
};

const ColorGrid = () => {

  return (
    <>
      {Object.entries(groupedColors).map(([groupName, colors]) => (
        <Box key={groupName} gap="small">
          <Heading level={3} margin={{ bottom: 'xsmall' }} style={{ textTransform: 'capitalize' }}>
            {groupName}
          </Heading>
          <Grid columns={{ count: 'fill', size: 'small' }} gap="medium">
            {colors.map(
              ([name, hslValue]) => <GolorCard {...{ name, hslValue }} key={name} />,
            )}
          </Grid>
        </Box>
      ))}
    </>
  );
};

const ColorPalletePage = () => (
  <>
    <PageHeader title="Color Palette" />
    <ThemeSettingField />
    <ColorGrid />
  </>
);

export default ColorPalletePage;
