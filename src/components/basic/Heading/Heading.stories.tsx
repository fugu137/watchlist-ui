import { ComponentMeta, ComponentStory } from "@storybook/react";
import Heading from './Heading';

export default {
    title: 'Basic Components/Heading',
    component: Heading,

} as ComponentMeta<typeof Heading>;

const Template: ComponentStory<typeof Heading> = (args) => <Heading {...args} />;


export const Heading1 = Template.bind({});
Heading1.args = {
    type: 'h1',
    text: 'Heading 1',
}

export const Heading2 = Template.bind({});
Heading2.args = {
    type: 'h2',
    text: 'Heading 2',
}

export const Heading3 = Template.bind({});
Heading3.args = {
    type: 'h3',
    text: 'Heading 3',
}