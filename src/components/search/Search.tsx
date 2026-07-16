import { Box, Button, Grommet, Layer, ResponsiveContext, TextInput } from 'grommet';
import { Search as LuSearch } from 'lucide-react';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'throttle-debounce';

import { useTranslation } from 'react-i18next';
import theme from '../../config/theme';
import { SettingsContext } from '../../utils/contextProviders/SettingsContext';
import { ChatLogsContext } from '../../utils/contextProviders/StatsContext';
import SearchResults from './SearchResults';

const MIN_SEARCH_LENGTH = 2;

const Search = () => {
  const { t } = useTranslation();
  const size = useContext(ResponsiveContext);
  const { stats } = useContext(ChatLogsContext);
  const { themeMode } = useContext(SettingsContext);
  const targetRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [inputVisible, setInputVisible] = useState(false);
  const [layerVisible, setLayerVisible] = useState(false);

  const onButtonClick = useCallback(
    () => {
      setInputVisible(true);
    },
    [],
  );

  const onInputBlur = useCallback(
    () => {
      if (!layerVisible) setInputVisible(false);
    },
    [layerVisible],
  );

  const onInputChange = useMemo(
    () =>
      debounce(
        100,
        (e: React.ChangeEvent<HTMLInputElement>) => {
          const nextValue = e.target.value;
          setValue(nextValue);
          setLayerVisible(nextValue.length >= MIN_SEARCH_LENGTH);
        },
      ),
    [setValue],
  );

  const hide = useCallback((e?: React.MouseEvent) => {
    if(e && e.target !== targetRef?.current) {
      setInputVisible(false);
      setLayerVisible(false);
    }
  }, []);

  useEffect(
    () => {
      if (inputVisible && targetRef.current instanceof HTMLElement) {
        targetRef.current.focus();
      }
    },
    [inputVisible],
  );

  if (stats.length === 0) return null;

  return (

    <Box>
      {inputVisible ? (
        <TextInput
          ref={targetRef}
          onBlur={onInputBlur}
          onChange={onInputChange}
          name="search"
          placeholder={t('common.search')}
        />
      ) : (
        <Button
          onClick={onButtonClick}
          icon={<LuSearch size={20} />}
          label={size === 'small' ? undefined : t('common.search')}
          plain
        />
      )}

      {layerVisible && (
        <Grommet theme={theme} themeMode={themeMode}>
          <Layer
            onClickOutside={e => hide(e)}
            onEsc={() => hide()}
            modal={false}
            responsive={false}
            margin="large"
          >
            <SearchResults {...{ search: value.trim(), hide }} />
          </Layer>
        </Grommet>
      )}
    </Box>
  );
};

export default Search;
