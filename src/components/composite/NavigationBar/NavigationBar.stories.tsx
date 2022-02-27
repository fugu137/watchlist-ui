import { useArgs } from '@storybook/client-api';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useEffect } from 'react';
import NavigationBar from './NavigationBar';

export default {
    title: 'Composite Components/NavigationBar',
    component: NavigationBar,
    parameters: {
        layout: 'fullscreen',
        actions: { onClick: { action: 'clicked' } }
    },

} as ComponentMeta<typeof NavigationBar>;

const Template: ComponentStory<typeof NavigationBar> = (args) => <NavigationBar {...args} />;


export const SignedInUser = Template.bind({});
SignedInUser.args = {
    user: { username: 'Jacqueline' },
};

export const NoSignedInUser = Template.bind({});
NoSignedInUser.args = {
    user: null,
};
