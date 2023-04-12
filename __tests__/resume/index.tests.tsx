import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import Resume from '../../pages/resume';

describe('Resume', () => {
  it('renders resume with my name', () => {
    const { getByText } = render(<Resume />);
    expect(getByText('Will Saada')).toBeInTheDocument();
  });
});
