import type { Meta, StoryObj } from '@storybook/react';

import { Hero2 } from './Hero2';
import dt from './hero2-data.json'

const meta: Meta<typeof Hero2> = {
  title: 'UI/Base/Hero2',
  component: Hero2,
  parameters: {},
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Hero2>;

export const Default: Story = {
  args: {
    data : {
      title: "Discover Innovation in Smart Security Products",
      subtitle: "OUR PRODUCT",
      description: "",
      image_url: "https://api.uxe.ai/wp-content/uploads/2024/01/career-background.png",
      subDescription: "Intelligent Security Beyond Cameras: Seamless Solutions for Governments and Business Environments"
    }
  },
};
