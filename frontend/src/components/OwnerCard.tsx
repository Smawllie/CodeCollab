import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
	name: String;
	email: String;
	setOpenCopyPopup: Function;
}

const useStyles = makeStyles({
	root: {
        width:"100%",
		margin: '1rem',
        maxHeight:'15%',
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:""
	},
});

const OwnerCard = ({ name, email, setOpenCopyPopup}: Props) => {

    const username = email.split('@', 1)[0];
    const handleCopy = () => {
        console.log(window.location.href);
        navigator.clipboard.writeText(window.location.href);
        setOpenCopyPopup(true);
    };
    
	const styles = useStyles();
	return (
		<Card className={styles.root}>
					<CardContent>
						<Typography gutterBottom variant="h4" component="span" >
							{name}
						</Typography>
						<Typography variant="h5" color="textSecondary" component="p">
							{username}
						</Typography>
					</CardContent>
                    <CardActions>
                        <Typography>
                            Share this project
                        </Typography>
                        <IconButton onClick={()=>handleCopy()} className="outline-none">
                            <FileCopyIcon/>
                        </IconButton>
                    </CardActions>
		</Card>
	);
};

export default OwnerCard;
