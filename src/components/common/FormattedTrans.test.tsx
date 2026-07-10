import { render, screen } from '@testing-library/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { beforeAll, describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../utils/testUtils';
import FormattedTrans from './FormattedTrans';

beforeAll(async () => {
  await i18n.use(initReactI18next).init({
    lng: 'de',
    fallbackLng: 'de',
    resources: {
      de: {
        translation: {
          welcome_bold: 'Willkommen zurück, <b>{{name}}</b>!',
          address_with_breaks: 'Firma GmbH<br/>Hauptstraße 5',
          click_here_link: 'Für mehr Infos, <a>klicken Sie bitte hier</a>.',
        },
      },
    },
    interpolation: { escapeValue: false },
  });
});

describe('FormattedTrans', () => {
  it('renders variables inside named bold tags correctly', () => {
    render(<FormattedTrans i18nKey="welcome_bold" values={{ name: 'Alex' }} />);

    const boldElement = screen.getByText('Alex');
    expect(boldElement).toBeInTheDocument();
    expect(boldElement.tagName).toBe('B');
  });

  it('renders Grommet Anchor using named link tags', () => {
    renderWithProviders(
      <FormattedTrans
        i18nKey="click_here_link"
        to="/pageX"
        values={{ x: 1 }}
      />,
    );

    const anchorElement = screen.getByText('klicken Sie bitte hier');
    expect(anchorElement).toBeInTheDocument();
    expect(anchorElement.tagName).toBe('A');

    expect(anchorElement).toBeInTheDocument();
    expect(anchorElement).toHaveAttribute('href', '/pageX');
  });

  it('injects named line breaks safely', () => {
    const { container } = render(<FormattedTrans i18nKey="address_with_breaks" />);

    const brTag = container.querySelector('br');
    expect(brTag).toBeInTheDocument();
  });
});