import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextField from './TextField';

export default {
    title: 'Basic Components/Text Field',
    component: TextField,

} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => <TextField {...args} />;


export const Simple = Template.bind({});
Simple.args = {
    type: 'text',
    label: 'Label:',
};
