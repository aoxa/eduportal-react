import { green } from '@material-ui/core/colors';

export const styles = (theme) => (
  {
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
    menuButton: {
      marginRight: '2px',
    },
    paper: { 
      padding: 20,
      maxWidth: '80%',
      marginTop: 30,
      margin: `${theme.spacing(1)}px auto`,
    },
    form: {    
      display: 'flex',    
      alignItems: 'baseline',    
      justifyContent: 'space-evenly'  
    }, 
    spacedDivider: {
      marginTop: 20,
      marginBottom: 20
    },
    grow : {
        flexGrow: 1,
        },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    formElement: {
      marginTop: 10,
      marginBottom: 15
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
    },
    nodeBody: {
      marginTop: 25,
      marginBottom: 15
    },
    speedDial: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    }
  }
);

const drawerWidth = 240;

export const adminStyles = (theme)=>  (
  {
    root: {
      display: 'flex',
    },
    appBarToolbarMenu:{
      margin: 'auto',
      marginRight: 0,
      color: 'white'
    },
    listItem: {
      '&.active': {
        backgroundColor: '#eee'
      }
    },

    paper: { 
      padding: 20,
      margin: 20 
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },

    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },

    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },

    form: {    
        display: 'flex',    
        alignItems: 'baseline',    
        justifyContent: 'space-evenly'  
      },

    table: {
      minWidth: 650,
    },

    gridMargin: {
      padding: '0 15px'
    },
    button: {
      marginTop: '20px',
      marginRight: '10px'
    }
  }
);
