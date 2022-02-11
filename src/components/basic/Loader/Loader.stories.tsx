import { ComponentMeta, ComponentStory } from '@storybook/react';
import Loader from './Loader';


export default {
    title: 'Basic Components/Loader',
    component: Loader,

} as ComponentMeta<typeof Loader>;


const Template: ComponentStory<typeof Loader> = (args) => {
    return <Loader />;
}

export const ThreeDots = Template.bind({});
