import { ComponentMeta, ComponentStory } from '@storybook/react';
import IconButton from './IconButton';


export default {
    title: 'Basic Components/IconButton',
    component: IconButton,

} as ComponentMeta<typeof IconButton>;


const Template: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />;


export const Home = Template.bind({});
Home.args = {
    icon: 'home',
}

export const Delete = Template.bind({});
Delete.args = {
    icon: 'delete',
}