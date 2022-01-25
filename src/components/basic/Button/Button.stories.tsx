import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Button from './Button';


export default {
    title: 'Basic Components/Button',
    component: Button,

} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;


export const Primary = Template.bind({});
Primary.args = {
    text: 'Primary',
    variant: 'primary',
    size: 'regular',
    disabled: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
    text: 'Secondary',
    variant: 'secondary',
    size: 'regular',
    disabled: false,
}

export const Large = Template.bind({});
Large.args = {
    text: 'Primary Large',
    variant: 'primary',
    size: 'large',
    disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
    text: 'Disabled',
    variant: 'primary',
    size: 'regular',
    disabled: true,
}


