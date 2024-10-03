import type { Meta, StoryObj } from '@storybook/react';

import { GetStarted } from './GetStarted';
import dt from './get-started-data.json'

const meta: Meta<typeof GetStarted> = {
  title: 'UI/Component/Get Started',
  component: GetStarted,
  parameters: {},
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof GetStarted>;

export const Default: Story = {
  args: {
    data: { label: "Trusted by hundreds of organizations", description: "blabla" }
  },
};
