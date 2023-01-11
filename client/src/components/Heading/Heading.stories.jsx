import Heading from './Heading';

export default {
    title: 'Heading',
    component: Heading
}

const Template = args => <Heading {...args}>{args.children}</Heading>

export const Default = {
    args: {
      children: "Hello World!"
    },
};

export const Filled = {
    args: {
        children: "Hello World!",
        filled: true
    }
}