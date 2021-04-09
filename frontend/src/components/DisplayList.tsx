import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import FolderIcon from '@material-ui/icons/Folder';
import { Link } from 'react-router-dom';

function DisplayList({ data }: any) {
	return (
		<List>
			<div className="w-1/2 px-15 py-2">
				{data.map(function(project: any) {
					return (
						<Paper elevation={2} variant="outlined" key={project._id}>
							<Link to={`/project/${project._id}/edit`}>
								<ListItem>
									<ListItemIcon>
										<FolderIcon />
									</ListItemIcon>
									<ListItemText primary={project.name} />
								</ListItem>
							</Link>
						</Paper>
					);
				})}
			</div>
		</List>
	);
}

export default DisplayList;
