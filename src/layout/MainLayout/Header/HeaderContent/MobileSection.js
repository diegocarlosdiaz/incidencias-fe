import { useEffect, useRef, useState } from 'react';

// material-ui
// import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// project import
import Profile from './Profile';

// assets

// ==============================|| HEADER CONTENT - MOBILE ||============================== //

const MobileSection = () => {
    const [open] = useState(false);
    const anchorRef = useRef(null);

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Box sx={{ flexShrink: 0, ml: 0.75 }}>
                <Profile />
            </Box>
        </>
    );
};

export default MobileSection;
