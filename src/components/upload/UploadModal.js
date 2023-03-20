import { Box, Button, Layer, List, Text } from 'grommet';
import PropTypes from 'prop-types';

const UploadModal = ({ loadingCountdown, success, setSuccess, error, setError }) => {
  if (loadingCountdown > 0 || success.length > 0 || error.length > 0) {
    return (
      <Layer modal>
        <Box pad="large">
          {loadingCountdown > 0 ? (
            <Text>Processing {loadingCountdown} files</Text>
          ) : (
            <>
              <Text>
                <strong>{success.length}</strong> successful
              </Text>

              {error.length > 0 && (
                <>
                  <Text
                    margin={{ top: 'medium' }}
                    color="status-error"
                  >
                    <strong>{error.length}</strong> failed:
                  </Text>
                  <List
                    margin={{ top: 'medium' }}
                    data={error}
                    paginate={{ step: 10 }}
                    pad={{ horizontal: 'none', vertical: 'medium' }}
                  />
                </>
              )}

              <Button
                label="Close"
                margin={{ top: 'medium' }}
                onClick={() => {
                  setSuccess([]);
                  setError([]);
                }}
                primary
              />
            </>
          )}
        </Box>
      </Layer>
    );
  }

  return null;
};

UploadModal.propTypes = {
  loadingCountdown: PropTypes.number.isRequired,
  success: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSuccess: PropTypes.func.isRequired,
  error: PropTypes.arrayOf(PropTypes.string).isRequired,
  setError: PropTypes.func.isRequired,
};

export default UploadModal;
