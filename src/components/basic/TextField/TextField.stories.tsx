import { useArgs } from '@storybook/client-api';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChangeEvent } from 'react';
import TextField from './TextField';


export default {
    title: 'Basic Components/TextField',
    component: TextField,

} as ComponentMeta<typeof TextField>;


const Template: ComponentStory<typeof TextField> = (args) => {
    const [, updateArgs] = useArgs();

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        updateArgs({ value: event.currentTarget.value });
    }

    return <TextField {...args} onChange={changeHandler} />;
}


export const Basic = Template.bind({});
Basic.args = {
    type: 'text',
    value: 'Text content',
};

export const Labelled = Template.bind({});
Labelled.args = {
    type: 'text',
    value: 'Text content',
    label: 'Label:',
};


export const Invalid = Template.bind({});
Invalid.args = {
    type: 'text',
    value: 'Invalid text content',
    error: 'Invalid entry',
};

export const Password = Template.bind({});
Password.args = {
    type: 'password',
    value: 'Password123',
};