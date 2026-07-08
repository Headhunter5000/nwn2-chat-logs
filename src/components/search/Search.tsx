import { Box, Button, Grommet, Layer, TextInput } from 'grommet';
import { Search as LuSearch } from 'lucide-react';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'throttle-debounce';

import theme from '../../config/theme';
import { SettingsContext } from '../../utils/contextProviders/SettingsContext';
import SearchResults from './SearchResults';

const MIN_SEARCH_LENGTH = 2;

const Search = () => {
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

  return (
    <>
      <Box>
        {inputVisible ? (
          <TextInput
            ref={targetRef}
            onBlur={onInputBlur}
            onChange={onInputChange}
            name="search"
            placeholder="Search"
          />
        ) : (
          <Button
            onClick={onButtonClick}
            icon={<LuSearch size={20} />}
            label="Search"
            size="small"
            plain
          />
        )}
      </Box>
      {layerVisible && (
        <Grommet theme={theme} themeMode={themeMode/*themeMode === 'dark' ? 'light': 'dark'*/}>
          <Layer
            onClickOutside={e => hide(e)}
            onEsc={() => hide()}
            modal={false}
            responsive={false}
            margin="large"
          >
            <Box pad="large" style={{ maxHeight: 'calc(100vh - 6em)', overflow: 'hidden' }}>
              <SearchResults {...{ search: value.trim(), hide }} />
            </Box>
          </Layer>
        </Grommet>
      )}
    </>
  );
};

export default Search;
