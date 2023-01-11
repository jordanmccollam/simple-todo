import Heading from './Heading';

export default {
    title: 'Heading',
    component: Heading
}

const Template = args => <Heading {...args}>{args.children}</Heading>

export const Default = {
    args: {
      children: 'Hello World!',
      filled: false,
      subtext: 'this is subtext'
    },
};

export const Filled = {
    args: {
        children: 'Hello World!',
        filled: true,
        subtext: 'this is subtext'
    }
}