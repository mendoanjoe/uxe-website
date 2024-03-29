import type { Meta, StoryObj } from '@storybook/react';

import { Rating } from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'UI/Component/Rating',
  component: Rating,
  parameters: {},
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: {
    rating: 5
  },
};
