import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import StepsEditor from './StepsEditor';
import { melodySteps } from '../../__tests__';

afterEach(cleanup);

describe('StepsEditor', () => {
  it('should render component', () => {
    render(<StepsEditor />);
  });

  it('should render with current steps and keyboard', () => {
    const { getAllByTestId, getByTestId } = render(
      <StepsEditor defaultSteps={melodySteps} subdivision={16} />,
    );

    const headerCells = getAllByTestId('header');
    const keyboardButtons = getAllByTestId('keyboard-button');
    const stepButtons = getAllByTestId(/step-button/);
    const currentStepButtons = getAllByTestId(/-current/);

    expect(headerCells.length).toBe(17);
    expect(keyboardButtons.length).toBe(12);
    expect(stepButtons.length).toBe(192);
    expect(currentStepButtons.length).toBe(6);

    expect(getByTestId('step-button-0-0-current')).toBeDefined();
    expect(getByTestId('step-button-0-7-current')).toBeDefined();
    expect(getByTestId('step-button-2-2-current')).toBeDefined();
    expect(getByTestId('step-button-4-4-current')).toBeDefined();
  });

  // it('should update current steps after clicks', () => {
  //   const { getAllByTestId, getByTestId } = render(
  //     <StepsEditor defaultSteps={melodySteps} subdivision={16} />,
  //   );

  //   fireEvent.click(getByTestId('step-button-0-2'));
  //   expect(getByTestId('step-button-0-2-current')).toBeDefined();
  // });
});
