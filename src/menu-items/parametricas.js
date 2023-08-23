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
            breadcrumbs: true
        },
        {
            id:'jira',
            title: 'Remplazo Jira',
            type:'item',
            url: '/principal',
            icon: icons.CheckCircleOutlined,
            breadcrumbs: true

        },
        {
            id:'powerbi',
            title: 'Reportes de Power BI',
            type:'list',
            url: 'https://app.powerbi.com/singleSignOn?ru=https%3A%2F%2Fapp.powerbi.com%2F%3FnoSignUpCheck%3D1',
            icon: icons.CheckCircleOutlined,
            breadcrumbs: false,
            subItems: ["PowerBi 1","PowerBi 2","PowerBi 3","PowerBi 4"],
            

        },
        {
            id:'auditoria',
            title: 'Reportes de auditoria',
            type:'item',
            url: '/auditoria',
            icon: icons.CheckCircleOutlined,
            breadcrumbs: false
        },
        {
            id:'configuracion',
            title: 'Configuración',
            type:'item',
            url: '/configuracion',
            icon: icons.CheckCircleOutlined,
            breadcrumbs: false
        },
        
    ]
};

export default transaction;
