import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChangeEvent, useState } from 'react';
import TextField from './TextField';

export default {
    title: 'Basic Components/TextField',
    component: TextField,

} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => {
    const [value, setValue] = useState(args.value);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
       setValue(event.currentTarget.value);
    }

    return <TextField type={args.type} value={value} label={args.label} error={args.error} onChange={onChange} />;
}


export const Basic = Template.bind({});
Basic.args = {
    type: 'text',
    value: 'Valid text content',
};

export const Label = Template.bind({});
Label.args = {
    type: 'text',
    value: 'Valid text content',
    label: 'Label',
};


export const Invalid = Template.bind({});
Invalid.args = {
    type: 'text',
    value: 'Invalid text content',
    error: 'Invalid entry!',
};

export const Password = Template.bind({});
Password.args = {
    type: 'password',
    value: 'Valid text content',
};