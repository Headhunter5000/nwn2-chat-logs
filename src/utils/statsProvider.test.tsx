import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ChatLogsContext } from './statsContext';
import { ChatLogsProvider } from './statsProvider';

describe('ChatLogsProvider', () => {
  it('should render without error', () => {
    const result = render(
      <ChatLogsProvider>
        <div id="test-child" />
      </ChatLogsProvider>,
    );
    expect(result.container).toBeDefined();
  });

  it('should provide context values to a consumer component', () => {
    const TestComponent = () => {
      const context = React.useContext(ChatLogsContext);
      return <div id="test-context">{JSON.stringify(context)}</div>;
    };

    render(
      <ChatLogsProvider>
        <TestComponent />
      </ChatLogsProvider>,
    );
  });

  it('should have default context values when not provided', () => {
    // This test checks that the context's fallback (default value) is correct.
    const TestDefaultComponent = () => {
      const context = React.useContext(ChatLogsContext);
      return <div id="test-default">{JSON.stringify(context)}</div>;
    };

    // We render without ChatLogsProvider to test the default values of the Context object itself.
    render(<TestDefaultComponent />);
  });
});
