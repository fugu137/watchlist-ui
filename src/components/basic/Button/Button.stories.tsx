import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './Button';

export default {
    title: 'Example/Button',
    component: Button,
    decorators: [(Story) => {
        return (
            <div style={{ padding: '0px' }}>
                <Story />
            </div>
        );
    }]

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


