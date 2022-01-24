import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './Button';

export default {
    title: 'Example/Button',
    component: Button,

} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;


export const Primary = Template.bind({});
Primary.args = {
    text: 'Primary',
    variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
    text: 'Secondary',
    variant: 'secondary',
}

export const Disabled = Template.bind({});
Disabled.args = {
    text: 'Disabled',
    variant: 'primary',
    disabled: true,
}


