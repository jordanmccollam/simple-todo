import MenuContext from './MenuContext';
import {BsCheck2All} from 'react-icons/bs';

export default {
    title: 'MenuContext',
    component: MenuContext
}

const Template = args => <MenuContext {...args} />

export const Default = {
    args: {
        menuItems: [
            {
                name: "Rename",
                icon: <BsCheck2All className='mt-1' />,
                func: () =>  console.log("rename task")
            },
            {
                name: "Remove",
                icon: <BsCheck2All className='mt-1' />,
                func: () =>  console.log("remove task")
            }
        ],
        data: {
            show: true,
            x: 0,
            y: 0
        }
    },
};