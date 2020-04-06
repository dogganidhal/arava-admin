import React, {useState} from "react";
import {
	Collapse, createStyles, Divider,
	IconButton, List, ListItem, ListItemIcon, ListItemText, Theme,
} from "@material-ui/core";
import {Link} from "react-router-dom";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import PoiTheme from "../Data/Model/PoiTheme";
import {makeStyles} from "@material-ui/core/styles";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		themeIcon: {
			height: theme.spacing(2),
		},
		list: {
			paddingLeft: theme.spacing(2)
		}
	}),
);


interface ThemeExpansionPanelProps {
	readonly theme: PoiTheme;
}

export default function  ThemeExpandableListItem({theme}: ThemeExpansionPanelProps) {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);

	return <div>
		<ListItem>
			<ListItemIcon>
				<img className={classes.themeIcon} src={theme.icon?.url}  alt={`Aucune icon`}/>
			</ListItemIcon>
			<ListItemText>
				{theme.name.find(t => t.language.code === 'fr')?.resource}
			</ListItemText>
			{
				theme.subThemes && theme.subThemes.length > 0 && <IconButton
            color={"primary"}
            onClick={() => setExpanded(!expanded)}
        >
					{expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
			}
			<IconButton
				color={"primary"}
				component={Link}
				to={`/themes/${theme.id}`}
			>
				<OpenInNewIcon />
			</IconButton>
		</ListItem>
		{
			theme.subThemes && theme.subThemes.length > 0 && <Collapse in={expanded}>
          <List component={"div"} className={classes.list}>
						{
							(theme.subThemes ?? []).map(subTheme => (
								<ThemeExpandableListItem key={subTheme.id} theme={subTheme}/>
							))
						}
          </List>
          <Divider />
      </Collapse>
		}
	</div>
}