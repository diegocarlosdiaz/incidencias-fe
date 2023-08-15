// assets
import { CheckCircleOutlined, InfoCircleOutlined, RightCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

// icons
const icons = {
    CheckCircleOutlined,
    InfoCircleOutlined,
    RightCircleOutlined,
    CloseCircleOutlined
};

// ==============================|| MENU ITEMS - TRANSACTION ||============================== //

const transaction = {
    id: 'parametricas-group',
    title: 'Parametricas',
    type: 'group',
    children: [
        {
            id: 'estados',
            title: 'Estados',
            type: 'item',
            url: '/estados',
            icon: icons.CheckCircleOutlined,
            breadcrumbs: false
        },
        {
            id:'principal',
            title: 'Principal',
            type:'item',
            url: '/principal',
            icon: icons.CheckCircleOutlined,
            breadcrumbs: false

        }
    ]
};

export default transaction;
