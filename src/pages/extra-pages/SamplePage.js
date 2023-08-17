// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { useSelector } from '../../../node_modules/react-redux/es/exports';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
    const data = useSelector((state) => state.historialDeCambios.entities)
    const data1 = useSelector((state) => state.estados.entities)
    console.log(data, 'historico cambios')
    console.log(data1, 'estados')

    return (

        <MainCard title="Sample Card">
            <Typography variant="body2">
                Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
                ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
                reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
                qui officiate descent molls anim id est labours.
            </Typography>
        </MainCard>
    )
}

export default SamplePage;
