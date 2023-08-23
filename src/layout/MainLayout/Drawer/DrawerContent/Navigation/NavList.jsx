import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

// project import
import { activeItem } from 'store/reducers/menu';
import { Collapse, List } from '../../../../../../node_modules/@mui/material/index';
import { StarBorder } from '../../../../../../node_modules/@mui/icons-material/index';

export const NavList = ({ item, level }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();
    const menu = useSelector((state) => state.menu);
    const { drawerOpen, openItem } = menu;

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = { component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />) };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const itemHandler = (id) => {
        dispatch(activeItem({ openItem: [id] }));
        setOpen(!open);
    };

    const Icon = item.icon;
    const itemIcon = item.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : false;
    const Title = item.title;

    const isSelected = openItem.findIndex((id) => id === item.id) > -1;

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch(activeItem({ openItem: [item.id] }));
        }
        // eslint-disable-next-line
    }, []);

    const textColor = 'text.primary';
    const iconSelectedColor = 'primary.main';

    return (
        <>
            <List>
                <ListItemButton
                    //{...listItemProps}
                    disabled={item.disabled}
                    onClick={() => itemHandler(item.id)}
                    selected={isSelected}
                    sx={{
                        zIndex: 1201,
                        pl: drawerOpen ? `${level * 28}px` : 1.5,
                        py: !drawerOpen && level === 1 ? 1.25 : 1,
                        ...(drawerOpen && {
                            '&:hover': {
                                bgcolor: 'primary.lighter'
                            },
                            '&.Mui-selected': {
                                bgcolor: 'primary.lighter',
                                borderRight: `2px solid ${theme.palette.primary.main}`,
                                color: iconSelectedColor,
                                '&:hover': {
                                    color: iconSelectedColor,
                                    bgcolor: 'primary.lighter'
                                }
                            }
                        }),
                        ...(!drawerOpen && {
                            '&:hover': {
                                bgcolor: 'transparent'
                            },
                            '&.Mui-selected': {
                                '&:hover': {
                                    bgcolor: 'transparent'
                                },
                                bgcolor: 'transparent'
                            }
                        })
                    }}
                >

                    <ListItemIcon sx={{
                        minWidth: 28,
                        color: isSelected ? iconSelectedColor : textColor,
                        ...(!drawerOpen && {
                            borderRadius: 1.5,
                            width: 36,
                            height: 36,
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                                bgcolor: 'secondary.lighter'
                            }
                        }),
                        ...(!drawerOpen &&
                            isSelected && {
                            bgcolor: 'primary.lighter',
                            '&:hover': {
                                bgcolor: 'primary.lighter'
                            }
                        })
                    }}>
                        {itemIcon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                    {open ? <ExpandLess /> : <ExpandMore />}


                </ListItemButton>
                {item.subItems.map((subItem) => (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 5 }} {...listItemProps}>
                                <ListItemIcon sx={{
                                    minWidth: 28,
                                    /* color: isSelected ? iconSelectedColor : textColor, */
                                    ...(!drawerOpen && {
                                        borderRadius: 1.5,
                                        width: 36,
                                        height: 36,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        '&:hover': {
                                            bgcolor: 'secondary.lighter'
                                        }
                                    }),
                                    ...(!drawerOpen &&
                                        isSelected && {
                                        bgcolor: 'primary.lighter',
                                        '&:hover': {
                                            bgcolor: 'primary.lighter'
                                        }
                                    })
                                }}>
                                    <StickyNote2Icon />
                                </ListItemIcon>
                                <ListItemText primary={subItem} />
                            </ListItemButton>
                        </List>
                    </Collapse>
                ))
                }
            </List>
        </>
    )
}
